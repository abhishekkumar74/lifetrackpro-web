import './globals.css';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google';
import PublicShell from '@/components/PublicShell';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-mono',
});

export const metadata = {
  metadataBase: new URL('https://lifetrackpro.in'),
  title: {
    default: 'All-in-One Study OS & Productivity App | LifeTrack Pro',
    template: '%s | LifeTrack Pro'
  },
  description: 'LifeTrack Pro is an all in one study app uniting Pomodoro focus, SM-2 flashcards, habit streaks & silent study rooms. Start building deep focus for free today.',
  authors: [{ name: 'LifeTrack Pro' }],
  creator: 'Abhishek Kumar',
  publisher: 'LifeTrack Pro',
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
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lifetrackpro.in',
    title: 'All-in-One Study OS & Productivity App | LifeTrack Pro',
    description: 'LifeTrack Pro is an all in one study app uniting Pomodoro focus, SM-2 flashcards, habit streaks & silent study rooms. Start building deep focus for free today.',
    siteName: 'LifeTrack Pro',
    images: [
      {
        url: 'https://lifetrackpro.in/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'LifeTrack Pro - All-in-One Focus, Flashcards & Habit Tracker App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All-in-One Study OS & Productivity App | LifeTrack Pro',
    description: 'LifeTrack Pro is an all in one study app uniting Pomodoro focus, SM-2 flashcards, habit streaks & silent study rooms. Start building deep focus for free today.',
    images: ['https://lifetrackpro.in/og/og-default.png'],
    creator: '@LifeTrackPro',
  },
  other: {
    'google-adsense-account': 'ca-pub-3825001060710787',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2563EB',
};

const sitewideJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://lifetrackpro.in/#organization',
      name: 'LifeTrack Pro',
      url: 'https://lifetrackpro.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lifetrackpro.in/icon.png',
        width: 192,
        height: 192,
      },
      sameAs: [
        'https://www.instagram.com/lifetrackpro/',
        'https://www.linkedin.com/company/lifetrackpro',
        'https://t.me/lifetrackpro',
        'https://play.google.com/store/apps/details?id=com.lifetrackpro.app',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://lifetrackpro.in/#website',
      url: 'https://lifetrackpro.in',
      name: 'LifeTrack Pro',
      publisher: {
        '@id': 'https://lifetrackpro.in/#organization',
      },
      inLanguage: 'en-IN',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${plusJakartaSans.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitewideJsonLd) }}
        />
        <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3825001060710787"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <PublicShell>
          {children}
        </PublicShell>
      </body>
    </html>
  );
}
