// src/api/overpass.js

export async function fetchPOIs(category, lat, lng) {
  const radius = 5000; // Aumentamos para um raio de 5km
  let tags = "";

  // TRUQUE DE MESTRE: O ["name"] garante que o mapa SÓ vai trazer locais que tenham nome real!
  if (category === "turismo") {
    tags = `
      node["tourism"="attraction"]["name"](around:${radius},${lat},${lng});
      node["tourism"="museum"]["name"](around:${radius},${lat},${lng});
      node["tourism"="viewpoint"]["name"](around:${radius},${lat},${lng});
      node["historic"="monument"]["name"](around:${radius},${lat},${lng});
    `;
  } else if (category === "restaurante") {
    tags = `
      node["amenity"="restaurant"]["name"](around:${radius},${lat},${lng});
      node["amenity"="cafe"]["name"](around:${radius},${lat},${lng});
      node["amenity"="bar"]["name"](around:${radius},${lat},${lng});
    `;
  } else if (category === "hotel") {
    tags = `
      node["tourism"="hotel"]["name"](around:${radius},${lat},${lng});
      node["tourism"="hostel"]["name"](around:${radius},${lat},${lng});
      node["tourism"="guest_house"]["name"](around:${radius},${lat},${lng});
    `;
  } else if (category === "posto") {
    tags = `node["amenity"="fuel"]["name"](around:${radius},${lat},${lng});`;
  } else {
    return []; 
  }

  // Aumentamos o limite para 30 resultados para dar mais opções de escolha
  const query = `[out:json];(${tags});out 30;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data.elements.map(el => {
      let markerColor = "blue";
      if (category === "turismo") markerColor = "violet";
      if (category === "restaurante") markerColor = "orange";
      if (category === "hotel") markerColor = "green";
      if (category === "posto") markerColor = "black";

      return {
        id: el.id,
        lat: el.lat,
        lng: el.lon,
        title: el.tags.name, // Como exigimos o ["name"] na busca, isso nunca mais será vazio!
        color: markerColor,
        isPoi: true,
        category: category
      };
    });
  } catch (error) {
    console.error("Erro ao buscar locais:", error);
    return [];
  }
}