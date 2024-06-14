export type IIconName =
  | "Close"
  | "Help"
  | "Menu"
  | "Minimize"
  | "OpenModal"
  | "Shuffle"
  | "Undo";
export const icons: { [key in IIconName]: { path: string } } = {
  Close: {
    path: "M 3 3 L 13 13 M 3 13 L 13 3",
  },
  Help: {
    path: "M 8 12 L 8 12 M 8 10 L 8 9 C 8 7 10 8 10 6 A 2 2 0 1 0 6 6 M 8 1.5 A 6.5 6.5 0 0 1 8 14.5 A 6.5 6.5 0 0 1 8 1.5",
  },
  Menu: {
    path: "M 2 4 L 14 4 M 2 8 L 14 8 M 2 12 L 14 12",
  },
  Minimize: {
    path: "M 11 13 L 6.75 13 M 11 11 L 6.75 11 M 11 11 L 11 6.75 M 11 11 L 3 3",
  },
  OpenModal: {
    path: "M 3 3 L 7.25 3 M 3 3 L 3 7.25 M 3 3 L 10 10 M 3 11 A 2 2 0 0 0 5 13 L 11 13 A 2 2 0 0 0 13 11 L 13 5 A 2 2 0 0 0 11 3 L 11 3",
  },
  Shuffle: {
    path: "M 5 2 L 2 5 L 5 8 M 2 5 L 12 5 M 11 14 L 14 11 L 11 8 M 14 11 L 4 11",
  },
  Undo: {
    path: "M 5 3 L 2 6 L 5 9 M 2 6 L 10 6 A 3 3 0 1 1 10 13 L 8 13",
  },
};
