// UI Component - Jury List
// This is an adapter that uses application use cases

import React, { useState, useEffect } from 'react';
import { Jury } from '../../../domain/entities/Jury';
import { GetAllJuries } from '../../../application/use-cases/GetAllJuries';
import { CreateJury } from '../../../application/use-cases/CreateJury';
import { InMemoryJuryRepository } from '../../../infrastructure/persistence/InMemoryJuryRepository';
import './JuryList.css';

// Dependency injection - in a real app, this would come from a DI container
const juryRepository = new InMemoryJuryRepository();
const getAllJuries = new GetAllJuries(juryRepository);
const createJury = new CreateJury(juryRepository);

export const JuryList: React.FC = () => {
  const [juries, setJuries] = useState<Jury[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const loadJuries = async () => {
    const allJuries = await getAllJuries.execute();
    setJuries(allJuries);
  };

  const handleCreateJury = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && category) {
      await createJury.execute(name, category);
      setName('');
      setCategory('');
      await loadJuries();
    }
  };

  useEffect(() => {
    loadJuries();
  }, []);

  return (
    <div className="jury-list">
      <h2>Jury Management</h2>
      
      <form onSubmit={handleCreateJury} className="jury-form">
        <input
          type="text"
          placeholder="Jury Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">Add Jury</button>
      </form>

      <div className="jury-items">
        {juries.length === 0 ? (
          <p>No juries yet. Add one above!</p>
        ) : (
          <ul>
            {juries.map((jury) => (
              <li key={jury.id}>
                <strong>{jury.name}</strong> - {jury.category}
                <br />
                <small>Created: {new Date(jury.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
