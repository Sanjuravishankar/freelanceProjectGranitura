import "./testimonial.css";


export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rajiv Nair",
      role: "Director, The Meridian Hotel, Bangalore",
      text: "The Carrara marble Granitura sourced for our hotel lobby is breathtaking. Guests consistently mention it. The team guided us through every detail, and delivery was flawless.",
      delay: "0s",
    },
    {
      name: "Priya Menon",
      role: "Principal Architect, Form & Space Studio",
      text: "As an architect, I need a supplier who understands precision. Granitura's custom cutting service saved us weeks. The Verde Guatemala marble for our penthouse project was museum-quality.",
      delay: "0.15s",
      right: true,
    },
    {
      name: "Anand Krishnamurthy",
      role: "MD, Prism Constructions",
      text: "We've been using Granitura's Kota Blue for our commercial builds for three years. Consistent quality, honest pricing, and the kind of after-sales service that's genuinely rare in this industry.",
      delay: "0.1s",
    },
    {
      name: "Deepa Subramaniam",
      role: "Homeowner, Whitefield, Bangalore",
      text: "Our villa kitchen countertop in Italian Crema Marfil is the single most complimented thing in the house. Granitura's team matched the veining across six slabs. Exceptional attention to detail.",
      delay: "0.25s",
      right: true,
    },
  ];

  return (
    <section id="testimonials">
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <p
          className="section-eyebrow reveal"
          style={{ justifyContent: "center" }}
        >
          Client Stories
        </p>

        <h2 className="section-title reveal" style={{ textAlign: "center" }}>
          Spaces That <em>Speak</em>
        </h2>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`testimonial-card reveal ${
              item.right ? "right" : ""
            }`}
            style={{
              transitionDelay: item.delay,
            }}
          >
            <span className="quote-mark">"</span>

            <p className="testimonial-text">{item.text}</p>

            <div className="testimonial-name">{item.name}</div>

            <div className="testimonial-role">{item.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}