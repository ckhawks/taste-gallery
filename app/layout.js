export const metadata = {
  title: "Taste — stlr.cx",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
