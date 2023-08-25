import React, { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { screenSizeState, versionListState } from 'store/common';

function Navigation() {
	const { version, setVersion } = versionListState();
	const { setScreenSize } = screenSizeState();

	useEffect(() => {
		setVersion();
	}, []);

	useEffect(() => {
		if (version.length > 0) {
			setScreenSize(screen.availWidth);
		}
	}, [version]);

	return (
		<NavigationContainer>
			<LogoHeader>
				<Link href="/">
					<span>LOLBOOK</span>
				</Link>
			</LogoHeader>
			<MenuList>
				<Link href="/items">
					<Menu>아이템 도감</Menu>
				</Link>
				<Link href="/champions">
					<Menu>챔피언 도감</Menu>
				</Link>
				<Link href="/record">
					<Menu>전적 검색</Menu>
				</Link>
			</MenuList>

			<Version>Version {version[0]}</Version>
		</NavigationContainer>
	);
}

const NavigationContainer = styled.div`
	width: 100%;
	height: 70px;
	z-index: 10;
	display: flex;
	align-items: center;
	position: fixed;
	opacity: 0.8;
	background-color: rgb(235, 102, 45);

	@media screen and (max-width: 1300px) {
		height: 60px;
	}

	@media screen and (max-width: 767px) {
		height: 50px;
	}
`;

const LogoHeader = styled.div`
	font-size: 4rem;
	margin-left: 30px;
	font-weight: 700;
	opacity: 0.8;

	@media screen and (max-width: 767px) {
		font-size: 2.5rem;
	}
`;

const MenuList = styled.div`
	display: flex;
	margin-left: 50px;
	gap: 20px;

	@media screen and (max-width: 767px) {
		margin-left: 20px;
	}
`;

const Menu = styled.div`
	font-size: 2.2rem;
	font-weight: 500;

	@media screen and (max-width: 1000px) {
		font-size: 2rem;
	}

	@media screen and (max-width: 767px) {
		font-size: 1.5rem;
	}
`;

const Version = styled.div`
	position: relative;
	font-size: 2rem;
	position: absolute;
	right: 30px;

	@media screen and (max-width: 767px) {
		font-size: 1.5rem;
		right: 10px;
		bottom: -20px;
	}
`;

export default Navigation;
