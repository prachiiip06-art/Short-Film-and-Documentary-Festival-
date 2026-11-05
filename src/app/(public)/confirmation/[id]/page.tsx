import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function ConfirmationPage({
  params
}: {
  params: { id: string };
}) {
  const registration = await prisma.registration.findUnique({
    where: { registrationId: params.id },
    include: {
      ticketType: true,
      event: true
    }
  });

  if (!registration) notFound();

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">
          Registration Confirmed
        </h1>
        <p className="text-charcoal-600 mb-8">
          Thank you, {registration.fullName}. Your ticket for Frame By Frame 2027 is ready.
        </p>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-8 text-left shadow-sm space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-500">Registration ID</span>
            <span className="font-medium text-charcoal">{registration.registrationId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-500">Ticket Number</span>
            <span className="font-medium text-charcoal">{registration.ticketNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-500">Ticket Type</span>
            <span className="font-medium text-charcoal">{registration.ticketType.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-500">Email</span>
            <span className="font-medium text-charcoal">{registration.email}</span>
          </div>
          <div className="pt-4 border-t border-charcoal-100">
            <p className="text-sm text-charcoal-600">
              A confirmation email has been sent (if email is configured). Please keep this page or the email for check-in.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/ticket/${registration.verificationToken}`}
            className="btn-primary"
          >
            View Ticket & QR Code
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
