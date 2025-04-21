import React from 'react'
import Link from 'next/link'

const Navbar: React.FC = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        background: '#f4f4f4',
      }}
    >
      <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>
        Page 1
      </Link>
      <Link href="/2" style={{ textDecoration: 'none', color: 'black' }}>
        Page 2
      </Link>
    </nav>
  )
}

export default Navbar
