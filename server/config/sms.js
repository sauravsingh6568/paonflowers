// Plug any SMS provider here (Twilio, Vonage, Unifonic). For now, DRY_RUN logs to console.
export async function sendSMS({ to, body }) {
  if (process.env.SMS_DRY_RUN === "true") {
    console.log(`[SMS][DRY_RUN] To: ${to} | ${body}`);
    return { ok: true, provider: "DRY_RUN" };
  }
  // Example placeholder (implement your provider call here):
  // await twilio.messages.create({ to, from: process.env.TWILIO_FROM, body });
  return { ok: true, provider: "custom" };
}
