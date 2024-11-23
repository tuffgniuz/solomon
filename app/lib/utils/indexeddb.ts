import { openDB, DBSchema, IDBPDatabase } from "idb";
import { Checklist } from "../types/models";

interface SolomonDBSchema extends DBSchema {
  checklists: {
    key: number;
    value: Checklist;
  };
  controls: {
    key: number;
    value: {
      id: number;
      checklistId: number;
      securityControlId: string;
      description: string;
    };
  };
}

export const initDB = (): Promise<IDBPDatabase<SolomonDBSchema>> => {
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
          autoIncrement: true,
        });
        store.createIndex("checklistId", "checklistId");
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

export const addControlToChecklist = async (
  checklistId: number,
  securityControlId: string,
  description: string,
) => {
  const db = await initDB();
  const id = await db.add("controls", {
    checklistId,
    securityControlId,
    description,
  });
  return id;
};

