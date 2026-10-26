import { useEffect, useState } from "react";

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("https://picsum.photos/v2/list?limit=30");
        if (!response.ok) throw new Error("Could not load photos");
        setPhotos(await response.json());
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};
