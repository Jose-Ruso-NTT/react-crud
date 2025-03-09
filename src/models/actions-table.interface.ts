import { DataItem } from "./data-item.type";

export interface ActionsTable {
  edit: (item: DataItem) => void;
  remove: (id: DataItem) => void;
}
