import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PoliticaDeReembolso() {
  return (
    <div className="min-h-screen bg-[#070d1e] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-slate-900/60 p-8 sm:p-12 rounded-2xl border border-white/10">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar para a página principal
        </Link>
        <h1 className="text-3xl font-bold mb-8">Política de Reembolso e Garantia</h1>
        <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2 className="text-xl font-semibold text-white mt-8">Garantia Blindada de 7 Dias</h2>
          <p>No <strong>Seu Site Único</strong>, nós temos absoluta confiança na qualidade do nosso método e do material que estamos entregando a você.</p>
          <p>De acordo com o Art. 49 do Código de Defesa do Consumidor (CDC), você possui o direito de arrependimento da compra de produtos digitais no prazo legal de 7 (sete) dias corridos a partir da data de liberação do acesso.</p>
          
          <h2 className="text-xl font-semibold text-white mt-8">Como solicitar o reembolso?</h2>
          <p>Caso você não se adapte ao método, ache que não é o momento certo ou simplesmente se arrependa da compra, você pode solicitar a devolução de 100% do seu dinheiro, sem letras miúdas ou burocracias.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>A solicitação deve ser feita exclusivamente através do e-mail de suporte ou WhatsApp oficial no prazo de até 7 dias corridos após o pagamento.</li>
            <li>Ao solicitar o reembolso, o acesso à Área de Membros e a todo o material será imediatamente bloqueado.</li>
            <li>O valor é reembolsado pela mesma plataforma que processou o pagamento (Mercado Pago), podendo levar alguns dias úteis para aparecer no seu extrato ou fatura, a depender do método de pagamento e do seu banco.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">Exceções</h2>
          <p>Passado o prazo legal de 7 dias da garantia incondicional, nenhuma solicitação de estorno ou devolução será aceita, considerando que o conteúdo digital já foi totalmente consumido e aproveitado pelo cliente.</p>
        </div>
      </div>
    </div>
  );
}
