function formatMoney(n) {
  if (!Number.isFinite(n) || n <= 0) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatRuntime(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

function getYear(dateString) {
  if (!dateString) return "—";
  return String(dateString).slice(0, 4);
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-white/10">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm text-gray-200 text-right">{value}</span>
    </div>
  );
}

export default function MovieDetailsMeta({ movie }) {
  const languages = (movie.spoken_languages ?? [])
    .map((l) => l.english_name || l.name)
    .filter(Boolean)
    .join(", ");

  const companies = (movie.production_companies ?? [])
    .map((c) => c.name)
    .filter(Boolean)
    .slice(0, 4)
    .join(", ");

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold mb-3">Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div>
          <MetaRow label="Release year" value={getYear(movie.release_date)} />
          <MetaRow label="Runtime" value={formatRuntime(movie.runtime)} />
          <MetaRow
            label="Rating"
            value={
              Number.isFinite(movie.vote_average)
                ? `${movie.vote_average.toFixed(1)} / 10`
                : "—"
            }
          />
          <MetaRow
            label="Votes"
            value={
              Number.isFinite(movie.vote_count)
                ? movie.vote_count.toLocaleString()
                : "—"
            }
          />
        </div>

        <div>
          <MetaRow label="Status" value={movie.status ?? "—"} />
          <MetaRow label="Budget" value={formatMoney(movie.budget)} />
          <MetaRow label="Revenue" value={formatMoney(movie.revenue)} />
          <MetaRow label="Languages" value={languages || "—"} />
          <MetaRow label="Companies" value={companies || "—"} />
        </div>
      </div>
    </section>
  );
}

