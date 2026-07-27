export function googleCalUrl(
  title: string,
  start: string,
  end: string,
  location: string,
  details: string,
) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    location,
    details,
    ctz: "Europe/Lisbon",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Canonical venue location for calendar events */
export const VENUE_LOCATION = "Monte da Várzea, Comporta, Portugal";

/** Friday pre-wedding drinks location */
export const PRE_WEDDING_LOCATION = "Comporta Roots, Comporta, Portugal";
