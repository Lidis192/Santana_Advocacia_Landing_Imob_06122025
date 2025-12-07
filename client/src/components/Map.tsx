
export function MapView() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "450px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.445215583104!2d-46.65232772502084!3d-23.566431861777836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b8ea2d5651%3A0xdde30aa99b69f801!2sAv.%20Paulista%2C%20302%20-%201%C2%BA%20Andar%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-300!5e1!3m2!1spt-BR!2sbr!4v1765071295909!5m2!1spt-BR!2sbr"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
