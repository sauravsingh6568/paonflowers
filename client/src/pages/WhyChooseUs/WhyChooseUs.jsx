import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h2 className="subheading2 mb-4">Why Choose Paon Flowers?</h2>

        {/* Added g-4 for proper gap between columns */}
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="p-4 shadow rounded bg-white h-100">
              <i className="bi bi-truck fs-1 text-pink mb-3"></i>
              <h5>Same-Day Delivery</h5>
              <p>We deliver fresh flowers the same day, anywhere in Dubai.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 shadow rounded bg-white h-100">
              <i className="bi bi-stars fs-1 text-pink mb-3"></i>
              <h5>Premium Quality</h5>
              <p>Our flowers are handpicked and curated for elegance.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 shadow rounded bg-white h-100">
              <i className="bi bi-gift fs-1 text-pink mb-3"></i>
              <h5>Custom Gifting</h5>
              <p>Personalized floral gifts for your special occasions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
