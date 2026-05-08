import React, { useState, useEffect } from "react";

export default function SearchMap({ onResult }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // EFEITO MÁGICO: Busca sugestões automaticamente enquanto o usuário digita
  useEffect(() => {
    // Só começa a buscar se tiver mais de 3 letras (pra poupar internet)
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    // Espera o usuário parar de digitar por meio segundo (500ms) antes de buscar
    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`);
        const data = await res.json();
        setSuggestions(data);
      } catch (e) {
        console.error("Erro ao buscar sugestões:", e);
      }
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Quando o usuário clica numa sugestão da lista
  const handleSelect = (place) => {
    setQuery(place.display_name); // Coloca o nome completo na barra
    setSuggestions([]); // Esconde a lista
    onResult({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) }); // Move o mapa
  };

  return (
    <div className="position-relative">
      <div className="input-group shadow-sm" style={{borderRadius: '12px', overflow: 'visible'}}>
        <input 
          type="text" 
          className="form-control border-0 bg-light" 
          placeholder="Busque cidade, bairro ou seu hotel..." 
          style={{padding: '12px 15px', boxShadow: 'none'}}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          className="btn btn-primary px-4 fw-bold" 
          type="button"
          onClick={() => suggestions.length > 0 && handleSelect(suggestions[0])}
        >
          {isSearching ? "..." : "Buscar"}
        </button>
      </div>

      {/* CAIXA FLUTUANTE DE SUGESTÕES */}
      {suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100 shadow-lg mt-2" style={{ zIndex: 1000, borderRadius: '12px', overflow: 'hidden' }}>
          {suggestions.map((place) => (
            <button
              key={place.place_id}
              type="button"
              className="list-group-item list-group-item-action text-start border-0"
              onClick={() => handleSelect(place)}
              style={{ fontSize: '0.85rem', padding: '10px 15px' }}
            >
              <span className="fw-bold text-dark">{place.name}</span>
              <br />
              <small className="text-muted">{place.display_name.replace(place.name + ", ", "")}</small>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}