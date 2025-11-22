// Use Case - Create Jury
// Application layer that orchestrates business logic

import { Jury, JuryEntity } from '../../domain/entities/Jury';
import { IJuryRepository } from '../../domain/ports/IJuryRepository';

export class CreateJury {
  constructor(private readonly juryRepository: IJuryRepository) {}

  async execute(name: string, category: string): Promise<Jury> {
    const jury = JuryEntity.create(name, category);
    return await this.juryRepository.save(jury);
  }
}
