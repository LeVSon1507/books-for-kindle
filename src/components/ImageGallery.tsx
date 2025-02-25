"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CloudinaryImage {
  public_id: string;
  url: string;
  width: number;
  height: number;
}

export default function ImageGallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/images?limit=20");
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("folder", "uploads");

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setImages((prev) => [data.image, ...prev]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (publicId: string) => {
    try {
      const response = await fetch("/api/images", {
        method: "DELETE",
        body: JSON.stringify({ public_id: publicId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success) {
        setImages((prev) => prev.filter((img) => img.public_id !== publicId));
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Button asChild>
          <label className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.public_id}
              className="relative group rounded-lg overflow-hidden"
            >
              <Image
                src={image.url}
                alt=""
                width={300}
                height={300}
                className="object-cover w-full h-48"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(image.public_id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
