// Augments the CloudflareEnv interface declared globally by @opennextjs/cloudflare
interface CloudflareEnv {
  DB: D1Database;
  R2_BUCKET: R2Bucket;
  R2_PUBLIC_URL: string;
}
