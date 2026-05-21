import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api.js';
import { GlassCard } from '../ui/GlassCard.jsx';
import { Search, Trash2, PencilLine, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const emptyValueFor = (field) => {
  if (field.type === 'number') return 0;
  if (field.type === 'checkbox') return false;
  return '';
};

export const CrudPanel = ({ title, description, endpoint, fields, listKey = 'items', transformOut = (value) => value, transformIn = (value) => value, readOnly = false }) => {
  const blank = useMemo(() => Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? emptyValueFor(field)])), [fields]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(false);

  const loadItems = async () => {
    const response = await api.get(`${endpoint}${search ? `?search=${encodeURIComponent(search)}` : ''}`);
    setItems(response.data[listKey] || response.data || []);
  };

  useEffect(() => {
    loadItems().catch(() => {});
  }, [endpoint]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = transformOut(form);
      if (editingId) {
        await api.put(`${endpoint}/${editingId}`, payload);
        toast.success(`${title} updated`);
      } else {
        await api.post(endpoint, payload);
        toast.success(`${title} created`);
      }
      setForm(blank);
      setEditingId('');
      await loadItems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to save item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm(transformIn(item));
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      toast.success('Deleted');
      await loadItems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete item');
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <GlassCard>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">{title}</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{description}</h3>
          </div>
          <button type="button" onClick={loadItems} className="rounded-full border border-[var(--border)] p-2 focus-ring" aria-label="Reload">
            <Search size={18} />
          </button>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-full border border-[var(--border)] px-4 py-3">
          <Search size={16} className="text-cyan-300" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && loadItems()} placeholder="Search records" className="w-full bg-transparent outline-none" />
        </div>
        <div className="mt-6 max-h-[560px] space-y-4 overflow-auto pr-1">
          {items.map((item) => (
            <div key={item._id} className="rounded-2xl border border-[var(--border)] bg-white/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{item.title || item.name || item.company || item.subject}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item.slug || item.category || item.role || item.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!readOnly ? (
                    <>
                      <button type="button" onClick={() => handleEdit(item)} className="rounded-full border border-[var(--border)] p-2 focus-ring"><PencilLine size={16} /></button>
                      <button type="button" onClick={() => handleDelete(item._id)} className="rounded-full border border-[var(--border)] p-2 focus-ring"><Trash2 size={16} /></button>
                    </>
                  ) : null}
                </div>
              </div>
              {item.content ? (
                <div className="prose prose-invert mt-4 max-w-none text-sm">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{String(item.content).slice(0, 280)}</ReactMarkdown>
                </div>
              ) : item.message ? <p className="mt-3 text-sm text-[var(--muted)]">{item.message}</p> : null}
            </div>
          ))}
        </div>
      </GlassCard>

      {!readOnly ? (
        <GlassCard>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">Editor</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{editingId ? 'Update item' : 'Create item'}</h3>
          </div>
          <button type="button" onClick={() => { setForm(blank); setEditingId(''); }} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold focus-ring">
            <Plus size={16} className="mr-2 inline" /> Reset
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          {fields.map((field) => (
            <label key={field.name} className="grid gap-2 text-sm font-semibold">
              <span className="text-[var(--muted)]">{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea rows={field.rows || 4} value={form[field.name]} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })} className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus-ring" />
              ) : field.type === 'checkbox' ? (
                <input type="checkbox" checked={Boolean(form[field.name])} onChange={(event) => setForm({ ...form, [field.name]: event.target.checked })} className="h-5 w-5 accent-cyan-400" />
              ) : (
                <input type={field.type || 'text'} value={form[field.name]} onChange={(event) => setForm({ ...form, [field.name]: field.type === 'number' ? Number(event.target.value) : event.target.value })} className="h-12 rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none focus-ring" />
              )}
            </label>
          ))}
          <button type="submit" disabled={loading} className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 font-bold text-white disabled:opacity-60 focus-ring">
            {loading ? 'Saving...' : editingId ? 'Update item' : 'Create item'}
          </button>
        </form>
        </GlassCard>
      ) : null}
    </div>
  );
};
