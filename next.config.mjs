/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "v2zltwrwxrok5gus.public.blob.vercel-storage.com",
			},
		],
	},
};

export default nextConfig;
