import React from "react";

export default function ItineraryList({
  itinerary = [],
  onRemove,
  onMoveUp,
  onMoveDown,
  onClear,
  onExport,
}) {
  return (
    <div className="card mt-4 shadow-sm border-0">
      <div className="card-body p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="m-0 fw-bold">Roteiro de Viagem</h6>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={onClear}>
              Limpar Tudo
            </button>
            <button className="btn btn-sm btn-primary" onClick={onExport}>
              Salvar Roteiro
            </button>
          </div>
        </div>

        {itinerary.length === 0 ? (
          <div className="text-muted small py-3 text-center">
            Nenhum local adicionado. Use a busca para começar seu roteiro.
          </div>
        ) : (
          <ul className="list-group list-group-flush">
            {itinerary.map((item, index) => (
              <li key={index} className="list-group-item d-flex align-items-center gap-2 px-0">
                <div className="flex-grow-1">
                  <div className="fw-semibold">{item.title || `Destino ${index + 1}`}</div>
                  <small className="text-muted">
                    {Number(item.lat).toFixed(4)}, {Number(item.lng).toFixed(4)}
                  </small>
                </div>

                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-light border"
                    onClick={() => onMoveUp(index)}
                    disabled={index === 0}
                    title="Subir na lista"
                  >
                    ↑
                  </button>
                  <button
                    className="btn btn-light border"
                    onClick={() => onMoveDown(index)}
                    disabled={index === itinerary.length - 1}
                    title="Descer na lista"
                  >
                    ↓
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onRemove(index)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}