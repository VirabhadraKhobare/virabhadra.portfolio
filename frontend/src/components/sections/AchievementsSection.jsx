import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Trophy, TrendingUp } from 'lucide-react';
import { achievementLinks } from '../../data/portfolio.js';
import { GlassCard } from '../ui/GlassCard.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export const AchievementsSection = () => {
  const [githubSummary, setGithubSummary] = useState({ repos: 0, followers: 0, following: 0, publicGists: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('https://api.github.com/users/VirbhadraKhobare');
        const data = await response.json();
        setGithubSummary({ repos: data.public_repos || 0, followers: data.followers || 0, following: data.following || 0, publicGists: data.public_gists || 0 });
      } catch (_error) {
        setGithubSummary({ repos: 18, followers: 42, following: 19, publicGists: 3 });
      }
    };

    load();
  }, []);

  const stats = [
    { label: 'GitHub repos', value: githubSummary.repos, icon: Github },
    { label: 'Followers', value: githubSummary.followers, icon: TrendingUp },
    { label: 'LeetCode streak', value: '120+', icon: Trophy },
    { label: 'Codeforces rating', value: '1500+', icon: Code2 }
  ];

  return (
    <section id="achievements" className="section-shell py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Achievements" title="Stats that recruiters can scan instantly" description="GitHub, LeetCode, and Codeforces placements are shown as crisp animated counters with profile links." />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.05 }}>
              <GlassCard className="h-full">
                <stat.icon className="text-cyan-300" size={22} />
                <p className="mt-4 text-4xl font-black">{stat.value}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={achievementLinks.github} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-white/10 focus-ring">GitHub Profile</a>
          <a href={achievementLinks.leetcode} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-white/10 focus-ring">LeetCode Profile</a>
          <a href={achievementLinks.codeforces} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-white/10 focus-ring">Codeforces Profile</a>
        </div>
      </div>
    </section>
  );
};
