import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

function document() {
	return (
		<Html>
			<Head>
				<title>Lolipop - 리그오브레전드</title>
				<link
					href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
					rel="stylesheet"></link>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default document;
