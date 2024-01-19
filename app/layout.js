import HoverProvider from "./HoverProvider";

export const metadata = {
  title: "Taste — stlr.cx",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollbarGutter: "stable" }}>
      <body>
        <HoverProvider>{children}</HoverProvider>
      </body>
    </html>
  );
}
