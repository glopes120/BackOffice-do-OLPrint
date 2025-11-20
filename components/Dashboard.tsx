
import React, { useEffect, useState } from 'react';
import { DASHBOARD_STATS } from '../constants';
import { generateBusinessInsight } from '../services/geminiService';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Seg', vendas: 4000, pedidos: 24 },
  { name: 'Ter', vendas: 3000, pedidos: 13 },
  { name: 'Qua', vendas: 2000, pedidos: 38 },
  { name: 'Qui', vendas: 2780, pedidos: 39 },
  { name: 'Sex', vendas: 1890, pedidos: 48 },
  { name: 'Sáb', vendas: 2390, pedidos: 38 },
  { name: 'Dom', vendas: 3490, pedidos: 43 },
];

export const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>('Analisando dados com Gemini...');

  useEffect(() => {
    const fetchInsight = async () => {
      // Simulate checking cache or avoiding excessive calls
      const summary = "Vendas altas de multifuncionais no fim de semana. Estoque de tinta preta 664 baixo.";
      const result = await generateBusinessInsight(summary);
      setInsight(result);
    };
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400">Visão geral do desempenho da OLPrint.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium border border-indigo-100 dark:border-indigo-800 max-w-xl">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="truncate">{insight}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-slate-50 dark:bg-slate-700 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Receita Semanal</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#475569" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9', opacity: 0.1}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#f8fafc'}} 
                />
                <Bar dataKey="vendas" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Volume de Pedidos</h3>
          <div className="h-48 mb-6">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#475569" strokeOpacity={0.2} />
                <XAxis dataKey="name" hide />
                <Tooltip 
                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#f8fafc'}} 
                />
                <Line type="monotone" dataKey="pedidos" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer group">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Ver relatórios completos</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Exportar PDF/CSV</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
             </div>
             <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer group">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Configurar metas</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ajustar KPIs</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
