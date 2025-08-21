// src/pages/CustomFlowers.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";

const CustomFlowers = () => {
  const heroRef = useRef(null);
  const optionRefs = useRef([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // ✅ Hero Animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { y: -90, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }

    // ✅ Options Animation (only if refs exist)
    if (optionRefs.current.length > 0) {
      gsap.fromTo(
        optionRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    }
  }, []);

  const options = [
    {
      id: 1,
      title: "Choose Your Flowers 🌹🌷",
      description: "Select from roses, tulips, orchids, lilies and more.",
      img: "/images/custom/choose-flowers.jpg",
    },
    {
      id: 2,
      title: "Pick Your Style 🎀",
      description: "Bouquet, basket, or box — style it your way.",
      img: "/images/custom/style.jpg",
    },
    {
      id: 3,
      title: "Add a Personal Touch 💌",
      description: "Include a heartfelt message on a beautiful card.",
      img: "/images/custom/message.jpg",
    },
  ];

  return (
    <div className="container py-5">
      {/* ✅ SEO */}
      <Helmet>
        <title>Custom Flowers | Design Your Own Bouquet</title>
        <meta
          name="description"
          content="Design your own bouquet with our custom flowers service. Choose flowers, style, and add a personal touch with message cards."
        />
      </Helmet>

      {/* ✅ Hero Section */}
      <div ref={heroRef} className="text-center mb-5 hero-section">
        <h1 className="heading2">Custom Flowers</h1>
        <p className="lead text-muted">
          Create a <strong>bouquet as unique as your love</strong>. Choose your
          flowers, style, and add a personal message 🌸✨
        </p>
      </div>

      {/* ✅ Options Section */}
      <div className="row g-4">
        {options.map((option, index) => (
          <div
            key={option.id}
            className="col-md-4 d-flex"
            ref={(el) => (optionRefs.current[index] = el)}
          >
            <div
              className={`card shadow-sm border-0 flex-fill h-100 ${
                selectedOption?.id === option.id ? "border border-pink" : ""
              }`}
            >
              <img
                src={option.img}
                className="card-img-top"
                alt={option.title}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{option.title}</h5>
                <p className="card-text text-muted">{option.description}</p>
                <button
                  className="btn btn-pink"
                  onClick={() => setSelectedOption(option)}
                >
                  {selectedOption?.id === option.id ? "Selected ✅" : "Select"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Preview Section */}
      <div className="text-center mt-5">
        <h3 className="mb-3">Your Custom Bouquet Preview 🌺</h3>
        <div
          className="card shadow-sm border-0 mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <img
            src={
              selectedOption ? selectedOption.img : "/images/custom/preview.jpg"
            }
            className="card-img-top"
            alt={
              selectedOption ? selectedOption.title : "Custom Bouquet Preview"
            }
            style={{ height: "250px", objectFit: "cover" }}
          />
          <div className="card-body">
            <p className="text-muted">
              {selectedOption
                ? `You selected: ${selectedOption.title}`
                : "Your personalized bouquet will appear here as you customize it."}
            </p>
            <button
              className="btn btn-success"
              disabled={!selectedOption}
              onClick={() => alert("Proceeding to Checkout...")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFlowers;
