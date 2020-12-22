import React, { useCallback, useEffect, useRef, useState } from 'react';

import Input from '../../components/Input';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiEdit } from 'react-icons/fi';

import { useTrees } from '../../hooks/trees';
import Container from '../../components/Container';
import Table from '../../components/Table';
import { CustomButton } from './styles';

const Trees: React.FC = () => {
  const { getTrees, trees, saveTrees } = useTrees();

  const [treeId, setTreeId] = useState(0);
  const [formDescription, setFormDescription] = useState('');
  const [formSpecie, setFormSpecie] = useState('');
  const [formAge, setFormAge] = useState(0);

  const treesFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    const data = {
      id: treeId,
      description: formDescription,
      age: formAge,
      specie: { description: formSpecie }
    }
    await saveTrees(data)

    setFormDescription('');
    setFormSpecie('');
    setFormAge(0);
    setTreeId(0);
  }, [treeId, formDescription, formAge, formSpecie, saveTrees])


  useEffect(() => {
    getTrees();
  }, [getTrees])

  const handleEditTree = useCallback((tree) => {
    setFormDescription(tree.description);
    setFormSpecie(tree.specie ? tree.specie.description : '');
    setFormAge(tree.age);
    setTreeId(tree.id);
  }, [])

  return (
    <Container>

      <Form ref={treesFormRef} onSubmit={handleSubmit} >

        <div>
          <Input
            name="treeDescription"
            placeholder="Descrição"
            type="text"
            value={formDescription}
            onChange={event => setFormDescription(event.target.value)}
          />
        </div>
        <div>
          <Input
            name="treeSpecie"
            placeholder="Espécie"
            type="text"
            value={formSpecie}
            onChange={event => setFormSpecie(event.target.value)}
          />
        </div>

        <div>
          <Input
            name="treeAge"
            placeholder="Idade"
            type="number"
            value={formAge}
            onChange={event => setFormAge(Number(event.target.value))}
          />
        </div>

        <div>
          <CustomButton type="submit">Salvar</CustomButton>
        </div>
      </Form>

      <Table>
        <table>
          <thead>
            <tr>
              <th>Árvore</th>
              <th>Espécie</th>
              <th>Idade</th>
              <th>Editar</th>
            </tr>
          </thead>

          <tbody>
            {trees.map((tree, index) => (
              <tr key={index + tree.description}>
                <td className="title">{tree.description}</td>
                <td >
                  {tree.specie ?
                    tree.specie.description
                    :
                    'Sem espécie definida'
                  }
                </td>
                <td>{tree.age} anos</td>
                <td>
                  <button onClick={() => handleEditTree(tree)}>
                    <FiEdit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </Table>
    </Container>
  );
}

export default Trees;