// src/pages/blog/Blog.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../../data/blogData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const activeCategory = searchParams.get("cat") || "All";
  const gridRef = useRef(null);
  const nav = useNavigate();

  // filter posts by category + search
  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const matchesCat =
        activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, query]);

  // animate cards on scroll
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".blog-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [activeCategory, query]);

  const setCat = (cat) => {
    const next = new URLSearchParams(searchParams);
    if (cat === "All") next.delete("cat");
    else next.set("cat", cat);
    setSearchParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (query) next.set("q", query);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  return (
    <section className="container py-5">
      {/* header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
        <div>
          <h1 className="subheading2 mb-1">Flower Blog</h1>
          <p className="text-muted mb-0">
            Guides, tips & inspiration for every occasion.
          </p>
        </div>

        {/* search */}
        <form className="mt-3 mt-md-0 d-flex gap-2" onSubmit={onSearchSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Search posts, tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ minWidth: 240 }}
          />
          <button className="btn btn-dark" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* categories */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`btn ${
              activeCategory === cat ? "btn-dark" : "btn-outline-dark"
            } btn-sm`}
            onClick={() => setCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* grid */}
      <div className="row g-4" ref={gridRef}>
        {posts.length === 0 && (
          <div className="col-12 text-center text-muted py-5">
            No posts found. Try a different search.
          </div>
        )}

        {posts.map((post) => (
          <div className="col-12 col-sm-6 col-lg-4" key={post.id}>
            <article className="blog-card h-100 shadow-sm rounded overflow-hidden bg-white">
              <div className="ratio ratio-16x9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-100 h-100 object-fit-cover"
                />
              </div>

              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-light text-dark">
                    {post.category}
                  </span>
                  <small className="text-muted">
                    {new Date(post.date).toLocaleDateString()}
                  </small>
                </div>
                <h5 className="mb-2">{post.title}</h5>
                <p className="text-muted mb-3">{post.excerpt}</p>

                <div className="d-flex flex-wrap gap-1 mb-3">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="badge bg-secondary-subtle text-dark border"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="btn btn-outline-dark w-100"
                >
                  Read More
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
