// src/pages/Weddings.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Weddings = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%", // animate when section is 80% into view
          },
        }
      );
    });
  }, []);

  return (
    <div className="weddings-page py-5">
      <div className="container">
        {/* Heading */}
        <h2 className="subheading2 text-center mb-5">Wedding Packages</h2>

        {/* Packages */}
        <div
          className="row text-center"
          ref={(el) => (sectionsRef.current[0] = el)}
        >
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 p-4 h-100">
              <h4 className="text-pink">Full Service Wedding</h4>
              <p>
                Complete floral setup including stage, table décor, bridal
                bouquet, and customized arrangements.
              </p>
              <button className="btn btn-pink">Book Now</button>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 p-4 h-100">
              <h4 className="text-pink">Wedding Flowers in a Box</h4>
              <p>
                Elegant pre-arranged flowers in luxury boxes, perfect for
                weddings & receptions.
              </p>
              <button className="btn btn-pink">Order Now</button>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 p-4 h-100">
              <h4 className="text-pink">Wedding Ready Flowers</h4>
              <p>
                Curated fresh flower sets delivered to your venue, ready to
                decorate instantly.
              </p>
              <button className="btn btn-pink">Explore</button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="py-5" ref={(el) => (sectionsRef.current[1] = el)}>
          <h2 className="subheading2 text-center mb-4">Customer Reviews</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="review-card p-4 shadow rounded bg-white">
                <p>
                  "Absolutely stunning flowers! My wedding looked magical thanks
                  to Paon Flowers."
                </p>
                <h6>- Sarah W.</h6>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="review-card p-4 shadow rounded bg-white">
                <p>
                  "Professional service, on-time delivery, and premium quality
                  arrangements."
                </p>
                <h6>- Ahmed R.</h6>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="review-card p-4 shadow rounded bg-white">
                <p>
                  "They made my big day unforgettable. Highly recommend for
                  weddings!"
                </p>
                <h6>- Maria D.</h6>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="py-5" ref={(el) => (sectionsRef.current[2] = el)}>
          <h2 className="subheading2 text-center mb-4">Wedding FAQs</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  Do you provide customized wedding flower packages?
                </button>
              </h2>
              <div
                id="faq1"
                className="accordion-collapse collapse show"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, we design custom floral arrangements tailored to your
                  wedding theme and budget.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  How far in advance should I book?
                </button>
              </h2>
              <div
                id="faq2"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  We recommend booking at least 2 months before your wedding
                  date to ensure availability.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq3"
                >
                  Do you deliver to venues?
                </button>
              </h2>
              <div
                id="faq3"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, we provide full delivery and setup at wedding venues
                  across Dubai.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weddings;
