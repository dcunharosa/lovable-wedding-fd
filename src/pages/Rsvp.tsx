import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string;

// Exported so SinglePage can embed it without an extra PageLayout wrapper.
// All state is self-contained, so it works correctly in both contexts.
export const RsvpSection = () => {
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
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      toast.success("Thank you for your RSVP!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-foreground/20 rounded-sm px-4 py-3 font-body text-base text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/50 transition-colors";

  if (submitted) {
    return (
      <section id="rsvp" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(215_50%_82%)]">
        <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">Thank You</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-8">
          {form.attending === "yes" ? "See You There!" : "We'll Miss You"}
        </h1>
        <p className="font-display text-xl text-foreground/70 italic max-w-md">
          {form.attending === "yes"
            ? "We can't wait to celebrate with you in Comporta."
            : "Thank you for letting us know. We'll be thinking of you."}
        </p>
      </section>
    );
  }

  return (
      <section id="rsvp" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-[hsl(215_50%_82%)]">
        <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">We'd Love to Know</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-4">RSVP</h1>
        <p className="font-display text-xl text-foreground/70 italic mb-12">Please respond by July 1st, 2026</p>

        <form onSubmit={handleSubmit} className="max-w-lg w-full space-y-6 animate-fade-in">
          <div>
            <label htmlFor="name" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              className={inputClass}
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
              Email *
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
              Will you attend? *
            </label>
            <div className="flex gap-4" role="group" aria-label="Attendance">
              {["yes", "no"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm({ ...form, attending: opt })}
                  className={`flex-1 py-3 rounded-sm border font-body text-base tracking-widest uppercase transition-colors ${
                    form.attending === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-foreground/20 text-foreground/70 hover:border-foreground/40"
                  }`}
                >
                  {opt === "yes" ? "Joyfully Accept" : "Regretfully Decline"}
                </button>
              ))}
            </div>
          </div>

          {form.attending === "yes" && (
            <>
              <div>
                <label htmlFor="guests" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  className={inputClass}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n} className="bg-background text-foreground">
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="dietary" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
                  Dietary Requirements
                </label>
                <input
                  id="dietary"
                  type="text"
                  className={inputClass}
                  placeholder="Any allergies or preferences"
                  value={form.dietary}
                  onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="message" className="font-body text-sm tracking-widest uppercase text-foreground/50 mb-2 block">
              Message (optional)
            </label>
            <textarea
              id="message"
              className={`${inputClass} min-h-[100px] resize-none`}
              placeholder="A note for the couple..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-sm font-body text-base tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send RSVP"}
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
