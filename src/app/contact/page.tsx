"use client";

import React, { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      setErrorMessage("Please fill out all required fields.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-bg"></div>
        <div className="contact-hero-content">
          <AnimateOnScroll className="section-label">
            <span>Contact</span>
            <span>Start a Conversation</span>
          </AnimateOnScroll>
          <h1 className="contact-title">
            <AnimateOnScroll variant="reveal" delay={0}>
              <span>Let&apos;s</span>
            </AnimateOnScroll>
            <br />
            <AnimateOnScroll variant="reveal" delay={150}>
              <span className="line2">Create Together</span>
            </AnimateOnScroll>
          </h1>
          <AnimateOnScroll variant="reveal" delay={300}>
            <p className="contact-sub">
              Whether you have a fully formed idea or just a feeling — we want to hear it. Every great film starts with a conversation.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <div className="contact-body">
        <div className="contact-body-inner">
          {/* Info */}
          <div className="contact-info">
            <AnimateOnScroll variant="reveal" delay={0}>
              <h3>Get In Touch</h3>
            </AnimateOnScroll>

            <AnimateOnScroll variant="reveal" delay={100} className="contact-detail">
              <div className="contact-detail-label">Email</div>
              <div className="contact-detail-val">
                <a href="mailto:yashpancholi0602@gmail.com">yashpancholi0602@gmail.com</a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="reveal" delay={200} className="contact-detail">
              <div className="contact-detail-label">Instagram</div>
              <div className="contact-detail-val">
                <a href="https://www.instagram.com/yash_pancholi_37?igsh=MWp4MHExZHB3amJx" target="_blank" rel="noopener noreferrer">
                  @yash_pancholi_37
                </a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="reveal" delay={300} className="contact-detail">
              <div className="contact-detail-label">LinkedIn</div>
              <div className="contact-detail-val">
                <a href="https://www.linkedin.com/in/pancholi-yash-b161792b5/" target="_blank" rel="noopener noreferrer">
                  Yash Pancholi
                </a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="reveal" delay={400} className="contact-detail">
              <div className="contact-detail-label">Based In</div>
              <div className="contact-detail-val">India — Working Worldwide</div>
            </AnimateOnScroll>

            <div className="contact-socials">
              {[
                {
                  href: "https://www.instagram.com/yash_pancholi_37?igsh=MWp4MHExZHB3amJx",
                  label: "Instagram",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                },
                {
                  href: "https://www.linkedin.com/in/pancholi-yash-b161792b5/",
                  label: "LinkedIn",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                },
                {
                  href: "mailto:yashpancholi0602@gmail.com",
                  label: "Email",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                }
              ].map((social, idx) => (
                <AnimateOnScroll key={idx} variant="card" delay={idx * 50}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="contact-social" aria-label={social.label}>
                    {social.icon}
                  </a>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Form */}
          <AnimateOnScroll variant="reveal" delay={200} className="contact-form">
            <h2 className="form-title">Start A Project</h2>

            <form id="contactForm" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="service">
                  Service Interested In
                </label>
                <select
                  className="form-select"
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service...</option>
                  <option value="video">Video Production / Film</option>
                  <option value="motion">Motion Graphics</option>
                  <option value="logo">Logo Design</option>
                  <option value="branding">Brand Identity</option>
                  <option value="3d">3D Animation</option>
                  <option value="thumbnail">Thumbnail Design</option>
                  <option value="multiple">Multiple Services</option>
                  <option value="other">Something Else</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="budget">
                  Approximate Budget
                </label>
                <select
                  className="form-select"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select budget range...</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-2k">$500 – $2,000</option>
                  <option value="2k-5k">$2,000 – $5,000</option>
                  <option value="5k-15k">$5,000 – $15,000</option>
                  <option value="15k+">$15,000+</option>
                  <option value="discuss">Let&apos;s discuss</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Tell Us Your Vision
                </label>
                <textarea
                  className="form-textarea"
                  id="message"
                  name="message"
                  placeholder="Describe your project, goals, timeline, and any other details..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {status !== "success" && (
                <button type="submit" className="form-submit" id="formSubmit" disabled={status === "sending"}>
                  <span>{status === "sending" ? "Sending..." : "Send Message"}</span>
                  <span>→</span>
                </button>
              )}

              {status === "success" && (
                <div className="form-success" style={{ display: "block" }}>
                  ✓ Message sent! We&apos;ll be in touch within 24 hours.
                </div>
              )}

              {status === "error" && (
                <div className="form-success" style={{ display: "block", color: "#ef4444", borderColor: "#ef4444", background: "rgba(239,68,68,0.1)" }}>
                  {errorMessage}
                </div>
              )}
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </main>
  );
}
