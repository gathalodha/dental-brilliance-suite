import { supabase } from "@/integrations/supabase/client";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export async function uploadMedia(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data, error: sErr } = await supabase.storage.from("media").createSignedUrl(path, TEN_YEARS);
  if (sErr) throw sErr;
  return data.signedUrl;
}

export async function listMedia(): Promise<{ name: string; url: string; created_at: string }[]> {
  const { data, error } = await supabase.storage.from("media").list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
  if (error) throw error;
  const items = (data ?? []).filter((f) => f.name && !f.name.startsWith("."));
  const urls = await Promise.all(
    items.map(async (f) => {
      const { data: s } = await supabase.storage.from("media").createSignedUrl(f.name, TEN_YEARS);
      return { name: f.name, url: s?.signedUrl ?? "", created_at: (f as any).created_at ?? "" };
    })
  );
  return urls;
}

export async function deleteMedia(name: string): Promise<void> {
  const { error } = await supabase.storage.from("media").remove([name]);
  if (error) throw error;
}
