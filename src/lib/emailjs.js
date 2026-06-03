export function isEmailJsConfigured() {
  const {
    VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID,
    VITE_EMAILJS_PUBLIC_KEY,
  } = import.meta.env

  return Boolean(
    VITE_EMAILJS_SERVICE_ID &&
      VITE_EMAILJS_TEMPLATE_ID &&
      VITE_EMAILJS_PUBLIC_KEY,
  )
}

export function getEmailJsConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  }
}
