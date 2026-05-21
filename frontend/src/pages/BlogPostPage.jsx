import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '../lib/api.js';
import { GlassCard } from '../components/ui/GlassCard.jsx';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get(`/blogs/${slug}`);
        setPost(response.data);
      } catch (_error) {
        setPost(null);
      }
    };

    load();
  }, [slug]);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-[var(--muted)]">Blog post not found.</p>
        <Link to="/blog" className="mt-4 inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold">Back to blog</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Helmet>
        <title>{post.title} | Virbhadra Khobare</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <GlassCard className="overflow-hidden">
        {post.coverImage ? <img src={post.coverImage} alt={post.title} className="mb-8 h-72 w-full rounded-2xl object-cover" /> : null}
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">{post.tags?.join(' · ')}</p>
        <h1 className="mt-3 font-display text-4xl font-black">{post.title}</h1>
        <p className="mt-4 text-sm text-[var(--muted)]">{post.excerpt}</p>
        <article className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-a:text-cyan-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>
      </GlassCard>
    </div>
  );
}
