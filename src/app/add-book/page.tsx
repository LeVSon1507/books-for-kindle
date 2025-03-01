"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookCategory, BookStatus } from "@/types/books.types";
import { CheckboxFormField } from "@/components/form-fields/CheckboxFormField";
import { TextFormField } from "@/components/form-fields/TextFormField";
import { TextareaFormField } from "@/components/form-fields/TextareaFormField";
import { SelectFormField } from "@/components/form-fields/SelectFormField";
import { DatePickerFormField } from "@/components/form-fields/DatePickerFormField";
import { useTranslation } from "react-i18next";
import "@/locales/utils/i18n";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  longDescription: z.string().optional(),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  author: z.string().min(1, { message: "Author is required" }),
  status: z.nativeEnum(BookStatus),
  category: z.nativeEnum(BookCategory),
  publisher: z.string().optional(),
  publicationDate: z.date().optional(),
  isbn: z.string().optional(),
  language: z.string().min(1, { message: "Language is required" }),
  bookCoverImageUrl: z.string().url().optional().or(z.literal("")),
  epubUrl: z.string().url().optional().or(z.literal("")),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  sampleUrl: z.string().url().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  averageRating: z.coerce.number().min(0).max(5).default(0),
  ratingCount: z.coerce.number().min(0).default(0),
});

export default function AddBookPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation("home");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      longDescription: "",
      price: 0,
      author: "",
      status: BookStatus.DRAFT,
      category: BookCategory.OTHER,
      publisher: "",
      language: "",
      bookCoverImageUrl: "",
      epubUrl: "",
      pdfUrl: "",
      sampleUrl: "",
      isFeatured: false,
      averageRating: 0,
      ratingCount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/books`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("🚀 ~ onSubmit ~ data:", response.data);

      toast.success(t("addBook.messages.success"));
      //   router.push("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(t("addBook.messages.error"));
    } finally {
      setIsSubmitting(false);
    }
  }

  // Convert enum values to options for select fields
  const statusOptions = Object.values(BookStatus).map((status) => ({
    value: status,
    label: status,
  }));

  const categoryOptions = Object.values(BookCategory).map((category) => ({
    value: category,
    label: category.replace(/_/g, " "),
  }));

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t("addBook.title")}</CardTitle>
          <CardDescription>{t("addBook.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <TextFormField
                  control={form.control}
                  name="title"
                  label={t("addBook.form.title")}
                  placeholder={t("addBook.form.titlePlaceholder")}
                  required
                />

                {/* Author */}
                <TextFormField
                  control={form.control}
                  name="author"
                  label={t("addBook.form.author")}
                  placeholder={t("addBook.form.authorPlaceholder")}
                  required
                />

                {/* Description */}
                <TextareaFormField
                  control={form.control}
                  name="description"
                  label={t("addBook.form.description")}
                  placeholder={t("addBook.form.descriptionPlaceholder")}
                  className="col-span-full"
                  required
                />

                {/* Long Description */}
                <TextareaFormField
                  control={form.control}
                  name="longDescription"
                  label={t("addBook.form.longDescription")}
                  placeholder={t("addBook.form.longDescriptionPlaceholder")}
                  description={t("addBook.form.optional")}
                  className="col-span-full"
                />

                {/* Price */}
                <TextFormField
                  control={form.control}
                  name="price"
                  label={t("addBook.form.price")}
                  placeholder={t("addBook.form.pricePlaceholder")}
                  type="number"
                  step="0.01"
                  required
                />

                {/* Language */}
                <TextFormField
                  control={form.control}
                  name="language"
                  label={t("addBook.form.language")}
                  placeholder={t("addBook.form.languagePlaceholder")}
                  required
                />

                {/* Status */}
                <SelectFormField
                  control={form.control}
                  name="status"
                  label={t("addBook.form.status")}
                  placeholder={t("addBook.form.statusPlaceholder")}
                  options={statusOptions}
                  required
                />

                {/* Category */}
                <SelectFormField
                  control={form.control}
                  name="category"
                  label={t("addBook.form.category")}
                  placeholder={t("addBook.form.categoryPlaceholder")}
                  options={categoryOptions}
                  required
                />

                {/* Publisher */}
                <TextFormField
                  control={form.control}
                  name="publisher"
                  label={t("addBook.form.publisher")}
                  placeholder={t("addBook.form.publisherPlaceholder")}
                  description={t("addBook.form.optional")}
                />

                {/* Publication Date */}
                <DatePickerFormField
                  control={form.control}
                  name="publicationDate"
                  label={t("addBook.form.publicationDate")}
                  placeholder={t("addBook.form.pickDate")}
                  description={t("addBook.form.optional")}
                />

                {/* ISBN */}
                <TextFormField
                  control={form.control}
                  name="isbn"
                  label={t("addBook.form.isbn")}
                  placeholder={t("addBook.form.isbnPlaceholder")}
                  description={t("addBook.form.optional")}
                />

                {/* Book Cover Image URL */}
                <TextFormField
                  control={form.control}
                  name="bookCoverImageUrl"
                  label={t("addBook.form.bookCoverImageUrl")}
                  placeholder={t("addBook.form.bookCoverImageUrlPlaceholder")}
                  description={t("addBook.form.optional")}
                />

                {/* EPUB URL */}
                <TextFormField
                  control={form.control}
                  name="epubUrl"
                  label={t("addBook.form.epubUrl")}
                  placeholder={t("addBook.form.epubUrlPlaceholder")}
                  description={t("addBook.form.optional")}
                />

                {/* PDF URL */}
                <TextFormField
                  control={form.control}
                  name="pdfUrl"
                  label={t("addBook.form.pdfUrl")}
                  placeholder={t("addBook.form.pdfUrlPlaceholder")}
                  description={t("addBook.form.optional")}
                />

                {/* Sample URL */}
                <TextFormField
                  control={form.control}
                  name="sampleUrl"
                  label={t("addBook.form.sampleUrl")}
                  placeholder={t("addBook.form.sampleUrlPlaceholder")}
                  description={t("addBook.form.optional")}
                />

                {/* Average Rating */}
                <TextFormField
                  control={form.control}
                  name="averageRating"
                  label={t("addBook.form.averageRating")}
                  placeholder={t("addBook.form.averageRatingPlaceholder")}
                  description={t("addBook.form.averageRatingDescription")}
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  required
                />

                {/* Rating Count */}
                <TextFormField
                  control={form.control}
                  name="ratingCount"
                  label={t("addBook.form.ratingCount")}
                  placeholder={t("addBook.form.ratingCountPlaceholder")}
                  type="number"
                  min="0"
                  required
                />

                {/* Is Featured */}
                <CheckboxFormField
                  control={form.control}
                  name="isFeatured"
                  label={t("addBook.form.isFeatured")}
                  description={t("addBook.form.isFeaturedDescription")}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  {t("addBook.buttons.cancel")}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? t("addBook.buttons.saving")
                    : t("addBook.buttons.save")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}