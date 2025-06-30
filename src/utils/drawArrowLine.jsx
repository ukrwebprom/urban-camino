import { Polyline, useMap } from 'react-leaflet';
import 'leaflet-polylinedecorator';
import L from 'leaflet';
import { useEffect } from 'react';

function DrawArrowLine({ from, to }) {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const latlngs = [from, to];

    // Пунктирная линия
    const line = L.polyline(latlngs, {
      color: 'yellow',
      weight: 4,
      dashArray: '6, 8',
    }).addTo(map);

    // Стрелка на конце
    const arrow = L.polylineDecorator(line, {
      patterns: [
        {
          offset: '100%',
          repeat: 0,
          symbol: L.Symbol.arrowHead({ pixelSize: 12, polygon: false, pathOptions: { color: 'yellow', weight: 4 } }),
        },
      ],
    }).addTo(map);

    return () => {
      map.removeLayer(line);
      map.removeLayer(arrow);
    };
  }, [from, to, map]);

  return null;
}

export default DrawArrowLine;