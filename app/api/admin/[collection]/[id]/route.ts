import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, writeErrorMessage } from "@/lib/store";
import {
  buildPost,
  buildProject,
  isCollectionName,
  type Post,
  type Project,
} from "@/lib/collections";

interface RouteParams {
  params: Promise<{ collection: string; id: string }>;
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { collection, id } = await params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "Koleksi tidak dikenal." }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }

  const items = await readCollection<Project | Post>(collection);
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Data tidak ditemukan." }, { status: 404 });
  }

  const updated =
    collection === "projects"
      ? buildProject(body, items[idx] as Project)
      : buildPost(body, items as Post[], items[idx] as Post);

  if ("error" in updated) {
    return NextResponse.json({ error: updated.error }, { status: 400 });
  }

  items[idx] = updated;

  try {
    await writeCollection(collection, items);
  } catch (err) {
    return NextResponse.json({ error: writeErrorMessage(err) }, { status: 500 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { collection, id } = await params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "Koleksi tidak dikenal." }, { status: 404 });
  }

  const items = await readCollection<Project | Post>(collection);
  const next = items.filter((item) => item.id !== id);

  if (next.length === items.length) {
    return NextResponse.json({ error: "Data tidak ditemukan." }, { status: 404 });
  }

  try {
    await writeCollection(collection, next);
  } catch (err) {
    return NextResponse.json({ error: writeErrorMessage(err) }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
