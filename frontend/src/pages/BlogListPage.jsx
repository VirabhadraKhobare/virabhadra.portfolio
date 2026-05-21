import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { api } from '../lib/api.js';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { SectionHeading } from '../components/ui/SectionHeading.jsx';
import { Helmet as Meta } from 'react-helmet-async';

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/blogs?status=published&limit=50');
        setPosts(response.data.items || []);
      } catch (_error) {
        setPosts([]);
      }
    };

    load();
  }, []);

  const filtered = useMemo(
    () => posts.filter((post) => [post.title, post.excerpt, post.tags?.join(' ')].join(' ').toLowerCase().includes(query.toLowerCase())),
    [posts, query]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Meta>
        <title>Blog | Virbhadra Khobare</title>
      </Meta>
      <SectionHeading eyebrow="Blog" title="SEO-ready posts from MongoDB" description="Browse technical articles, project breakdowns, and engineering notes." />
      <div className="mt-8 flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-3">
        <Search size={18} className="text-cyan-300" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" className="w-full bg-transparent outline-none" />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
          <GlassCard key={post.slug || post._id} className="h-full">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">{post.author || 'Virbhadra Khobare'}</p>
            <h2 className="mt-3 font-display text-2xl font-bold">{post.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-bold text-cyan-300">Read post</Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
