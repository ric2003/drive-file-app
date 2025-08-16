// lib/file-icons.tsx
import { ImageIcon, Video, Music, FileText, Archive } from "lucide-react";

type FileType =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "document"
  | "presentation"
  | "archive"
  | "file";

export function getFileIcon(fileType: FileType) {
  switch (fileType) {
    case "image":
      return <ImageIcon className="h-5 w-5 text-green-500" />;
    case "video":
      return <Video className="h-5 w-5 text-red-500" />;
    case "audio":
      return <Music className="h-5 w-5 text-purple-500" />;
    case "pdf":
      return <FileText className="h-5 w-5 text-red-600" />;
    case "document":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "presentation":
      return <FileText className="h-5 w-5 text-orange-500" />;
    case "archive":
      return <Archive className="h-5 w-5 text-yellow-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
}
