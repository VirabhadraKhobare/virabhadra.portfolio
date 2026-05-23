export const Modal = ({ open, title, onClose, children }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-300">Preview</p>
            <h3 className="font-display text-2xl font-bold">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="control-surface rounded-full px-4 py-2 text-sm font-semibold transition focus-ring"
          >
            Close
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};
