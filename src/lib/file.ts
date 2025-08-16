export type file = {
  id: string;
  name: string;
  type: "file";
  url: string;
  size: number;
  parent: string;
};

export type folder = {
  id: string;
  name: string;
  type: "folder";
  parent: string | null;
};

export const mockfolders: folder[] = [
  { id: "root", name: "my drive", type: "folder", parent: null },
  { id: "1", name: "Photos", type: "folder", parent: "root" },
  { id: "2", name: "Projects", type: "folder", parent: "root" },
  { id: "3", name: "Documents", type: "folder", parent: "root" },
  { id: "4", name: "imgs", type: "folder", parent: "1" },
];

export const mockfiles: file[] = [
  {
    id: "1",
    name: "Resume.pdf",
    type: "file",
    url: "https://example.com/resume.pdf",
    size: 1000,
    parent: "1",
  },
  {
    id: "2",
    name: "Presentation.pptx",
    type: "file",
    url: "https://example.com/presentation.pptx",
    size: 1000,
    parent: "3",
  },
  {
    id: "3",
    name: "Contract.docx",
    type: "file",
    url: "https://example.com/contract.docx",
    size: 1000,
    parent: "root",
  },
  {
    id: "4",
    name: "Notes.txt",
    type: "file",
    url: "https://example.com/notes.txt",
    size: 1000,
    parent: "root",
  },
  {
    id: "5",
    name: "IMG_0001.jpg",
    type: "file",
    url: "https://example.com/IMG_0001.jpg",
    size: 1000,
    parent: "4",
  },
];
