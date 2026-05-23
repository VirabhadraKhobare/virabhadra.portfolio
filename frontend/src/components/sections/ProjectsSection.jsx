import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Search } from "lucide-react";
import { projectData } from "../../data/portfolio.js";
import { GlassCard } from "../ui/GlassCard.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

export const ProjectsSection = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    ...new Set(projectData.map((project) => project.category)),
  ];

  const filteredProjects = useMemo(() => {
    return projectData.filter((project) => {
      const matchesCategory =
        activeFilter === "All" || project.category === activeFilter;
      const matchesSearch = [
        project.title,
        project.description,
        project.tech.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <section id="projects" className="section-shell py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Recruiter-friendly case studies with filtering and search"
          description="Each project card highlights the outcome, stack, and direct action links to live demos and repositories."
        />

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-ring ${activeFilter === filter ? "border-[var(--primary)] bg-[var(--primary)] text-white" : "control-surface"}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <label className="glass-card flex items-center gap-3 rounded-full px-4 py-3 lg:min-w-96">
            <Search size={18} className="text-[var(--primary)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
            />
          </label>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06 }}
            >
              <GlassCard className="group h-full overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                    {project.category}
                  </span>
                  {project.featured ? (
                    <span className="text-xs font-semibold text-[var(--primary)]">
                      Featured
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-xs font-semibold text-[var(--text)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={project.liveUrl}
                    className="control-surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition hover:scale-105 focus-ring"
                  >
                    Live Demo <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="control-surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition focus-ring"
                  >
                    <Github size={16} /> GitHub
                  </a>
                </div>
              </GlassCard>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
