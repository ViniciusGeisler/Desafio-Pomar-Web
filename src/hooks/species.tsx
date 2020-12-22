import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import { useToast } from './toast';
interface ITree {
  id: number;
  description: string;
}

interface ISpeciesContextData {
  species: ITree[];
  getSpecies(): Promise<void>;
  saveSpecies(data: ITree): Promise<void>;
}

export const SpeciesContext = createContext<ISpeciesContextData>(
  {} as ISpeciesContextData,
);

export const SpeciesProvider: React.FC = ({ children }) => {
  const [species, setSpecies] = useState<ITree[]>([]);
  const { addToast } = useToast();

  const getSpecies = useCallback(async () => {
    const response = await api.get('species');

    setSpecies(response.data);
  }, []);
  
  const saveSpecies = useCallback(async (data) => {
    console.log(data)
    const response = data.id ?
      await api.put(`species/${data.id}`, data) :
      await api.post('species', data);


    if (response.data) {
      getSpecies();
      addToast({
        type: 'success',
        title: 'Espécie salva com sucesso!',
      });
    } else {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro!',
        description: 'Não foi possível salvar a espécie, tente novamente!',
      });
    }
  }, [getSpecies, addToast]);


  return (
    <SpeciesContext.Provider value={{ getSpecies, species, saveSpecies }}>
      {children}
    </SpeciesContext.Provider>
  );
};

export function useSpecies(): ISpeciesContextData {
  const context = useContext(SpeciesContext);

  if (!context) {
    throw new Error('useSpecies must be use within an SpeciesProvider');
  }

  return context;
}