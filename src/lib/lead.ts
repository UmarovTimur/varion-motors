/** A request from the lead dialog ("Узнайте стоимость"). */
export type Lead = {
  name: string;
  phone: string;
  car: string;
  budget: string;
  /** Page the dialog was opened from, e.g. `/inventory/zethrux-infernum`. */
  page: string;
};

/**
 * Front-end only for now: there is no endpoint yet, so this just waits and
 * logs. Once the server side exists, replace the body with a POST, e.g.
 * `fetch("/api/lead", { method: "POST", body: JSON.stringify(lead) })`, and
 * throw on a non-2xx response so the dialog shows its error state.
 */
export async function submitLead(lead: Lead): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  console.info("[lead] not sent anywhere yet:", lead);
}
