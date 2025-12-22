export interface Room {
  id: number | string;
  name: string;
  deviceCount: number;
  icon: string;
  selected?: boolean;
}
