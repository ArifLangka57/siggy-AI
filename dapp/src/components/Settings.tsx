import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, ArrowRight, UserCircle, MessageCircle, Layers, Moon, Zap, Cat, Brain, Smile } from 'lucide-react';

interface SettingsProps {
    onBack: () => void;
    personality: string;
    responseLength: string;
    theme: string;
    onUpdatePersonality: (p: string) => void;
    onUpdateLength: (l: string) => void;
    onUpdateTheme: (t: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
    onBack,
    personality,
    responseLength,
    theme,
    onUpdatePersonality,
    onUpdateLength,
    onUpdateTheme
}) => {
    const personalities = [
        { name: 'Normal Personality', desc: 'Friendly, helpful, and standard assistant tone.', icon: <Smile className="w-4 h-4" /> },
        { name: 'Cosmic Philosopher', desc: 'Mystical, deep, and slightly detached from reality.', icon: <Brain className="w-4 h-4" /> },
        { name: 'Playful Cat', desc: 'Witty, easily distracted, and obsessed with tuna.', icon: <Cat className="w-4 h-4" /> },
        { name: 'Chaotic Trickster', desc: 'Unpredictable, sarcastic, and loves cosmic mischief.', icon: <Zap className="w-4 h-4" /> }
    ];

    const lengths = ['Short', 'Medium', 'Long'];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center cosmic-bg p-4 md:p-16">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl glass-panel p-6 md:p-12 space-y-12 md:space-y-16"
            >
                <header className="flex items-center justify-between border-b border-white/5 pb-8">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-purple-600/20 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            <SettingsIcon className="w-8 h-8 text-purple-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-space font-black tracking-tighter uppercase glow-text tracking-widest">Settings</h1>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <UserCircle className="w-5 h-5 text-gray-400" />
                            <h3 className="font-space font-bold uppercase tracking-widest text-sm text-gray-500">Siggy Personality</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {personalities.map((p) => (
                                <button
                                    key={p.name}
                                    onClick={() => onUpdatePersonality(p.name)}
                                    className={`w-full p-6 text-left rounded-2xl border transition-all ${personality === p.name
                                            ? 'bg-purple-600/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] text-white'
                                            : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-400'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {p.icon}
                                            <span className="font-medium">{p.name}</span>
                                        </div>
                                        {personality === p.name && <ArrowRight className="w-4 h-4 text-purple-400" />}
                                    </div>
                                    <p className="text-[10px] mt-2 opacity-50 font-space tracking-tight">{p.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <MessageCircle className="w-5 h-5 text-gray-400" />
                                <h3 className="font-space font-bold uppercase tracking-widest text-sm text-gray-500">Response Scale</h3>
                            </div>
                            <div className="flex bg-white/5 p-2 rounded-2xl border border-white/5">
                                {lengths.map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => onUpdateLength(l)}
                                        className={`flex-1 py-4 text-center rounded-xl transition-all text-sm font-medium ${responseLength === l
                                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                                                : 'text-gray-500 hover:text-white'
                                            }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Layers className="w-5 h-5 text-gray-400" />
                                <h3 className="font-space font-bold uppercase tracking-widest text-sm text-gray-500">Visual Engine</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => onUpdateTheme('Cosmic')}
                                    className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${theme === 'Cosmic' ? 'bg-blue-600/10 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'
                                        }`}
                                >
                                    <Layers className={`w-6 h-6 ${theme === 'Cosmic' ? 'text-blue-400' : 'text-gray-500'}`} />
                                    <span className="text-xs font-bold font-space uppercase">Cosmic</span>
                                </button>
                                <button
                                    onClick={() => onUpdateTheme('Dark')}
                                    className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${theme === 'Dark' ? 'bg-gray-600/10 border-gray-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'
                                        }`}
                                >
                                    <Moon className={`w-6 h-6 ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className="text-xs font-bold font-space uppercase">Dark Mode</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex justify-end">
                    <button
                        onClick={onBack}
                        className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-2xl font-bold font-space text-lg transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    >
                        Save Configurations
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
