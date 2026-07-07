import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuración Base (usualmente obtenida de un env)
const siteUrl = "https://background-remover-app.es"; // Reemplazar con dominio final

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eliminar Fondo de Imágenes Gratis Online | Background Remover",
    template: "%s | Background Remover",
  },
  description: "Herramienta gratuita para eliminar fondos de imágenes al instante. Sube tu foto (JPG/PNG) y recorta el fondo sin perder calidad. Sin registros.",
  keywords: ["quitar fondo", "eliminar fondo", "recortar foto", "quitar fondo online", "quitar fondo gratis sin registro", "borrar fondo imagen"],
  authors: [{ name: "Background Remover Team" }],
  creator: "Background Remover Team",
  publisher: "Background Remover Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Eliminar Fondo de Imágenes Gratis Online",
    description: "Recorta el fondo de tus fotos gratis y al instante sin perder calidad.",
    url: siteUrl,
    siteName: "Background Remover",
    images: [
      {
        url: "/og-image.jpg", // Idealmente crear una imagen para redes
        width: 1200,
        height: 630,
        alt: "Background Remover Banner",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eliminar Fondo de Imágenes Gratis Online",
    description: "Recorta el fondo de tus fotos gratis y al instante sin perder calidad.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'es-ES': siteUrl,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// JSON-LD para Schema.org (SoftwareApplication)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Background Remover",
  "operatingSystem": "All",
  "applicationCategory": "MultimediaApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Herramienta web gratuita para eliminar el fondo de cualquier imagen de forma automática usando Inteligencia Artificial."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Cambiado a español
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
