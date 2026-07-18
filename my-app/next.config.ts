import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };


// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.3"],
};

module.exports = nextConfig;
export default nextConfig;
