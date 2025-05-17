import {IDBPDatabase, openDB} from "idb";
import {LeadFields} from "./interface";

let dbPromise: Promise<IDBPDatabase<unknown>>;
if (typeof window !== "undefined") {
  dbPromise = openDB("lead-management", 1, {
    upgrade(db) {
      db.createObjectStore("leads", {
        autoIncrement: true,
      });
      db.createObjectStore("leads_resume", {
        autoIncrement: true,
      });
    },
  });
}

// Store a file
export async function storeFile(key: string, file: File) {
  const db = await dbPromise;
  await db.put("leads_resume", file, key);
}

// Get a file
export async function getFile(key: string): Promise<File | undefined> {
  const db = await dbPromise;
  return db.get("leads_resume", key);
}

export async function pushObjectToIndexedDB(obj: LeadFields) {
  const db = await dbPromise;
  if (obj.resume) {
    await storeFile(obj.email, obj.resume);
  }
  const file = obj.resume as File;
  let resume_name = "";
  if (file) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resume_name = (file as any)[0]?.name;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {resume, ...rest} = obj;
  await db.add("leads", {...rest, resume: resume_name});
}

export async function getLeadsFromIndexedDB() {
  const db = await dbPromise;
  return db.getAll("leads");
}

export async function updateItemByKey(id: number, updatedData: LeadFields) {
  const db = await dbPromise;

  // Fetch current data
  const current = await db.get("leads", id);
  if (!current) throw new Error(`Item with ID ${id} not found`);

  // Update in DB
  await db.put("leads", updatedData, id); // uses the keyPath ('id') to update
}
