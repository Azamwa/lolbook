import React from 'react';
import Navigation from './Navigation';
import GlobalStyle from 'utils/GlobalStyle';
import styled from 'styled-components';

type LayoutProps = {
	children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
	return (
		<>
			<GlobalStyle />
			<Navigation />
			<LayoutContainer>{children}</LayoutContainer>
		</>
	);
}

const LayoutContainer = styled.div`
	width: 100%;
	height: 100vh;
`;

export default Layout;
