import { useState } from 'react';

function usePoints({ pointsPerCheckpoint = 10, pointsForFinish = 50 } = {}) {
  const [points, setPoints] = useState(0);

  const addCheckpoint = () => setPoints(prev => prev + pointsPerCheckpoint);
  const finishRoute = () => setPoints(prev => prev + pointsForFinish);
  const resetPoints = () => setPoints(0);

  return { points, addCheckpoint, finishRoute, resetPoints };
}

export default usePoints;