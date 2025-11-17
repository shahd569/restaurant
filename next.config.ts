import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", "dpkfofscc.cloudinary.com"], // تأكد من إضافة res.cloudinary.com
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
