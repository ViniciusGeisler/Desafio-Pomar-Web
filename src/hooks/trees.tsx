import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import { useToast } from './toast';
interface ITree {
  id: number;
  description: string;
  age: number;
  specie?: { description: string };
}


interface ITreesContextData {
  trees: ITree[];
  getTrees(): Promise<void>;
  saveTrees(data: ITree): Promise<void>;
}

export const TreesContext = createContext<ITreesContextData>(
  {} as ITreesContextData,
);

export const TreesProvider: React.FC = ({ children }) => {
  const [trees, setTrees] = useState<ITree[]>([]);
  const { addToast } = useToast();
  const getTrees = useCallback(async () => {
    const response = await api.get('trees');

    setTrees(response.data);
  }, []);
  const saveTrees = useCallback(async ({ id, description, age, specie }) => {
    const response = id ?
      await api.put(`trees/${id}`, {
        description,
        age,
        specie: specie.description
      }) :
      await api.post('trees', {
        description,
        age,
        specie: specie.description
      });


    if (response.data) {
      getTrees();
      addToast({
        type: 'success',
        title: 'Árvore salva com sucesso!',
      });
    } else {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro!',
        description: 'Não foi possível salvar a árvore, tente novamente!',
      });
    }
  }, [getTrees, addToast]);


  return (
    <TreesContext.Provider value={{ getTrees, trees, saveTrees }}>
      {children}
    </TreesContext.Provider>
  );
};

export function useTrees(): ITreesContextData {
  const context = useContext(TreesContext);

  if (!context) {
    throw new Error('useTrees must be use within an TreesProvider');
  }

  return context;
}