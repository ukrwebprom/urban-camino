import React, { useEffect, useRef } from 'react';

const CertificateGenerator = ({ userName, routeName, coordinates, backgroundImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // Load background image
    const bgImg = new Image();
    bgImg.src = backgroundImage;
    bgImg.onload = () => {
      // Draw background
      ctx.drawImage(bgImg, 0, 0, width, height);

      // Draw route path (scaled to fit canvas)
      if (coordinates && coordinates.length > 1) {
        const margin = 90;
      const boxSize = 900;
        console.log(coordinates);
      const lats = coordinates.map(p => p[1]);
      const lngs = coordinates.map(p => p[0]);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      const latRange = maxLat - minLat;
      const lngRange = maxLng - minLng;
      const scale = boxSize / Math.max(latRange, lngRange);

      const offsetX = (1080 - boxSize) / 2;
      const offsetY = 600;

      const points = coordinates.map(([lng, lat]) => {
        const x = offsetX + (lng - minLng) * scale;
        const y = offsetY + (maxLat - lat) * scale;
        return [x, y];
      });

      // Рисуем маршрут
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 13;
      ctx.beginPath();
      points.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Старт (зелёный)
ctx.beginPath();
ctx.arc(points[0][0], points[0][1], 16, 0, 2 * Math.PI);
ctx.fillStyle = 'black';
ctx.fill();
ctx.stroke();

// Финиш (красный)
ctx.beginPath();
ctx.arc(points.at(-1)[0], points.at(-1)[1], 16, 0, 2 * Math.PI);
ctx.fillStyle = 'black';
ctx.fill();
ctx.stroke();
      }

      // Add text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px Montserrat';
      ctx.textAlign = 'center';
      ctx.fillText('Urban Camino', width / 2, 150);

      ctx.font = '48px Montserrat';
      ctx.fillText(`Маршрут: ${routeName}`, width / 2, height - 250);
      ctx.fillText(`Имя путника: ${userName}`, width / 2, height - 180);
    };
  }, [userName, routeName, coordinates, backgroundImage]);

  const download = () => {
    const link = document.createElement('a');
    link.download = 'certificate.jpg';
    link.href = canvasRef.current.toDataURL('image/jpeg');
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', margin: '0 auto' }} />
      <button onClick={download}>Скачать сертификат</button>
    </div>
  );
};

export default CertificateGenerator;