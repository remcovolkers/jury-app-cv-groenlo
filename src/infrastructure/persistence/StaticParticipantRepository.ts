import { Participant } from '../../domain/entities/Participant';
import { IParticipantRepository } from '../../domain/ports/IParticipantRepository';
import { IAuthService } from '../../domain/ports/IAuthService';

const INITIAL_DATA = {
    groteWagens: [
        { id: 'g1', name: 'De Vrolijke Bouwers', title: 'Reis om de wereld' },
        { id: 'g2', name: 'CV De Doordouwers', title: 'Vikings op pad' },
        { id: 'g3', name: 'Buurtschap Centrum', title: 'Alice in Wonderland' },
        { id: 'g4', name: 'De Laatkomers', title: 'Tijdreizigers' },
        { id: 'g5', name: 'CV Net Op Tijd', title: 'Steampunk Circus' },
        { id: 'g6', name: 'De Bouwloods', title: 'Atlantis Herrezen' },
    ],
    kleineWagens: [
        { id: 'k1', name: 'De Mini\'s', title: 'Mario Kart' },
        { id: 'k2', name: 'Duo Penotti', title: 'Twee kleuren in de wind' },
        { id: 'k3', name: 'De Solist', title: 'Ik loop alleen' },
        { id: 'k4', name: 'CV De Kleintjes', title: 'Boer zoekt Vrouw' },
        { id: 'k5', name: 'Duo Zonder Naam', title: 'Peppi en Kokki' },
    ],
    loopgroepen: [
        { id: 'l1', name: 'De Dansmarietjes', title: 'Swingend het jaar door' },
        { id: 'l2', name: 'Vriendengroep X', title: 'Levende Standbeelden' },
        { id: 'l3', name: 'School De Klimop', title: 'De tovenaarsleerlingen' },
        { id: 'l4', name: 'De Buren', title: 'De Zoete Inval' },
        { id: 'l5', name: 'Fanfare De Blaasbalg', title: 'Muziek uit de ruimte' },
        { id: 'l6', name: 'CV De Stoppers', title: 'Verkeersregelaars' },
    ]
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
