export const getImages = async () => {
  const response = await fetch("/api/images?limit=20");
  const data = await response.json();
  console.log(data.images);
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "uploads");

  const response = await fetch("/api/images", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  console.log(data.image);
};

export const deleteImage = async (publicId: string) => {
  const response = await fetch("/api/images", {
    method: "DELETE",
    body: JSON.stringify({ public_id: publicId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data.success);
};
