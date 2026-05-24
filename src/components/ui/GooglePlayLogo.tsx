type Props = {
  className?: string;
  title?: string;
};

/**
 * Logo oficial colorido do Google Play (4 cores).
 * Mantido inline porque libs de ícones monocromáticas (Lucide/Simple Icons)
 * não preservam as cores oficiais da marca.
 */
export function GooglePlayLogo({ className = "size-4", title = "Google Play" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      aria-label={title}
      role="img"
      className={className}
    >
      <path
        d="M19.7 19.2L4.3 35.3c.5 1.7 2.1 3 4 3 .8 0 1.5-.2 2.1-.6l17.4-9.9z"
        fill="#EA4335"
      />
      <path
        d="M35.3 16.4l-7.5-4.3-8.4 7.4 8.5 8.3 7.5-4.2c1.3-.7 2.2-2.1 2.2-3.6s-.9-2.9-2.3-3.6z"
        fill="#FBBC04"
      />
      <path
        d="M4.3 4.7c-.1.3-.1.7-.1 1.1v28.5c0 .4 0 .7.1 1.1l16-15.7z"
        fill="#4285F4"
      />
      <path
        d="M19.8 20l8-7.9L10.5 2.3c-.6-.4-1.4-.6-2.2-.6-1.9 0-3.6 1.3-4 3z"
        fill="#34A853"
      />
    </svg>
  );
}
