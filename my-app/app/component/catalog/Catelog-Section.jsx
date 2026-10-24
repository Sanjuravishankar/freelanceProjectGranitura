 "use client";

import "./catlog.css";
import Link from "next/link";
import catalogItems from "../../../data/db.json";

export default function CatalogSection() {
  const featuredItems = catalogItems.filter((item) => item.featured);

  return (
    <section id="catalog">
      <div className="catalog-header">
        <div>
          <p className="section-eyebrow reveal">Stone Collection</p>
          <h2 className="section-title reveal">
            Our <em>Finest</em> Materials
          </h2>
        </div>

        <div className="catalog-filter">
          <button className="filter-btn active" data-filter="all" type="button">
            All
          </button>
          <button className="filter-btn" data-filter="marble" type="button">
            Marble
          </button>
          <button className="filter-btn" data-filter="granite" type="button">
            Granite
          </button>
          <button className="filter-btn" data-filter="stone" type="button">
            Stone
          </button>
        </div>
      </div>

      <div className="catalog-grid">
        {featuredItems.map((item) => (
          <div
            key={item.id}
            className="product-card"
            data-cat={item.category === "Natural Stone" ? "stone" : item.category.toLowerCase()}
          >
            <div className="card-bg">
              <img
                src={item.image}
                alt={item.name}
                className="card-image"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="card-tag">{item.tag}</span>
            <div className="card-overlay">
              <div className="card-name">{item.name}</div>
              <div className="card-desc">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <Link href="/catlog-product" className="btn-primary">
          View Full Catalog →
        </Link>
      </div>
    </section>
  );
}
