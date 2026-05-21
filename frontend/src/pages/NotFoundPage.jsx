import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-300">404</p>
        <h1 className="mt-3 font-display text-4xl font-black">Page not found</h1>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-bold text-white">Return home</Link>
      </div>
    </div>
  );
}
