import { useState } from "react";

export default function SearchMap({ onResult, placeholder = "Para onde vamos viajar?..." }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const term = query.trim();
    if (!term) return;

    setLoading(true);
    try {
      const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(term)}&limit=5`);
      const data = await res.json();

      if (!data.features?.length) {
        alert("Ops! Não encontramos esse lugar.");
        return;
      }

      const first = data.features[0];
      const [lng, lat] = first.geometry.coordinates;
      const name = first.properties.name || first.properties.city || term;

      onResult({ lat, lng, display_name: name });
    } catch (err) {
      alert("Erro ao conectar com o serviço de busca.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-group">
      <input
        className="form-control"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="btn btn-primary px-4" onClick={handleSearch} disabled={loading}>
        {loading ? "..." : "Buscar"}
      </button>
    </div>
  );
}