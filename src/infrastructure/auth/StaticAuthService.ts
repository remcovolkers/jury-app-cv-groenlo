import { IAuthService } from '../../domain/ports/IAuthService';

const INITIAL_DATA = {
    kindergroepen: [
        { id: 'kg1' }, { id: 'kg2' }, { id: 'kg3' },
    ],
    kleineLoopgroepen: [
        { id: 'kl1' }, { id: 'kl2' }, { id: 'kl3' },
    ],
    groteGroepen: [
        { id: 'gg1' }, { id: 'gg2' }, { id: 'gg3' },
    ],
    kleineWagens: [
        { id: 'kw1' }, { id: 'kw2' }, { id: 'kw3' },
    ],
    groteWagens: [
        { id: 'gw1' }, { id: 'gw2' }, { id: 'gw3' },
    ],
};

const getAllIds = () => {
    let ids: string[] = [];
    Object.values(INITIAL_DATA).forEach(catList => {
        catList.forEach(item => ids.push(item.id));
    });
    return ids;
};

const JURY_ASSIGNMENTS: Record<string, string[]> = {
    'JURY1': ['kg1', 'kg2', 'kl1', 'kl2', 'gg1', 'gg2', 'kw1', 'kw2'],
    'JURY2': ['kg3', 'kl3', 'gg3', 'kw3', 'gw1', 'gw2', 'gw3'],
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
