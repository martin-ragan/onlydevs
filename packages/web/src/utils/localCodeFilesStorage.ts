import { type SandpackFiles } from "@codesandbox/sandpack-react";
import { openDB } from "idb";

const DB_NAME = "eduqest";
const CODE_FILES_STORE = "lectureCodeFiles";
const DB_VERSION = 1;

const instanceDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade: (db) => {
      if (!db.objectStoreNames.contains(CODE_FILES_STORE)) db.createObjectStore(CODE_FILES_STORE);
    },
  });
};

export const getCodeFilesFromDB = async (id: string): Promise<SandpackFiles | undefined> => {
  const db = await instanceDB();
  const files = await db.get(CODE_FILES_STORE, id);
  return files as SandpackFiles | undefined;
};

export const setCodeFilesToDB = async (id: string, files: SandpackFiles) => {
  const db = await instanceDB();
  await db.put(CODE_FILES_STORE, files, id);
};
