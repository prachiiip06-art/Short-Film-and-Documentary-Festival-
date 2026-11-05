import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Frame By Frame Event Management Platform...");

  // ========== ROLES ==========
  const roles = [
    { name: "SUPER_ADMIN", description: "Full system access", isSystem: true },
    { name: "EVENT_MANAGER", description: "Manage event content and registrations", isSystem: true },
    { name: "SPEAKER_MANAGER", description: "Manage speakers and sessions", isSystem: true },
    { name: "SPONSOR_MANAGER", description: "Manage sponsors", isSystem: true },
    { name: "STALL_MANAGER", description: "Manage stalls and exhibitors", isSystem: true },
    { name: "ARTIST_MANAGER", description: "Manage artists and performers", isSystem: true },
    { name: "REGISTRATION_MANAGER", description: "View and manage registrations + check-in", isSystem: true },
    { name: "CHECKIN_STAFF", description: "QR scan and check-in only", isSystem: true }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role
    });
  }

  // ========== PERMISSIONS (basic set) ==========
  const permissionKeys = [
    "event:read", "event:write",
    "pages:read", "pages:write",
    "registrations:read", "registrations:write", "registrations:export",
    "tickets:read", "tickets:write",
    "speakers:read", "speakers:write",
    "sponsors:read", "sponsors:write",
    "exhibitors:read", "exhibitors:write",
    "stalls:read", "stalls:write",
    "artists:read", "artists:write",
    "performers:read", "performers:write",
    "volunteers:read", "volunteers:write",
    "spocs:read", "spocs:write",
    "users:read", "users:write",
    "roles:read", "roles:write",
    "emails:read", "emails:write", "emails:send",
    "reminders:read", "reminders:write",
    "checkin:perform",
    "reports:read",
    "settings:write",
    "audit:read"
  ];

  for (const key of permissionKeys) {
    await prisma.permission.upsert({
      where: { key },
      update: {},
      create: { key, description: key }
    });
  }

  // Assign all permissions to SUPER_ADMIN
  const superAdminRole = await prisma.role.findUnique({ where: { name: "SUPER_ADMIN" } });
  const allPermissions = await prisma.permission.findMany();
  if (superAdminRole) {
    for (const perm of allPermissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: { roleId: superAdminRole.id, permissionId: perm.id }
        },
        update: {},
        create: { roleId: superAdminRole.id, permissionId: perm.id }
      });
    }
  }

  // ========== SUPER ADMIN USER ==========
  // Default password: Admin@Frame2027  (change immediately after first login)
  const passwordHash = await bcrypt.hash("Admin@Frame2027", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@framebyframe.in" },
    update: {},
    create: {
      email: "admin@framebyframe.in",
      passwordHash,
      name: "Prachi Patel",
      phone: "9113693553",
      isActive: true
    }
  });

  if (superAdminRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: { userId: adminUser.id, roleId: superAdminRole.id }
      },
      update: {},
      create: { userId: adminUser.id, roleId: superAdminRole.id }
    });
  }

  // ========== EVENT ==========
  const event = await prisma.event.upsert({
    where: { id: "frame-by-frame-2027" },
    update: {},
    create: {
      id: "frame-by-frame-2027",
      name: "Frame By Frame : Short Film and Documentary Festival",
      tagline: "Every Frame Tells a Story. Every Story Creates an Impact.",
      description: `Get ready to experience the magic of storytelling at FRAME BY FRAME 2027, a two-day Short Film and Documentary Festival celebrating creativity, cinema and emerging filmmaking talent.

The festival brings together student filmmakers, independent creators, film enthusiasts and industry professionals on one platform to showcase powerful stories through the art of cinema.

Experience exciting short-film screenings, thought-provoking documentaries, interactive filmmaker discussions, expert panel sessions and practical filmmaking workshops.

**Festival Highlights:**
• Student short-film and documentary screenings
• Interactive sessions with filmmakers and directors
• Expert panel discussions on independent cinema
• Scriptwriting and cinematography workshops
• Audience Choice Award and Best Film Awards
• Networking opportunities with creative professionals

**Who Can Attend?**
College students, aspiring filmmakers, actors, directors, content creators, media professionals and cinema enthusiasts.`,
      category: "Film and media",
      subCategory: "Film Festival",
      theme: "Stories that Inspire, Educate and Entertain",
      startDate: new Date("2027-01-23T00:00:00+05:30"),
      endDate: new Date("2027-01-24T00:00:00+05:30"),
      startTime: "09:00",
      endTime: "18:00",
      timezone: "Asia/Kolkata",
      venueName: "Suchitra Cinema and Cultural Academy",
      venueAddress: "#36, 9th Main, B. V. Karanth Road, near Post Office, Banashankari 2nd Stage, Bengaluru, Karnataka 560070, India",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Suchitra+Cinema+and+Cultural+Academy+Bengaluru",
      organizerName: "Prachi Patel",
      organizerEmail: "prachiiip06@gmail.com",
      organizerPhone: "9113693553",
      websiteUrl: null,
      logoUrl: "/images/logo.jpeg",
      bannerUrl: "/images/banner.jpeg",
      primaryColor: "#C6A15B",
      secondaryColor: "#242424",
      backgroundColor: "#F5F1E8",
      textColor: "#292929",
      fontHeading: "Playfair Display",
      fontSubheading: "Montserrat",
      fontBody: "Poppins",
      socialInstagram: null,
      socialFacebook: null,
      socialYoutube: null,
      socialLinkedin: null,
      registrationMode: "OPEN",
      isPublished: true
    }
  });

  // ========== PAGES ==========
  const pages = [
    { slug: "home", title: "Home", sortOrder: 1, isEnabled: true },
    { slug: "about", title: "About the Event", sortOrder: 2, isEnabled: true },
    { slug: "agenda", title: "Event Agenda", sortOrder: 3, isEnabled: true },
    { slug: "speakers", title: "Speakers", sortOrder: 4, isEnabled: true },
    { slug: "sponsors", title: "Sponsors", sortOrder: 5, isEnabled: true },
    { slug: "partners", title: "Partners", sortOrder: 6, isEnabled: false },
    { slug: "exhibitors", title: "Exhibitors", sortOrder: 7, isEnabled: false },
    { slug: "artists", title: "Artists and Performers", sortOrder: 8, isEnabled: false },
    { slug: "workshops", title: "Workshops", sortOrder: 9, isEnabled: true },
    { slug: "venue", title: "Venue and Location", sortOrder: 10, isEnabled: true },
    { slug: "registration", title: "Registration", sortOrder: 11, isEnabled: true },
    { slug: "tickets", title: "Ticket Details", sortOrder: 12, isEnabled: true },
    { slug: "contact", title: "Contact", sortOrder: 13, isEnabled: true },
    { slug: "privacy", title: "Privacy Policy", sortOrder: 14, isEnabled: true },
    { slug: "terms", title: "Terms and Conditions", sortOrder: 15, isEnabled: true }
  ];

  for (const page of pages) {
    await prisma.eventPage.upsert({
      where: {
        eventId_slug: { eventId: event.id, slug: page.slug }
      },
      update: {},
      create: {
        eventId: event.id,
        ...page,
        content: {}
      }
    });
  }

  // ========== TICKET TYPES ==========
  const ticketTypes = [
    {
      name: "General Attendee",
      description: "Access to all screenings, panels and networking sessions",
      price: 0,
      capacity: 300,
      formFields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        { id: "phone", label: "Mobile Number", type: "tel", required: true },
        { id: "organization", label: "College / Organization", type: "text", required: false },
        { id: "city", label: "City", type: "text", required: false }
      ]
    },
    {
      name: "Student Filmmaker",
      description: "For student filmmakers submitting or attending with special access",
      price: 0,
      capacity: 100,
      formFields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        { id: "phone", label: "Mobile Number", type: "tel", required: true },
        { id: "organization", label: "College / Institute", type: "text", required: true },
        { id: "filmTitle", label: "Film Title (if submitting)", type: "text", required: false },
        { id: "city", label: "City", type: "text", required: false }
      ]
    },
    {
      name: "VIP / Industry",
      description: "Priority seating, networking lounge and exclusive sessions",
      price: 0,
      capacity: 50,
      formFields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        { id: "phone", label: "Mobile Number", type: "tel", required: true },
        { id: "organization", label: "Organization", type: "text", required: true },
        { id: "designation", label: "Designation", type: "text", required: true }
      ]
    },
    {
      name: "Workshop Participant",
      description: "Access to scriptwriting and cinematography workshops",
      price: 0,
      capacity: 60,
      formFields: [
        { id: "fullName", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        { id: "phone", label: "Mobile Number", type: "tel", required: true },
        { id: "workshopChoice", label: "Preferred Workshop", type: "select", required: true, options: ["Scriptwriting", "Cinematography", "Both"] }
      ]
    }
  ];

    for (let index = 0; index < ticketTypes.length; index++) {
    const tt = ticketTypes[index];
    await prisma.ticketType.create({
      data: {
        eventId: event.id,
        name: tt.name,
        description: tt.description,
        price: tt.price,
        capacity: tt.capacity,
        sortOrder: index + 1,
        formFields: tt.formFields,
        isActive: true
      }
    });
  } 

  // ========== SAMPLE SPEAKERS ==========
  const speakers = [
    {
      name: "Guest Filmmaker 1",
      title: "Independent Director",
      bio: "Award-winning short filmmaker focusing on social documentaries.",
      sessionTitle: "Crafting Impactful Documentaries",
      sessionTime: "23 Jan 2027 • 11:00 AM",
      isFeatured: true,
      sortOrder: 1
    },
    {
      name: "Guest Filmmaker 2",
      title: "Cinematographer",
      bio: "Known for visual storytelling in independent cinema.",
      sessionTitle: "The Art of Cinematography",
      sessionTime: "23 Jan 2027 • 2:00 PM",
      isFeatured: true,
      sortOrder: 2
    },
    {
      name: "Industry Expert",
      title: "Film Festival Curator",
      bio: "Curator and programmer for multiple short film festivals across India.",
      sessionTitle: "How Festivals Discover New Voices",
      sessionTime: "24 Jan 2027 • 11:30 AM",
      isFeatured: false,
      sortOrder: 3
    }
  ];

  for (const sp of speakers) {
    await prisma.speaker.create({
      data: { eventId: event.id, ...sp, isActive: true }
    });
  }

  // ========== SAMPLE SPOC ==========
  const spoc = await prisma.spoc.create({
    data: {
      eventId: event.id,
      name: "Prachi Patel",
      designation: "Festival Director",
      department: "Organizing Team",
      email: "prachiiip06@gmail.com",
      phone: "9113693553",
      whatsapp: "9113693553",
      responsibility: "Overall event coordination and registration support",
      isActive: true
    }
  });

  // Assign SPOC to General Attendee ticket type
  const generalTicket = await prisma.ticketType.findFirst({
    where: { eventId: event.id, name: "General Attendee" }
  });
  if (generalTicket) {
    await prisma.spocAssignment.create({
      data: {
        spocId: spoc.id,
        ticketTypeId: generalTicket.id
      }
    });
  }

  // ========== EMAIL TEMPLATE ==========
  await prisma.emailTemplate.create({
    data: {
      eventId: event.id,
      name: "Registration Confirmation",
      subject: "Your Frame By Frame 2027 Ticket – {{ticket_number}}",
      type: "CONFIRMATION",
      bodyHtml: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #F5F1E8; padding: 32px;">
          <h1 style="color: #C6A15B; font-size: 28px;">Frame By Frame 2027</h1>
          <p style="color: #292929;">Hello {{participant_name}},</p>
          <p style="color: #292929;">Thank you for registering for <strong>Frame By Frame : Short Film and Documentary Festival</strong>.</p>
          <p style="color: #292929;"><strong>Ticket Number:</strong> {{ticket_number}}<br/>
          <strong>Registration ID:</strong> {{registration_id}}<br/>
          <strong>Ticket Type:</strong> {{ticket_type}}</p>
          <p style="color: #292929;">Dates: 23–24 January 2027<br/>
          Venue: Suchitra Cinema and Cultural Academy, Bengaluru</p>
          <p style="color: #292929;">Please present your QR code at the entrance for check-in.</p>
          <p style="color: #666;">Your assigned contact: {{spoc_name}} ({{spoc_email}} / {{spoc_phone}})</p>
          <hr style="border-color: #C6A15B;"/>
          <p style="color: #999; font-size: 12px;">Frame By Frame 2027 • Every Frame Tells a Story</p>
        </div>
      `,
      isActive: true
    }
  });

  console.log("✅ Seed completed successfully!");
  console.log("   Super Admin: admin@framebyframe.in");
  console.log("   Temporary password: Admin@Frame2027");
  console.log("   Change this password immediately after first login.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
