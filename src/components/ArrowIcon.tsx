export default function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      strokeWidth={1.5}
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}
