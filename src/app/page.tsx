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
import { mockfolders, mockfiles } from "~/lib/file";

// Navigation is driven by folder parent/child relationships from mock data

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
  const [currentFolderId, setCurrentFolderId] = useState("root");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Build lookup for folders
  const folderById = Object.fromEntries(
    mockfolders.map((folder) => [folder.id, folder]),
  ) as Record<
    string,
    { id: string; name: string; type: "folder"; parent: string | null }
  >;

  // Breadcrumbs from root to current folder (excluding root button)
  const breadcrumbs = (() => {
    const chain: { id: string; name: string }[] = [];
    let cursor = folderById[currentFolderId];
    while (cursor && cursor.parent) {
      chain.unshift({ id: cursor.id, name: cursor.name });
      cursor = folderById[cursor.parent];
    }
    return chain;
  })();

  type Item =
    | { id: string; name: string; type: "folder" }
    | { id: string; name: string; type: "file"; url: string; size: number };

  const visibleFolders = mockfolders.filter(
    (f) => f.parent === currentFolderId,
  );
  const visibleFiles = mockfiles.filter((f) => f.parent === currentFolderId);

  const mergedItems: Item[] = [
    ...visibleFolders.map((f) => ({
      id: f.id,
      name: f.name,
      type: "folder" as const,
    })),
    ...visibleFiles.map((f) => ({
      id: f.id,
      name: f.name,
      type: "file" as const,
      url: f.url,
      size: f.size,
    })),
  ];

  const filteredItems = mergedItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
                onClick={() => setCurrentFolderId("root")}
                className="hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <Home className="h-4 w-4" />
                My Drive
              </button>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" />
                  <button
                    onClick={() => setCurrentFolderId(crumb.id)}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.name}
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
                key={`${item.type}:${item.id}`}
                className={cn(
                  "group cursor-pointer rounded-lg transition-colors",
                  viewMode === "grid"
                    ? "hover:bg-accent p-4 text-center"
                    : "hover:bg-accent flex items-center gap-3 rounded-md p-3",
                )}
                onClick={() => {
                  if (item.type === "folder") {
                    setCurrentFolderId(item.id);
                  } else if (item.type === "file") {
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
                          {getFileIcon("file")}
                        </div>
                      )}
                    </div>
                    <div className="truncate text-sm font-medium">
                      {item.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {item.type === "folder" ? "Folder" : "File"}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-shrink-0">
                      {item.type === "folder" ? (
                        <Folder className="h-5 w-5 text-blue-500" />
                      ) : (
                        getFileIcon("file")
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{item.name}</div>
                    </div>
                    <div className="text-muted-foreground w-20 text-right text-sm">
                      {item.type === "folder" ? "Folder" : "File"}
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
