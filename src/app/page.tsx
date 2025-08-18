"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Upload,
  Search,
  Grid3X3,
  List,
  ChevronRight,
  Home,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { mockfolders, mockfiles } from "~/lib/file";
import DriveItem from "~/components/driveItem";

// Navigation is driven by folder parent/child relationships from mock data

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
    while (cursor?.parent) {
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
              {breadcrumbs.map((crumb) => (
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
              <DriveItem
                key={`${item.type}:${item.id}`}
                item={item}
                viewMode={viewMode}
                setCurrentFolderId={setCurrentFolderId}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
