import { openDB, DBSchema } from "idb";
import { Checklist, SecurityControl } from "../types/models";

interface SolomonDBSchema extends DBSchema {
  checklists: {
    key: number;
    value: Checklist;
  };
  controls: {
    key: string;
    value: SecurityControl;
  };
}

export const initDB = () => {
  return openDB<SolomonDBSchema>("SolomonDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("checklists")) {
        db.createObjectStore("checklists", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("controls")) {
        const store = db.createObjectStore("controls", {
          keyPath: "id",
        });
        store.createIndex("checklistId", "checklistId");
        store.createIndex(
          "controlId_checklistId",
          ["control_id", "checklistId"],
          { unique: true },
        );
      }
    },
  });
};

export const addChecklist = async (checklist: Checklist) => {
  const db = await initDB();
  const id = await db.add("checklists", {
    ...checklist,
  });
  return id;
};

export const getAllChecklists = async () => {
  const db = await initDB();
  return db.getAll("checklists");
};

export const addControlToChecklist = async (control: SecurityControl) => {
  const db = await initDB();

  const existingControl = await db.getFromIndex(
    "controls",
    "controlId_checklistId",
    [control.control_id, control.checklistId],
  );

  if (existingControl) {
    throw new Error("This control has already been added to the checklist.");
  }

  const id = await db.add("controls", { ...control });
  return id;
};

export const deleteControl = async (controlId: number) => {
  const db = await initDB();
  await db.delete("controls", controlId);
};

export const getControlsByChecklistId = async (
  checklistId: string | undefined,
) => {
  if (!checklistId) return [];
  const db = await initDB();
  return db.getAllFromIndex("controls", "checklistId", checklistId);
};
