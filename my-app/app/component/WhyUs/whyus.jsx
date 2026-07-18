import "./style.css"
export default function WhySection() {
  return (
    <section id="why">
      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <p className="section-eyebrow reveal" style={{ justifyContent: "center" }}>
          Why Granitura
        </p>

        <h2 className="section-title reveal" style={{ textAlign: "center" }}>
          Built on <em>Trust</em> and Precision
        </h2>

        <p
          className="section-lead reveal"
          style={{ margin: "0 auto", textAlign: "center" }}
        >
          We don't sell stone by the slab. We deliver confidence — that your space
          will be exactly as you imagined.
        </p>
      </div>

      <div className="why-grid">
        <div className="why-card">
          <div className="why-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
            </svg>
          </div>
          <div className="why-title">Authentic Italian Imports</div>
          <div className="why-desc">
            Direct partnerships with Carrara, Verona, and Sicilian quarry owners.
            Every block traced to its origin, certified authentic.
          </div>
        </div>

        <div className="why-card">
          <div className="why-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
            </svg>
          </div>
          <div className="why-title">Competitive & Transparent Pricing</div>
          <div className="why-desc">
            No hidden fees. Direct sourcing eliminates middlemen. You get luxury-grade
            stone at fair market prices, with a detailed itemised quote.
          </div>
        </div>

        <div className="why-card">
          <div className="why-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <div className="why-title">Bangalore Stone Specialists</div>
          <div className="why-desc">
            Unmatched expertise in Cuddapah, Kota, and Bangalore Blue stones — the most
            sought-after natural stones in South India.
          </div>
        </div>

        <div className="why-card">
          <div className="why-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div className="why-title">Quality Guarantee</div>
          <div className="why-desc">
            Every batch quality-tested for strength, porosity, and finish. We replace any
            slab that doesn't meet specification, no questions asked.
          </div>
        </div>

        <div className="why-card">
          <div className="why-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>
          <div className="why-title">Pan-India Logistics</div>
          <div className="why-desc">
            Specialized stone transport with trained handlers, insured shipments, and
            real-time tracking from our warehouse to your site.
          </div>
        </div>

        <div className="why-card">
          <div className="why-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
              <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <div className="why-title">Dedicated Project Support</div>
          <div className="why-desc">
            A named project manager assigned to every order. From brief to final
            installation, one person answers for your project.
          </div>
        </div>
      </div>
    </section>
  );
}