import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (form.message.length < 10) newErrors.message = "Message too short";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // 🔥 BACKEND PLACE (Node / Firebase)
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setForm({ name: "", email: "", message: "" });
    }, 2500);
  };

  return (
    <div className="contact-page">

      {/* SUCCESS ANIMATION */}
      {success && (
        <div className="success-box">
          <div className="checkmark">✔</div>
          <p>Message sent successfully!</p>
        </div>
      )}

      <div className="contact-header glass-card">
        <h1>Contact Us</h1>
        <p>We usually respond within 24 hours</p>
      </div>

      <form className="contact-form glass-card" onSubmit={handleSubmit}>

        {/* NAME */}
        <div className="input-box">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <label className={form.name ? "active" : ""}>Name</label>
          {errors.name && <span>{errors.name}</span>}
        </div>

        {/* EMAIL */}
        <div className="input-box">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <label className={form.email ? "active" : ""}>Email</label>
          {errors.email && <span>{errors.email}</span>}
        </div>

        {/* MESSAGE */}
        <div className="input-box">
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
          />
          <label className={form.message ? "active" : ""}>Message</label>
          {errors.message && <span>{errors.message}</span>}
        </div>

        <button type="submit">Send Message</button>

      </form>
    </div>
  );
}