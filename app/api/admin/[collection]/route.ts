import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, writeErrorMessage } from "@/lib/store";
import {
  buildPost,
  buildProject,
  isCollectionName,
  type CollectionName,
  type Post,
  type Project,
} from "@/lib/collections";

interface RouteParams {
  params: Promise<{ collection: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { collection } = await params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "Koleksi tidak dikenal." }, { status: 404 });
  }
  const items = await readCollection(collection);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { collection } = await params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "Koleksi tidak dikenal." }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }

  const entry = await buildEntry(collection, body);
  if ("error" in entry) {
    return NextResponse.json({ error: entry.error }, { status: 400 });
  }

  const items = await readCollection<Project | Post>(collection);
  items.unshift(entry);

  try {
    await writeCollection(collection, items);
  } catch (err) {
    return NextResponse.json({ error: writeErrorMessage(err) }, { status: 500 });
  }

  return NextResponse.json(entry, { status: 201 });
}

async function buildEntry(collection: CollectionName, body: Record<string, unknown>) {
  if (collection === "projects") {
    return buildProject(body);
  }
  const items = await readCollection<Post>(collection);
  return buildPost(body, items);
}
