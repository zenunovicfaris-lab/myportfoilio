// Root layout — minimal passthrough.
// Full layout (html, body, fonts, sidebar, metadata) lives in app/[locale]/layout.tsx
// so that lang attribute can be set dynamically per locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
