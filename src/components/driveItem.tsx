import { Folder, MoreVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { getFileIcon } from "~/lib/file-icons";

type DriveListItem =
  | { id: string; name: string; type: "folder" }
  | { id: string; name: string; type: "file"; url: string; size: number };

export default function DriveItem({
  item,
  viewMode,
  setCurrentFolderId,
}: {
  item: DriveListItem;
  viewMode: "grid" | "list";
  setCurrentFolderId: (id: string) => void;
}) {
  return (
    <div
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
          <div className="truncate text-sm font-medium">{item.name}</div>
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
  );
}
