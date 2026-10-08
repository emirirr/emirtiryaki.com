// Yazdır düğmesi (satır içi onclick yerine — CSP script-src 'self' ile uyumlu)
document.querySelectorAll("[data-print]").forEach((b) => b.addEventListener("click", () => window.print()));
