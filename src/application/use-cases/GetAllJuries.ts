// Use Case - Get All Juries
// Application layer that orchestrates business logic

import { Jury } from '../../domain/entities/Jury';
import { IJuryRepository } from '../../domain/ports/IJuryRepository';

export class GetAllJuries {
  constructor(private readonly juryRepository: IJuryRepository) {}

  async execute(): Promise<Jury[]> {
    return await this.juryRepository.getAll();
  }
}
