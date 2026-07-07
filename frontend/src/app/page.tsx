import Uploader from '@/components/Uploader';

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

      <footer className="py-8 text-center text-slate-500 border-t border-slate-100">
        <p>© {new Date().getFullYear()} Background Remover. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
