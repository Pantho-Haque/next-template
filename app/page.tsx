import { LocaleSwitcherSelect } from "@/components";
import { useTranslations } from "next-intl";

import "@/styles/app.css"


export default function Home() {
  const t = useTranslations();
  return (
    <div className="container mx-auto px-4 py-8">
      <LocaleSwitcherSelect />
      <h1 className="text-3xl font-bold mb-6">Tailwind Components Demo</h1>

      {/* Button Components */}
      <section className="mb-8">
        <p>{t("hello")}</p>
        <h2 className="text-2xl font-semibold mb-4">Button Components</h2>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary">Primary Button</button>
          <button className="btn btn-secondary">Secondary Button</button>
          <button className="btn btn-success">Success Button</button>
          <button className="btn btn-danger">Danger Button</button>
          <button className="btn btn-primary btn-sm">Small Button</button>
          <button className="btn btn-outline-primary">Outline Button</button>
        </div>
      </section>

      {/* Card Components */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Basic Card</h3>
              <p className="card-subtitle">Card subtitle</p>
            </div>
            <div className="card-body">
              <p>This is a basic card component created with Tailwind CSS.</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>

          <div className="card card-primary card-hover">
            <div className="card-header">
              <h3 className="card-title">Primary Card</h3>
              <p className="card-subtitle">With hover effect</p>
            </div>
            <div className="card-body">
              <p>This card has a primary style and hover effect.</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-outline-primary">View Details</button>
            </div>
          </div>

          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Success Card</h3>
            </div>
            <div className="card-body">
              <p>This is a success variant of the card component.</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-success">Confirm</button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Components */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
        <div className="max-w-md">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input form-input-valid"
              placeholder="example@email.com"
            />
            <p className="form-feedback form-feedback-valid">Email is valid</p>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input form-input-invalid"
            />
            <p className="form-feedback form-feedback-invalid">
              Password must be at least 8 characters
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select id="country" className="form-select">
              <option value="">Select a country</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
            </select>
          </div>

          <div className="form-group">
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="form-checkbox" />
              <label htmlFor="terms" className="form-check-label">
                I agree to the terms
              </label>
            </div>
          </div>

          <button className="btn btn-primary w-full">Submit Form</button>
        </div>
      </section>
    </div>
  );
}
