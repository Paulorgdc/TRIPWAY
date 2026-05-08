import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaSave, FaArrowLeft, FaMapMarkedAlt, FaCameraRetro, FaUtensils, FaBed, FaGasPump, FaSpinner, FaTrash, FaCalendarAlt, FaCheck } from "react-icons/fa";
import Map from "../components/map";
import SearchMap from "../components/search-map";
import LogoutButton from "../components/logout-button";
import { fetchPOIs } from "../api/overpass"; 
import videoBg from "../assets/background.mp4";
import "./home.css";

export default function Editor() {
  const { tripId } = useParams();
  const [mapCenter, setMapCenter] = useState({ lat: -15.7938, lng: -47.8827 });
  const [activeCategories, setActiveCategories] = useState([]);
  const [homeBaseMarker, setHomeBaseMarker] = useState(null);
  
  // Estados para o novo fluxo manual
  const [isAdjustingHome, setIsAdjustingHome] = useState(false);
  const [tempCoords, setTempCoords] = useState(null);

  const [poiMarkers, setPoiMarkers] = useState([]);
  const [isLoadingPoi, setIsLoadingPoi] = useState(false);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    if (activeCategories.length === 0) {
      setPoiMarkers([]); 
      return;
    }
    const loadPlaces = async () => {
      setIsLoadingPoi(true);
      const promises = activeCategories.map(cat => fetchPOIs(cat, mapCenter.lat, mapCenter.lng));
      const resultsArray = await Promise.all(promises);
      setPoiMarkers(resultsArray.flat());
      setIsLoadingPoi(false);
    };
    loadPlaces();
  }, [activeCategories, mapCenter]);

  const handleCategoryClick = (category) => {
    setActiveCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const handleSearchComplete = (r) => {
    setMapCenter({ lat: r.lat, lng: r.lng });
    setHomeBaseMarker({ id: "home-base", lat: r.lat, lng: r.lng, title: "📍 Minha Hospedagem", color: "red" });
    setIsAdjustingHome(false); // Reseta se fizer nova busca
  };

  // Captura as coordenadas enquanto o usuário arrasta o pino
  const handleHomeDragEnd = (coords) => {
    setTempCoords(coords);
  };

  // Salva a nova posição manual
  const saveManualLocation = () => {
    if (tempCoords) {
      setHomeBaseMarker({ ...homeBaseMarker, lat: tempCoords.lat, lng: tempCoords.lng });
      setMapCenter(tempCoords);
    }
    setIsAdjustingHome(false);
  };

  const handleMarkerClick = (markerData) => {
    if (markerData.id === "home-base") return;
    if (itinerary.find(item => item.id === markerData.id)) return;
    setItinerary([...itinerary, markerData]);
  };

  const allMarkers = homeBaseMarker ? [homeBaseMarker, ...poiMarkers] : poiMarkers;

  return (
    <div className="home-container d-flex flex-column">
      <video autoPlay loop muted className="home-video-bg"><source src={videoBg} type="video/mp4" /></video>

      <nav className="glass-nav container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100 px-lg-5">
          <div className="d-flex align-items-center gap-3">
            <Link to="/mytrips" className="btn-back-icon text-decoration-none"><FaArrowLeft /></Link>
            <div className="nav-logo-wrap m-0">TripWay <span className="editor-badge">Editor</span></div>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <button className="btn-tripway"><FaSave className="me-2" /> Salvar Roteiro</button>
            <LogoutButton className="btn-tripway-danger" />
          </div>
        </div>
      </nav>

      <main className="main-content container-fluid px-lg-5 flex-grow-1 py-4">
        <div className="row h-100">
          <div className="col-lg-4 h-100">
            <div className="glass-card p-4 h-100 d-flex flex-column" style={{ overflowY: 'auto' }}>
              
              <h4 className="fw-bold mb-3 text-dark"><FaMapMarkedAlt className="text-primary me-2"/> Planejamento</h4>
              
              {/* Onde você vai ficar e Ajuste Manual */}
              <div className="mb-4">
                <label className="small fw-bold text-muted mb-2">ONDE VOCÊ VAI FICAR?</label>
                
                {!isAdjustingHome ? (
                  <>
                    <SearchMap onResult={handleSearchComplete} />
                    {homeBaseMarker && (
                      <button 
                        className="btn btn-link btn-sm text-decoration-none p-0 mt-2" 
                        onClick={() => setIsAdjustingHome(true)}
                      >
                        Não é o local correto? <span className="fw-bold">Ajustar manualmente</span>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="p-3 bg-primary bg-opacity-10 rounded-4 border border-primary border-opacity-25">
                    <p className="small mb-2 fw-medium">Arraste o <span className="text-danger fw-bold">pino vermelho</span> no mapa para o local exato.</p>
                    <button className="btn btn-primary w-100 btn-sm fw-bold py-2" onClick={saveManualLocation}>
                      <FaCheck className="me-1"/> Confirmar Localização
                    </button>
                  </div>
                )}
              </div>

              {/* Categorias */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="small fw-bold text-muted m-0">O QUE TEM POR PERTO</label>
                  {isLoadingPoi && <FaSpinner className="fa-spin text-primary" />}
                </div>
                <div className="categories-wrapper">
                  {/* Botões de categoria (Turismo, Comer, etc) */}
                  {['turismo', 'restaurante', 'hotel', 'posto'].map(cat => (
                    <button 
                      key={cat}
                      className={`category-btn ${activeCategories.includes(cat) ? "active" : ""}`} 
                      onClick={() => handleCategoryClick(cat)}
                    >
                      {cat === 'turismo' && <FaCameraRetro />}
                      {cat === 'restaurante' && <FaUtensils />}
                      {cat === 'hotel' && <FaBed />}
                      {cat === 'posto' && <FaGasPump />}
                      <span className="ms-1 text-capitalize">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Roteiro */}
              <div className="itinerary-section flex-grow-1 d-flex flex-column mt-2">
                <label className="small fw-bold text-muted mb-2">SEU ROTEIRO</label>
                <div className="border rounded-4 bg-light flex-grow-1 p-3 overflow-auto" style={{ minHeight: '200px' }}>
                  {itinerary.length === 0 ? (
                    <div className="h-100 d-flex align-items-center justify-content-center text-center">
                      <p className="text-muted m-0 px-4" style={{fontSize: '0.9rem'}}>Adicione lugares das categorias acima para montar sua rota.</p>
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {itinerary.map((item, index) => (
                        <div key={item.id} className="list-group-item bg-transparent d-flex justify-content-between align-items-center py-3 border-bottom">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary rounded-pill">{index + 1}</span>
                            <div className="fw-bold text-dark small">{item.title}</div>
                          </div>
                          <button className="btn btn-sm text-danger border-0" onClick={() => setItinerary(itinerary.filter(i => i.id !== item.id))}><FaTrash /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 h-100">
            <div className="map-wrapper h-100 shadow-sm overflow-hidden">
              <Map 
                center={mapCenter} 
                height="100%" 
                markers={allMarkers} 
                onAddItinerary={handleMarkerClick}
                onHomeDragEnd={handleHomeDragEnd}
                isAdjustingHome={isAdjustingHome}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="w-100 text-center py-2 mt-auto" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        <small className="text-white">&copy; 2026 TRIPWAY. Todos os direitos reservados.</small>
      </footer>
    </div>
  );
}