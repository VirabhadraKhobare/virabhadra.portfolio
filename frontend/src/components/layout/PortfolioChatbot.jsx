import { Bot, X, SendHorizonal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projectData } from '../../data/portfolio.js';

const quickReplies = [
  'What do you build?',
  'How do I hire you?',
  'Which projects stand out?'
];

const getReply = (message) => {
  const normalized = message.toLowerCase();

  if (normalized.includes('hire')) {
    return 'Reach out via the contact form for freelance, startup, or full-time opportunities. I reply quickly with scope, timeline, and stack recommendations.';
  }

  if (normalized.includes('project')) {
    return `Featured projects include ${projectData.slice(0, 3).map((project) => project.title).join(', ')}.`;
  }

  return 'I build premium React, Node.js, MongoDB, and AI/ML experiences with strong performance and polished UI.';
};

export const PortfolioChatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [log, setLog] = useState([
    { role: 'assistant', text: 'Hi, I am the portfolio assistant. Ask about services, projects, or hiring.' }
  ]);

  const canSend = useMemo(() => message.trim().length > 0, [message]);

  const handleSend = (text) => {
    const prompt = text || message;
    if (!prompt.trim()) {
      return;
    }

    setLog((current) => [...current, { role: 'user', text: prompt }, { role: 'assistant', text: getReply(prompt) }]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-28 right-4 z-50 md:bottom-8 md:right-8">
      {open ? (
        <div className="w-[min(92vw,360px)] rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-4 shadow-soft backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">AI Portfolio Chat</p>
              <p className="text-xs text-[var(--muted)]">Instant portfolio guidance</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-[var(--muted)] transition hover:bg-white/10 focus-ring">
              <X size={16} />
            </button>
          </div>
          <div className="mt-4 max-h-72 space-y-3 overflow-auto pr-1">
            {log.map((entry, index) => (
              <div key={`${entry.role}-${index}`} className={`rounded-2xl px-3 py-2 text-sm ${entry.role === 'user' ? 'ml-auto w-fit bg-cyan-500/15 text-[var(--text)]' : 'bg-white/5 text-[var(--muted)]'}`}>
                {entry.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button key={reply} type="button" onClick={() => handleSend(reply)} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text)] transition hover:bg-white/10 focus-ring">
                {reply}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleSend()} placeholder="Ask me anything..." className="h-11 flex-1 rounded-full border border-[var(--border)] bg-transparent px-4 text-sm outline-none focus-ring" />
            <button type="button" onClick={() => handleSend()} disabled={!canSend} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white transition hover:scale-105 disabled:opacity-50 focus-ring">
              <SendHorizonal size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 text-white shadow-glow transition hover:scale-105 focus-ring" aria-label="Open chatbot">
          <Bot size={20} />
        </button>
      )}
    </div>
  );
};
