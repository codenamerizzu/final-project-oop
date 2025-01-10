import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata = {
  title: "Final project oop - Kelompok 6 TI2023E",
  description: "Sistem manajemen perpustakaan, dibuat guna memenuhi tugas akhir mata kuliah Pemrograman berorientasi objek",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-200 text-black">
        <div className="bg-white shadow-md p-4">
          <div className="max-w-3xl text-2xl mx-auto">
            Dashboard admin
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          {children}
          <Navbar />
        </div>
      </body>
    </html>
  );
}
