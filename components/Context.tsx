import React, {ReactNode} from 'react';
import {useStorage} from '../hooks/useStorage';

type UserContextT = {
  favoritesIds: number[];
  setFavoritesIds: (ids: number[]) => void;
};

export const UserContext = React.createContext<UserContextT>({
  favoritesIds: [],
  setFavoritesIds: () => {},
});

type Props = {
  children: ReactNode;
};

export const UserContextProvider: React.FC<Props> = ({children}) => {
  const [favoritesIds, setFavoritesIds] = useStorage([], 'Favorite');

  const contextValues = {
    favoritesIds,
    setFavoritesIds,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
