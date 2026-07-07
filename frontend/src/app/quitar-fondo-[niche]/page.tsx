import { niches } from '@/lib/niches';
import Uploader from '@/components/Uploader';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return Object.keys(niches).map((niche) => ({ niche }));
}

type Props = {
  params: Promise<{ niche: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche } = await params;
  const nicheData = niches[niche as keyof typeof niches];
  if (!nicheData) return {};
  
  return {
    title: nicheData.title,
    description: nicheData.description,
    alternates: {
      canonical: `https://background-remover-app.es/quitar-fondo-${niche}`,
    },
  };
}

export default async function NichePage({ params }: Props) {
  const { niche } = await params;
  const nicheData = niches[niche as keyof typeof niches];
  if (!nicheData) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `¿Cómo quitar el fondo a ${nicheData.h1.toLowerCase().replace('quitar fondo de ', '')} gratis?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Simplemente sube tu imagen arriba y nuestra inteligencia artificial eliminará el fondo automáticamente en segundos, sin perder calidad.`
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav className="bg-slate-900 px-4 py-4 text-white border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-xl hover:text-blue-400 transition">
            ✨ Background Remover
          </Link>
        </div>
      </nav>

      <div className="bg-slate-900 text-white py-16 md:py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          {nicheData.h1}
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto font-light">
          {nicheData.subtitle}
        </p>
      </div>

      <Uploader />

      <footer className="py-8 text-center text-slate-500 border-t border-slate-100">
        <p>© {new Date().getFullYear()} Background Remover. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
