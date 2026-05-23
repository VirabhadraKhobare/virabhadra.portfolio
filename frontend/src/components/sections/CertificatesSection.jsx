import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, FileDown, ShieldCheck } from "lucide-react";
import { certificateData } from "../../data/portfolio.js";
import { GlassCard } from "../ui/GlassCard.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";
import { Modal } from "../ui/Modal.jsx";

export const CertificatesSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <section id="certificates" className="section-shell py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certificates"
          title="Interactive gallery with PDF preview modal"
          description="Hover states, preview actions, and soft glass cards create a premium credential display."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certificateData.map((certificate, index) => (
            <motion.article
              key={certificate.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard className="overflow-hidden p-0">
                <img
                  src={certificate.thumbnailUrl}
                  alt={certificate.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--primary)]">
                    {certificate.issuer}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">
                    {certificate.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Issued {certificate.issuedAt}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(certificate)}
                      className="control-surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition hover:scale-105 focus-ring"
                    >
                      <Eye size={16} /> Preview
                    </button>
                    <a
                      href={certificate.pdfUrl}
                      className="control-surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition focus-ring"
                    >
                      <FileDown size={16} /> PDF
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.article>
          ))}
        </div>

        <Modal
          open={Boolean(selectedCertificate)}
          title={selectedCertificate?.title || ""}
          onClose={() => setSelectedCertificate(null)}
        >
          {selectedCertificate ? (
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <img
                src={selectedCertificate.thumbnailUrl}
                alt={selectedCertificate.title}
                className="h-full min-h-64 w-full rounded-2xl object-cover"
              />
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
                  <ShieldCheck size={16} /> Verified credential showcase
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  This modal is wired for previewing certificate PDFs, asset
                  links, or cloud-hosted verification pages in a polished,
                  recruiter-friendly format.
                </p>
                <a
                  href={selectedCertificate.verificationUrl}
                  className="control-surface mt-6 inline-flex rounded-full px-4 py-2 text-sm font-bold transition hover:scale-105 focus-ring"
                >
                  View verification
                </a>
              </div>
            </div>
          ) : null}
        </Modal>
      </div>
    </section>
  );
};
