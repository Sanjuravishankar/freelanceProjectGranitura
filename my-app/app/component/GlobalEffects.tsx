"use client"

import { useEffect } from "react";

export default function GlobalEffects() {
  useEffect(() => {
    // Navbar Scroll Effect
    const navbar = document.getElementById("navbar");

    const handleScroll = () => {
      if (!navbar) return;

      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Reveal Animation Observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    document
      .querySelectorAll(
        ".reveal, .why-card, .testimonial-card, .process-step"
      )
      .forEach((el) => {
        revealObserver.observe(el);
      });

    // Why Cards Stagger
    document.querySelectorAll(".why-card").forEach((card, i) => {
      (card as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
    });

    // Process Steps Stagger
    document.querySelectorAll(".process-step").forEach((step, i) => {
      (step as HTMLElement).style.transitionDelay = `${i * 0.15}s`;
    });

    // Smooth Scroll Links
    const links = document.querySelectorAll('a[href^="#"]');

    const handlers: {
      element: Element;
      handler: EventListener;
    }[] = [];

    links.forEach((link) => {
      const handler = (e: Event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      };

      link.addEventListener("click", handler);

      handlers.push({
        element: link,
        handler,
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);

      revealObserver.disconnect();

      handlers.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
    };
  }, []);

  return null;
}