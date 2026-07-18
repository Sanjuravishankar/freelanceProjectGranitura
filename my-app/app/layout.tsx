import "./globals.css";
import GlobalEffects from "./component/GlobalEffects";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}