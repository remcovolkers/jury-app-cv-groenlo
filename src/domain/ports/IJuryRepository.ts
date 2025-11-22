// Port - Interface for Jury Repository
// This defines the contract that infrastructure adapters must implement

import { Jury } from '../entities/Jury';

export interface IJuryRepository {
  getAll(): Promise<Jury[]>;
  getById(id: string): Promise<Jury | null>;
  save(jury: Jury): Promise<Jury>;
  delete(id: string): Promise<void>;
}
