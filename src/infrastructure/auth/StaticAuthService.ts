import { IAuthService } from '../../domain/ports/IAuthService';

const INITIAL_DATA = {
    groteWagens: [
        { id: 'g1' }, { id: 'g2' }, { id: 'g3' }, { id: 'g4' }, { id: 'g5' }, { id: 'g6' },
    ],
    kleineWagens: [
        { id: 'k1' }, { id: 'k2' }, { id: 'k3' }, { id: 'k4' }, { id: 'k5' },
    ],
    loopgroepen: [
        { id: 'l1' }, { id: 'l2' }, { id: 'l3' }, { id: 'l4' }, { id: 'l5' }, { id: 'l6' },
    ]
};

const getAllIds = () => {
    let ids: string[] = [];
    Object.values(INITIAL_DATA).forEach(catList => {
        catList.forEach(item => ids.push(item.id));
    });
    return ids;
};

const JURY_ASSIGNMENTS: Record<string, string[]> = {
    'JURY1': ['g1', 'g2', 'g3', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6'],
    'JURY2': ['g4', 'g5', 'g6', 'k1', 'k2', 'k3', 'k4', 'k5'],
    'JURY3': ['k1', 'l3'],
    'ADMIN': getAllIds()
};

export class StaticAuthService implements IAuthService {
    async login(code: string): Promise<boolean> {
        return !!JURY_ASSIGNMENTS[code];
    }

    async getAssignedParticipantIds(code: string): Promise<string[]> {
        return JURY_ASSIGNMENTS[code] || [];
    }
}
