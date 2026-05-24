import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import { GlassCard } from '../components/ui/GlassCard.jsx';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(form);
      toast.success('Welcome back');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-12">
      <Helmet>
        <title>Admin Login | Virbhadra Khobare</title>
      </Helmet>
      <GlassCard className="w-full max-w-md">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">Secure admin access</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Sign in</h1>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input type="email" required placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="h-12 rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none focus-ring" />
          <input type="password" required placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="h-12 rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none focus-ring" />
          <button type="submit" disabled={loading} className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 font-bold text-white disabled:opacity-70 focus-ring">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
