import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { TripItinerary } from '../types/travel';
import { KARNATAKA_DESTINATIONS } from '../data/destinations';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Navigation, Compass, Layers } from 'lucide-react';

interface InteractiveMapProps {
  itinerary?: TripItinerary;
  selectedDestinationId?: string;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  itinerary,
  selectedDestinationId,
  className = 'h-[500px] w-full rounded-2xl shadow-lg border border-slate-200 overflow-hidden'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const { isKannada } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'itinerary' | 'attractions'>('itinerary');

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center on Karnataka (approx. 14.5° N, 75.8° E)
    const map = L.map(mapContainerRef.current, {
      center: [14.0, 75.8],
      zoom: 7,
      scrollWheelZoom: false,
      zoomControl: true
    });

    // Clean OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Route
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();
    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    const bounds = L.latLngBounds([]);

    // Custom Marker Icon Creator
    const createCustomIcon = (bgColor: string, symbol: string) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${bgColor};
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
          ">
            <span style="
              transform: rotate(45deg);
              font-size: 14px;
              line-height: 1;
            ">${symbol}</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34]
      });
    };

    // If Itinerary is present, show itinerary destinations & route
    const routeCoords: [number, number][] = [];

    if (itinerary && itinerary.destinations.length > 0) {
      itinerary.destinations.forEach((destName, index) => {
        // Find matching destination coordinates
        const match = KARNATAKA_DESTINATIONS.find(
          d => d.name.toLowerCase() === destName.toLowerCase() || destName.toLowerCase().includes(d.id)
        );

        if (match) {
          const latLng: [number, number] = [match.lat, match.lng];
          routeCoords.push(latLng);
          bounds.extend(latLng);

          const isStart = index === 0;
          const isEnd = index === itinerary.destinations.length - 1;
          const color = isStart ? '#059669' : (isEnd ? '#DC2626' : '#EAB308');
          const symbol = isStart ? '🚩' : (isEnd ? '🏁' : `${index + 1}`);

          const popupContent = `
            <div style="font-family: system-ui, sans-serif; padding: 12px; width: 220px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-size: 11px; font-weight: 700; color: #B91C1C; text-transform: uppercase; letter-spacing: 0.5px;">
                  Stop #${index + 1}
                </span>
                <span style="font-size: 11px; background: #FEF3C7; color: #92400E; padding: 2px 6px; border-radius: 4px; font-weight: 600;">
                  ₹${match.approxBudgetPerDay}/day
                </span>
              </div>
              <h4 style="margin: 0 0 2px 0; font-size: 15px; font-weight: 700; color: #0F172A;">
                ${match.name}
              </h4>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748B; font-weight: 600;">
                ${match.nameKn}
              </p>
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #475569; line-height: 1.4;">
                ${match.tagline}
              </p>
              <div style="border-top: 1px dashed #E2E8F0; padding-top: 6px; font-size: 11px; color: #0284C7; font-weight: 500;">
                ✨ Best: ${match.bestTime}
              </div>
            </div>
          `;

          const marker = L.marker(latLng, { icon: createCustomIcon(color, symbol) })
            .bindPopup(popupContent)
            .addTo(markersLayer);

          if (index === 0) marker.openPopup();
        }
      });

      // Also plot top attractions for current destinations if filter is 'all' or 'attractions'
      if (activeFilter !== 'itinerary') {
        itinerary.destinations.forEach(destName => {
          const match = KARNATAKA_DESTINATIONS.find(d => d.name.toLowerCase() === destName.toLowerCase());
          if (match && match.topAttractions) {
            match.topAttractions.forEach(act => {
              const actLatLng: [number, number] = [act.lat, act.lng];
              bounds.extend(actLatLng);
              const actIcon = createCustomIcon('#2563EB', '📍');
              const actPopup = `
                <div style="font-family: system-ui, sans-serif; padding: 10px; width: 200px;">
                  <span style="font-size: 10px; background: #DBEAFE; color: #1E40AF; padding: 2px 6px; border-radius: 4px; font-weight: 700;">
                    ${act.type.toUpperCase()}
                  </span>
                  <h4 style="margin: 4px 0 2px 0; font-size: 13px; font-weight: 700;">${act.name}</h4>
                  <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748B;">${act.nameKn}</p>
                  <p style="margin: 0 0 6px 0; font-size: 11px; color: #475569;">${act.description}</p>
                  <div style="font-size: 11px; font-weight: 600; color: #059669;">
                    ${act.isFree ? 'Free Entry' : `Est. ₹${act.estimatedCost}`} • ${act.durationHours} hrs
                  </div>
                </div>
              `;
              L.marker(actLatLng, { icon: actIcon }).bindPopup(actPopup).addTo(markersLayer);
            });
          }
        });
      }

      // Draw Route Polyline
      if (routeCoords.length > 1) {
        routeLayerRef.current = L.polyline(routeCoords, {
          color: '#B91C1C',
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8',
          lineCap: 'round'
        }).addTo(map);
      }
    } else {
      // General Karnataka exploration view
      KARNATAKA_DESTINATIONS.forEach((dest) => {
        const latLng: [number, number] = [dest.lat, dest.lng];
        bounds.extend(latLng);

        const isSelected = selectedDestinationId === dest.id;
        const color = isSelected ? '#DC2626' : '#D97706';
        const symbol = '📍';

        const popup = `
          <div style="font-family: system-ui, sans-serif; padding: 10px; width: 210px;">
            <h4 style="margin: 0 0 2px 0; font-size: 14px; font-weight: 700;">${dest.name}</h4>
            <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748B; font-weight: 600;">${dest.nameKn}</p>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #334155;">${dest.tagline}</p>
            <div style="font-size: 11px; color: #059669; font-weight: 600;">
              Approx: ₹${dest.approxBudgetPerDay}/day
            </div>
          </div>
        `;

        const marker = L.marker(latLng, { icon: createCustomIcon(color, symbol) })
          .bindPopup(popup)
          .addTo(markersLayer);

        if (isSelected) marker.openPopup();
      });
    }

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [itinerary, selectedDestinationId, activeFilter]);

  return (
    <div className="relative">
      {/* Map Filter Controls */}
      <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 flex items-center space-x-2 text-xs font-medium text-slate-700">
        <Layers className="w-3.5 h-3.5 text-amber-600" />
        <button
          onClick={() => setActiveFilter('itinerary')}
          className={`px-2 py-1 rounded-md transition ${activeFilter === 'itinerary' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-slate-100'}`}
        >
          {isKannada ? 'ಪ್ರವಾಸ ಮಾರ್ಗ' : 'Trip Route'}
        </button>
        <button
          onClick={() => setActiveFilter('attractions')}
          className={`px-2 py-1 rounded-md transition ${activeFilter === 'attractions' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-slate-100'}`}
        >
          {isKannada ? 'ಸ್ಥಳಗಳು & ತಾಣಗಳು' : 'Attractions'}
        </button>
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-2 py-1 rounded-md transition ${activeFilter === 'all' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-slate-100'}`}
        >
          {isKannada ? 'ಎಲ್ಲವೂ' : 'All Spots'}
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-200 text-xs text-slate-700 space-y-1 hidden sm:block">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span>{isKannada ? 'ಆರಂಭದ ಸ್ಥಳ' : 'Starting Point'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>{isKannada ? 'ಪ್ರವಾಸ ತಾಣಗಳು' : 'Route Destinations'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          <span>{isKannada ? 'ಅಂತಿಮ ಹಿಂತಿರುಗುವ ಸ್ಥಳ' : 'Return / Finish'}</span>
        </div>
      </div>

      <div ref={mapContainerRef} className={className} />
    </div>
  );
};
