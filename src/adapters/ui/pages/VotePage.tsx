import React, { useState } from 'react';
import { ChevronLeft, Star, Users, Save } from 'lucide-react';
import { ParticipantWithVote } from '../../../application/use-cases/GetParticipants';
import { SubmitVote } from '../../../application/use-cases/SubmitVote';

interface VotePageProps {
    juryCode: string;
    participant: ParticipantWithVote;
    submitVote: SubmitVote;
    onBack: () => void;
    onVoteSaved: () => void;
}

export const VotePage: React.FC<VotePageProps> = ({
    juryCode,
    participant,
    submitVote,
    onBack,
    onVoteSaved
}) => {
    const [originality, setOriginality] = useState(participant.vote?.originality || 5);
    const [interaction, setInteraction] = useState(participant.vote?.interaction || 5);

    const handleSave = async () => {
        await submitVote.execute({
            participantId: participant.id,
            juryCode,
            originality: Number(originality),
            interaction: Number(interaction),
            total: Number(originality) + Number(interaction),
            timestamp: new Date().toISOString()
        });
        onVoteSaved();
    };

    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-2">
                <button onClick={onBack} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Beoordelen</h2>
            </div>

            <div className="flex flex-col h-full">
                <div className="flex-1 space-y-8 py-4">
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
                        <h3 className="font-bold text-xl text-blue-900 mb-1">{participant.name}</h3>
                    </div>

                    {/* Originaliteit Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="font-bold flex items-center gap-2 text-gray-700">
                                <Star className="text-yellow-500 fill-current" size={20} />
                                Originaliteit
                            </label>
                            <span className="text-3xl font-black text-blue-600 w-16 text-right">{originality}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={originality}
                            onChange={(e) => setOriginality(Number(e.target.value))}
                            className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium uppercase tracking-wider">
                            <span>Matig</span>
                            <span>Uitstekend</span>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Interactie Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="font-bold flex items-center gap-2 text-gray-700">
                                <Users className="text-purple-500 fill-current" size={20} />
                                Interactie
                            </label>
                            <span className="text-3xl font-black text-purple-600 w-16 text-right">{interaction}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={interaction}
                            onChange={(e) => setInteraction(Number(e.target.value))}
                            className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium uppercase tracking-wider">
                            <span>Saai</span>
                            <span>Fantastisch</span>
                        </div>
                    </div>

                </div>

                <div className="border-t pt-4 bg-white pb-4">
                    <div className="flex justify-between items-center text-gray-500 mb-4 px-2">
                        <span>Totaal Score:</span>
                        <span className="text-4xl font-black text-gray-800">
                            {Number(originality) + Number(interaction)}
                        </span>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-4 bg-gray-900 active:bg-black text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all"
                    >
                        <Save size={20} />
                        Beoordeling Opslaan
                    </button>
                </div>
            </div>
        </div>
    );
};
