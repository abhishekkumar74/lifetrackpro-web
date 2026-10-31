import './globals.css';
import PublicShell from '@/components/PublicShell';

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
  alternates: {
    canonical: './',
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
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563EB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" 
          rel="stylesheet" 
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
