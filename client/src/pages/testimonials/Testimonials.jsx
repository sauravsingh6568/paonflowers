import React from "react";

const Testimonials = () => {
  return (
    <section className="py-5 px-5 ">
      <div className="container ">
        <h2 className="text-center subheading2 mb-5">What Our Customers Say</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4 shadow rounded bg-white">
              <p>
                “Absolutely beautiful flowers and quick delivery. Loved the
                packaging!”
              </p>
              <h6 className="mt-3">— Ayesha K.</h6>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 shadow rounded bg-white">
              <p>
                “Best flower shop in Dubai! Classy arrangements and luxurious
                feel.”
              </p>
              <h6 className="mt-3">— Rahul M.</h6>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 shadow rounded bg-white">
              <p>
                “The tulips were fresh and stunning. Highly recommend Paon
                Flowers!”
              </p>
              <h6 className="mt-3">— Sofia L.</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
