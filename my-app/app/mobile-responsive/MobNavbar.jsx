"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./style.css";

export default function GranituraMobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header className={`nav ${scrolled ? "compact" : ""}`}>

        <div className="navInner">

          <Link href="/" className="logo">
            Granitura
          </Link>

          <button
            className="burger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

      </header>

      {menuOpen && (
        <div className="mobileWrapper">

          <button
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <Link href="/about">About</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/contact">Contact</Link>

        </div>
      )}
    </>
  );
}