/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ['ddragon.leagueoflegends.com', 'images.contentstack.io'],
		loader: 'imgix',
		path: ['lolbook.me']
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	complier: {
		styledComponents: true
	}
};
