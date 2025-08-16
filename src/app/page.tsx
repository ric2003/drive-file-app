"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Upload,
  Search,
  Grid3X3,
  List,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  ChevronRight,
  Home,
  MoreVertical,
} from "lucide-react";
import { cn } from "~/lib/utils";

// Mock data structure
const mockData = {
  "/": {
    name: "My Drive",
    items: [
      {
        id: "1",
        name: "Documents",
        type: "folder",
        size: null,
        modified: "2024-01-15",
      },
      {
        id: "2",
        name: "Photos",
        type: "folder",
        size: null,
        modified: "2024-01-10",
      },
      {
        id: "3",
        name: "Projects",
        type: "folder",
        size: null,
        modified: "2024-01-20",
      },
      {
        id: "4",
        name: "Resume.pdf",
        type: "file",
        fileType: "pdf",
        size: "2.4 MB",
        modified: "2024-01-18",
        url: "https://example.com/resume.pdf",
      },
      {
        id: "5",
        name: "Presentation.pptx",
        type: "file",
        fileType: "presentation",
        size: "15.2 MB",
        modified: "2024-01-16",
        url: "https://example.com/presentation.pptx",
      },
    ],
  },
  "/Documents": {
    name: "Documents",
    items: [
      {
        id: "6",
        name: "Reports",
        type: "folder",
        size: null,
        modified: "2024-01-12",
      },
      {
        id: "7",
        name: "Contract.docx",
        type: "file",
        fileType: "document",
        size: "1.2 MB",
        modified: "2024-01-14",
        url: "https://example.com/contract.docx",
      },
      {
        id: "8",
        name: "Notes.txt",
        type: "file",
        fileType: "text",
        size: "45 KB",
        modified: "2024-01-13",
        url: "https://example.com/notes.txt",
      },
    ],
  },
  "/Photos": {
    name: "Photos",
    items: [
      {
        id: "9",
        name: "Vacation",
        type: "folder",
        size: null,
        modified: "2024-01-08",
      },
      {
        id: "10",
        name: "sunset.jpg",
        type: "file",
        fileType: "image",
        size: "3.2 MB",
        modified: "2024-01-09",
        url: "https://example.com/sunset.jpg",
      },
      {
        id: "11",
        name: "family.png",
        type: "file",
        fileType: "image",
        size: "2.8 MB",
        modified: "2024-01-07",
        url: "https://example.com/family.png",
      },
    ],
  },
  "/Projects": {
    name: "Projects",
    items: [
      {
        id: "12",
        name: "Website",
        type: "folder",
        size: null,
        modified: "2024-01-19",
      },
      {
        id: "13",
        name: "App Design",
        type: "folder",
        size: null,
        modified: "2024-01-17",
      },
      {
        id: "14",
        name: "demo.mp4",
        type: "file",
        fileType: "video",
        size: "45.6 MB",
        modified: "2024-01-18",
        url: "https://example.com/demo.mp4",
      },
    ],
  },
};

const getFileIcon = (fileType: string) => {
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
};

export default function DrivePage() {
  const [currentPath, setCurrentPath] = useState("/");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const currentFolder = mockData[currentPath as keyof typeof mockData];

  const pathSegments =
    currentPath === "/" ? [] : currentPath.split("/").filter(Boolean);

  const navigateToFolder = (folderId: string, folderName: string) => {
    const newPath =
      currentPath === "/" ? `/${folderName}` : `${currentPath}/${folderName}`;
    if (mockData[newPath as keyof typeof mockData]) {
      setCurrentPath(newPath);
    }
  };

  const navigateToBreadcrumb = (index: number) => {
    if (index === -1) {
      setCurrentPath("/");
    } else {
      const newPath = "/" + pathSegments.slice(0, index + 1).join("/");
      setCurrentPath(newPath);
    }
  };

  const filteredItems =
    currentFolder?.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <div className="bg-background text-foreground dark min-h-screen">
      {/* Header */}
      <header className="border-border bg-card border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Drive</h1>

            {/* Breadcrumb Navigation */}
            <nav className="text-muted-foreground flex items-center gap-1 text-sm">
              <button
                onClick={() => navigateToBreadcrumb(-1)}
                className="hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <Home className="h-4 w-4" />
                My Drive
              </button>
              {pathSegments.map((segment, index) => (
                <div key={index} className="flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" />
                  <button
                    onClick={() => navigateToBreadcrumb(index)}
                    className="hover:text-foreground transition-colors"
                  >
                    {segment}
                  </button>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search in Drive"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
            </div>

            {/* View Toggle */}
            <div className="border-border flex rounded-md border">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Upload Button */}
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {filteredItems.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            {searchQuery
              ? "No items match your search."
              : "This folder is empty."}
          </div>
        ) : (
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
                : "space-y-1",
            )}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "group cursor-pointer rounded-lg transition-colors",
                  viewMode === "grid"
                    ? "hover:bg-accent p-4 text-center"
                    : "hover:bg-accent flex items-center gap-3 rounded-md p-3",
                )}
                onClick={() => {
                  if (item.type === "folder") {
                    navigateToFolder(item.id, item.name);
                  } else if (item.url) {
                    window.open(item.url, "_blank");
                  }
                }}
              >
                {viewMode === "grid" ? (
                  <>
                    <div className="mb-2 flex justify-center">
                      {item.type === "folder" ? (
                        <Folder className="h-12 w-12 text-blue-500" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center">
                          {getFileIcon(item.fileType ?? "text")}
                        </div>
                      )}
                    </div>
                    <div className="truncate text-sm font-medium">
                      {item.name}
                    </div>
                    {item.size && (
                      <div className="text-muted-foreground text-xs">
                        {item.size}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex-shrink-0">
                      {item.type === "folder" ? (
                        <Folder className="h-5 w-5 text-blue-500" />
                      ) : (
                        getFileIcon(item.fileType ?? "text")
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{item.name}</div>
                    </div>
                    <div className="text-muted-foreground w-20 text-right text-sm">
                      {item.size ?? "—"}
                    </div>
                    <div className="text-muted-foreground w-24 text-right text-sm">
                      {item.modified}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
