import "./footer.css";

// Social Media Links
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/granitura369/",
  facebook: "https://www.facebook.com/your-page",
  linkedin: "https://www.linkedin.com/company/granitura/",
};

export const Footer = () => {
  return (
    <footer>
      {/* Your existing footer content */}

      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} Granitura. All rights reserved. ·
          Bangalore, Karnataka, India
        </div>

        <div className="footer-social">
          {/* Instagram */}
          <a
            href={SOCIAL_LINKS.instagram}
            className="social-link"
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href={SOCIAL_LINKS.facebook}
            className="social-link"
            title="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={SOCIAL_LINKS.linkedin}
            className="social-link"
            title="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;