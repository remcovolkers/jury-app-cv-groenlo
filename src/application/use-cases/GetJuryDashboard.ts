import { IParticipantRepository } from '../../domain/ports/IParticipantRepository';
import { IVoteRepository } from '../../domain/ports/IVoteRepository';
import { Category } from '../../domain/entities/Category';
import { Truck, Car, Users } from 'lucide-react';

export interface DashboardCategory extends Category {
    totalParticipants: number;
    votedParticipants: number;
    progress: number;
}

const CATEGORIES_CONFIG: Category[] = [
    { id: 'groteWagens', label: 'Grote Wagens', icon: Truck, color: 'bg-blue-500' },
    { id: 'kleineWagens', label: 'Kleine Wagens', icon: Car, color: 'bg-green-500' },
    { id: 'loopgroepen', label: 'Loopgroepen', icon: Users, color: 'bg-purple-500' },
];

export class GetJuryDashboard {
    constructor(
        private participantRepo: IParticipantRepository,
        private voteRepo: IVoteRepository
    ) { }

    async execute(juryCode: string): Promise<DashboardCategory[]> {
        const myParticipants = await this.participantRepo.getByJuryCode(juryCode);
        const myVotes = await this.voteRepo.getByJuryCode(juryCode);

        const dashboardData = CATEGORIES_CONFIG.map(cat => {
            const participantsInCat = myParticipants.filter(p => p.category === cat.id);

            if (participantsInCat.length === 0) return null;

            const votedCount = participantsInCat.filter(p =>
                myVotes.some(v => v.participantId === p.id)
            ).length;

            return {
                ...cat,
                totalParticipants: participantsInCat.length,
                votedParticipants: votedCount,
                progress: (votedCount / participantsInCat.length) * 100
            };
        }).filter(Boolean) as DashboardCategory[];

        return dashboardData;
    }
}
