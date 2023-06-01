import React, { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'store';
import { csrFetch } from 'store/csrFetch';

function Navigation() {
	const version = useAppSelector((state) => state.version.lastVersion);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(csrFetch.getVersionList());
	}, [dispatch, version]);

	return (
		<NavigationContainer>
			<LogoHeader>
				<Link href="/">
					<span>LOLBOOK</span>
				</Link>
			</LogoHeader>
			<MenuList>
				<Link href={`/items?version=${version}`}>
					<Menu>아이템 도감</Menu>
				</Link>
				<Link href={`/champions?version=${version}`}>
					<Menu>챔피언 도감</Menu>
				</Link>
			</MenuList>

			<Version>Version {version}</Version>
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
	font-size: 2rem;

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
