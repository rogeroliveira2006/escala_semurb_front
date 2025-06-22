import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ChevronRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();

    const isDarkMode = theme === 'dark';

    const toggleTheme = () => {
        setTheme(isDarkMode ? 'light' : 'dark');
    };
    
    const showInfoToast = (e, title, description) => {
        e.preventDefault();
        toast({
            title: `📄 ${title}`,
            description: description,
        });
    };

    const settingsOptions = [
        { label: 'Política e Privacidade', title: 'Política e Privacidade', content: 'Aqui descrevemos como seus dados são coletados, usados e protegidos. Nós nos comprometemos com a segurança da sua informação.' },
        { label: 'Termos e Condições', title: 'Termos e Condições', content: 'Ao usar este serviço, você concorda com nossos termos. Estes termos governam o uso do aplicativo e seus serviços.' },
        { label: 'Sobre', title: 'Sobre o App', content: 'Este aplicativo foi desenvolvido para otimizar a gestão de escalas da Secretaria de Mobilidade Urbana de Barueri. Versão 1.0.0.' },
    ];

    return (
        <>
            <Helmet><title>Configurações - Escala Barueri</title></Helmet>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
            >
                <div className="card-bg p-6">
                    <h2 className="text-xl font-bold mb-4">Geral</h2>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                {isDarkMode ? <Moon className="mr-3 text-barueri-yellow" /> : <Sun className="mr-3 text-barueri-yellow" />}
                                <span className="font-semibold text-lg">Modo Escuro</span>
                            </div>
                            <Switch
                                checked={isDarkMode}
                                onCheckedChange={toggleTheme}
                            />
                        </li>
                    </ul>
                </div>
                
                <div className="card-bg p-6 mt-8">
                     <h2 className="text-xl font-bold mb-4">Informações</h2>
                     <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {settingsOptions.map((option, index) => (
                            <li key={index}>
                                <Link to="#" onClick={(e) => showInfoToast(e, option.title, option.content)} className="py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-6 px-6 transition-colors">
                                    <span className="font-semibold text-lg">{option.label}</span>
                                    <ChevronRight className="text-gray-400" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </>
    );
};

export default SettingsPage;