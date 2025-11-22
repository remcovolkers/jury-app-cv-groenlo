import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden font-sans text-gray-900 flex flex-col">
            {/* Status Bar */}
            <div className="bg-gray-900 text-white p-2 text-[10px] font-bold text-center flex justify-between px-4 select-none">
                <span>JURY APP 2.0</span>
                <span className="text-green-400 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    OFFLINE READY
                </span>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto h-full">
                {children}
            </div>
        </div>
    );
};
