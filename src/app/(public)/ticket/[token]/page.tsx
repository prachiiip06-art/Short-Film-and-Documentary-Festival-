import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { generateQRDataUrl } from "@/lib/qr";
import Image from "next/image";

export default async function TicketPage({
  params
}: {
  params: { token: string };
}) {
  const registration = await prisma.registration.findUnique({
    where: { verificationToken: params.token },
    include: {
      ticketType: true,
      event: {
        include: {
          spocs: {
            include: { assignments: true }
          }
        }
      }
    }
  });

  if (!registration) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const qrDataUrl = await generateQRDataUrl(registration.verificationToken, baseUrl);

  // Find assigned SPOC
  const assignment = await prisma.spocAssignment.findFirst({
    where: { ticketTypeId: registration.ticketTypeId },
    include: { spoc: true }
  });

  return (
    <div className="section-padding bg-ivory min-h-screen">
      <div className="container-narrow max-w-md">
        <div className="rounded-2xl overflow-hidden border border-charcoal-100 bg-white shadow-lg">
          {/* Header */}
          <div className="bg-charcoal px-6 py-5 text-center">
            <p className="font-montserrat text-xs uppercase tracking-widest text-champagne mb-1">
              Official Ticket
            </p>
            <h1 className="font-playfair text-xl font-bold text-ivory">
              Frame By Frame 2027
            </h1>
          </div>

          <div className="p-6 space-y-5">
            <div className="text-center">
              <p className="text-sm text-charcoal-500">Ticket Type</p>
              <p className="font-montserrat font-semibold text-charcoal text-lg">
                {registration.ticketType.name}
              </p>
            </div>

            <div className="flex justify-center">
              <Image
                src={qrDataUrl}
                alt="Ticket QR Code"
                width={220}
                height={220}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Name</span>
                <span className="font-medium">{registration.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Ticket No.</span>
                <span className="font-medium">{registration.ticketNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Reg. ID</span>
                <span className="font-medium">{registration.registrationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Dates</span>
                <span className="font-medium">23–24 Jan 2027</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Venue</span>
                <span className="font-medium text-right max-w-[180px]">
                  {registration.event.venueName}
                </span>
              </div>
            </div>

            {assignment?.spoc && (
              <div className="rounded-xl bg-ivory p-4 text-sm">
                <p className="font-medium text-charcoal mb-1">Your Contact (SPOC)</p>
                <p className="text-charcoal-700">{assignment.spoc.name}</p>
                {assignment.spoc.email && (
                  <p className="text-charcoal-600">{assignment.spoc.email}</p>
                )}
                {assignment.spoc.phone && (
                  <p className="text-charcoal-600">{assignment.spoc.phone}</p>
                )}
              </div>
            )}

            <p className="text-center text-xs text-charcoal-400">
              Present this QR code at the entrance for check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
