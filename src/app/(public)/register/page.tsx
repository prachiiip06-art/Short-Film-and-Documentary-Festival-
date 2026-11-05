"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TICKET_OPTIONS = [
  { id: "general", name: "General Attendee", description: "Access to all screenings, panels and networking" },
  { id: "filmmaker", name: "Student Filmmaker", description: "For student filmmakers with special access" },
  { id: "vip", name: "VIP / Industry", description: "Priority seating and exclusive sessions" },
  { id: "workshop", name: "Workshop Participant", description: "Scriptwriting & cinematography workshops" }
];

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    ticketType: "general",
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    city: "",
    workshopChoice: ""
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push(`/confirmation/${data.registrationId}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-xl">
        <h1 className="font-playfair text-4xl font-bold text-charcoal mb-2">
          Register
        </h1>
        <p className="text-charcoal-600 mb-10">
          Secure your place at Frame By Frame 2027. All fields marked * are required.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Ticket Type *
            </label>
            <div className="space-y-3">
              {TICKET_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    form.ticketType === opt.id
                      ? "border-champagne bg-champagne/5"
                      : "border-charcoal-200 hover:border-champagne/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="ticketType"
                    value={opt.id}
                    checked={form.ticketType === opt.id}
                    onChange={(e) => setForm({ ...form, ticketType: e.target.value })}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-charcoal">{opt.name}</div>
                    <div className="text-sm text-charcoal-600">{opt.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 px-4 py-3 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 px-4 py-3 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Mobile Number *</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 px-4 py-3 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              College / Organization
            </label>
            <input
              type="text"
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 px-4 py-3 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
            />
          </div>

          {form.ticketType === "vip" && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Designation</label>
              <input
                type="text"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                className="w-full rounded-lg border border-charcoal-200 px-4 py-3 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
              />
            </div>
          )}

          {form.ticketType === "workshop" && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">
                Preferred Workshop *
              </label>
              <select
                required
                value={form.workshopChoice}
                onChange={(e) => setForm({ ...form, workshopChoice: e.target.value })}
                className="w-full rounded-lg border border-charcoal-200 px-4 py-3 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
              >
                <option value="">Select...</option>
                <option value="Scriptwriting">Scriptwriting</option>
                <option value="Cinematography">Cinematography</option>
                <option value="Both">Both</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 px-4 py-3 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
