import React, { useEffect, useState } from 'react';
import { LogOut, ChevronLeft, Share2 } from 'lucide-react';
import { GetJuryDashboard, DashboardCategory } from '../../../application/use-cases/GetJuryDashboard';

interface DashboardPageProps {
    juryCode: string;
    getDashboard: GetJuryDashboard;
    onLogout: () => void;
    onSelectCategory: (catId: string) => void;
    onExport: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
    juryCode,
    getDashboard,
    onLogout,
    onSelectCategory,
    onExport
}) => {
    const [categories, setCategories] = useState<DashboardCategory[]>([]);

    useEffect(() => {
        getDashboard.execute(juryCode).then(setCategories);
    }, [juryCode, getDashboard]);

    return (
        <div className="space-y-4 p-4">
            <div className="flex justify-between items-center mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Hallo, {juryCode}</h1>
                    <p className="text-gray-500 text-xs">Kies een categorie om te starten</p>
                </div>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-500 p-2">
                    <LogOut size={20} />
                </button>
            </div>

            <div className="grid gap-4">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelectCategory(cat.id)}
                            className="w-full bg-white p-0 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-all overflow-hidden group"
                        >
                            <div className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${cat.color} text-white group-hover:scale-110 transition-transform`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-lg text-gray-800">{cat.label}</h3>
                                        <p className="text-sm text-gray-500">{cat.votedParticipants} van {cat.totalParticipants} beoordeeld</p>
                                    </div>
                                </div>
                                <ChevronLeft className="rotate-180 text-gray-300" />
                            </div>
                            {/* Progress Bar */}
                            <div className="h-1 w-full bg-gray-100">
                                <div
                                    className={`h-full transition-all duration-500 ${cat.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                    style={{ width: `${cat.progress}%` }}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="mt-8">
                <button
                    onClick={onExport}
                    className="w-full py-4 bg-gray-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                >
                    <Share2 size={20} />
                    Mijn Resultaten Delen
                </button>
            </div>
        </div>
    );
};
