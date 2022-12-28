import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

function document() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default document;
