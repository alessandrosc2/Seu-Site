import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-[#070d1e] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-slate-900/60 p-8 sm:p-12 rounded-2xl border border-white/10">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar para a página principal
        </Link>
        <h1 className="text-3xl font-bold mb-8">Política de Privacidade (LGPD)</h1>
        <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          <p>
            No Seu Site Único, a privacidade e a segurança dos seus dados são nossa prioridade. Esta política foi criada em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD) - Lei nº 13.709/2018.
          </p>
          
          <h2 className="text-xl font-semibold text-white mt-8">1. Coleta de Dados</h2>
          <p>Coletamos apenas os dados necessários para garantir a entrega do produto e oferecer um suporte de qualidade, tais como: Nome completo, E-mail e WhatsApp (telefone).</p>
          
          <h2 className="text-xl font-semibold text-white mt-8">2. Como Utilizamos seus Dados</h2>
          <p>Seus dados são utilizados para:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Processar transações e enviar o acesso ao produto adquirido.</li>
            <li>Fornecer suporte via e-mail ou WhatsApp.</li>
            <li>Melhorar sua experiência no site.</li>
            <li>Enviar comunicações sobre atualizações, novidades ou recuperação de compras.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">3. Proteção e Segurança</h2>
          <p>Nossos pagamentos são processados exclusivamente pelo <strong>Mercado Pago</strong>, uma plataforma de altíssima segurança. Não armazenamos seus dados de cartão de crédito em nossos servidores.</p>

          <h2 className="text-xl font-semibold text-white mt-8">4. Seus Direitos (LGPD)</h2>
          <p>Como titular dos dados, você tem o direito de solicitar o acesso, a correção ou a exclusão dos seus dados pessoais da nossa base. Para solicitar qualquer ação relacionada aos seus dados, entre em contato através do nosso WhatsApp oficial de suporte.</p>
        </div>
      </div>
    </div>
  );
}
