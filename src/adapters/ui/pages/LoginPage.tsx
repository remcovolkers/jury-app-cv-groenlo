import React, { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';
import { LoginJury } from '../../../application/use-cases/LoginJury';

interface LoginPageProps {
    loginJury: LoginJury;
    onLoginSuccess: (code: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ loginJury, onLoginSuccess }) => {
    const [inputCode, setInputCode] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = inputCode.toUpperCase().trim();
        const success = await loginJury.execute(code);

        if (success) {
            onLoginSuccess(code);
        } else {
            setError('Code niet gevonden.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                    <Lock className="text-blue-600" size={32} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Jury App</h1>
                <p className="text-gray-500 mb-6 text-sm">Voer uw jurycode in.</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="CODE"
                        className="w-full p-4 border border-gray-300 rounded-xl text-center text-lg font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 flex items-center justify-center gap-2">
                        <LogIn size={20} /> Inloggen
                    </button>
                </form>
                <div className="mt-8 text-xs text-gray-400 border-t pt-4">
                    <p className="font-semibold mb-1">Demo Codes:</p>
                    <div className="grid grid-cols-2 gap-2">
                        <span className="bg-gray-100 p-1 rounded">JURY1</span>
                        <span className="bg-gray-100 p-1 rounded">JURY2</span>
                        <span className="bg-gray-100 p-1 rounded">JURY3</span>
                        <span className="bg-gray-100 p-1 rounded">ADMIN</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
