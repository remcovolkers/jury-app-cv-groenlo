// Infrastructure - In-Memory Jury Repository Implementation
// This is an adapter that implements the domain port

import { Jury } from '../../domain/entities/Jury';
import { IJuryRepository } from '../../domain/ports/IJuryRepository';

export class InMemoryJuryRepository implements IJuryRepository {
  private juries: Map<string, Jury> = new Map();

  async getAll(): Promise<Jury[]> {
    return Array.from(this.juries.values());
  }

  async getById(id: string): Promise<Jury | null> {
    return this.juries.get(id) || null;
  }

  async save(jury: Jury): Promise<Jury> {
    this.juries.set(jury.id, jury);
    return jury;
  }

  async delete(id: string): Promise<void> {
    this.juries.delete(id);
  }
}
