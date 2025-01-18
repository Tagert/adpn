import Image from "next/image";

import { BookCoverVariant, variantStyles } from "@/constants/bookCoverVariant";
import { cn } from "@/lib/utils";

import BookCoverSvg from "./BookCoverSvg";

type BookCoverProps = {
  variant?: BookCoverVariant;
  className?: string;
  coverColor: string;
  coverImage: string;
};

const BookCover = ({
  variant = "regular",
  className,
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: BookCoverProps) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BookCover;
