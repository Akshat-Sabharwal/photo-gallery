import { Heart } from "lucide-react";

export const Card = ({
  author,
  imgSrc,
  id,
  isFavourite,
  onToggleFavourite,
}) => {
  const handlePictureClick = () => {
    onToggleFavourite(id);
  };

  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={handlePictureClick}
        className="relative block aspect-[4/3] cursor-pointer overflow-hidden"
        aria-label={
          isFavourite ? `Unlike photo by ${author}` : `Like photo by ${author}`
        }
      >
        <img
          src={imgSrc}
          alt={`Photo by ${author}`}
          className="h-full w-full object-cover"
        />
      </button>
      <div className="flex h-12 items-center justify-between border-t border-gray-200 px-3">
        <p className="truncate text-sm text-gray-700">{author}</p>
        <Heart
          aria-hidden="true"
          className={isFavourite ? "text-red-500" : "text-gray-400"}
          fill={isFavourite ? "currentColor" : "none"}
          size={20}
        />
      </div>
    </article>
  );
};
