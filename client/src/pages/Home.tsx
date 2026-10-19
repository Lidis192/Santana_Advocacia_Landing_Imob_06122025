import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Mail, MapPin, ChevronDown, Menu, X, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { MapView } from "@/components/Map";

// Função para rastrear eventos no Google Analytics
const trackEvent = (eventName: string, eventCategory: string, eventLabel: string) => {
  const gtagFunc = (window as any).gtag;
  if (typeof gtagFunc !== 'undefined') {
    gtagFunc('event', eventName, {
      'event_category': eventCategory,
      'event_label': eventLabel,
    });
  }
};

const useIntersectionObserver = (ref: React.RefObject<HTMLElement | null>, animationClass: string) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return isVisible ? animationClass : "opacity-0";
};

// Título de seção padronizado (mesmo tamanho e destaque em todas as seções)
const SectionTitle = ({ children, light = false, subtitle }: { children: React.ReactNode; light?: boolean; subtitle?: string }) => (
  <div className="text-center mb-10 md:mb-14">
    <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight ${light ? "text-white" : "text-[#293d47]"}`}>
      {children}
    </h2>
    <span className="block w-16 h-1 bg-[#4a9b7f] rounded-full mx-auto mt-5" aria-hidden="true"></span>
    {subtitle && (
      <p className={`text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed ${light ? "text-gray-200" : "text-gray-600"}`}>{subtitle}</p>
    )}
  </div>
);

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = (buttonName: string = "WhatsApp") => {
    trackEvent('cta_click', 'engagement', buttonName);
    const phoneNumber = "5511934855187";
    const message = "Olá! Gostaria de saber mais sobre os serviços de atraso na entrega de imóvel.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const createWhatsAppHandler = (buttonName: string) => {
    return () => handleWhatsAppClick(buttonName);
  };

  const faqs = [
    {
      question: "Qual é o prazo máximo para a entrega do imóvel?",
      answer: "A construtora pode atrasar a entrega em até 180 dias (prazo de tolerância previsto na Lei nº 4.591/64). Se esse prazo adicional for ultrapassado, e você não tiver dado causa ao atraso, é possível exigir a resolução do contrato, com a devolução integral dos valores pagos; ou indenização pelos prejuízos sofridos, caso deseje manter o contrato."
    },
    {
      question: "Posso receber indenização mesmo que o imóvel já tenha sido entregue?",
      answer: "Sim. Mesmo com a entrega das chaves, se houve atraso superior ao prazo de tolerância, você pode solicitar indenização por lucros cessantes (valores que você deixou de usufruir, como aluguel) e, em alguns casos, danos morais. O atraso gera prejuízos que devem ser compensados, independentemente da entrega posterior do imóvel."
    },
    {
      question: "Como funciona o cálculo da indenização por lucros cessantes?",
      answer: "A indenização por lucros cessantes corresponde ao valor de aluguel que você deixou de usufruir enquanto aguardava a entrega do imóvel. Geralmente, esse valor é calculado entre 0,5% e 1% do valor do imóvel por mês de atraso."
    },
    {
      question: "Qual é o custo para contratar os serviços do Santana Advocacia?",
      answer: "Os honorários são definidos de forma personalizada, de acordo com a complexidade do caso, o tempo de dedicação necessário e o valor econômico envolvido. Podemos estruturar a contratação em honorários fixos, percentuais sobre o êxito ou modelos mistos, sempre alinhados à sua realidade e aos parâmetros da Tabela da OAB/SP. Antes de qualquer contratação, você recebe orientações detalhadas sobre o funcionamento do processo e sobre os valores envolvidos, com total transparência."
    },
    {
      question: "Quanto tempo leva para resolver um caso de atraso na entrega?",
      answer: "O tempo varia conforme o caso. Negociações diretas com a construtora podem ser resolvidas em semanas. Processos judiciais geralmente levam de 1 a 3 anos, dependendo da complexidade e do tribunal. Recomendamos consultar para uma estimativa específica do seu caso."
    },
    {
      question: "Preciso ter documentação específica para iniciar o processo?",
      answer: "Sim! É importante ter: contrato de compra e venda, comprovantes de pagamentos, correspondências com a construtora, e documentos que comprovem o atraso (como notificações, e-mails, etc.). Nós ajudamos a reunir toda a documentação necessária durante a consulta."
    },
    {
      question: "Como posso conhecer melhor o escritório Santana Advocacia?",
      answer: "Você pode acompanhar nosso trabalho pelo Instagram e acessar nosso site institucional www.santanalaw.com.br, onde publicamos informativos e artigos sobre Direito Imobiliário, além de apresentar em detalhes nossos serviços jurídicos.",
      hasLinks: true
    },
    {
      question: "Posso confiar no escritório Santana Advocacia?",
      answer: "Sim. O escritório é fundado e liderado pela Dra. Leidiane Santos de Santana (OAB/SP 502.416), regularmente inscrita na Ordem dos Advogados do Brasil. Para verificar a inscrição, clique aqui.",
      hasLinks: true
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Refs para animações
  const servicosRef = useRef<HTMLElement | null>(null);
  const porQueEscolherRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);
  const advogadaRef = useRef<HTMLElement | null>(null);
  const mapaRef = useRef<HTMLElement | null>(null);
  const contatoRef = useRef<HTMLElement | null>(null);

  // Hooks de animação
  const servicosAnimation = useIntersectionObserver(servicosRef, "animate-slideInUp");
  const porQueEscolherAnimation = useIntersectionObserver(porQueEscolherRef, "animate-slideInUp");
  const faqAnimation = useIntersectionObserver(faqRef, "animate-fadeIn");
  const advogadaAnimation = useIntersectionObserver(advogadaRef, "animate-slideInUp");
  const mapaAnimation = useIntersectionObserver(mapaRef, "animate-fadeIn");
  const contatoAnimation = useIntersectionObserver(contatoRef, "animate-slideInUp");

  const navLinks = [
    { href: "#servicos", label: "Serviços" },
    { href: "#por-que", label: "Por que nós" },
    { href: "#faq", label: "Dúvidas" },
    { href: "#contato", label: "Contato" },
  ];

  const checkItem = (content: React.ReactNode) => (
    <div className="flex gap-3 items-start">
      <CheckCircle2 className="w-6 h-6 text-[#4a9b7f] flex-shrink-0 mt-0.5" />
      <span className="text-gray-700 text-base md:text-lg leading-relaxed">{content}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#9a9a9a]/95 border-b border-gray-200/30 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center h-20 md:h-24">
          {/* Logo and Branding */}
          <a href="#topo" className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            <img src="/logo.png" alt="Santana Advocacia Logo" className="h-12 w-12 md:h-16 md:w-16 object-contain" />
            <div className="border-l-2 border-[#293d47]/20 pl-3 md:pl-4">
              <div className="font-bold text-[#293d47] text-sm sm:text-base md:text-xl tracking-wider uppercase leading-tight">Santana Advocacia</div>
              <div className="text-[#7A5E47] text-[11px] md:text-sm tracking-widest uppercase font-semibold">Soluções Jurídicas</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 lg:gap-9 items-center ml-auto">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[#293d47] hover:text-[#4a9b7f] transition font-semibold tracking-wider uppercase text-[15px] duration-200">{link.label}</a>
            ))}
            <button
              onClick={createWhatsAppHandler('Fale conosco - Header')}
              className="hidden lg:inline-flex items-center gap-2 bg-[#293d47] hover:bg-[#1e2e36] text-white font-semibold text-[15px] tracking-wide px-5 py-2.5 rounded-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              Fale conosco
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden flex items-center justify-center w-12 h-12 text-[#293d47] hover:text-[#4a9b7f] transition"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#e8e8e8] border-t border-gray-300/30 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="container mx-auto px-4 py-3 flex flex-col">
              {navLinks.map((link, i) => (
                <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`text-[#293d47] hover:text-[#4a9b7f] transition font-semibold tracking-wider uppercase text-base py-4 ${i < navLinks.length - 1 ? "border-b border-gray-300/50" : ""}`}>{link.label}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div id="topo" className="h-20 md:h-24"></div>

      {/* Problema e Solução (abertura com vídeo) */}
      <section className="relative overflow-hidden min-h-[calc(100svh-5rem)] md:min-h-[calc(100vh-6rem)] max-h-[860px] flex items-center px-4 py-16 md:py-24">
        {/* Vídeo de fundo com imagem de capa enquanto carrega */}
        <div className="absolute inset-0 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/construction-hero-poster.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/construction-hero.mp4" type="video/mp4" />
          </video>
          {/* Overlay: mais escuro à esquerda (desktop) e uniforme no celular, para garantir leitura */}
          <div className="absolute inset-0 bg-[#3d2817]/75 md:bg-transparent md:bg-gradient-to-r md:from-[#3d2817]/90 md:via-[#5a3d2a]/75 md:to-[#7a5e47]/30"></div>
        </div>
        <div className="container mx-auto relative z-10 w-full">
          <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
            <p className="text-[#c9e6da] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[11px] sm:text-sm font-semibold mb-5 md:mb-6">Direito Imobiliário · Imóveis na planta</p>
            <h2 className="font-serif text-[2.1rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold text-white">
              Atrasos na entrega de imóveis comprados na planta são comuns.
              <span className="block mt-3 md:mt-4 text-[#c9e6da]">Mas você não precisa aceitar o prejuízo.</span>
            </h2>
            <Button
              size="lg"
              className="mt-9 md:mt-12 h-14 px-8 text-lg font-bold bg-[#4a9b7f] hover:bg-[#3d8b6f] text-white rounded-md shadow-lg"
              onClick={createWhatsAppHandler('Fale com especialista - Abertura')}
            >
              <MessageCircle className="w-5 h-5" />
              Fale com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#293d47] to-[#3a5568] text-white py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-5 md:mb-7 leading-tight max-w-3xl mx-auto">Atraso na entrega do imóvel?<br />Conheça seus direitos.</h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">Nosso escritório é especializado em Direito Civil e Direito Imobiliário, oferecendo soluções jurídicas estratégicas para compradores de imóveis na planta.</p>
          <Button
            size="lg"
            className="bg-white text-[#293d47] hover:bg-gray-100 font-bold text-lg h-14 px-8 rounded-md border-2 border-white mt-8 md:mt-10"
            onClick={createWhatsAppHandler('Fale com especialista - Hero')}
          >
            Fale com especialista
          </Button>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" ref={servicosRef} className={`scroll-mt-24 py-16 md:py-24 px-4 transition-all duration-700 ${servicosAnimation}`}>
        <div className="container mx-auto">
          <SectionTitle>Nossas soluções jurídicas</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Serviço 1: Resolução do Contrato */}
            <Card className="border-l-4 border-l-[#4a9b7f] shadow-md hover:shadow-xl transition-shadow">
              <CardHeader className="gap-2">
                <CardTitle className="text-[#293d47] text-2xl md:text-[1.7rem] font-serif font-semibold leading-snug">Resolução do contrato (distrato)</CardTitle>
                <CardDescription className="text-base md:text-lg text-[#4a7a6a] font-medium">Não quer mais esperar pela entrega da obra? Há possibilidade de devolução integral.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Se o atraso ultrapassou o prazo de tolerância (180 dias) e você perdeu a confiança na construtora, a lei permite, se houver culpa exclusiva da construtora, a <strong>resolução do contrato</strong>.
                </p>
                <div className="space-y-4">
                  {checkItem(<><strong>100% dos valores pagos</strong> devolvidos (incluindo comissão de corretagem)</>)}
                  {checkItem(<><strong>Correção monetária</strong> sobre os valores a devolver</>)}
                  {checkItem(<><strong>Indenização por danos morais</strong> (a depender do caso)</>)}
                </div>
              </CardContent>
            </Card>

            {/* Serviço 2: Indenização pelo Atraso */}
            <Card className="border-l-4 border-l-[#4a9b7f] shadow-md hover:shadow-xl transition-shadow">
              <CardHeader className="gap-2">
                <CardTitle className="text-[#293d47] text-2xl md:text-[1.7rem] font-serif font-semibold leading-snug">Indenização pelo atraso</CardTitle>
                <CardDescription className="text-base md:text-lg text-[#4a7a6a] font-medium">Quer o imóvel, mas quer ser indenizado pelo atraso.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Se você ainda deseja esperar pela entrega do imóvel, mas foi prejudicado pelo atraso, você tem direito a ser indenizado.
                </p>
                <div className="space-y-4">
                  {checkItem(<><strong>Lucros Cessantes (Aluguéis)</strong>: Indenização mensal (0,5% a 1% do valor do imóvel)</>)}
                  {checkItem(<><strong>Danos Morais</strong>: Indenização pelo transtorno causado</>)}
                  {checkItem(<><strong>Congelamento do Saldo Devedor</strong>: Suspensão da correção após prazo final</>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Por que escolher */}
      <section id="por-que" ref={porQueEscolherRef} className={`scroll-mt-24 py-16 md:py-24 px-4 bg-gray-50 transition-all duration-700 ${porQueEscolherAnimation}`}>
        <div className="container mx-auto">
          <SectionTitle>Por que escolher a Santana Advocacia?</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 max-w-6xl mx-auto">
            {[
              { title: "Especialistas em direito imobiliário", text: "Conhecimento aprofundado nas leis e jurisprudência sobre atraso de obras." },
              { title: "Atendimento personalizado", text: "Seu caso é único e será tratado com a atenção que merece." },
              { title: "Atendimento online e presencial", text: "Consultas e acompanhamentos disponíveis tanto online quanto presencial." },
            ].map((item, i) => (
              <div key={item.title} className="text-center px-2">
                <div className="bg-[#4a9b7f] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                  <span className="font-serif text-2xl md:text-3xl font-semibold text-white">{i + 1}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#293d47] mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-sm mx-auto">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={faqRef} className={`scroll-mt-24 py-16 md:py-24 px-4 transition-all duration-700 ${faqAnimation}`}>
        <div className="container mx-auto">
          <SectionTitle subtitle="Esclareça suas dúvidas sobre os serviços de resolução de contrato e indenização por atraso na entrega de imóvel.">
            Dúvidas frequentes
          </SectionTitle>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`border rounded-lg overflow-hidden transition ${expandedFaq === index ? "border-[#4a9b7f] shadow-md" : "border-gray-200 hover:shadow-md"}`}>
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={expandedFaq === index}
                  className="w-full px-5 md:px-7 py-5 flex justify-between items-center gap-4 bg-gray-50 hover:bg-gray-100 transition text-left"
                >
                  <span className="font-semibold text-[#293d47] text-base md:text-lg leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`flex-shrink-0 w-6 h-6 text-[#4a9b7f] transition-transform ${
                      expandedFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-5 md:px-7 py-5 bg-white border-t border-gray-200 text-gray-700 text-base md:text-lg leading-relaxed">
                    {faq.hasLinks ? (
                      faq.question === "Como posso conhecer melhor o escritório Santana Advocacia?" ? (
                        <p>Você pode acompanhar nosso trabalho pelo <a href="https://www.instagram.com/santanna.advocacia_?igsh=MTkyYzV3Z2oxcXFybA==" target="_blank" rel="noopener noreferrer" className="text-[#3d8b6f] hover:underline font-semibold">Instagram</a> e acessar nosso <a href="https://www.santanalaw.com.br" target="_blank" rel="noopener noreferrer" className="text-[#3d8b6f] hover:underline font-semibold">site institucional</a>, onde publicamos informativos e artigos sobre Direito Imobiliário, além de apresentar em detalhes nossos serviços jurídicos.</p>
                      ) : faq.question === "Posso confiar no escritório Santana Advocacia?" ? (
                        <p>Sim. O escritório é fundado e liderado pela Dra. Leidiane Santos de Santana (OAB/SP 502.416), regularmente inscrita na Ordem dos Advogados do Brasil. Para verificar a inscrição, <a href="https://cna.oab.org.br/" target="_blank" rel="noopener noreferrer" className="text-[#3d8b6f] hover:underline font-semibold">clique aqui</a>.</p>
                      ) : null
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-gray-600 text-lg mb-5">Ainda tem dúvidas? Entre em contato conosco!</p>
            <Button
              size="lg"
              className="bg-white text-[#293d47] hover:bg-[#293d47] hover:text-white font-bold text-lg h-14 px-8 rounded-md border-2 border-[#293d47] transition"
              onClick={createWhatsAppHandler('Fale com um Especialista - FAQ')}
            >
              Fale com um especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Conheça a advogada */}
      <section id="advogada" ref={advogadaRef} className={`scroll-mt-24 py-16 md:py-24 px-4 bg-gray-50 transition-all duration-700 ${advogadaAnimation}`}>
        <div className="container mx-auto">
          <SectionTitle>Conheça a advogada que conduzirá seu caso</SectionTitle>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16 items-center">
            {/* Foto */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm md:max-w-none">
                <img
                  src="/dra-leidiane.png"
                  alt="Dra. Leidiane Santana"
                  loading="lazy"
                  className="w-full h-auto aspect-[4/5] object-cover rounded-xl shadow-xl"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#293d47]/20 to-transparent"></div>
              </div>
            </div>

            {/* Informações */}
            <div>
              <h3 className="font-serif text-3xl md:text-[2.6rem] font-semibold text-[#293d47] mb-3 leading-tight">Dra. Leidiane Santana</h3>
              <p className="text-[#3d8b6f] font-semibold text-lg md:text-xl mb-7">Advogada especialista em Direito civil e Direito imobiliário</p>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-5">
                Com uma década de experiência, conduz com estratégia e segurança a solução de conflitos envolvendo compra de imóveis na planta. Sua atuação é pautada em técnica, análise minuciosa de documentos e condução firme nas negociações, sempre com foco na proteção do patrimônio do cliente.
              </p>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                É membro da Comissão de Direito Imobiliário da OAB/SP, associada ao Instituto Brasileiro de Direito Imobiliário (IBRADIM) e integrante do Instituto Mulheres do Imobiliário, mantém constante atualização e presença ativa no setor.
              </p>

              <div className="mb-9">
                <h4 className="font-bold text-[#293d47] text-lg md:text-xl mb-4">Especialidades:</h4>
                <ul className="space-y-3">
                  {[
                    "Resolução de contratos de compra e venda",
                    "Indenização por atraso na entrega",
                    "Rescisão direto com a construtora",
                    "Direito imobiliário e cível",
                    "Consultoria jurídica especializada",
                  ].map((item) => (
                    <li key={item}>{checkItem(item)}</li>
                  ))}
                </ul>
              </div>

              <Button
                size="lg"
                className="bg-[#293d47] text-white hover:bg-[#1e2e36] font-bold text-lg h-14 px-8 rounded-md w-full sm:w-auto"
                onClick={createWhatsAppHandler('Agende uma Consulta - Advogada')}
              >
                Agende uma consulta
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section ref={mapaRef} className={`w-full h-80 md:h-[450px] bg-gray-200 overflow-hidden transition-all duration-700 ${mapaAnimation}`}>
        <MapView />
      </section>

      {/* Contato e Footer */}
      <footer id="contato" ref={contatoRef} className={`scroll-mt-24 bg-[#293d47] text-white pt-16 md:pt-24 pb-36 md:pb-28 px-4 mt-0 relative z-10 transition-all duration-700 ${contatoAnimation}`}>
        <div className="container mx-auto">
          <SectionTitle light>Entre em contato</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16 max-w-6xl mx-auto">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-[#4a9b7f]" />
              <h3 className="font-bold text-xl mb-2">WhatsApp</h3>
              <a href="https://wa.me/5511934855187" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-100 hover:text-[#7fc4a9] transition">(11) 9 3485-5187</a>
            </div>
            <div className="text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-[#4a9b7f]" />
              <h3 className="font-bold text-xl mb-2">E-mail</h3>
              <a href="mailto:juridico@santanasadvocacia.com.br" className="text-lg text-gray-100 hover:text-[#7fc4a9] transition break-all">juridico@santanasadvocacia.com.br</a>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-[#4a9b7f]" />
              <h3 className="font-bold text-xl mb-2">Endereço</h3>
              <p className="text-base md:text-lg text-gray-100 leading-relaxed">Avenida Paulista, 302, 1º andar<br/>Bela Vista, São Paulo - SP<br/>CEP: 01310-000</p>
            </div>
          </div>
          <div className="text-center border-t border-gray-600 pt-8">
            <p className="text-gray-300 text-sm md:text-base">© {new Date().getFullYear()} Santana Advocacia Soluções Jurídicas. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur text-gray-100 py-3 md:py-4 pl-4 pr-20 md:pr-28 shadow-lg z-40">
          <div className="container mx-auto flex flex-row items-center justify-between gap-3 sm:gap-6 px-0">
            <p className="text-[11px] leading-snug sm:text-sm sm:leading-relaxed flex-1">
              Este site não se utiliza de "cookies" para coletar informações pessoais ou de navegação. Nossos provedores poderão, contudo, utilizar cookies para coletar dados genéricos e com finalidades estatísticas. Clicando em "Aceitar", você concorda com os termos.
            </p>
            <button
              onClick={() => setShowCookieBanner(false)}
              className="bg-[#4a9b7f] hover:bg-[#3d8b6f] text-white font-bold py-2 px-4 sm:px-6 rounded transition whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              ACEITAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
