/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["wrangler", "miniflare", "workerd"],
};

export default nextConfig;
