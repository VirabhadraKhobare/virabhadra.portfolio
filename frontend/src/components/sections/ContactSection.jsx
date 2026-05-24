import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../../lib/api.js";
import { GlassCard } from "../ui/GlassCard.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

const initialForm = { name: "", email: "", subject: "", message: "" };

export const ContactSection = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await api.post("/contact", form);
      toast.success("Message sent successfully");
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-shell py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Working form with MongoDB storage and email API"
          description="Every submission is validated, stored, and mailed through the backend contact pipeline."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="space-y-5">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 text-[var(--primary)]" size={20} />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-[var(--muted)]">
                  virbhadrakhobare111@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 text-[var(--primary)]" size={20} />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-sm text-[var(--muted)]">
                  Kolhapur, Maharashtra
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/5 p-4 text-sm text-[var(--muted)]">
              <CheckCircle2 className="mb-2 text-[var(--primary)]" size={18} />
              Drop a message for collaboration, hiring, freelance work, or
              technical consultation.
            </div>
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps?q=Kolhapur%2C%20Maharashtra&z=12&output=embed"
              loading="lazy"
              className="h-64 w-full rounded-2xl border border-[var(--border)]"
            />
          </GlassCard>

          <GlassCard>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Your name"
                  className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 text-sm outline-none focus-ring"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="Email address"
                  className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 text-sm outline-none focus-ring"
                />
              </div>
              <input
                required
                value={form.subject}
                onChange={(event) =>
                  setForm({ ...form, subject: event.target.value })
                }
                placeholder="Subject"
                className="h-12 rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 text-sm outline-none focus-ring"
              />
              <textarea
                required
                rows="7"
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                placeholder="Tell me about your idea or role."
                className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-sm outline-none focus-ring"
              />
              <button
                type="submit"
                disabled={loading}
                className="control-surface inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:scale-[1.01] disabled:opacity-60 focus-ring"
              >
                <Send size={16} /> {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
