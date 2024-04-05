import React, {ReactNode, useState} from 'react';

type UserContextT = {
  favoritesIds: number[];
  setFavoritesIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const UserContext = React.createContext<UserContextT>({
  favoritesIds: [],
  setFavoritesIds: () => {},
});

type Props = {
  children: ReactNode;
};

export const UserContextProvider: React.FC<Props> = ({children}) => {
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]);

  const contextValues: UserContextT = {
    favoritesIds,
    setFavoritesIds,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
