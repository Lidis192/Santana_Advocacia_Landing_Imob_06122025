import { useState } from "react";
import { Star, ExternalLink } from "lucide-react";

// Perfil do escritório no Google (preserva a origem das avaliações — Provimento 205/2021 da OAB)
export const GOOGLE_PERFIL_URL = "https://maps.google.com/?cid=759346973467221959";

// Avaliações públicas do Google, reproduzidas sem alteração de texto.
// Selecionadas por pertinência ao tema da página (imobiliário, consulta, clareza, acolhimento).
// Nenhuma avaliação que mencione resultado de processo deve ser incluída aqui.
const avaliacoes = [
  {
    nome: "Dione M.",
    texto:
      "Fiz uma reunião inicial com a Dra. Leidiane Santana, que fui muito atenciosa e explicou todos os detalhes do meu caso, ponderando sobre vantagens e desvantagens de judicializar e valores do processo. Gostei muito do atendimento inicial e recomendarei o serviço dela para amigas, se pedirem indicação.",
  },
  {
    nome: "Vinicius R.",
    texto:
      "Durante toda a analise da documentação do imóvel, obtive todo suporte, clareza e transparência, onde foi me, de forma excepcional, traduzido pro popular, todos os termos técnicos da documentação, foi de muitíssimo alivio, compreender, recorrente sem ressalva alguma o escritório e todo time, a advogada Lidiane conduziu todo o processo, me explicou cada detalhe, foi super paciente e me trouxe o melhor caminho a seguir.",
  },
  {
    nome: "Camila",
    texto:
      "Encontrei a Dra. Leidiane pela procura do próprio Google e me surpreendi positivamente com o atendimento. Ela me ouviu, entendeu minhas necessidades, descobri enlaces da minha questão que nem imaginava e ela me apresentou caminhos possíveis para resolução do meu problema. Atenciosa, educada, experiente, profunda conhecedora das questões jurídicas e cartoriais/fiscais.\n\nO custo me pareceu justo, dentro do aplicado no mercado. Sempre bom consultar uma boa advogada como ela, ajuda no seu planejamento futuro e evita que pequenas questões virem grandes dilemas de vida. Muito obrigada pelo atendimento!",
  },
  {
    nome: "Tom O.",
    texto:
      "Excelente profissional! Fui muito bem atendido desde o primeiro contato. A Dra. Leidiane demonstra um domínio técnico incrível, passou muita segurança e explicou cada detalhe do processo de forma clara e honesta. Recomendo de olhos fechados para quem busca uma advocacia séria e de confiança.",
  },
  {
    nome: "Sidney F.",
    texto:
      "Gostaria de registrar minha satisfação com o excelente trabalho realizado pela assessoria imobiliária durante todo o processo de aquisição do meu imóvel comercial.\nDesde o primeiro contato, recebi um atendimento extremamente profissional, claro e seguro, com orientações precisas em cada etapa da negociação. A assessoria demonstrou conhecimento técnico, atenção aos detalhes e total comprometimento em conduzir o processo com transparência, agilidade e responsabilidade.\nEsse suporte foi fundamental para que eu pudesse tomar a decisão com mais segurança e tranquilidade. Recomendo fortemente o trabalho realizado, especialmente para quem busca uma assessoria séria, preparada e comprometida com o melhor resultado para o cliente.",
  },
  {
    nome: "Soraya C.",
    texto:
      "Desde o começo fui muito bem assessorada pela Dra Leidiane e sua equipe, não só profissionalmente/tecnicamente, mas também existiu um fator humano por trás, que fez toda a diferença para mim como cliente em um momento de angústia.\nSuper recomendo os serviços, e parabéns ao escritório pelo ótimo serviço prestado.\nSoraya",
  },
];

const LIMITE_CARACTERES = 260;

const Estrelas = ({ tamanho = "w-4 h-4" }: { tamanho?: string }) => (
  <div className="flex gap-0.5" aria-label="5 de 5 estrelas" role="img">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${tamanho} fill-[#e8a317] text-[#e8a317]`} aria-hidden="true" />
    ))}
  </div>
);

const CartaoAvaliacao = ({ nome, texto }: { nome: string; texto: string }) => {
  const [aberto, setAberto] = useState(false);
  const longo = texto.length > LIMITE_CARACTERES;

  return (
    <figure className="snap-start shrink-0 w-[85%] sm:w-[70%] md:w-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-7 flex flex-col">
      <Estrelas />
      <blockquote
        className={`mt-4 text-gray-700 text-base leading-relaxed whitespace-pre-line ${longo && !aberto ? "line-clamp-6" : ""}`}
      >
        “{texto}”
      </blockquote>
      {longo && (
        <button
          type="button"
          onClick={() => setAberto(!aberto)}
          aria-expanded={aberto}
          className="mt-2 self-start text-[#3d8b6f] hover:underline font-semibold text-sm"
        >
          {aberto ? "Mostrar menos" : "Ler avaliação completa"}
        </button>
      )}
      <figcaption className="mt-auto pt-5 text-sm">
        <span className="font-semibold text-[#293d47]">{nome}</span>
        <span className="text-gray-500"> · avaliação no Google</span>
      </figcaption>
    </figure>
  );
};

export default function Avaliacoes() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Resumo da nota */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className="font-serif text-4xl font-semibold text-[#293d47]">5,0</span>
        <Estrelas tamanho="w-5 h-5" />
      </div>

      {/* Cartões: rolagem lateral no celular, grade no computador */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
        {avaliacoes.map((a) => (
          <CartaoAvaliacao key={a.nome} nome={a.nome} texto={a.texto} />
        ))}
      </div>
      <p className="md:hidden text-center text-gray-500 text-sm mt-2">Deslize para ver mais avaliações</p>

      <p className="text-center mt-10 text-sm md:text-base text-gray-600">
        Avaliações públicas do perfil do escritório no Google, reproduzidas sem alteração.{" "}
        <a
          href={GOOGLE_PERFIL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#3d8b6f] hover:underline font-semibold"
        >
          Ver todas no Google
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
