'use client';
import { usePathname } from 'next/navigation';
import SiteBroadcastBanner from '@/components/SiteBroadcastBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

/**
 * PublicShell conditionally mounts public website navigation and chrome
 * only on public marketing and feature routes.
 *
 * Administrative and Operations routes (/basecamp, /admin, etc.) are granted
 * complete viewport ownership with their dedicated SaaS console layouts.
 */
export default function PublicShell({ children }) {
  const pathname = usePathname();

  // Detect admin routes
  const isAdminRoute = Boolean(
    pathname?.startsWith('/basecamp') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/secret-admin-portal')
  );

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteBroadcastBanner />
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
