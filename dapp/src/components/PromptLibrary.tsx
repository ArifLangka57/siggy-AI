import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, X, ChevronRight, Zap, Lightbulb, Code, Terminal } from 'lucide-react';

interface PromptLibraryProps {
    onBack: () => void;
    onSelect: (prompt: string) => void;
}

const PromptLibrary: React.FC<PromptLibraryProps> = ({ onBack, onSelect }) => {
    const categories = [
        { name: 'Core Web3', icon: <Zap className="w-4 h-4" color="#A855F7" /> },
        { name: 'Creative', icon: <Lightbulb className="w-4 h-4" color="#EAB308" /> },
        { name: 'Technical', icon: <Code className="w-4 h-4" color="#06B6D4" /> },
        { name: 'Ritual.net', icon: <Terminal className="w-4 h-4" color="#22C55E" /> }
    ];

    const prompts = [
        {
            title: "Explain Ritual to me like I'm a cat",
            content: "Explain the Ritual.net network and decentralized AI infrastructure, but use metaphors related to cats, tuna, and hunting.",
            category: "Ritual.net",
            impact: "Educational"
        },
        {
            title: "Web3 Security Audit",
            content: "What are the common attack vectors for smart contracts, and how does decentralized AI help in detecting them early?",
            category: "Core Web3",
            impact: "High"
        },
        {
            title: "Quantum Consciousness",
            content: "Give me a philosophical observation on the intersection of human consciousness, quantum mechanics, and AI neural networks.",
            category: "Creative",
            impact: "Mystical"
        },
        {
            title: "Infernet Protocol Deep Dive",
            content: "How does the Infernet protocol facilitate on-chain AI inference while maintaining verifiability and privacy?",
            category: "Technical",
            impact: "Advanced"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-start cosmic-bg overflow-y-auto p-4 md:p-12 lg:p-24 scrollbar-hide">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-6xl space-y-12"
            >
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-space font-black tracking-tighter uppercase glow-text tracking-widest leading-none">Library</h1>
                        <p className="text-gray-400 font-space tracking-widest text-sm uppercase">Curated Cosmic Templates</p>
                    </div>
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:border-white/20 px-6 py-4 rounded-2xl transition-all w-fit"
                    >
                        <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        <span className="font-bold text-sm uppercase tracking-widest">Close</span>
                    </button>
                </header>

                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <button key={cat.name} className="flex items-center gap-3 glass px-5 py-3 rounded-xl border border-white/5 hover:border-purple-500/50 transition-all font-medium text-xs uppercase tracking-widest">
                            {cat.icon}
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
                    {prompts.map((p, idx) => (
                        <motion.button
                            key={p.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => onSelect(p.content)}
                            className="group relative flex flex-col items-start p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-500/30 transition-all text-left overflow-hidden h-fit"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                            </div>

                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-400 mb-2">{p.category}</span>
                            <h3 className="text-xl font-bold font-space text-white mb-4 leading-tight">{p.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">{p.content}</p>

                            <div className="mt-auto flex items-center gap-2 text-xs font-bold font-space uppercase tracking-widest text-purple-400 group-hover:text-purple-300">
                                Use Template <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default PromptLibrary;
