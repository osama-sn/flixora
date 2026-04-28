function buildImg(path, size) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export default function MovieDetailsHero({ movie }) {
  const poster = buildImg(movie.poster_path, "w500");
  const backdrop = buildImg(movie.backdrop_path, "w1280");
  const movieTitle = movie.title ?? movie.name ?? "";
  const movieYear = movie.release_date ? String(movie.release_date).slice(0, 4) : "";
  const searchQuery = `${movieTitle} ${movieYear} عرب سيد`.trim();
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10">
      {backdrop ? (
        <img
          src={backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-70" />
      )}

      <div className="relative p-5 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full md:w-60 shrink-0">
            <img
              src={
                poster ??
                "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title ?? movie.name ?? "Movie poster"}
              className="w-full h-80 md:h-96 object-cover rounded-xl"
              loading="lazy"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-semibold">
              {movie.title ?? movie.name}
            </h1>

            {movie.tagline ? (
              <p className="text-gray-300 mt-2 italic">{movie.tagline}</p>
            ) : null}

            {movie.overview ? (
              <p className="text-gray-200 mt-4 leading-relaxed">
                {movie.overview}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2 mt-4">
              {(movie.genres ?? []).map((g) => (
                <span
                  key={g.id}
                  className="text-xs bg-white/10 border border-white/10 rounded-full px-3 py-1 text-gray-100"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <a
              href={googleSearchUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center mt-5 h-11 rounded-lg bg-red-600 hover:bg-red-500 px-5 font-medium text-white transition"
            >
              Watch Movie
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

