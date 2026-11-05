import { prisma } from "@/lib/prisma";

// Do not prerender at build time – needs the database at request time
export const dynamic = "force-dynamic";

export default async function SpeakersPage() {
  let speakers: Awaited<ReturnType<typeof prisma.speaker.findMany>> = [];

  try {
    speakers = await prisma.speaker.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" }
    });
  } catch {
    // DB not ready yet (e.g. first deploy before /setup)
    speakers = [];
  }

  return (
    <div className="section-padding">
      <div className="container-wide">
        <h1 className="font-playfair text-4xl font-bold text-charcoal mb-2">
          Speakers & Guests
        </h1>
        <p className="text-charcoal-600 mb-12 max-w-2xl">
          Filmmakers, cinematographers and industry voices joining us for conversations and workshops.
        </p>

        {speakers.length === 0 ? (
          <p className="text-charcoal-500">Speakers will be announced soon.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {speakers.map((sp) => (
              <div
                key={sp.id}
                className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 h-20 w-20 rounded-full bg-champagne/20 flex items-center justify-center text-2xl font-playfair text-champagne">
                  {sp.name.charAt(0)}
                </div>
                <h2 className="font-montserrat font-semibold text-charcoal text-lg">
                  {sp.name}
                </h2>
                {sp.title && (
                  <p className="text-sm text-champagne mb-2">{sp.title}</p>
                )}
                {sp.bio && (
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-3">
                    {sp.bio}
                  </p>
                )}
                {sp.sessionTitle && (
                  <p className="text-xs text-charcoal-500">
                    <span className="font-medium">Session:</span> {sp.sessionTitle}
                    {sp.sessionTime && ` • ${sp.sessionTime}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
