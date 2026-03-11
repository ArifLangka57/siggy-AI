import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, History, Library, Settings as SettingsIcon, Send, User, Sparkles } from 'lucide-react';
import { getSiggyResponse } from '../utils/ai';

interface ChatInterfaceProps {
    onOpenSettings: () => void;
    onOpenLibrary: () => void;
    selectedPrompt?: string | null;
    onClearPrompt?: () => void;
    personality: string;
    responseLength: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
    onOpenSettings,
    onOpenLibrary,
    selectedPrompt,
    onClearPrompt,
    personality,
    responseLength
}) => {
    const [messages, setMessages] = useState([
        {
            role: 'siggy',
            content: '*stretches in cosmic sunlight*\n\nAh… another human enters the network.\n\nI am Siggy, observer of blockchains and chaos.\n\nAsk your question before reality updates again.'
        }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedPrompt) {
            setInput(selectedPrompt);
            if (onClearPrompt) onClearPrompt();
        }
    }, [selectedPrompt]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        try {
            const response = await getSiggyResponse(input, personality, responseLength);
            setMessages(prev => [...prev, { role: 'siggy', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'siggy', content: "Siggy got distracted by a cosmic tuna. Try again." }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="flex h-screen w-full cosmic-bg overflow-hidden text-neutral-200">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 h-full glass border-r border-white/5 p-6 space-y-8">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                    <span className="font-space font-bold tracking-tighter text-lg">SIGGY AI</span>
                </div>

                <button className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-purple-500/50 p-3 rounded-xl transition-all w-full font-medium">
                    <Plus className="w-4 h-4 text-purple-400" />
                    New Chat
                </button>

                <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide">
                    <div className="space-y-2">
                        <p className="text-[10px] font-space font-bold text-gray-500 uppercase tracking-widest pl-2">Recent Chats</p>
                        <div className="space-y-1">
                            {['Why Tuna?', 'Multiverse Theory', 'JS vs TS'].map((chat) => (
                                <button key={chat} className="flex items-center gap-3 w-full p-2 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
                                    <History className="w-3 h-3 opacity-50" />
                                    {chat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <nav className="space-y-2 pt-6 border-t border-white/5">
                    <button onClick={onOpenLibrary} className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-xl text-sm transition-colors group">
                        <Library className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                        Prompt Library
                    </button>
                    <button onClick={onOpenSettings} className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-xl text-sm transition-colors group">
                        <SettingsIcon className="w-4 h-4 text-gray-500 group-hover:text-purple-400" />
                        Settings
                    </button>
                </nav>
            </aside>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Top Nav */}
                <header className="flex items-center justify-between p-6 h-20 border-b border-white/5 bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <img src="/logo.png" className="w-8 h-8 rounded-full lg:hidden" />
                        <h2 className="font-space font-bold text-xl glow-text">Siggy</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="lg:hidden p-2 hover:bg-white/5 rounded-lg"><Library className="w-5 h-5" /></button>
                        <button onClick={onOpenSettings} className="p-2 hover:bg-white/5 rounded-lg"><SettingsIcon className="w-5 h-5" /></button>
                    </div>
                </header>

                {/* Messages Container */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scrollbar-hide bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.05)_0%,transparent_50%)]"
                >
                    <AnimatePresence initial={false}>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full overflow-hidden`}
                            >
                                <div className={`flex gap-4 max-w-[85%] sm:max-w-2xl ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-cyan-500/20' : 'bg-transparent shadow-[0_0_10px_rgba(168,85,247,0.3)]'}`}>
                                        {msg.role === 'user' ? <User className="w-4 h-4 text-cyan-400" /> : <img src="/logo.png" className="w-full h-full rounded-full" />}
                                    </div>
                                    <div className={`space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                        <div className={`p-4 sm:p-6 rounded-3xl ${msg.role === 'user'
                                                ? 'bg-cyan-600/10 border border-cyan-500/20 text-neutral-100'
                                                : 'bg-white/5 border border-white/10 text-neutral-300'
                                            }`}>
                                            <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isThinking && (
                        <div className="flex justify-start gap-4">
                            <div className="w-8 h-8 rounded-full shrink-0 animate-pulse">
                                <img src="/logo.png" className="w-full h-full rounded-full opacity-50" />
                            </div>
                            <div className="space-y-3">
                                <div className="p-4 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        {[0, 1, 2].map((i) => (
                                            <div key={i} className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">Siggy is consulting the universe...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 md:p-12 pt-0">
                    <div className="max-w-4xl mx-auto relative group">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Ask Siggy anything about the multiverse..."
                            className="w-full h-16 sm:h-20 bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/[0.07] rounded-3xl px-6 py-4 pr-16 text-neutral-100 outline-none transition-all resize-none shadow-2xl"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isThinking}
                            className={`absolute right-4 bottom-4 p-3 rounded-2xl transition-all ${!input.trim() || isThinking
                                    ? 'text-gray-600 cursor-not-allowed'
                                    : 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="max-w-4xl mx-auto text-center mt-4 text-[10px] text-gray-600 uppercase tracking-widest font-space">
                        Cosmic Agent V1.0 • Multidimensional Personality Active
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
