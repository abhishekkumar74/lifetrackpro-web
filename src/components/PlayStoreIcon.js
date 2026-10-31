export default function PlayStoreIcon({ size = 16, className = '', style = {} }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <path 
        d="M3.609 1.814A1.5 1.5 0 0 0 3 3.064v17.872c0 .502.247.973.664 1.258l9.645-9.646L3.609 1.814z" 
        fill="#00D2FF"
      />
      <path 
        d="M16.924 9.176l-3.615 3.372 3.615 3.372 4.18-2.375c1.19-.676 1.19-2.668 0-3.344l-4.18-2.025z" 
        fill="#FFD600"
      />
      <path 
        d="M3.664 22.194a1.503 1.503 0 0 0 1.64.083l11.62-6.589-3.615-3.372-9.645 9.878z" 
        fill="#FF334B"
      />
      <path 
        d="M13.309 12.316l3.615-3.372L5.304 2.355a1.503 1.503 0 0 0-1.695.127l9.7 9.834z" 
        fill="#00E676"
      />
    </svg>
  );
}
