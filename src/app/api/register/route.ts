import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateRegistrationId, generateTicketNumber, generateSecureToken } from "@/lib/utils";
import { sendEmail, personalizeTemplate } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, organization, designation, city, ticketType, workshopChoice } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: "Full name, email and phone are required." }, { status: 400 });
    }

    // Find the event (single-event template)
    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" }
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found. Please run database setup first." }, { status: 404 });
    }

    // Map simple ticketType keys to actual ticket type names
    const nameMap: Record<string, string> = {
      general: "General Attendee",
      filmmaker: "Student Filmmaker",
      vip: "VIP / Industry",
      workshop: "Workshop Participant"
    };

    const ticketTypeName = nameMap[ticketType] || "General Attendee";
    const tt = await prisma.ticketType.findFirst({
      where: { eventId: event.id, name: ticketTypeName, isActive: true }
    });

    if (!tt) {
      return NextResponse.json({ error: "Selected ticket type is not available." }, { status: 400 });
    }

    // Prevent duplicate email for same event
    const existing = await prisma.registration.findFirst({
      where: { eventId: event.id, email: email.toLowerCase().trim(), status: { not: "CANCELLED" } }
    });
    if (existing) {
      return NextResponse.json({ error: "You have already registered with this email." }, { status: 409 });
    }

    const registrationId = generateRegistrationId("FBF");
    const ticketNumber = generateTicketNumber();
    const verificationToken = generateSecureToken(40);

    const registration = await prisma.registration.create({
      data: {
        eventId: event.id,
        ticketTypeId: tt.id,
        registrationId,
        ticketNumber,
        verificationToken,
        status: "CONFIRMED",
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        organization: organization?.trim() || null,
        designation: designation?.trim() || null,
        city: city?.trim() || null,
        answers: workshopChoice ? { workshopChoice } : undefined
      }
    });

    // Increment sold count
    await prisma.ticketType.update({
      where: { id: tt.id },
      data: { soldCount: { increment: 1 } }
    });

    // Find SPOC for this ticket type
    const assignment = await prisma.spocAssignment.findFirst({
      where: { ticketTypeId: tt.id },
      include: { spoc: true }
    });

    // Send confirmation email (if Resend is configured)
    const template = await prisma.emailTemplate.findFirst({
      where: { eventId: event.id, type: "CONFIRMATION", isActive: true }
    });

    if (template) {
      const html = personalizeTemplate(template.bodyHtml, {
        participant_name: registration.fullName,
        event_name: event.name,
        event_date: "23–24 January 2027",
        event_venue: event.venueName || "",
        ticket_number: registration.ticketNumber,
        ticket_type: tt.name,
        registration_id: registration.registrationId,
        spoc_name: assignment?.spoc.name || event.organizerName || "",
        spoc_email: assignment?.spoc.email || event.organizerEmail || "",
        spoc_phone: assignment?.spoc.phone || event.organizerPhone || ""
      });

      await sendEmail({
        to: registration.email,
        subject: personalizeTemplate(template.subject, {
          ticket_number: registration.ticketNumber,
          participant_name: registration.fullName
        }),
        html
      });
    }

    return NextResponse.json({
      success: true,
      registrationId: registration.registrationId,
      ticketNumber: registration.ticketNumber,
      verificationToken: registration.verificationToken
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again later." },
      { status: 500 }
    );
  }
}
