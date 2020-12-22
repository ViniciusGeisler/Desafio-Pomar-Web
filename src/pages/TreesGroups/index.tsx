import React, { useCallback, useEffect, useRef, useState } from 'react';

import Input from '../../components/Input';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiEdit } from 'react-icons/fi';

import { useTreeGroups } from '../../hooks/treesGroups';
import Container from '../../components/Container';
import Table from '../../components/Table';
import { CustomButton } from './styles';

const TreesGroups: React.FC = () => {
  const { getTreeGroups, trees, saveTreeGroups } = useTreeGroups();

  const [treeId, setTreeId] = useState(0);
  const [formDescription, setFormDescription] = useState('');
  const [formName, setFormName] = useState('');


  const treesFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    const data = {
      id: treeId,
      description: formDescription,
      name: formName,
    }
    await saveTreeGroups(data)

    setFormDescription('');
    setFormName('');
    setTreeId(0);
  }, [treeId, formDescription, formName, saveTreeGroups])


  useEffect(() => {
    getTreeGroups();
  }, [getTreeGroups])

  const handleEditTree = useCallback((tree) => {
    setFormDescription(tree.description);
    setFormName(tree.name);
    setTreeId(tree.id);
  }, [])

  return (
    <Container>

      <Form ref={treesFormRef} onSubmit={handleSubmit} >
        <div>
          <Input
            name="treeName"
            placeholder="Nome"
            type="text"
            value={formName}
            onChange={event => setFormName(event.target.value)}
          />
        </div>
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
          <CustomButton type="submit">Salvar</CustomButton>
        </div>
      </Form>

      <Table>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Editar</th>
            </tr>
          </thead>

          <tbody>
            {trees.map((tree, index) => (
              <tr key={index + tree.description}>
                <td className="title">{tree.name}</td>
                <td className="title">{tree.description}</td>

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

export default TreesGroups;