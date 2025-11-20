
import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h2>
        <p className="text-slate-500 dark:text-slate-400">Gira as preferências do sistema e aparência.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Aparência
          </h3>
        </div>
        
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-900 dark:text-white">Modo Escuro</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Alterne entre os temas claro e escuro para melhor conforto visual.
            </p>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`${
                isDarkMode ? 'translate-x-7' : 'translate-x-1'
              } inline-block h-6 w-6 transform rounded-full bg-white transition-transform flex items-center justify-center`}
            >
              {isDarkMode ? (
                <Moon className="w-3 h-3 text-indigo-600" />
              ) : (
                <Sun className="w-3 h-3 text-yellow-500" />
              )}
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
         <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Informações do Sistema</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Versão</p>
                <p className="font-medium text-slate-900 dark:text-white">v1.2.0 (Stable)</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Ambiente</p>
                <p className="font-medium text-slate-900 dark:text-white">Produção</p>
            </div>
         </div>
      </div>
    </div>
  );
};