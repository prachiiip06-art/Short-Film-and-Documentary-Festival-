import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [
    totalRegs,
    confirmed,
    checkedIn,
    ticketBreakdown
  ] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { status: "CONFIRMED" } }),
    prisma.registration.count({ where: { checkedInAt: { not: null } } }),
    prisma.ticketType.findMany({
      select: { name: true, soldCount: true, capacity: true }
    })
  ]);

  return (
    <div className="min-h-screen bg-charcoal-50">
      <header className="border-b border-charcoal-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <h1 className="font-playfair text-xl font-bold text-charcoal">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-charcoal-600">{session.user.name}</span>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="text-champagne hover:underline">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatCard label="Total Registrations" value={totalRegs} />
          <StatCard label="Confirmed" value={confirmed} />
          <StatCard label="Checked In" value={checkedIn} />
          <StatCard label="Ticket Types" value={ticketBreakdown.length} />
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm mb-8">
          <h2 className="font-montserrat font-semibold text-charcoal mb-4">
            Ticket Breakdown
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-100 text-left text-charcoal-500">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Sold</th>
                  <th className="pb-3 font-medium">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {ticketBreakdown.map((t) => (
                  <tr key={t.name} className="border-b border-charcoal-50">
                    <td className="py-3 text-charcoal">{t.name}</td>
                    <td className="py-3">{t.soldCount}</td>
                    <td className="py-3">{t.capacity ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminLink href="/admin/registrations" label="Registrations" />
          <AdminLink href="/admin/speakers" label="Speakers" />
          <AdminLink href="/admin/spocs" label="SPOCs" />
          <AdminLink href="/admin/tickets" label="Ticket Types" />
          <AdminLink href="/admin/checkin" label="QR Check-in" />
          <AdminLink href="/admin/settings" label="Event Settings" />
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm">
      <p className="text-sm text-charcoal-500 mb-1">{label}</p>
      <p className="font-playfair text-3xl font-bold text-charcoal">{value}</p>
    </div>
  );
}

function AdminLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-charcoal-100 bg-white px-5 py-4 text-charcoal font-medium shadow-sm hover:border-champagne hover:text-champagne transition-colors"
    >
      {label} →
    </Link>
  );
}
