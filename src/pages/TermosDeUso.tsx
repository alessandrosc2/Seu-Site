import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-[#070d1e] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-slate-900/60 p-8 sm:p-12 rounded-2xl border border-white/10">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar para a página principal
        </Link>
        <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>
        <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          <p>
            Bem-vindo(a) ao Seu Site Único. Ao acessar e utilizar este site, você concorda em cumprir os presentes Termos de Uso. Leia atentamente.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8">1. Aceitação dos Termos</h2>
          <p>Ao adquirir ou utilizar nossos serviços e produtos digitais, você concorda legalmente com estes termos, bem como com a nossa Política de Privacidade.</p>
          
          <h2 className="text-xl font-semibold text-white mt-8">2. O Serviço</h2>
          <p>O Seu Site Único oferece um método e treinamentos focados na criação de sites e posicionamento digital utilizando Inteligência Artificial. Os resultados obtidos dependem da dedicação exclusiva do aluno, e as estimativas de ganhos são projeções e não garantias absolutas.</p>

          <h2 className="text-xl font-semibold text-white mt-8">3. Propriedade Intelectual</h2>
          <p>Todo o conteúdo disponível no método, incluindo prompts, textos, layouts, códigos e tutoriais, são de propriedade intelectual exclusiva do Seu Site Único, sendo expressamente proibida a revenda, pirataria ou distribuição não autorizada.</p>

          <h2 className="text-xl font-semibold text-white mt-8">4. Acesso ao Produto</h2>
          <p>O acesso ao método é vitalício enquanto a plataforma existir (mínimo garantido de 1 ano). O compartilhamento de senhas é proibido e poderá resultar no cancelamento do acesso sem aviso prévio.</p>
        </div>
      </div>
    </div>
  );
}
