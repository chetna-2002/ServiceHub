'use client';

import { useEffect, useState } from 'react';

export default function MePage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/me', {
          credentials: 'include', // send cookie to backend
        });
        if (!res.ok) {
          const e = await res.json().catch(() => ({}));
          throw new Error(e?.error || 'Unauthorized');
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) return <div>❌ {error}</div>;
  if (!data) return <div>Loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
