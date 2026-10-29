'use client';

export default function DownloadModal({ onClose }) {
  const handleDownload = () => {
    alert("LifeTrack Pro APK download started! Check your notification / downloads.");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>📱</div>
        <h3 style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
          Get LifeTrack Pro Free
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-2)', marginBottom: '16px' }}>
          Scan the QR code with your phone or click below to install directly on Android.
        </p>

        <div style={{
          width: '180px', height: '180px', background: '#fff',
          borderRadius: '16px', margin: '16px auto', padding: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg viewBox="0 0 100 100" width="150" height="150">
            <rect width="100" height="100" fill="#ffffff" />
            <rect x="10" y="10" width="24" height="24" fill="#07070D" />
            <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
            <rect x="18" y="18" width="8" height="8" fill="#6C5CE7" />

            <rect x="66" y="10" width="24" height="24" fill="#07070D" />
            <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
            <rect x="74" y="18" width="8" height="8" fill="#6C5CE7" />

            <rect x="10" y="66" width="24" height="24" fill="#07070D" />
            <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
            <rect x="18" y="74" width="8" height="8" fill="#6C5CE7" />

            <rect x="42" y="14" width="5" height="5" fill="#07070D" />
            <rect x="52" y="14" width="5" height="5" fill="#07070D" />
            <rect x="42" y="24" width="5" height="5" fill="#07070D" />
            <rect x="52" y="34" width="5" height="5" fill="#07070D" />
            <rect x="20" y="44" width="5" height="5" fill="#07070D" />
            <rect x="30" y="44" width="5" height="5" fill="#07070D" />
            <rect x="40" y="44" width="5" height="5" fill="#07070D" />
            <rect x="50" y="44" width="5" height="5" fill="#6C5CE7" />
            <rect x="60" y="44" width="5" height="5" fill="#07070D" />
            <rect x="70" y="44" width="5" height="5" fill="#07070D" />
            <rect x="80" y="44" width="5" height="5" fill="#07070D" />
            <rect x="44" y="64" width="6" height="6" fill="#07070D" />
            <rect x="56" y="64" width="6" height="6" fill="#07070D" />
            <rect x="66" y="64" width="6" height="6" fill="#07070D" />
          </svg>
        </div>

        <button className="btn-main" style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }} onClick={handleDownload}>
          <span>🤖</span> Download for Android (Direct APK)
        </button>

        <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>
          Version 2.4.1 (Stable) · Zero Ads · Android 8.0+
        </div>
      </div>
    </div>
  );
}
