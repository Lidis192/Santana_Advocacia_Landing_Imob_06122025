// Contato via WhatsApp + registro de conversão (Google Ads) e evento (Google Analytics).
// Todos os botões e links de WhatsApp da página devem usar estas funções,
// para que cada clique seja contado como conversão no Google Ads.

export const WHATSAPP_NUMBER = "5511934855187";
export const WHATSAPP_MESSAGE =
  "Olá! Gostaria de saber mais sobre os serviços de atraso na entrega de imóvel.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const ADS_CONVERSION_ID = "AW-11442555186/C431CI6D8oIZELKSntAq";

type Gtag = (...args: unknown[]) => void;

/** Registra o clique no Google Ads (conversão) e no Google Analytics (evento). */
export function trackWhatsAppClick(origem: string) {
  const gtag = (typeof window !== "undefined" ? (window as unknown as { gtag?: Gtag }).gtag : undefined);
  if (typeof gtag !== "function") return;

  gtag("event", "conversion", {
    send_to: ADS_CONVERSION_ID,
    value: 1.0,
    currency: "BRL",
  });

  gtag("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: origem,
  });
}

/** Para botões: registra a conversão e abre o WhatsApp em nova aba. */
export function openWhatsApp(origem: string) {
  trackWhatsAppClick(origem);
  window.open(WHATSAPP_URL, "_blank", "noopener");
}
