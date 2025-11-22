import React, { useEffect, useState } from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { GetParticipants, ParticipantWithVote } from '../../../application/use-cases/GetParticipants';

interface CategoryPageProps {
    juryCode: string;
    categoryId: string;
    getParticipants: GetParticipants;
    onBack: () => void;
    onSelectParticipant: (participant: ParticipantWithVote) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
    juryCode,
    categoryId,
    getParticipants,
    onBack,
    onSelectParticipant
}) => {
    const [participants, setParticipants] = useState<ParticipantWithVote[]>([]);

    useEffect(() => {
        getParticipants.execute(juryCode, categoryId).then(setParticipants);
    }, [juryCode, categoryId, getParticipants]);

    return (
        <div className="p-4 pb-20">
            <div className="flex items-center gap-4 mb-6 sticky top-0 bg-white z-10 py-2 border-b border-dashed">
                <button onClick={onBack} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <h2 className="text-xl font-bold">Deelnemers</h2>
                    <p className="text-xs text-gray-500">{participants.length} deelnemers toegewezen</p>
                </div>
            </div>

            <div className="space-y-3">
                {participants.map(participant => {
                    const hasVoted = !!participant.vote;
                    return (
                        <button
                            key={participant.id}
                            onClick={() => onSelectParticipant(participant)}
                            className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden shadow-sm
                ${hasVoted
                                    ? 'bg-green-50 border-green-200 opacity-75'
                                    : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="pr-8">
                                    <h3 className="font-bold text-gray-800">{participant.name}</h3>
                                </div>
                                {hasVoted ? (
                                    <div className="flex flex-col items-end">
                                        <CheckCircle className="text-green-500 mb-1" size={24} />
                                        <span className="text-xs font-bold text-green-700">{participant.vote?.total} pnt</span>
                                    </div>
                                ) : (
                                    <div className="h-6 w-6 rounded-full border-2 border-gray-200" />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
