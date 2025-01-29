import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		DIFY_API_KEY: process.env.DIFY_API_KEY,
		API_URL: process.env.DIFY_API_URL,
	},
};

export default nextConfig;
