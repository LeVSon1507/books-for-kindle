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
import { Book } from "./BooksList";
import { useState } from "react";

interface BookCardProps {
  book: Book;
  onDownload: (url?: string) => void;
  onKindleEmailSubmit: (email: string) => void;
  handleSendToKindle: (book: Book) => void;
}

export const BookCard = ({
  handleSendToKindle,
  book,
  onDownload,
  onKindleEmailSubmit,
}: BookCardProps) => {
  const [email, setEmail] = useState("");

  return (
    <Card className="flex flex-col w-full">
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
      <CardFooter className="w-full flex flex-col md:flex-col lg:flex-col xl:flex-row sm:flex-col gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => handleSendToKindle(book)}
            >
              <Send className="h-4 w-4 mr-2" />
              Send to Kindle
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>Send to Kindle</DialogTitle>
              <DialogDescription>
                Enter your Kindle email address to receive this book.
              </DialogDescription>
            </DialogHeader>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-kindle-email@kindle.com"
              className="mt-4"
            />
            <DialogFooter className="mt-4">
              <Button
                className="w-full"
                onClick={() => onKindleEmailSubmit(email)}
              >
                Send to Kindle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button className="w-full" onClick={() => onDownload(book.epubUrl)}>
          <Download className="h-4 w-4 mr-2" />
          Download EPUB
        </Button>
      </CardFooter>
    </Card>
  );
};
