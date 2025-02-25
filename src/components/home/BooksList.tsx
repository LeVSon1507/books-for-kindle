"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Send } from "lucide-react";
import Image from "next/image";
import { BOOKS } from "@/utils/constants";

export type Book = {
  id?: number;
  title: string;
  author?: string;
  cover: string;
  description?: string;
  epubUrl?: string;
};

export type BooksListProps = {
  books: Book[];
  search: string;
};

export const BooksList = ({ books = BOOKS, search }: BooksListProps) => {
  const handleDownloadEpub = (url?: string) => {
    window.open(url, "_blank");
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
          <Card key={book.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{book.title}</CardTitle>
              <p className="text-sm text-gray-500">{book.author}</p>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] relative overflow-hidden rounded-md">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                {book.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Send className="h-4 w-4 mr-2" />
                    Send to Kindle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send to Kindle</DialogTitle>
                    <DialogDescription>
                      Enter your Kindle email address to receive this book.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    type="email"
                    placeholder="your-kindle-email@kindle.com"
                    className="mt-4"
                  />
                  <DialogFooter className="mt-4">
                    <Button>Send to Kindle</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button onClick={() => handleDownloadEpub(book.epubUrl)}>
                <Download className="h-4 w-4 mr-2" />
                Download EPUB
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
