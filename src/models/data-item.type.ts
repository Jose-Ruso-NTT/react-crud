import { Column } from "./column.interface";

export type DataItem = {
  [key in Column["code"]]: React.ReactNode;
};
