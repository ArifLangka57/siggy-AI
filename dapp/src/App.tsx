import { useState } from 'react';
import Landing from './components/Landing';
import ChatInterface from './components/ChatInterface';
import PromptLibrary from './components/PromptLibrary';
import Settings from './components/Settings';
import { AnimatePresence, motion } from 'framer-motion';

type Page = 'landing' | 'chat' | 'library' | 'settings';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('landing');
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

    // Settings State
    const [personality, setPersonality] = useState('Cosmic Philosopher');
    const [responseLength, setResponseLength] = useState('Medium');
    const [theme, setTheme] = useState('Cosmic');

    const renderPage = () => {
        switch (currentPage) {
            case 'landing':
                return <Landing onStart={() => setCurrentPage('chat')} />;
            case 'chat':
                return (
                    <ChatInterface
                        selectedPrompt={selectedPrompt}
                        personality={personality}
                        responseLength={responseLength}
                        onOpenSettings={() => setCurrentPage('settings')}
                        onOpenLibrary={() => setCurrentPage('library')}
                        onClearPrompt={() => setSelectedPrompt(null)}
                    />
                );
            case 'library':
                return (
                    <PromptLibrary
                        onBack={() => setCurrentPage('chat')}
                        onSelect={(prompt) => {
                            setSelectedPrompt(prompt);
                            setCurrentPage('chat');
                        }}
                    />
                );
            case 'settings':
                return (
                    <Settings
                        personality={personality}
                        responseLength={responseLength}
                        theme={theme}
                        onUpdatePersonality={setPersonality}
                        onUpdateLength={setResponseLength}
                        onUpdateTheme={setTheme}
                        onBack={() => setCurrentPage('chat')}
                    />
                );
            default:
                return <Landing onStart={() => setCurrentPage('chat')} />;
        }
    };

    return (
        <div className={`min-h-screen ${theme === 'Dark' ? 'bg-black' : 'cosmic-bg'} selection:bg-purple-500/30 selection:text-white transition-colors duration-700`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {renderPage()}
                </motion.div>
            </AnimatePresence>

            {/* Global Background Particles / Glow */}
            {theme === 'Cosmic' && (
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.08)_0%,transparent_50%)]"></div>
            )}
        </div>
    );
}

export default App;
