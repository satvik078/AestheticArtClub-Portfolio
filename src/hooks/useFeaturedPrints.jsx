import { useMemo } from 'react';

export const useFeaturedPrints = (artworks) => {
  return useMemo(() => artworks.filter(a => a.isPrintAvailable).slice(0, 2), [artworks]);
};
