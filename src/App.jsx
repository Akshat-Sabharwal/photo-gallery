import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Card } from "./components/Card";
import { useFetchPhotos } from "./helpers/useFetchPhotos";

const favouritesReducer = (favourites, action) => {
  if (action.type === "TOGGLE_FAVOURITE") {
    return favourites.includes(action.id)
      ? favourites.filter((id) => id !== action.id)
      : [...favourites, action.id];
  }
  return favourites;
};

export const App = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    JSON.parse(localStorage.getItem("favourites") || "[]"),
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const handleLikedFilter = useCallback((event) => {
    setShowLikedOnly(event.target.checked);
  }, []);

  const filteredPhotos = useMemo(
    () =>
      photos.filter((photo) => {
        const matchesAuthor = photo.author
          .toLowerCase()
          .includes(search.trim().toLowerCase());
        const matchesLiked = !showLikedOnly || favourites.includes(photo.id);
        return matchesAuthor && matchesLiked;
      }),
    [photos, search, showLikedOnly, favourites],
  );

  const toggleFavourite = useCallback((id) => {
    dispatch({ type: "TOGGLE_FAVOURITE", id });
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <input
          type="search"
          placeholder="Search by author"
          value={search}
          onChange={handleSearch}
          className="rounded-md border border-gray-300 px-4 py-2"
        />
        <label className="flex shrink-0 items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={showLikedOnly}
            onChange={handleLikedFilter}
          />
          Liked only
        </label>
      </div>

      {loading && (
        <p className="py-10 text-center text-gray-600">Loading photos...</p>
      )}
      {error && <p className="py-10 text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <Card
              imgSrc={photo.download_url}
              author={photo.author}
              id={photo.id}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={toggleFavourite}
              key={photo.id}
            />
          ))}
        </section>
      )}
    </main>
  );
};
