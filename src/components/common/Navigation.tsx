import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { versionListState } from 'store/version';

const versionAPI = () => {
	return axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
};

function Navigation() {
	const [version, setVersion] = useRecoilState(versionListState);
	const _ = useQuery('getVersionList', versionAPI, {
		onSuccess: ({ data }) => setVersion(data)
	});

	return (
		<NavigationContainer>
			<LogoHeader>
				<Link href="/">
					<span>LOLBOOK</span>
				</Link>
			</LogoHeader>
			<MenuList>
				<Link href={`/items?version=${version[0]}`}>
					<Menu>아이템 도감</Menu>
				</Link>
				<Link href={`/champions?version=${version[0]}`}>
					<Menu>챔피언 도감</Menu>
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
