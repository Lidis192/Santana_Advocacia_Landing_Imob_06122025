import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { WHATSAPP_URL, trackWhatsAppClick } from "./lib/whatsapp";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Botão flutuante do WhatsApp (registra conversão no Google Ads ao ser clicado)
function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("botao_whatsapp_landing")}
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
      aria-label="Enviar mensagem no WhatsApp"
    >
      <img
        src="/whatsapp-icon.webp"
        alt=""
        width={64}
        height={64}
        className="w-14 h-14 md:w-16 md:h-16 hover:opacity-80 transition-opacity"
      />
    </a>
  );
}

// ssrPath é usado apenas na geração da página pronta (pré-renderização), durante o build.
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <WouterRouter ssrPath={ssrPath}>
          <Routes />
        </WouterRouter>
        <WhatsAppButton />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
