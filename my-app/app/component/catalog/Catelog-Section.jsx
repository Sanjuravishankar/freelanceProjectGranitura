// "use client";

// import "./catlog.css";
// import Link from "next/link";

// export default function CatalogSection() {
//   return (
//     <section id="catalog">
//       <div className="catalog-header">
//         <div>
//           <p className="section-eyebrow reveal">
//             Stone Collection
//           </p>

//           <h2 className="section-title reveal">
//             Our <em>Finest</em> Materials
//           </h2>
//         </div>

//         <div className="catalog-filter">
//           <button
//             className="filter-btn active"
//             data-filter="all"
//           >
//             All
//           </button>

//           <button
//             className="filter-btn"
//             data-filter="marble"
//           >
//             Marble
//           </button>

//           <button
//             className="filter-btn"
//             data-filter="granite"
//           >
//             Granite
//           </button>

//           <button
//             className="filter-btn"
//             data-filter="stone"
//           >
//             Stone
//           </button>
//         </div>
//       </div>

//       <div className="catalog-grid">

//         {/* Carrara */}
//         <div className="product-card" data-cat="marble">
//           <div className="card-bg st-italian-white">
//             <svg
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//               viewBox="0 0 600 700"
//             >
//               <path
//                 d="M50 200 Q180 150 280 250 Q380 350 500 200 Q580 100 620 180"
//                 stroke="rgba(160,130,90,0.18)"
//                 strokeWidth="3"
//                 fill="none"
//               />
//             </svg>
//           </div>

//           <span className="card-tag">
//             Italian Import
//           </span>

//           <div className="card-overlay">
//             <div className="card-name">
//               Carrara Bianco
//             </div>

//             <div className="card-desc">
//               Quarried from the Apuan Alps — pure
//               white with subtle grey veining.
//             </div>
//           </div>
//         </div>

//         {/* Verde */}
//         <div className="product-card" data-cat="marble">
//           <div className="card-bg st-green-marble">
//             <svg
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//               viewBox="0 0 300 350"
//             >
//               <path
//                 d="M10 80 Q80 50 140 100 Q200 150 260 80"
//                 stroke="rgba(150,220,170,0.2)"
//                 strokeWidth="3"
//                 fill="none"
//               />
//             </svg>
//           </div>

//           <span className="card-tag">
//             Italian Import
//           </span>

//           <div className="card-overlay">
//             <div className="card-name">
//               Verde Guatemala
//             </div>

//             <div className="card-desc">
//               Deep emerald tones with luxurious
//               natural veining.
//             </div>
//           </div>
//         </div>

//         {/* Granite */}
//         <div className="product-card" data-cat="granite">
//           <div className="card-bg st-granite-black">
//             <svg
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//               viewBox="0 0 300 350"
//             >
//               <circle
//                 cx="50"
//                 cy="80"
//                 r="2"
//                 fill="rgba(220,200,160,0.3)"
//               />
//               <circle
//                 cx="150"
//                 cy="40"
//                 r="1.5"
//                 fill="rgba(200,180,140,0.25)"
//               />
//               <circle
//                 cx="250"
//                 cy="120"
//                 r="2"
//                 fill="rgba(210,190,150,0.28)"
//               />
//             </svg>
//           </div>

//           <span className="card-tag">
//             Premium Granite
//           </span>

//           <div className="card-overlay">
//             <div className="card-name">
//               Absolute Black
//             </div>

//             <div className="card-desc">
//               Premium jet-black granite for
//               luxury flooring and countertops.
//             </div>
//           </div>
//         </div>

//         {/* Bangalore Stone */}
//         <div className="product-card" data-cat="stone">
//           <div className="card-bg st-bangalore">
//             <svg
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//               viewBox="0 0 300 350"
//             >
//               <path
//                 d="M0 120 L300 120"
//                 stroke="rgba(255,255,255,0.07)"
//                 strokeWidth="1"
//               />
//             </svg>
//           </div>

//           <span className="card-tag">
//             Bangalore Stone
//           </span>

//           <div className="card-overlay">
//             <div className="card-name">
//               Cuddapah Black
//             </div>

//             <div className="card-desc">
//               Durable and timeless natural stone
//               for indoor and outdoor use.
//             </div>
//           </div>
//         </div>

//         {/* Kota */}
//         <div className="product-card" data-cat="stone">
//           <div className="card-bg st-kota-blue">
//             <svg
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//               viewBox="0 0 300 350"
//             >
//               <line
//                 x1="0"
//                 y1="90"
//                 x2="300"
//                 y2="90"
//                 stroke="rgba(255,255,255,0.06)"
//               />
//             </svg>
//           </div>

//           <span className="card-tag">
//             Kota Stone
//           </span>

//           <div className="card-overlay">
//             <div className="card-name">
//               Kota Blue
//             </div>

//             <div className="card-desc">
//               Blue-grey limestone famous for
//               strength and longevity.
//             </div>
//           </div>
//         </div>

//         {/* Crema */}
//         <div className="product-card" data-cat="marble">
//           <div
//             className="card-bg"
//             style={{
//               background:
//                 "linear-gradient(135deg,#f0e8d8 0%,#ddd0b8 30%,#e8d8c0 60%,#cfc0a0 100%)",
//             }}
//           >
//             <svg
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//               viewBox="0 0 300 350"
//             >
//               <path
//                 d="M20 100 Q100 70 160 120 Q220 170 280 100"
//                 stroke="rgba(140,100,60,0.2)"
//                 strokeWidth="2.5"
//                 fill="none"
//               />
//             </svg>
//           </div>

//           <span className="card-tag">
//             Italian Import
//           </span>

//           <div className="card-overlay">
//             <div className="card-name">
//               Crema Marfil
//             </div>

//             <div className="card-desc">
//               Warm ivory marble delivering
//               timeless elegance and luxury.
//             </div>
//           </div>
//         </div>

//       </div>

//      <div
//   style={{
//     textAlign: "center",
//     marginTop: "4rem",
//   }}
// >
//   <Link href="/catlog-product" className="btn-primary">
//     View Full Catalog →
//   </Link>
// </div>
//     </section>
//   );
// }




"use client";

import "./catlog.css";
import Link from "next/link";

const catalogItems = [
  {
    id: 1,
    name: "Carrara Bianco",
    category: "marble",
    tag: "Italian Import",
    image: "/assets/catlog/luxurious-marble-texture-background.jpg",
    desc: "Quarried from the Apuan Alps — pure white with subtle grey veining.",
  },
  {
    id: 2,
    name: "Verde Guatemala",
    category: "marble",
    tag: "Italian Import",
    image: "/assets/catlog/ItalianGranite.jpg",
    desc: "Deep emerald tones with luxurious natural veining.",
  },
  {
    id: 3,
    name: "Absolute Black",
    category: "granite",
    tag: "Premium Granite",
    image: "/assets/catlog/Granite.jpg",
    desc: "Premium jet-black granite for luxury flooring and countertops.",
  },
  {
    id: 4,
    name: "Cuddapah Black",
    category: "stone",
    tag: "Bangalore Stone",
    image: "/assets/catlog/bangloreStone.jpg",
    desc: "Durable and timeless natural stone for indoor and outdoor use.",
  },
  {
    id: 5,
    name: "Kota Blue",
    category: "stone",
    tag: "Kota Stone",
    image: "/assets/catlog/KotaBlackStone.jpg",
    desc: "Blue-grey limestone famous for strength and longevity.",
  },
  {
    id: 6,
    name: "Crema Marfil",
    category: "marble",
    tag: "Italian Import",
    image: "/assets/catlog/luxurious-marble-texture-background.jpg",
    desc: "Warm ivory marble delivering timeless elegance and luxury.",
  },
];

export default function CatalogSection() {
  return (
    <section id="catalog">
      <div className="catalog-header">
        <div>
          <p className="section-eyebrow reveal">
            Stone Collection
          </p>

          <h2 className="section-title reveal">
            Our <em>Finest</em> Materials
          </h2>
        </div>

        <div className="catalog-filter">
          <button className="filter-btn active" data-filter="all">
            All
          </button>

          <button className="filter-btn" data-filter="marble">
            Marble
          </button>

          <button className="filter-btn" data-filter="granite">
            Granite
          </button>

          <button className="filter-btn" data-filter="stone">
            Stone
          </button>
        </div>
      </div>

      <div className="catalog-grid">
        {catalogItems.map((item) => (
          <div
            key={item.id}
            className="product-card"
            data-cat={item.category}
          >
            <div className="card-bg">
              <img
                src={item.image}
                alt={item.name}
                className="card-image"
              />
            </div>

            <span className="card-tag">{item.tag}</span>

            <div className="card-overlay">
              <div className="card-name">{item.name}</div>

              <div className="card-desc">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
        }}
      >
        <Link href="/catlog-product" className="btn-primary">
          View Full Catalog →
        </Link>
      </div>
    </section>
  );
}