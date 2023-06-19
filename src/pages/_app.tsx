import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'jotai';
import Layout from 'components/common/Layout';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.deHydratedState}>
					<Layout>
						<Head>
							<title>LOLBook | 리그오브레전드</title>
							<link rel="icon shorcut" href="/img/favicon.ico" />
							<meta name="viewport" content="initial-scale=1.0, width=device-width" />
							<meta property="og:title" content="LOLBook | 리그오브레전드" />
							<meta property="og:type" content="website" />
							<meta property="og:url" content="/img/runeterra.jpg" />
							<meta
								property="og:description"
								content="리그오브레전드의 아이템과 챔피언정보"
							/>
						</Head>
						<Component {...pageProps} />
					</Layout>
				</Hydrate>
			</QueryClientProvider>
		</Provider>
	);
}
