import React from 'react';
import Navigation from './Navigation';
import GlobalStyle from 'utils/GlobalStyle';
import styled from 'styled-components';
import Loading from './Loading';
import { useAppSelector } from 'store';

const LayoutContainer = styled.div`
	width: 100%;
	height: 100vh;
`;

type LayoutProps = {
	children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
	const pending = useAppSelector((state) => state.common.pending);
	return (
		<>
			<GlobalStyle />
			{pending && <Loading />}
			<Navigation />
			<LayoutContainer>{children}</LayoutContainer>
		</>
	);
}

export default Layout;
