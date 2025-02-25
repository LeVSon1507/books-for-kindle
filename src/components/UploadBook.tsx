import { useState } from "react";

interface BookData {
  title: string;
  author: string;
  description: string;
  coverImage?: File | null;
  epubFile?: File | null;
}

export const UploadBook = () => {
  const [bookData, setBookData] = useState<BookData>({
    title: "",
    author: "",
    description: "",
    coverImage: undefined,
    epubFile: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const coverFormData = new FormData();

    coverFormData.append("file", bookData?.coverImage as Blob);

    coverFormData.append("folder", "book-covers");

    const coverResponse = await fetch("/api/upload-image", {
      method: "POST",
      body: coverFormData,
    });
    const coverData = await coverResponse.json();

    // Upload epub file
    const epubFormData = new FormData();
    epubFormData.append("file", bookData?.epubFile as Blob);
    epubFormData.append("folder", "books");
    epubFormData.append("resource_type", "raw");

    const epubResponse = await fetch("/api/upload-epub", {
      method: "POST",
      body: epubFormData,
    });
    const epubData = await epubResponse.json();

    // Save book metadata
    await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify({
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        coverUrl: coverData.secure_url,
        epubUrl: epubData.secure_url,
        coverId: coverData.public_id,
        epubId: epubData.public_id,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Title"
        onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) =>
          setBookData({ ...bookData, description: e.target.value })
        }
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setBookData({ ...bookData, coverImage: e.target?.files?.[0] })
        }
      />
      <input
        type="file"
        accept=".epub"
        onChange={(e) =>
          setBookData({ ...bookData, epubFile: e.target?.files?.[0] })
        }
      />
      <button type="submit">Upload Book</button>
    </form>
  );
};
