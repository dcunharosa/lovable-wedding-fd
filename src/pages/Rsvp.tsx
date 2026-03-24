import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";
import { useTranslation } from "@/i18n";
import { CalendarPlus } from "lucide-react";

const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT as string;

function googleCalUrl(title: string, start: string, end: string, location: string, details: string) {
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

// Exported so SinglePage can embed it without an extra PageLayout wrapper.
// All state is self-contained, so it works correctly in both contexts.
export const RsvpSection = () => {
  const { t, language } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    attending: "",
    guests: "1",
    dietary: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.attending) {
      toast.error(t.rsvp.toastErrorRequired);
      return;
    }

    setLoading(true);
    try {
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ ...form, lang: language }),
      });
      setSubmitted(true);
      toast.success(t.rsvp.toastSuccess);
    } catch {
      toast.error(t.rsvp.toastErrorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-foreground/30 rounded-sm px-4 py-3 font-body text-base text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/60 transition-colors";

  const fireConfetti = useCallback(() => {
    const end = Date.now() + 2500;
    const colors = ["#ffffff", "#f0f0f0", "#e8e8e8"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2,
        drift: 0.5,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2,
        drift: -0.5,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  useEffect(() => {
    if (!submitted) return;
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
    if (form.attending === "yes") fireConfetti();
  }, [submitted, form.attending, fireConfetti]);

  if (submitted) {
    const calendarUrl = form.attending === "yes"
      ? googleCalUrl(
          t.calendar.weddingTitle,
          "20260912T123000",
          "20260913T020000",
          "Monte da Varzea, Comporta, Portugal",
          t.calendar.weddingDetails,
        )
      : null;

    return (
      <section id="rsvp" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(220_50%_65%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
        <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">{t.rsvp.thankYou}</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-8 animate-scale-in">
          {form.attending === "yes" ? t.rsvp.seeYouThere : t.rsvp.wellMissYou}
        </h1>
        <p className="font-display text-xl text-foreground/70 italic max-w-md">
          {form.attending === "yes" ? t.rsvp.cantWait : t.rsvp.thinkingOfYou}
        </p>
        {calendarUrl && (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 px-8 py-3 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-sm hover:bg-primary/90 transition-colors"
          >
            <CalendarPlus size={16} />
            {t.rsvp.addToGoogleCalendar}
          </a>
        )}
      </section>
    );
  }

  return (
      <section id="rsvp" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-[hsl(220_50%_65%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
        <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">{t.rsvp.weLoveToKnow}</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-4">{t.rsvp.rsvp}</h1>
        <p className="font-display text-xl text-foreground/70 italic mb-12">{t.rsvp.deadline}</p>

        <form onSubmit={handleSubmit} className="max-w-lg w-full space-y-6 animate-fade-in">
          <div>
            <label htmlFor="name" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
              {t.rsvp.fullName}
            </label>
            <input
              id="name"
              type="text"
              className={inputClass}
              placeholder={t.rsvp.namePlaceholder}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
              {t.rsvp.email}
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              placeholder={t.rsvp.emailPlaceholder}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
              {t.rsvp.willAttend}
            </label>
            <div className="flex gap-4" role="group" aria-label={t.rsvp.attendanceAria}>
              {["yes", "no"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm({ ...form, attending: opt })}
                  className={`flex-1 py-3 rounded-sm border font-body text-base tracking-widest uppercase transition-colors ${
                    form.attending === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-foreground/30 text-foreground/70 hover:border-foreground/50"
                  }`}
                >
                  {opt === "yes" ? t.rsvp.joyfullyAccept : t.rsvp.regretfullyDecline}
                </button>
              ))}
            </div>
          </div>

          {form.attending === "yes" && (
            <>
              <div>
                <label htmlFor="guests" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
                  {t.rsvp.numberOfGuests}
                </label>
                <select
                  id="guests"
                  className={inputClass}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                >
                  {[1, 2].map((n) => (
                    <option key={n} value={n} className="bg-background text-foreground">
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="dietary" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
                  {t.rsvp.dietaryRequirements}
                </label>
                <input
                  id="dietary"
                  type="text"
                  className={inputClass}
                  placeholder={t.rsvp.dietaryPlaceholder}
                  value={form.dietary}
                  onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="message" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
              {t.rsvp.messageLabel}
            </label>
            <textarea
              id="message"
              className={`${inputClass} min-h-[100px] resize-none`}
              placeholder={t.rsvp.messagePlaceholder}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-sm font-body text-base tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? t.rsvp.sending : t.rsvp.sendRsvp}
          </button>
        </form>
      </section>
  );
};

const Rsvp = () => (
  <PageLayout>
    <RsvpSection />
  </PageLayout>
);

export default Rsvp;
