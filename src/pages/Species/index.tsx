import React, { useCallback, useEffect, useRef, useState } from 'react';

import Input from '../../components/Input';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiEdit } from 'react-icons/fi';

import { useSpecies } from '../../hooks/species';
import Container from '../../components/Container';
import Table from '../../components/Table';
import { CustomButton } from './styles';

const Species: React.FC = () => {
  const { getSpecies, species, saveSpecies } = useSpecies();

  const [specieId, setSpecieId] = useState(0);
  const [formDescription, setFormDescription] = useState('');


  const speciesFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    const data = {
      id: specieId,
      description: formDescription,
    }
    await saveSpecies(data)
    setFormDescription('');
  }, [specieId, formDescription, saveSpecies])


  useEffect(() => {
    getSpecies();
  }, [getSpecies])

  const handleEditTree = useCallback((specie) => {
    setFormDescription(specie.description);

    setSpecieId(specie.id);
  }, [])

  return (
    <Container>

      <Form ref={speciesFormRef} onSubmit={handleSubmit} >

        <div>
          <Input
            name="specieDescription"
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
              <th>Espécie</th>
              <th>Editar</th>
            </tr>
          </thead>

          <tbody>
            {species.map((specie, index) => (
              <tr key={index + specie.description}>
                <td className="title">{specie.description}</td>
                <td>
                  <button onClick={() => handleEditTree(specie)}>
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

export default Species;