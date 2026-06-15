const CF_ACCOUNT_ID = "1db8fe861352aefbc7cbd7f62feb3118";
const CF_BUCKET_NAME = "pnpinc-images";
const R2_PUBLIC_URL = "https://pub-2d4ea06a2b8a4d6e93aea884849d1597.r2.dev";

function cfApiUrl(fileName: string) {
  return `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/r2/buckets/${CF_BUCKET_NAME}/objects/${fileName}`;
}

export async function r2Put(
  fileName: string,
  data: ArrayBuffer,
  contentType: string,
  env: CloudflareEnv
): Promise<string> {
  if (process.env.NODE_ENV !== "production") {
    const token = process.env.CLOUDFLARE_API_TOKEN;
    if (!token) throw new Error("CLOUDFLARE_API_TOKEN이 .env.local에 없습니다.");
    const res = await fetch(cfApiUrl(fileName), {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": contentType },
      body: data,
    });
    if (!res.ok) throw new Error(`R2 업로드 실패: ${res.status} ${await res.text()}`);
    return `${R2_PUBLIC_URL}/${fileName}`;
  }
  await env.R2_BUCKET.put(fileName, data, { httpMetadata: { contentType } });
  return `${env.R2_PUBLIC_URL}/${fileName}`;
}

export async function r2Delete(fileName: string, env: CloudflareEnv): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    const token = process.env.CLOUDFLARE_API_TOKEN;
    if (!token) return;
    await fetch(cfApiUrl(fileName), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return;
  }
  await env.R2_BUCKET.delete(fileName);
}
