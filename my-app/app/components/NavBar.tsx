import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div>
        <Link href="/">LOGO</Link>
        <ul>
            <li>Dashboard</li>
            <li>Issue</li>
        </ul>
    </div>
  )
}

export default NavBar