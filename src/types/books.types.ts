export enum BookStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
}

export enum BookCategory {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  TECHNOLOGY = "TECHNOLOGY",
  BUSINESS = "BUSINESS",
  SELF_HELP = "SELF_HELP",
  BIOGRAPHY = "BIOGRAPHY",
  HISTORY = "HISTORY",
  OTHER = "OTHER",
}

export type Book = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  author: string;
  status: BookStatus;
  category: BookCategory;
  publisher?: string;
  publicationDate?: Date;
  isbn?: string;
  language: string;
  cover?: string;
  bookCoverImageUrl?: string;
  epubUrl?: string;
  pdfUrl?: string;
  sampleUrl?: string;
  isFeatured: boolean;
  averageRating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Books = Book[];
