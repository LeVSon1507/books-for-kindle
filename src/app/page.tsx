"use client";

import React from "react";
import { APP_COLOR, BOOKS } from "@/utils/constants";
import { BooksList } from "@/components/home/BooksList";
import { Introduction } from "@/components/home/Introduction";
import { SearchBar } from "@/components/home/Search";

export default function Home() {
  const [search, setSearch] = React.useState<string>("");

  return (
    <div className={`min-h-screen bg-[${APP_COLOR}]`}>
      {/* <CldImage
        alt="sample"
        src={""} // Use this sample image or upload your own via the Media Explorer
        width="500" // Transform the image: auto-crop to square aspect_ratio
        height="500"
        crop={{
          type: "auto",
          source: true,
        }}
      /> */}
      <Introduction />
      <SearchBar setSearch={setSearch} />
      <BooksList books={BOOKS} search={search} />
    </div>
  );
}
