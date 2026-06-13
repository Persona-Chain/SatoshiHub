interface BountyBeeLogoProps {
  className?: string;
  iconClassName?: string;
}

const BountyBeeLogo = ({
  className = 'h-14 w-14',
  iconClassName = 'h-9 w-9',
}: BountyBeeLogoProps) => (
  <div
    className={`relative flex items-center justify-center rounded-sm bg-gradient-to-br from-amber-300 via-[#F7931A] to-yellow-700 shadow-[0_0_30px_rgba(247,147,26,0.22)] ${className}`}
    aria-hidden="true"
  >
    <svg viewBox="0 0 64 64" className={iconClassName} focusable="false">
      <path d="M18 24h28l-3 28H21L18 24Z" fill="#8A4B16" />
      <path d="M15 20c0-4 5-7 17-7s17 3 17 7-5 7-17 7-17-3-17-7Z" fill="#A85F20" />
      <path d="M21 20c0-2 4-4 11-4s11 2 11 4-4 4-11 4-11-2-11-4Z" fill="#4A2B13" opacity="0.45" />
      <path d="M20 25c3 4 7 1 10 4 4 4 8 4 14-2l-2 14c-3 3-7 2-10-1-4-4-8-2-13-5l-1-10Z" fill="#F6B21A" />
      <path d="M41 14c2-5 7-6 10-3 3 4 1 9-5 11" fill="none" stroke="#F6B21A" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 31c-4 1-6 4-5 7s5 4 9 1" fill="none" stroke="#8A4B16" strokeWidth="4" strokeLinecap="round" />
      <path d="M46 24c4 0 7 3 7 7s-3 7-8 7" fill="none" stroke="#8A4B16" strokeWidth="4" strokeLinecap="round" />
      <path d="M25 52h14" stroke="#5B3515" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>
);

export default BountyBeeLogo;
