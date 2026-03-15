import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Rey's EV Service",
  description:
    'Professional EV charger installation, maintenance, and diagnostics. Serving homeowners and businesses with clean energy charging solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
