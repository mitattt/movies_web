import React, {ReactNode, useState} from 'react';

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
  const [favoritesIds, setFavoritesIds] = useState([]);

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
