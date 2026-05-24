import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Code2, Trophy, TrendingUp } from "lucide-react";
import { achievementLinks } from "../../data/portfolio.js";
import { api } from "../../lib/api.js";
import { GlassCard } from "../ui/GlassCard.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

export const AchievementsSection = () => {
  const [summary, setSummary] = useState({
    github: {
      repos: 0,
      followers: 0,
      following: 0,
      publicGists: 0,
    },
    leetcode: {
      solved: 0,
      ranking: null,
    },
    codeforces: {
      rating: 0,
      maxRating: 0,
      rank: "unrated",
    },
    profileLinks: achievementLinks,
    lastUpdated: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/achievements/summary");
        setSummary(response.data);
      } catch (_error) {
        setSummary((currentSummary) => ({
          ...currentSummary,
          github: {
            repos: 18,
            followers: 42,
            following: 19,
            publicGists: 3,
          },
          leetcode: {
            solved: 120,
            ranking: null,
          },
          codeforces: {
            rating: 1500,
            maxRating: 1500,
            rank: "specialist",
          },
        }));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = [
    {
      label: "GitHub repos",
      value: loading ? "—" : summary.github.repos,
      icon: Github,
    },
    {
      label: "Followers",
      value: loading ? "—" : summary.github.followers,
      icon: TrendingUp,
    },
    {
      label: "LeetCode solved",
      value: loading ? "—" : summary.leetcode.solved,
      icon: Trophy,
    },
    {
      label: "Codeforces rating",
      value: loading ? "—" : summary.codeforces.rating,
      icon: Code2,
    },
  ];

  const profileLinks = summary.profileLinks || achievementLinks;

  return (
    <section id="achievements" className="section-shell py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Achievements"
          title="Key metrics and platform activity"
          description="Live-synced platform statistics and coding profile highlights relevant to early-career evaluation."
        />

        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          <span className="control-surface rounded-full px-3 py-1 text-[0.68rem] tracking-[0.22em] text-[var(--primary)]">
            Live sync
          </span>
          {summary.lastUpdated ? (
            <span>
              Updated {new Date(summary.lastUpdated).toLocaleString()}
            </span>
          ) : null}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="h-full">
                <stat.icon className="text-[var(--primary)]" size={22} />
                <p className="mt-4 text-4xl font-black">{stat.value}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={profileLinks.github}
            className="control-surface rounded-full px-4 py-2 text-sm font-semibold transition focus-ring"
          >
            GitHub Profile
          </a>
          <a
            href={profileLinks.leetcode}
            className="control-surface rounded-full px-4 py-2 text-sm font-semibold transition focus-ring"
          >
            LeetCode Profile
          </a>
          <a
            href={profileLinks.codeforces}
            className="control-surface rounded-full px-4 py-2 text-sm font-semibold transition focus-ring"
          >
            Codeforces Profile
          </a>
        </div>
      </div>
    </section>
  );
};
