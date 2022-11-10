/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import './global.css';

export default function RootLayout({children}) {
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}