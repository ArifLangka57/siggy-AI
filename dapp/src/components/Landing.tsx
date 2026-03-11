import React from 'react';
import { motion } from 'framer-motion';

interface LandingProps {
    onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Siggy Logo" className="w-10 h-10 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    <span className="font-space font-bold text-xl uppercase tracking-widest hidden sm:inline">Siggy</span>
                </div>
                <div className="flex gap-8 items-center">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Docs</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a>
                    <button
                        onClick={onStart}
                        className="bg-white/5 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 px-6 py-2 rounded-xl transition-all font-medium"
                    >
                        Try Siggy
                    </button>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-2"
                >
                    <img src="/logo.png" alt="Siggy Avatar" className="w-80 h-80 md:w-[450px] md:h-[450px] mx-auto drop-shadow-[0_0_50px_rgba(168,85,247,0.7)] animate-pulse" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                >
                    <h1 className="text-6xl md:text-9xl font-black font-space glow-text italic uppercase">Welcome</h1>
                    <p className="text-2xl md:text-3xl font-space font-light text-purple-300 tracking-wide uppercase">Siggy AI Agent</p>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg pt-4">
                        Ask questions. Explore ideas. Experience chaotic intelligence from another dimension.
                    </p>
                </motion.div>

                <motion.button
                    onClick={onStart}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                    Start Chatting
                </motion.button>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-center w-full"
                >
                    <div className="p-6">
                        <h3 className="font-space font-bold text-cyan-400 uppercase tracking-widest text-sm mb-2">On-Chain AI</h3>
                        <p className="text-gray-500">DeAI infrastructure powered by Ritual for verifiable results.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="font-space font-bold text-purple-400 uppercase tracking-widest text-sm mb-2">Cosmic Mascot</h3>
                        <p className="text-gray-500">More than a bot. A witty, chaotic guardian of the nodes.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="font-space font-bold text-blue-400 uppercase tracking-widest text-sm mb-2">Infernet Oracles</h3>
                        <p className="text-gray-500">Unlock forbidden knowledge from decentralized models.</p>
                    </div>
                </motion.div>

                <div className="mt-32 w-full max-w-2xl glass p-8 text-left space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">?</div>
                        <p className="text-gray-300">Siapa kamu?</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <img src="/logo.png" className="w-8 h-8 rounded-full" />
                        <p className="text-purple-300 italic">
                            "*stretches in cosmic sunlight*\n\nAh… manusia lain memasuki jaringan. Aku adalah Siggy, pengamat blockchain dan kekacauan. Ajukan pertanyaanmu sebelum realitas diperbarui lagi."
                        </p>
                    </div>
                </div>
            </main>

            <footer className="p-8 text-center text-gray-600 text-xs">
                Siggy is the official cosmic guardian of <a href="https://ritual.net" target="_blank" className="hover:text-purple-400 transition-colors">Ritual.net</a>
            </footer>
        </div>
    );
};

export default Landing;
