// Domain Entity - Jury
// This represents the core business entity

export interface Jury {
  id: string;
  name: string;
  category: string;
  createdAt: Date;
}

export class JuryEntity implements Jury {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: string,
    public readonly createdAt: Date
  ) {}

  static create(name: string, category: string): JuryEntity {
    return new JuryEntity(
      crypto.randomUUID(),
      name,
      category,
      new Date()
    );
  }
}
