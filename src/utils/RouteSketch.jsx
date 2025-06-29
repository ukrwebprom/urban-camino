import React, { useEffect, useRef, useState } from 'react';

function RouteSketch({ route, checkpoints = [], padding = 35, classname }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState(0); // ширина и высота (квадрат)

  // Отслеживаем размер контейнера
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const newSize = entry.contentRect.width;
      setSize(newSize);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!route || route.length === 0 || size === 0) return <div ref={containerRef} style={{ width: '100%' }} />;

  const allPoints = [...route, ...checkpoints];
  const lats = allPoints.map(p => p[1]);
  const lngs = allPoints.map(p => p[0]);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;
  const maxRange = Math.max(latRange, lngRange);

  const drawSize = size - 2 * padding;
  const scale = drawSize / maxRange;

  const offsetX = (size - scale * lngRange) / 2;
  const offsetY = (size - scale * latRange) / 2;

  const scalePoint = ([lng, lat]) => [
    offsetX + (lng - minLng) * scale,
    offsetY + (maxLat - lat) * scale // инверсия Y
  ];

  const scaledRoute = route.map(scalePoint);
  const scaledCheckpoints = checkpoints.map(scalePoint);
  const pathData = scaledRoute.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');

  return (
    <div ref={containerRef} style={{ width: '100%' }} className={classname}>
      <svg width={size} height={size}>
        <path
          d={pathData}
          stroke="#999"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {scaledCheckpoints.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="6"
            fill="white"
            stroke="#999"
            strokeWidth="4"
          />
        ))}
      </svg>
    </div>
  );
}

export default RouteSketch;
