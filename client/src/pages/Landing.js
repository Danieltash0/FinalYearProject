import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '🐄', title: 'Cattle records', text: 'Register every animal with tag, breed, health status and notes, and find any record in seconds.' },
  { icon: '📱', title: 'QR identification', text: 'Each animal gets a QR code so workers can pull up its profile in the field. (Coming soon)' },
  { icon: '🥛', title: 'Milk yield recommender', text: 'A moving-average forecast with breed-based fallbacks and early alerts when yield drops. (Coming soon)' },
  { icon: '🩺', title: 'Veterinary care', text: 'Health records and appointments in one place, linked to each animal. (Coming soon)' },
  { icon: '✅', title: 'Daily tasks', text: 'Assign and tick off feeding, cleaning and milking tasks for your team. (Coming soon)' },
  { icon: '🔐', title: 'Role-based access', text: 'Managers, veterinarians, workers and admins each see and do only what their role allows.' }
];

const roles = [
  { name: 'Farm Manager', text: 'Oversees the herd, edits records and assigns work.' },
  { name: 'Veterinarian', text: 'Reviews animals and keeps their health history.' },
  { name: 'Worker', text: 'Registers animals and completes daily tasks.' },
  { name: 'Admin', text: 'Manages users and system settings.' }
];

const Landing = () => (
  <div className="landing">
    <header className="landing-nav">
      <div className="landing-nav-inner">
        <span className="brand">
          <span className="brand-mark" aria-hidden="true">D</span>
          DairyDan
        </span>
        <nav>
          <a href="#features">Features</a>
          <a href="#roles">Roles</a>
          <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
          <Link to="/signup" className="btn btn-primary btn-sm">Get started</Link>
        </nav>
      </div>
    </header>

    <section className="hero">
      <div className="hero-inner">
        <p className="eyebrow">Dairy farm management for Kenya</p>
        <h1>Know every cow. Grow every litre.</h1>
        <p className="hero-sub">
          DairyDan helps smallholder and mid-scale dairy farmers keep clean herd records, coordinate
          their team, and spot milk yield problems before they cost money.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="btn btn-primary btn-lg">Create an account</Link>
          <Link to="/login" className="btn btn-light btn-lg">Login</Link>
        </div>
      </div>
    </section>

    <section id="features" className="section">
      <h2>Everything the farm needs</h2>
      <p className="section-sub">Cattle management and secure access are live now; the rest arrives module by module.</p>
      <div className="feature-grid">
        {features.map((f) => (
          <div className="card feature" key={f.title}>
            <span className="feature-icon" aria-hidden="true">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section id="roles" className="section section-alt">
      <h2>Built for the whole team</h2>
      <div className="role-grid">
        {roles.map((r) => (
          <div className="role-card" key={r.name}>
            <h3>{r.name}</h3>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="cta">
      <h2>Ready to get your herd in order?</h2>
      <Link to="/signup" className="btn btn-light btn-lg">Sign up free</Link>
    </section>

    <footer className="footer">
      <p>© {new Date().getFullYear()} DairyDan · Strathmore University undergraduate research project</p>
    </footer>
  </div>
);

export default Landing;
