import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";

const NextDay = () => {
  const heroRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Hero Animation
    gsap.fromTo(
      heroRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // Cards Animation
    gsap.fromTo(
      cardRefs.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        delay: 0.5,
      }
    );
  }, []);

  const flowers = [
    {
      id: 1,
      title: "Roses for Next Day",
      description: "Elegant red roses delivered fresh the very next day.",
      img: "/images/flowers/roses.jpg",
    },
    {
      id: 2,
      title: "Tulip Bliss",
      description: "Brighten up with our colorful tulip bouquet.",
      img: "/images/flowers/tulips.jpg",
    },
    {
      id: 3,
      title: "Mixed Seasonal",
      description: "Perfect blend of seasonal flowers for quick delivery.",
      img: "/images/flowers/mixed.jpg",
    },
    {
      id: 4,
      title: "Orchid Charm",
      description: "Exotic orchids with next day doorstep delivery.",
      img: "/images/flowers/orchid.jpg",
    },
  ];

  return (
    <div className="container py-5">
      {/* ✅ SEO Tags */}
      <Helmet>
        <title>Next Day Flower Delivery | Elegant Fresh Flowers</title>
        <meta
          name="description"
          content="Order beautiful roses, tulips, orchids and more with our Next Day Flower Delivery service. Fresh flowers delivered straight to your door."
        />
        <meta
          name="keywords"
          content="next day flowers, flower delivery, roses, tulips, orchids, buy flowers online"
        />
        <meta property="og:title" content="Next Day Flower Delivery" />
        <meta
          property="og:description"
          content="Elegant and fresh flowers delivered with next day delivery. Perfect for every occasion."
        />
        <meta property="og:image" content="/images/flowers/roses.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <div ref={heroRef} className="text-center mb-5 hero-section">
        <h1 className="heading2">Next Day Delivery Flowers</h1>
        <p className="lead text-muted">
          Forgot to order early? Don’t worry — we’ve got you covered with our{" "}
          <strong>Next Day Delivery</strong> service 🌸
        </p>
      </div>

      {/* Dynamic Flower Cards */}
      <div className="row g-4">
        {flowers.map((flower, index) => (
          <div
            key={flower.id}
            className="col-sm-6 col-lg-3 d-flex"
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className="card shadow-sm border-0 flex-fill">
              <img
                src={flower.img}
                className="card-img-top"
                alt={flower.title}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{flower.title}</h5>
                <p className="card-text text-muted">{flower.description}</p>
                <button className="btn btn-pink">Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextDay;
