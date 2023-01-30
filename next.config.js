/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['cdn.freebiesupply.com', 'cdn.sanity.io'],
	},
};

module.exports = nextConfig;
