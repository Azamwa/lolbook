import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from 'store';
import Head from 'next/head';
import Layout from 'components/common/Layout';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Layout>
				<Head>
					<title>Lolipop - 리그오브레전드</title>
					<link
						href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
						rel="stylesheet"></link>
					<link
						href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
						rel="stylesheet"></link>
				</Head>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
