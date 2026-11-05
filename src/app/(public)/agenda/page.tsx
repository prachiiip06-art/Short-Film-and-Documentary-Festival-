export default function AgendaPage() {
  const days = [
    {
      date: "23 January 2027",
      items: [
        { time: "09:00 – 10:00", title: "Registration & Welcome Coffee" },
        { time: "10:00 – 10:30", title: "Opening Ceremony" },
        { time: "10:30 – 12:30", title: "Short Film Screenings – Block A" },
        { time: "12:30 – 13:30", title: "Lunch Break" },
        { time: "13:30 – 15:00", title: "Filmmaker Interaction Session" },
        { time: "15:00 – 15:30", title: "Tea Break" },
        { time: "15:30 – 17:30", title: "Documentary Screenings – Block B" },
        { time: "17:30 – 18:00", title: "Day 1 Closing Remarks" }
      ]
    },
    {
      date: "24 January 2027",
      items: [
        { time: "09:00 – 09:30", title: "Morning Networking" },
        { time: "09:30 – 11:00", title: "Scriptwriting Workshop" },
        { time: "11:00 – 11:30", title: "Break" },
        { time: "11:30 – 13:00", title: "Cinematography Workshop" },
        { time: "13:00 – 14:00", title: "Lunch" },
        { time: "14:00 – 15:30", title: "Panel: Independent Cinema Today" },
        { time: "15:30 – 16:00", title: "Tea Break" },
        { time: "16:00 – 17:00", title: "Awards Ceremony" },
        { time: "17:00 – 18:00", title: "Closing & Networking" }
      ]
    }
  ];

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="font-playfair text-4xl font-bold text-charcoal mb-2">
          Event Agenda
        </h1>
        <p className="text-charcoal-600 mb-12">
          Two full days of screenings, workshops and conversations. Timings are in IST.
        </p>

        <div className="space-y-12">
          {days.map((day) => (
            <div key={day.date}>
              <h2 className="font-montserrat text-lg font-semibold text-champagne mb-6">
                {day.date}
              </h2>
              <div className="space-y-3">
                {day.items.map((item) => (
                  <div
                    key={item.time + item.title}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-xl border border-charcoal-100 bg-white px-5 py-4"
                  >
                    <span className="font-medium text-champagne text-sm w-36 shrink-0">
                      {item.time}
                    </span>
                    <span className="text-charcoal">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
