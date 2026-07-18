import "./about.css";

export default function AboutSection() {
  return (
    <section id="about">
      <div className="about-visual reveal">

        <div className="about-img-main st-green-marble">
     <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <linearGradient id="slabBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#1F3A2E" />
      <stop offset="55%" stopColor="#16291F" />
      <stop offset="100%" stopColor="#0F1C15" />
    </linearGradient>

    <radialGradient id="sheen" cx="30%" cy="20%" r="70%">
      <stop offset="0%" stopColor="rgba(180,230,195,0.18)" />
      <stop offset="100%" stopColor="rgba(180,230,195,0)" />
    </radialGradient>

    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#E4C892" />
      <stop offset="100%" stopColor="#B68A4E" />
    </linearGradient>
  </defs>

  <rect width="300" height="400" fill="url(#slabBg)" />
  <rect width="300" height="400" fill="url(#sheen)" />

  <path
    d="M-10 50 Q70 20 130 70"
    stroke="rgba(150,220,170,0.10)"
    strokeWidth="1.5"
    fill="none"
  />

  <path
    d="M180 40 Q230 25 300 55"
    stroke="rgba(150,220,170,0.08)"
    strokeWidth="1.2"
    fill="none"
  />

  <path
    d="M0 350 Q90 330 180 360 Q240 380 300 350"
    stroke="rgba(130,200,155,0.10)"
    strokeWidth="1.5"
    fill="none"
  />

  <path
    d="M-10 250 Q90 210 150 235 Q220 262 310 220"
    stroke="rgba(228,200,146,0.35)"
    strokeWidth="1.5"
    strokeDasharray="4 6"
    fill="none"
  />

  <circle cx="-2" cy="252" r="3" fill="url(#gold)" />
  <circle
    cx="305"
    cy="222"
    r="4"
    fill="none"
    stroke="url(#gold)"
    strokeWidth="1.5"
  />

  <g transform="translate(58,250)">
    <rect
      x="38"
      y="-38"
      width="118"
      height="34"
      rx="2"
      fill="rgba(230,210,180,0.92)"
    />

    <rect
      x="38"
      y="-38"
      width="118"
      height="34"
      rx="2"
      fill="none"
      stroke="url(#gold)"
      strokeWidth="1.2"
    />

    <path
      d="M50 -28 Q90 -38 145 -22"
      stroke="rgba(160,130,90,0.35)"
      strokeWidth="1"
      fill="none"
    />

    <path
      d="M55 -14 Q100 -22 150 -10"
      stroke="rgba(160,130,90,0.3)"
      strokeWidth="1"
      fill="none"
    />

    <line
      x1="65"
      y1="-38"
      x2="65"
      y2="-4"
      stroke="rgba(20,20,20,0.4)"
      strokeWidth="1.5"
    />

    <line
      x1="125"
      y1="-38"
      x2="125"
      y2="-4"
      stroke="rgba(20,20,20,0.4)"
      strokeWidth="1.5"
    />

    <path
      d="M0 -4 H160 V18 H0 Z"
      fill="#1A2C22"
      stroke="url(#gold)"
      strokeWidth="1.3"
    />

    <path
      d="M-44 18 L-44 -10 Q-44 -18 -34 -18 H-4 V18 Z"
      fill="#1A2C22"
      stroke="url(#gold)"
      strokeWidth="1.3"
    />

    <rect
      x="-36"
      y="-13"
      width="22"
      height="14"
      rx="1.5"
      fill="rgba(228,200,146,0.18)"
      stroke="url(#gold)"
      strokeWidth="1"
    />

    <circle cx="-30" cy="2" r="1.6" fill="url(#gold)" />

    <circle
      cx="-26"
      cy="22"
      r="9"
      fill="#0F1C15"
      stroke="url(#gold)"
      strokeWidth="1.4"
    />

    <circle cx="-26" cy="22" r="3" fill="url(#gold)" />

    <circle
      cx="40"
      cy="22"
      r="9"
      fill="#0F1C15"
      stroke="url(#gold)"
      strokeWidth="1.4"
    />

    <circle cx="40" cy="22" r="3" fill="url(#gold)" />

    <circle
      cx="108"
      cy="22"
      r="9"
      fill="#0F1C15"
      stroke="url(#gold)"
      strokeWidth="1.4"
    />

    <circle cx="108" cy="22" r="3" fill="url(#gold)" />

    <ellipse
      cx="32"
      cy="34"
      rx="100"
      ry="6"
      fill="rgba(0,0,0,0.35)"
    />
  </g>

  <g transform="translate(232,196)">
    <circle
      r="16"
      fill="#0F1C15"
      stroke="url(#gold)"
      strokeWidth="1.4"
    />

    <path
      d="M-7 0 L-2 6 L8 -7"
      stroke="url(#gold)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>

  <text
    x="50%"
    y="20%"
    textAnchor="middle"
    dominantBaseline="middle"
    fontFamily="Cormorant Garamond, serif"
    fontSize="64"
    fontWeight="300"
    fill="rgba(200,230,210,0.10)"
  >
    G
  </text>

  <rect
    x="0"
    y="0"
    width="300"
    height="400"
    fill="none"
    stroke="rgba(0,0,0,0.25)"
    strokeWidth="12"
  />
</svg>
        </div>

        <div className="about-img-accent st-italian-white">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <path
              d="M10 60 Q60 40 100 80 Q140 120 180 60"
              stroke="rgba(160,130,90,0.2)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 130 Q50 100 100 140 Q150 180 200 130"
              stroke="rgba(140,110,70,0.15)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        <div className="about-badge">
          <span className="about-badge-num">15+</span>
          <span className="about-badge-label">Years</span>
        </div>
      </div>

      <div>
        <p className="section-eyebrow reveal">Our Story</p>

        <h2 className="section-title reveal">
          Where <em>Earth&apos;s Beauty</em>
          <br />
          Meets Craftsmanship
        </h2>

        <p className="section-lead reveal">
          Granitura was born from a belief that the finest spaces deserve the
          finest stone. Based in Bangalore, we source directly from Italian
          quarries and India&apos;s most celebrated stone belts, bringing
          natural luxury within reach.
        </p>

        <div className="about-features">

          {/* Feature 1 */}
          <div className="about-feature reveal">
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
              >
                <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div>
              <div className="feature-title">
                Direct Quarry Sourcing
              </div>
              <div className="feature-desc">
                Relationships with Italian and Indian quarry owners ensure
                authenticity.
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="about-feature reveal">
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </div>

            <div>
              <div className="feature-title">
                Custom Cutting & Sizing
              </div>
              <div className="feature-desc">
                Precision cutting to your exact project specifications.
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="about-feature reveal">
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <div>
              <div className="feature-title">
                Pan-India Delivery
              </div>
              <div className="feature-desc">
                Safe, insured logistics to any address across India.
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="about-feature reveal">
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
              >
                <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>

            <div>
              <div className="feature-title">
                Expert Consultation
              </div>
              <div className="feature-desc">
                Material advisors guide every project from selection to
                installation.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}