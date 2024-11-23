export interface Checklist {
  id: number;
  name: string;
  description?: string;
  level: "level1" | "level2" | "level3";
  created_at: string;
}

export interface SecurityControl {
  id: string;
  control_id: string;
  description: string;
  level1: boolean;
  level2: boolean;
  level3: boolean;
  checklistId: string;
}
