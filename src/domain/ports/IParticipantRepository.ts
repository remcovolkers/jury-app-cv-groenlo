import { Participant } from '../entities/Participant';

export interface IParticipantRepository {
    getAll(): Promise<Participant[]>;
    getByJuryCode(juryCode: string): Promise<Participant[]>;
    getById(id: string): Promise<Participant | undefined>;
}
