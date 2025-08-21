import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { useCart } from "/src/context/CartContext.jsx";
import products from "../data/productsData"; // your data source (array)

const PAGE_SIZE = 12;

// Helper to build image URLs safely, even with spaces in folder names
const IMG = (p) => {
  if (!p) return "/assets/rose.jpg";
  // If already absolute-like path, return as-is
  if (p.startsWith("/")) return encodeURI(p);
  return encodeURI(`/assets/${p}`);
};

const ShopAll = () => {
  const { dispatch } = useCart();

  // Refs for animations
  const heroRef = useRef(null);
  const promoRefs = useRef([]);
  const sortRef = useRef(null);
  const cardRefs = useRef([]);

  // Local state
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sortBy, setSortBy] = useState("featured");

  // Sort
  const sortedProducts = useMemo(() => {
    const list = Array.isArray(products) ? [...products] : [];
    return list.sort((a, b) => {
      const pa = Number(a?.price) || 0;
      const pb = Number(b?.price) || 0;
      const na = (a?.name || a?.title || "").toLowerCase();
      const nb = (b?.name || b?.title || "").toLowerCase();
      switch (sortBy) {
        case "price-asc":
          return pa - pb;
        case "price-desc":
          return pb - pa;
        case "name-asc":
          return na.localeCompare(nb);
        case "name-desc":
          return nb.localeCompare(na);
        default:
          return 0; // featured
      }
    });
  }, [sortBy]);

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const addToCart = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id:
          item?.id ??
          `${(item?.name || "item").toLowerCase()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        name: item?.name || item?.title || "Flower",
        image: item?.image || item?.img || "/assets/rose.jpg",
        price: Number(item?.price) || 0,
        quantity: 1,
      },
    });
  };

  // Initial entrances
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { autoAlpha: 0, y: -30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    if (promoRefs.current.length) {
      gsap.fromTo(
        promoRefs.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.15,
        }
      );
    }

    if (sortRef.current) {
      gsap.fromTo(
        sortRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }
  }, []);

  // Animate cards every time the visible set changes
  useEffect(() => {
    if (!cardRefs.current.length) return;
    // ensure all are visible after animation
    gsap.set(cardRefs.current, { autoAlpha: 1 });
    gsap.fromTo(
      cardRefs.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.05 }
    );
    // cleanup: keep refs array length in sync
    return () => {
      cardRefs.current = [];
    };
  }, [visibleProducts.length]);

  // Promo tiles (put these images in /public/assets to resolve)
  const promos = [
    {
      title: "Fresh Bouquets",
      subtitle: "Hand-tied daily",
      img: "/assets/Valentine day/309c063f-f2dc-4050-8d43-eb91c07cadbe.jpg",
    },
    {
      title: "Seasonal Bestsellers",
      subtitle: "Trending this week",
      img: "/assets/General bookey types/4eebd683-a3b7-4f4b-b2e8-27b6f86cac62.jpg",
    },
    {
      title: "Gifts & Add-ons",
      subtitle: "Teddy • Balloons • Cards",
      img: "/assets/Add ons/Teddy bear/IMG_5213.HEIC",
    },
  ];

  return (
    <div className="shop-page">
      <Helmet>
        <title>Shop All Flowers | Paon Flowers</title>
        <meta
          name="description"
          content="Browse all premium bouquets and arrangements. Elegant, fresh and handpicked — Paon Flowers."
        />
      </Helmet>

      {/* HERO */}
      <section className="container py-4">
        <div ref={heroRef} className="mb-3">
          <h1 className="display-6 fw-bold paon-heading">Shop All Flowers</h1>
          <p className="text-muted mb-0">
            Same-day Dubai delivery • Premium stems • Hand-tied with love
          </p>
        </div>

        <div className="row g-3">
          {promos.map((b, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="promo-tile rounded-4 overflow-hidden shadow-sm position-relative"
                ref={(el) => (promoRefs.current[i] = el)}
              >
                <div className="ratio ratio-21x9">
                  <img
                    src={IMG(b.img)}
                    alt={b.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    onError={(e) => (e.currentTarget.src = "/assets/rose.jpg")}
                  />
                </div>
                <div className="promo-overlay d-flex flex-column justify-content-end p-3">
                  <div>
                    <h5 className="mb-0">{b.title}</h5>
                    <small className="text-muted">{b.subtitle}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SORT BAR */}
      <section className="bg-white border-top border-bottom">
        <div className="container py-3" ref={sortRef}>
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
            <div className="small text-muted">
              Showing{" "}
              <strong>
                {visibleProducts.length}/{sortedProducts.length}
              </strong>{" "}
              items
            </div>
            <div className="d-flex align-items-center gap-2">
              <label className="small text-muted mb-0">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select form-select-sm"
                style={{ minWidth: 190 }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="container py-4">
        <div className="row g-3 g-md-4">
          {visibleProducts.map((p, idx) => (
            <div
              key={p?.id ?? `prod-${idx}`}
              className="col-6 col-md-4 col-lg-3"
              ref={(el) => (cardRefs.current[idx] = el)}
            >
              <div className="card product-card h-100 border-0 shadow-sm">
                <div className="position-relative">
                  {(p?.badge || p?.isNew || p?.bestseller) && (
                    <span className="badge paon-badge position-absolute m-2">
                      {p?.badge || (p?.isNew ? "New" : "Bestseller")}
                    </span>
                  )}
                  <div className="ratio ratio-1x1">
                    <img
                      src={IMG(p?.image || p?.img || "/assets/rose.jpg")}
                      alt={p?.name || p?.title || "Flower"}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                      onError={(e) =>
                        (e.currentTarget.src = "/assets/rose.jpg")
                      }
                    />
                  </div>
                </div>

                <div className="card-body d-flex flex-column">
                  <div className="small text-muted mb-1">
                    {p?.category || "Bouquet"}
                  </div>
                  <h6 className="mb-1 fw-semibold">
                    {p?.name || p?.title || "Elegant Bouquet"}
                  </h6>
                  <div className="mb-2">
                    <span className="fw-bold">
                      ₹{Number(p?.price || 0).toFixed(2)}
                    </span>
                    {p?.mrp && Number(p.mrp) > (Number(p.price) || 0) ? (
                      <small className="text-muted ms-2 text-decoration-line-through">
                        ₹{Number(p.mrp).toFixed(2)}
                      </small>
                    ) : null}
                  </div>

                  <div className="mt-auto d-grid gap-2">
                    <button
                      className="btn btn-pink btn-sm"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sortedProducts.length === 0 && (
            <div className="col-12">
              <div className="text-center py-5 bg-white rounded-3 shadow-sm">
                <h5 className="mb-1">No products found</h5>
                <p className="text-muted mb-0">
                  Try adjusting your filters or come back soon.
                </p>
              </div>
            </div>
          )}
        </div>

        {visibleCount < sortedProducts.length && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-dark px-4"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* RECOMMENDATIONS */}
      <section className="container pb-5">
        <h5 className="fw-semibold mb-3">You may also like</h5>
        <div className="row g-3 g-md-4">
          {(products || []).slice(0, 6).map((p, i) => (
            <div key={`like-${i}`} className="col-6 col-md-4 col-lg-2">
              <div className="card border-0 shadow-sm h-100 mini-card">
                <div className="ratio ratio-1x1 rounded-top overflow-hidden">
                  <img
                    src={IMG(p?.image || p?.img || "/assets/rose.jpg")}
                    alt={p?.name || "Flower"}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = "/assets/rose.jpg")}
                  />
                </div>
                <div className="card-body py-2">
                  <div className="small">{p?.name || "Bouquet"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h5 className="fw-semibold mt-5 mb-3">Recently viewed</h5>
        <div className="row g-3 g-md-4">
          {(products || []).slice(6, 12).map((p, i) => (
            <div key={`view-${i}`} className="col-6 col-md-4 col-lg-2">
              <div className="card border-0 shadow-sm h-100 mini-card">
                <div className="ratio ratio-1x1 rounded-top overflow-hidden">
                  <img
                    src={IMG(p?.image || p?.img || "/assets/rose.jpg")}
                    alt={p?.name || "Flower"}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = "/assets/rose.jpg")}
                  />
                </div>
                <div className="card-body py-2">
                  <div className="small">{p?.name || "Bouquet"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShopAll;
