import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ChevronRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {
    const { tema, setTema } = useTheme();
    const { toast } = useToast();

    const modoEscuroAtivo = tema === 'dark';

    const alternarTema = () => {
        setTema(modoEscuroAtivo ? 'light' : 'dark');
    };
    
    const exibirToastInfo = (e, titulo, descricao) => {
        e.preventDefault();
        toast({
            title: `📄 ${titulo}`,
            description: descricao,
        });
    };

    const opcoesConfiguracoes = [
        { rotulo: 'Política e Privacidade', titulo: 'Política e Privacidade', conteudo: 'Aqui descrevemos como seus dados são coletados, usados e protegidos. Nós nos comprometemos com a segurança da sua informação.' },
        { rotulo: 'Termos e Condições', titulo: 'Termos e Condições', conteudo: 'Ao usar este serviço, você concorda com nossos termos. Estes termos governam o uso do aplicativo e seus serviços.' },
        { rotulo: 'Sobre', titulo: 'Sobre o App', conteudo: 'Este aplicativo foi desenvolvido para otimizar a gestão de escalas da Secretaria de Mobilidade Urbana de Barueri. Versão 1.0.0.' },
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
                                {modoEscuroAtivo ? <Moon className="mr-3 text-barueri-yellow" /> : <Sun className="mr-3 text-barueri-yellow" />}
                                <span className="font-semibold text-lg">Modo Escuro</span>
                            </div>
                            <Switch
                                checked={modoEscuroAtivo}
                                onCheckedChange={alternarTema}
                            />
                        </li>
                    </ul>
                </div>
                
                <div className="card-bg p-6 mt-8">
                     <h2 className="text-xl font-bold mb-4">Informações</h2>
                     <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {opcoesConfiguracoes.map((opcao, indice) => (
                            <li key={indice}>
                                <Link to="#" onClick={(e) => exibirToastInfo(e, opcao.titulo, opcao.conteudo)} className="py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-6 px-6 transition-colors">
                                    <span className="font-semibold text-lg">{opcao.rotulo}</span>
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