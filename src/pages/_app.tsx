import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from 'store';
import Layout from 'components/common/Layout';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Layout>
				<Head>
					<title>LolBook | 리그오브레전드</title>
					<link rel="icon shorcut" href="/img/favicon.ico" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<meta name="og:title" content="LolBook | 리그오브레전드" />
					<meta name="og:type" content="website" />
					<meta name="og:url" content="/img/runeterra.jpg" />
					<meta name="og:description" content="리그오브레전드의 아이템과 챔피언정보" />
				</Head>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
