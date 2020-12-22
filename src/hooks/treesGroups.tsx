import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import { useToast } from './toast';
interface ITreeGroup {
  id: number;
  description: string;
  name: string;

}


interface ITreeGroupsContextData {
  trees: ITreeGroup[];
  getTreeGroups(): Promise<void>;
  saveTreeGroups(data: ITreeGroup): Promise<void>;
}

export const TreeGroupsContext = createContext<ITreeGroupsContextData>(
  {} as ITreeGroupsContextData,
);

export const TreeGroupsProvider: React.FC = ({ children }) => {
  const [trees, setTreeGroups] = useState<ITreeGroup[]>([]);
  const { addToast } = useToast();
  const getTreeGroups = useCallback(async () => {
    const response = await api.get('trees-groups');

    setTreeGroups(response.data);
  }, []);
  const saveTreeGroups = useCallback(async ({ id, description, name, }) => {
    const response = id ?
      await api.put(`trees-groups/${id}`, {
        description,
        name,
      }) :
      await api.post('trees-groups', {
        description,
        name,
      });


    if (response.data) {
      getTreeGroups();
      addToast({
        type: 'success',
        title: 'Grupo de árvores salvo com sucesso!',
      });
    } else {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro!',
        description: 'Não foi possível salvar o grupo, tente novamente!',
      });
    }
  }, [getTreeGroups, addToast]);


  return (
    <TreeGroupsContext.Provider value={{ getTreeGroups, trees, saveTreeGroups }}>
      {children}
    </TreeGroupsContext.Provider>
  );
};

export function useTreeGroups(): ITreeGroupsContextData {
  const context = useContext(TreeGroupsContext);

  if (!context) {
    throw new Error('useTreeGroups must be use within an TreeGroupsProvider');
  }

  return context;
}