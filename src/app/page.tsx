"use client";

import React, { useEffect } from "react";
import { BOOKS } from "@/utils/constants";
import { BooksList } from "@/components/home/BooksList";
import { Introduction } from "@/components/home/Introduction";
import { SearchBar } from "@/components/home/Search";
import axios from "axios";
import { toast } from "react-toastify";
import { Books } from "@/types/books.types";
import "@/locales/utils/i18n";

export default function Home() {
  const [search, setSearch] = React.useState<string>("");
  const [books, setBooks] = React.useState<Books>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/books`
        );
        setBooks(result.data);
      } catch (error) {
        console.log("🚀 ~ fetchBooks ~ error:", error);
        toast.error("Error fetching books");
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className={`min-h-screen`}>
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
      <BooksList books={books ?? BOOKS} search={search} />
    </div>
  );
}
