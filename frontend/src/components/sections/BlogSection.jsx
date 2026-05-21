import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';
import { api } from '../../lib/api.js';
import { GlassCard } from '../ui/GlassCard.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export const BlogSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/blogs?limit=3');
        setPosts(response.data.items || []);
      } catch (_error) {
        setPosts([]);
      }
    };

    load();
  }, []);

  return (
    <section id="blog" className="section-shell py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Blog" title="Backend integrated blog previews" description="The public site shows latest posts from MongoDB and links into SEO-friendly detail pages." />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.length > 0 ? posts.map((post, index) => (
            <motion.article key={post.slug || post._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.05 }}>
              <GlassCard className="h-full">
                <FileText className="text-cyan-300" size={22} />
                <h3 className="mt-4 font-display text-xl font-bold">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition hover:gap-3 focus-ring">
                  Read article <ArrowUpRight size={16} />
                </Link>
              </GlassCard>
            </motion.article>
          )) : (
            <GlassCard className="md:col-span-3 text-center">
              <p className="text-sm text-[var(--muted)]">No blog posts found yet. Create them from the admin dashboard to populate this section.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </section>
  );
};
