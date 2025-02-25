import { Button } from "../ui/button";

export const DownloadButton = ({
  epubUrl,
  title,
}: {
  epubUrl: string;
  title: string;
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(epubUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.epub`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return <Button onClick={handleDownload}>Download EPUB</Button>;
};
