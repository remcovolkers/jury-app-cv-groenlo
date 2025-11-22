import { Participant } from '../../domain/entities/Participant';
import { IParticipantRepository } from '../../domain/ports/IParticipantRepository';
import { IAuthService } from '../../domain/ports/IAuthService';

const INITIAL_DATA = {
    kindergroepen: [
        { id: 'kg1', name: 'De Vonkies' },
        { id: 'kg2', name: 'De Noamatters Jeugd' },
        { id: 'kg3', name: 'Jeugd van tegenwoordig' },
    ],
    kleineLoopgroepen: [
        { id: 'kl1', name: 'Club Sherry' },
        { id: 'kl2', name: 'Duo Penotti' },
        { id: 'kl3', name: 'Torenblaozers' },
    ],
    groteGroepen: [
        { id: 'gg1', name: 'De bittere ballen Grolle' },
        { id: 'gg2', name: 'Per consumptie wijzer' },
        { id: 'gg3', name: 'De Popies' },
    ],
    kleineWagens: [
        { id: 'kw1', name: 'De Gemiste Kans' },
        { id: 'kw2', name: 'AttaMottaMotta' },
        { id: 'kw3', name: 'KMZ' },
    ],
    groteWagens: [
        { id: 'gw1', name: 'Kroam\'13' },
        { id: 'gw2', name: 'Hertenkamp' },
        { id: 'gw3', name: 'Elsje' },
    ],
};

export class StaticParticipantRepository implements IParticipantRepository {
    private authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async getAll(): Promise<Participant[]> {
        const all: Participant[] = [];
        (Object.keys(INITIAL_DATA) as Array<keyof typeof INITIAL_DATA>).forEach(category => {
            INITIAL_DATA[category].forEach(item => {
                all.push({ ...item, category });
            });
        });
        return all;
    }

    async getByJuryCode(juryCode: string): Promise<Participant[]> {
        const allowedIds = await this.authService.getAssignedParticipantIds(juryCode);
        const all = await this.getAll();
        return all.filter(p => allowedIds.includes(p.id));
    }

    async getById(id: string): Promise<Participant | undefined> {
        const all = await this.getAll();
        return all.find(p => p.id === id);
    }
}
