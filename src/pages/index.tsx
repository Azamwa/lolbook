import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useAtom } from 'jotai';
import { patchNoteAPI } from 'store';
import { patchNoteListState } from 'store/version';
import dayjs from 'dayjs';

export default function Home() {
	const [requestCount, setRequestCount] = useState<number>(0);
	const [patchNoteList, setPatchNoteList] = useAtom(patchNoteListState);

	useQuery(['getPatchNoteList', requestCount], () => patchNoteAPI(requestCount), {
		onSuccess: (data) => setPatchNoteList([...patchNoteList, ...data.list]),
		staleTime: Infinity,
		cacheTime: Infinity
	});

	return (
		<>
			<Head>
				<title>LOLBook | 리그오브레전드</title>
			</Head>
			<Background />
			<PageWrap>
				<PatchNoteConatiner>
					<Title>패치노트</Title>
					<PatchNoteListBox>
						<PatchNoteList>
							{patchNoteList.map((patchNote, index) => {
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
												priority={true}
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
						{patchNoteList.length > 0 &&
							patchNoteList.length < patchNoteList[0].totalElements && (
								<RequestMore>
									<MoreButton onClick={() => setRequestCount(requestCount + 1)}>
										더 불러오기
									</MoreButton>
								</RequestMore>
							)}
					</PatchNoteListBox>
				</PatchNoteConatiner>
			</PageWrap>
		</>
	);
}

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
	padding: 50px 0;
	background-color: rgb(26, 36, 46);
	overflow-y: auto;
`;

const PatchNoteList = styled.ul`
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
	margin-top: 50px;
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
