import Link from 'next/link';
import { HomeIcon, SparklesIcon } from '@/components/Icons';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The study page or resource you are looking for does not exist or has been moved.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="container subpage-container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div className="section-eyebrow">404 Error</div>
      <h1 className="subpage-h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '16px' }}>
        Page Not Found
      </h1>
      <p className="subpage-lead" style={{ maxWidth: '520px', margin: '0 auto 32px' }}>
        We couldn&apos;t find the study page or feature you were searching for. It may have been moved or updated.
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn-main" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <HomeIcon size={16} /> Return to Home
        </Link>
        <Link href="/features" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <SparklesIcon size={16} /> Explore All Features
        </Link>
        <Link href="/faq" className="btn-secondary">
          Browse FAQs
        </Link>
      </div>
    </div>
  );
}
