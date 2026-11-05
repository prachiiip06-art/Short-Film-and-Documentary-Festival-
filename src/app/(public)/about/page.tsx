export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="font-playfair text-4xl font-bold text-charcoal mb-6">
          About the Festival
        </h1>
        <div className="prose prose-lg max-w-none text-charcoal-700 space-y-6">
          <p>
            Get ready to experience the magic of storytelling at{" "}
            <strong>FRAME BY FRAME 2027</strong>, a two-day Short Film and
            Documentary Festival celebrating creativity, cinema and emerging
            filmmaking talent.
          </p>
          <p>
            The festival brings together student filmmakers, independent
            creators, film enthusiasts and industry professionals on one
            platform to showcase powerful stories through the art of cinema.
          </p>
          <p>
            Experience exciting short-film screenings, thought-provoking
            documentaries, interactive filmmaker discussions, expert panel
            sessions and practical filmmaking workshops.
          </p>

          <h2 className="font-playfair text-2xl font-semibold text-charcoal mt-10 mb-4">
            Festival Highlights
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Student short-film and documentary screenings</li>
            <li>Interactive sessions with filmmakers and directors</li>
            <li>Expert panel discussions on independent cinema</li>
            <li>Scriptwriting and cinematography workshops</li>
            <li>Audience Choice Award and Best Film Awards</li>
            <li>Networking opportunities with creative professionals</li>
          </ul>

          <h2 className="font-playfair text-2xl font-semibold text-charcoal mt-10 mb-4">
            Who Can Attend?
          </h2>
          <p>
            College students, aspiring filmmakers, actors, directors, content
            creators, media professionals and cinema enthusiasts.
          </p>

          <h2 className="font-playfair text-2xl font-semibold text-charcoal mt-10 mb-4">
            Theme
          </h2>
          <p className="text-champagne font-medium text-xl">
            Stories that Inspire, Educate and Entertain.
          </p>
        </div>
      </div>
    </div>
  );
}
