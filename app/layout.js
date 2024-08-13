import "./globals.css";
import Desktop from "@/components/navbar/Desktop";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Texort | SAAS",
  description: "Developed by Musfikur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Desktop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
