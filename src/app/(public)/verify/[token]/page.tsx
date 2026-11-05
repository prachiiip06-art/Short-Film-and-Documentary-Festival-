import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function VerifyPage({
  params
}: {
  params: { token: string };
}) {
  const registration = await prisma.registration.findUnique({
    where: { verificationToken: params.token },
    include: { ticketType: true, event: true }
  });

  if (!registration) notFound();

  const isCheckedIn = !!registration.checkedInAt;
  const isCancelled = registration.status === "CANCELLED";

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-4">
      <div className="w-full max-w-md rounded-2xl border border-charcoal-100 bg-white p-8 shadow-lg text-center">
        <h1 className="font-playfair text-2xl font-bold text-charcoal mb-6">
          Ticket Verification
        </h1>

        {isCancelled ? (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
            This ticket has been cancelled.
          </div>
        ) : isCheckedIn ? (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-800">
            Already checked in at{" "}
            {registration.checkedInAt?.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata"
            })}
          </div>
        ) : (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-green-800 mb-6">
            Valid ticket – ready for check-in
          </div>
        )}

        <div className="mt-6 space-y-2 text-sm text-left">
          <div className="flex justify-between">
            <span className="text-charcoal-500">Name</span>
            <span className="font-medium">{registration.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-500">Ticket</span>
            <span className="font-medium">{registration.ticketNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-500">Type</span>
            <span className="font-medium">{registration.ticketType.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-500">Status</span>
            <span className="font-medium">{registration.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
