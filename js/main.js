document.addEventListener("DOMContentLoaded", () => {
  // Formularios de contacto: validación local de demostración, sin envío a un servidor.
  document.querySelectorAll(".demo-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const feedback = form.querySelector(".form-feedback");
      feedback.textContent = "¡Gracias! Tu consulta quedó registrada en esta demostración.";
      form.reset();
    });
  });

  // Cotizador referencial: valores ficticios para demostrar interacción con JavaScript.
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!quoteForm.reportValidity()) return;
      const origin = document.getElementById("origen").value;
      const destination = document.getElementById("destino").value;
      const weight = Number(document.getElementById("peso").value);
      const multiplier = Number(document.getElementById("tipo").value);
      const result = document.getElementById("quoteResult");
      if (origin === destination) {
        result.innerHTML = '<strong>Revisa tu ruta</strong><span>El origen y destino deben ser diferentes.</span>';
        return;
      }
      const distanceFactor = (origin === "Lima" || destination === "Lima") ? 1 : 1.25;
      const total = (12 + weight * 3.8) * multiplier * distanceFactor;
      const formatted = total.toLocaleString("es-PE", {style:"currency",currency:"PEN"});
      result.innerHTML = `<strong>${formatted}</strong><span>Precio referencial · ${origin} → ${destination}</span><p class="text-soft small mt-3 mb-0">Solicitante: ${escapeHTML(document.getElementById("cliente").value)} · ${weight} kg</p>`;
    });
  }

  // Rastreo de ejemplo: no consulta una base de datos real.
  const trackForm = document.getElementById("trackForm");
  if (trackForm) {
    trackForm.addEventListener("submit", event => {
      event.preventDefault();
      const code = document.getElementById("trackingCode").value.trim().toUpperCase();
      const output = document.getElementById("trackingResult");
      if (code !== "MIR-2026-001") {
        output.innerHTML = '<div class="alert alert-warning mb-0">No encontramos ese código. Para probar el módulo utiliza <strong>MIR-2026-001</strong>.</div>';
        return;
      }
      output.innerHTML = `<div class="alert alert-success"><strong>Pedido ${code}</strong> · Estado actual: En tránsito</div><div class="tracking-timeline"><div><strong>Solicitud recibida</strong><span>10/11/2026 · 09:15 a. m.</span></div><div><strong>Paquete recogido</strong><span>10/11/2026 · 11:40 a. m.</span></div><div><strong>En tránsito</strong><span>Tu paquete se encuentra en ruta hacia su destino.</span></div><div><strong>Entrega final</strong><span>Pendiente de confirmación</span></div></div>`;
    });
  }
});
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}