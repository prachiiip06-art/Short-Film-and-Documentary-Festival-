export default function SpeakersPage() {
  const speakers = [
    {
      id: "1",
      name: "Guest Filmmaker 1",
      title: "Independent Director",
      bio: "Award-winning short filmmaker focusing on social documentaries.",
      sessionTitle: "Crafting Impactful Documentaries",
      sessionTime: "23 Jan 2027 • 11:00 AM"
    },
    {
      id: "2",
      name: "Guest Filmmaker 2",
      title: "Cinematographer",
      bio: "Known for visual storytelling in independent cinema.",
      sessionTitle: "The Art of Cinematography",
      sessionTime: "23 Jan 2027 • 2:00 PM"
    },
    {
      id: "3",
      name: "Industry Expert",
      title: "Film Festival Curator",
      bio: "Curator and programmer for multiple short film festivals across India.",
      sessionTitle: "How Festivals Discover New Voices",
      sessionTime: "24 Jan 2027 • 11:30 AM"
    }
  ];

  return (
    <div className="section-padding">
      <div className="container-wide">
        <h1 className="font-playfair text-4xl font-bold text-charcoal mb-2">
          Speakers & Guests
        </h1>
        <p className="text-charcoal-600 mb-12 max-w-2xl">
          Filmmakers, cinematographers and industry voices joining us for conversations and workshops.
        </p>

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
      </div>
    </div>
  );
}
