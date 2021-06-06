import { Token } from '../apis/token';
import { Collectible } from 'apis/collectibles';
import { useMemo } from 'react';

export const isCollectibleOwned = (id: string | number, collectibles: Collectible[]): boolean => {
  return collectibles.some((collectible: Collectible) => collectible.ownerId === id);
};

export const useIsCollectibleOwned = (id: string | number, collectibles: Collectible[]): boolean => {
  const isOwned = useMemo(() => {
    return collectibles.some((collectible: Collectible) => collectible.ownerId === id);
  }, [id, collectibles]);

  return isOwned;
};
