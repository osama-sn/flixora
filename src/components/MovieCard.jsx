import { Link } from "react-router-dom";

export default function MovieCard({ id, title, image }) {
 

  return (
    <Link to={`/movie/${id}`} className="block">
     <div className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition">
      <img src={image} alt={title} className="w-full h-60 object-cover" />

      <h3 className="p-2 text-sm text-white">{title}</h3>
    </div>
    </Link>
  );
}