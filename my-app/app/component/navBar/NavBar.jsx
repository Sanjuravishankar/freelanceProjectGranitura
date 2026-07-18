"use client";

import { useState } from "react";
import Link from "next/link";
import "./nav.css";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav id="navbar" className={open ? "open" : ""}>
      <Link href="/" className="nav-logo">
        Gran<span>i</span>tura
      </Link>

      <ul className="nav-links">
        <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
        <li><a href="#catalog" onClick={() => setOpen(false)}>Catalog</a></li>
        <li><a href="#process" onClick={() => setOpen(false)}>Process</a></li>

        <li>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </li>

        {/* <li className="mobile-cta">
          <Link href="/contact" onClick={() => setOpen(false)}>
            Request Quote
          </Link>
        </li> */}
      </ul>

      <Link href="/catlog-product" className="nav-cta desktop-cta">
        Request Quote
      </Link>

      <button
        className={`hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="menu"
      >
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}