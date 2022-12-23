import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'store';
import { csrFetch } from 'store/csrFetch';
import dayjs from 'dayjs';
import Select, { SingleValue } from 'react-select';

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: url('/img/kalbaram.jpg');
	background-size: cover;
	background-position: center center;
	filter: blur(2px);
	transform: scale(1.02);
	position: absolute;
	z-index: -1;
`;

const PageWrap = styled.div`
	width: 100vw;
	height: 100vh;
	padding: 100px 0 30px;
	display: flex;
	justify-content: center;
	color: #fff;

	& ::-webkit-scrollbar {
		color: black;
	}

	& ::-webkit-scrollbar-thumb {
		background-color: rgb(52, 69, 85);
	}

	& ::-webkit-scrollbar-track {
		background-color: rgb(26, 36, 46);
	}
`;

const PatchNoteConatiner = styled.div`
	width: 80%;
	height: 90%;
`;

const Title = styled.span`
	display: inline-block;
	margin-bottom: 10px;
	font-size: 4rem;
`;

const PatchNoteListBox = styled.div`
	width: 100%;
	height: calc(100% - 50px);
	background-color: rgb(26, 36, 46);
	overflow-y: auto;
`;

const FilterLine = styled.div`
	padding: 20px;
	display: flex;
	justify-content: flex-end;
`;

const PatchNoteList = styled.ul`
	padding: 10px 20px 50px;
	display: grid;
	grid-template-columns: repeat(auto-fill, 350px);
	grid-gap: 60px;
	justify-content: center;
`;

const UpdateContent = styled.li`
	width: 350px;
	list-style: none;

	img {
		margin-bottom: 10px;
	}

	:hover {
		cursor: pointer;
	}
`;

const Description = styled.div`
	padding: 0 15px;
`;

const PatchNoteTitle = styled.p`
	font-size: 2.5rem;
	margin-bottom: 5px;
`;

const MoreInfo = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Author = styled.p`
	font-size: 1.5rem;
`;

const ReleaseDate = styled.p`
	font-size: 1.5rem;
`;

const RequestMore = styled.div`
	display: flex;
	justify-content: center;
	padding: 10px 0 50px;
`;

const MoreButton = styled.button`
	padding: 5px 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	border: none;
	font-family: 'jua', san-serif;
	color: #fff;
	background-color: #349d85;
	border-radius: 15px;

	:hover {
		cursor: pointer;
	}
`;

const yearGroup = new Array(8).fill({}).map((noUse, index) => {
	return {
		label: `시즌 ${12 - index}`,
		value: 2022 - index + ''
	};
});

const selectStyle = {
	control: (base: any) => ({
		...base,
		height: '15px',
		minWidth: 130,
		background: '#212F3D',
		border: 'none',
		margin: 0,
		borderRadius: 0,
		fontSize: '1.5rem',
		fontFamily: 'system-ui',
		fontWeight: 700
	}),

	menu: (base: any) => ({
		...base,
		background: '#212F3D',
		color: '#ABB2B9',
		borderRadius: 0,
		fontSize: '1.5rem',
		fontFamily: 'system-ui',
		fontWeight: 700
	}),

	menuList: (base: any) => ({
		...base,
		borderRadius: 0
	}),

	singleValue: (base: any) => ({
		...base,
		color: '#ABB2B9'
	})
};

interface listProps {
	title: string;
	imgURL: string;
	author: string[];
	date: string;
	version: string;
}

export default function Home() {
	const dispatch = useAppDispatch();
	const version = useAppSelector((state) => state.version);
	const { status, patchNoteList, lastVersion } = version;
	const [requestCount, setRequestCount] = useState<number>(0);
	const [year, setYear] = useState<SingleValue<{ value: string; label: string }>>({
		value: '2022',
		label: '2022년'
	});
	const [list, setList] = useState<listProps[]>(patchNoteList.list);

	const lastVersionIdx = useMemo(() => {
		return Number(lastVersion.split('.')[1]);
	}, [lastVersion]);

	const changeYear = (e: SingleValue<{ value: string; label: string }>) => {
		setYear(e);
	};

	const requestList = () => {
		// if (requestCount < Math.ceil(lastVersionIdx / 6) && year !== null) {
		// 	setRequestCount(requestCount + 1);
		// 	dispatch(csrFetch.getPatchNoteList({ year: year.value, idx: requestCount }));
		// 	setList([...list, ...patchNoteList.list]);
		// }
	};

	useEffect(() => {
		if (status === 'complete' && year !== null && requestCount === 0) {
			dispatch(csrFetch.getPatchNoteList({ year: year.value, idx: 0 }));
		}
	}, [status, year, requestCount, csrFetch]);
	return (
		<>
			<Background />
			(status === 'complete' &&
			<PageWrap>
				<PatchNoteConatiner>
					<Title>패치노트</Title>
					<PatchNoteListBox>
						<FilterLine>
							<Select
								instanceId="season"
								defaultValue={{ value: '2022', label: '시즌 12' }}
								onChange={(e) => changeYear(e)}
								isSearchable={false}
								options={yearGroup}
								styles={selectStyle}
							/>
						</FilterLine>
						<PatchNoteList>
							{patchNoteList.list.map((patchNote, index) => {
								return (
									<a
										key={index}
										href={`https://www.leagueoflegends.com/ko-kr/news/game-updates/patch-${patchNote.version}-notes/`}
										target="_blank">
										<UpdateContent>
											<Image
												src={patchNote.imgURL}
												width={350}
												height={210}
												alt="banner"
											/>
											<Description>
												<PatchNoteTitle>{patchNote.title}</PatchNoteTitle>
												<MoreInfo>
													<Author>{patchNote.author.join(', ')}</Author>
													<ReleaseDate>
														{dayjs(patchNote.date).format('YYYY-MM-DD')}
													</ReleaseDate>
												</MoreInfo>
											</Description>
										</UpdateContent>
									</a>
								);
							})}
						</PatchNoteList>
						{requestCount < Math.ceil(lastVersionIdx / 6) && (
							<RequestMore>
								<MoreButton onClick={() => requestList()}>더 불러오기</MoreButton>
							</RequestMore>
						)}
					</PatchNoteListBox>
				</PatchNoteConatiner>
			</PageWrap>
			)
		</>
	);
}
