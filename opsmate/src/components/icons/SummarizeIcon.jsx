export default function SummarizeIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Three horizontal lines */}
      <path
        d="M2 7C2 6.44772 2.44772 6 3 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H3C2.44772 8 2 7.55228 2 7Z"
        fill="currentColor"
      />
      <path
        d="M2 12C2 11.4477 2.44772 11 3 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H3C2.44772 13 2 12.5523 2 12Z"
        fill="currentColor"
      />
      <path
        d="M2 17C2 16.4477 2.44772 16 3 16H12C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18H3C2.44772 18 2 17.5523 2 17Z"
        fill="currentColor"
      />
      {/* 4-pointed sparkle in top-right */}
      <path
        d="M19 2L19.5 4.5L22 5L19.5 5.5L19 8L18.5 5.5L16 5L18.5 4.5L19 2Z"
        fill="currentColor"
      />
    </svg>
  )
}


