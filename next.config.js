/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ['ddragon.leagueoflegends.com', 'images.contentstack.io'],
		formats: ['image/avif', 'image/webp'],
		imageSizes: [35, 40, 55, 70, 135, 150, 350]
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	complier: {
		styledComponents: true
	}
};
