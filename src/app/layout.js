import './globals.css';
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
    default: 'LifeTrack Pro — All-in-One Focus, Flashcards & Habit Tracker App',
    template: '%s | LifeTrack Pro'
  },
  description: 'LifeTrack Pro unifies Pomodoro focus timer with ambient soundscapes, SM-2 spaced repetition flashcards, daily habit streaks, and live study rooms.',
  keywords: [
    'focus timer',
    'pomodoro timer',
    'spaced repetition app',
    'anki alternative',
    'habit tracker',
    'live study rooms',
    'jee study tracker',
    'neet focus app',
    'lifetrack pro',
    'productivity life os'
  ],
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
    url: 'https://lifetrackpro.in/',
    title: 'LifeTrack Pro — All-in-One Focus, Flashcards & Habit Tracker App',
    description: 'Stop juggling 5 apps. Pomodoro timer, SM-2 flashcard spaced repetition, habit streaks & real-time study rooms in one beautiful interface.',
    siteName: 'LifeTrack Pro',
    images: [
      {
        url: '/play_store_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'LifeTrack Pro - Your Complete Life OS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeTrack Pro — Your Complete Life & Study OS',
    description: 'Focus timer, spaced repetition, habit tracking & live study rooms. Achieve effortless consistency.',
    images: ['/play_store_feature_graphic.png'],
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${dmMono.variable}`}>
      <head>
        <script
          async
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
