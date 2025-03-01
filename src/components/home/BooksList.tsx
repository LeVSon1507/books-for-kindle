"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { BookCard } from "./BookCard";
import { Book } from "@/types/books.types";
import axios from "axios";
import { t } from "i18next";

interface BooksListProps {
  books: Book[];
  search: string;
}

export const BooksList = ({ books = [], search }: BooksListProps) => {
  const [kindleEmail, setKindleEmail] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  console.log("🚀 ~ BooksList ~ selectedBook:", selectedBook);

  const handleDownloadEpub = (url?: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleSendToKindle = async (book: Book) => {
    try {
      const result = await axios.post(
        String(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT),
        {
          to: kindleEmail,
          cc: "easykindle@easy-kindle.shop",
          templateEmailId: "d-2c7d53bfcba1497b81394d56ad713766",
          bookId: book.id,
          personalNote: t("home.personalNote.note"),
        }
      );
      // const response = await fetch("/api/send-to-kindle", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: kindleEmail,
      //     bookUrl: book.epubUrl,
      //     bookTitle: book.title,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to send to Kindle");
      // }
      if (result.status !== 200) {
        toast.error("Failed to send to Kindle!");
      }

      setKindleEmail("");
      setSelectedBook(null);
      toast.success("Sent to kindle successfully!");
    } catch (error) {
      console.error("Error sending to Kindle:", error);
    }
  };

  const filteredBooks = books.filter((book) => {
    const searchTerm = search.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchTerm) ||
      (book.author && book.author.toLowerCase().includes(searchTerm)) ||
      (book.description && book.description.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleSendToKindle={handleSendToKindle}
            onDownload={handleDownloadEpub}
            onKindleEmailSubmit={(email) => {
              setKindleEmail(email);
              setSelectedBook(book);
            }}
          />
        ))}
      </div>
    </div>
  );
};

