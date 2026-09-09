import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function readCollection<T>(name: string): Promise<T[]> {
  const file = path.join(DATA_DIR, `${name}.json`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export async function writeCollection<T>(name: string, items: T[]): Promise<void> {
  const file = path.join(DATA_DIR, `${name}.json`);
  await fs.writeFile(file, JSON.stringify(items, null, 2) + "\n", "utf-8");
}

/** Turns a filesystem write failure into a message that explains *why* — read-only
 * hosts like Vercel are the expected case, not a bug to chase. */
export function writeErrorMessage(err: unknown): string {
  const code = (err as NodeJS.ErrnoException)?.code;
  if (code === "EROFS" || code === "EACCES" || code === "EPERM") {
    return "Gagal nyimpen: filesystem di server ini read-only (kemungkinan lagi jalan di Vercel/serverless). Jalankan admin panel ini di lokal (npm run dev), lalu commit & push perubahan datanya.";
  }
  return "Gagal nyimpen perubahan. Coba lagi.";
}
