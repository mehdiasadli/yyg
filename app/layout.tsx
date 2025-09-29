import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import keywords from '@/seo/keywords';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'YayaGo | Rent Cars, List Your Car & Auto Services in Dubai',
    template: '%s | YayaGo | Rent Cars, List Your Car & Auto Services in Dubai',
  },
  description:
    'YayaGo is Dubai’s premium car-sharing and auto-service platform. Discover and rent cars directly from verified owners, or list your own vehicle and keep 100% of the earnings (0% commission). From rentals to auto services, YayaGo simplifies mobility and empowers car owners—fair, transparent, and effortless.',
  keywords,
  openGraph: {
    title: 'YayaGo | Drive Freedom, Earn Fully',
    description:
      'YayaGo is Dubai’s premium car-sharing platform. Rent cars, list your own with 0% commission, and access trusted auto services – all in one place.',
    url: 'https://yayago.ae',
    siteName: 'YayaGo',
    images: [],
    locale: 'en_US', // TODO: make it dynamic (EN, AR, RU)
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YayaGo | Drive Freedom, Earn Fully',
    description:
      'YayaGo is Dubai’s premium car-sharing platform. Rent cars, list your own with 0% commission, and access trusted auto services – all in one place.',
    images: [],
  },
  alternates: {
    canonical: 'https://yayago.ae',
    languages: {
      'en-US': 'https://yayago.ae/en',
      'ar-AE': 'https://yayago.ae/ar',
      'ru-RU': 'https://yayago.ae/ru',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'YayaGo', url: 'https://yayago.ae' }],
  creator: 'YayaGo',
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
