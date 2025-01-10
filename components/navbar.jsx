'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const menu = [
    { title: 'Beranda', link: '/' },
    { title: 'Tambah buku', link: '/add-book' },
    { title: 'Tambah member', link: '/add-member' },
    { title: 'Peminjaman buku', link: '/add-loan' }
  ]

  return (
    <>
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-auto bg-white border-2 border-black shadow-md rounded-lg p-2">
        <ul className="flex flex-row gap-2 py-3">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                key={index}
                href={item.link}
                className={`font-extralight rounded-md border-2 hover:border-black shadow-md p-4 ${
                  pathname === item.link ? 'border-2 border-black' : 'border-transparent'}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
