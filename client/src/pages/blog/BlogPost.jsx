// src/pages/blog/BlogPost.jsx
import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS } from "../../data/blogData";
import { gsap } from "gsap";

const BlogPost = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    gsap.fromTo(
      heroRef.current,
      { scale: 1.05, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      textRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: "power3.out" }
    );
  }, [slug]);

  if (!post) {
    return (
      <section className="container py-5 text-center">
        <h2 className="mb-3">Post not found</h2>
        <Link className="btn btn-dark" to="/blog">
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="mb-3">
        <Link to="/blog" className="text-decoration-none">
          &larr; Back to Blog
        </Link>
      </div>

      <div
        className="ratio ratio-21x9 rounded overflow-hidden shadow-sm mb-4"
        ref={heroRef}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      <div ref={textRef}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-light text-dark">{post.category}</span>
          <small className="text-muted">
            {new Date(post.date).toLocaleDateString()}
          </small>
        </div>

        <h1 className="mb-3">{post.title}</h1>

        {post.content.map((para, i) => (
          <p key={i} className="lead fs-6 text-muted">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
};

export default BlogPost;
