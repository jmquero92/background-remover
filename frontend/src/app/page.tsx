import Uploader from '@/components/Uploader';
import Link from 'next/link';
import { niches } from '@/lib/niches';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-slate-900 text-white py-16 md:py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Elimina el fondo de cualquier imagen
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto font-light">
          Rápido, gratis y sin perder calidad. Sube tu foto y nuestra inteligencia artificial hará el resto en segundos.
        </p>
      </div>

      <Uploader />

      <section className="max-w-5xl mx-auto py-12 px-4 border-t border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Casos de Uso Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(niches).map(([key, data]) => (
            <Link key={key} href={`/quitar-fondo-${key}`} className="block p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition">
              <h3 className="font-bold text-lg text-slate-800 mb-2">{data.h1}</h3>
              <p className="text-slate-600 text-sm">{data.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 border-t border-slate-100 mt-8">
        <p>© {new Date().getFullYear()} Background Remover. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
