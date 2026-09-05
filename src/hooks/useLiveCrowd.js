import { useState, useEffect } from 'react';
import { fetchLiveCrowd, getClientISTEstimate } from '../services/liveCrowdClient';

/**
 * Custom React hook for live crowd telemetry.
 * 
 * @param {string} placeName - Monument or place name e.g. "Triveni Sangam"
 * @param {string} city - Active city e.g. "prayagraj" or "delhi"
 * @param {object} defaultData - Optional pre-rendered telemetry defaults
 */
export function useLiveCrowd(placeName, city = 'delhi', defaultData = null) {
  const [telemetry, setTelemetry] = useState(() => {
    if (defaultData) return defaultData;
    return getClientISTEstimate(placeName, city);
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!placeName) return;
      setLoading(true);
      const data = await fetchLiveCrowd(placeName, city);
      if (isMounted) {
        setTelemetry(data);
        setLoading(false);
      }
    }

    loadData();

    // Auto-refresh telemetry every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [placeName, city]);

  return {
    ...telemetry,
    loading,
  };
}

export default useLiveCrowd;
