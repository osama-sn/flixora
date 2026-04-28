function Navbar() {
    return (
      <nav className="flex justify-between items-center px-0 py-4">
        <h1 className="text-red-500 text-2xl font-bold">
          Flixora
        </h1>
  
        <div className="flex gap-4 text-sm">
          <span className="cursor-pointer hover:text-gray-400">Home</span>
          <span className="cursor-pointer hover:text-gray-400">Movies</span>
          <span className="cursor-pointer hover:text-gray-400">Series</span>
        </div>
      </nav>
    );
  }
  
  export default Navbar;