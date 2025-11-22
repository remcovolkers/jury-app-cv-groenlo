import React, { useEffect, useState } from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { ExportVotes } from '../../../application/use-cases/ExportVotes';

interface ExportPageProps {
    juryCode: string;
    exportVotes: ExportVotes;
    onBack: () => void;
    onReset: () => void;
}

export const ExportPage: React.FC<ExportPageProps> = ({
    juryCode,
    exportVotes,
    onBack,
    onReset
}) => {
    const [dataStr, setDataStr] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        exportVotes.execute(juryCode).then(votes => {
            setDataStr(JSON.stringify(votes, null, 2));
            setCount(votes.length);
        });
    }, [juryCode, exportVotes]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(dataStr);
        alert("Data gekopieerd!");
    };

    const handleClear = async () => {
        if (window.confirm('LET OP: Dit wist alle scores. Zeker weten?')) {
            await exportVotes.clear();
            onReset();
        }
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Resultaten</h2>
            </div>

            <div className="bg-gray-900 text-white p-8 rounded-2xl text-center shadow-xl">
                <p className="text-gray-400 mb-2 uppercase tracking-widest text-xs">Jouw Inzendingen</p>
                <p className="text-6xl font-black text-white">{count}</p>
                <div className="mt-4 inline-block px-3 py-1 bg-gray-800 rounded text-sm text-gray-300 font-mono">
                    {juryCode}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Jouw Data (JSON):</label>
                <textarea
                    readOnly
                    className="w-full h-40 p-4 text-xs font-mono bg-gray-100 text-gray-600 rounded-xl border-none focus:ring-0 resize-none"
                    value={dataStr}
                />
            </div>

            <button
                onClick={copyToClipboard}
                className="w-full py-4 bg-green-600 text-white rounded-xl font-bold shadow-md active:scale-95 transition-all"
            >
                Kopieer naar Klembord
            </button>

            <button
                onClick={handleClear}
                className="w-full py-4 text-red-500 hover:bg-red-50 rounded-xl font-semibold mt-4 flex items-center justify-center gap-2 transition-colors"
            >
                <Trash2 size={18} />
                Reset Apparaat
            </button>
        </div>
    );
};
