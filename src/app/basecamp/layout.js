export const metadata = {
  title: 'Basecamp — LifeTrack Pro',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function BasecampLayout({ children }) {
  return children;
}
