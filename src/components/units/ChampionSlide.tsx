import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { ChampionProps } from 'utils/types';
import { useAppDispatch, useAppSelector } from 'store';
import { csrFetch } from 'store/csrFetch';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const SlideContainer = styled.div`
	width: 90vw;
	max-height: 350px;
	margin-top: 30px;
	position: relative;
	user-select: none;

	& ::-webkit-scrollbar {
		color: black;
	}

	& ::-webkit-scrollbar-thumb {
		background-color: rgb(235, 102, 45);
		border-radius: 20px;
	}

	& ::-webkit-scrollbar-track {
		background-color: rgb(26, 36, 46);
		border-radius: 20px;
	}

	@media screen and (max-width: 1300px) {
		max-height: 250px;
	}

	@media screen and (max-width: 767px) {
		margin-top: 50px;
	}
`;

const Slider = styled.div`
	width: 100%;
	height: 100%;
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	align-items: center;
	gap: 15px;

	.navBack {
		font-size: 6rem;
		color: rgb(235, 102, 45);
		position: absolute;
		left: -50px;

		:hover {
			cursor: pointer;
		}

		@media screen and (max-width: 767px) {
			display: none;
		}
	}

	.navForward {
		font-size: 6rem;
		color: rgb(235, 102, 45);
		position: absolute;
		right: -60px;

		:hover {
			cursor: pointer;
		}

		@media screen and (max-width: 767px) {
			display: none;
		}
	}
`;

const CardContainer = styled.div`
	height: 280px;
	display: flex;
	position: relative;

	& ::-webkit-scrollbar {
		color: black;
	}

	& ::-webkit-scrollbar-thumb {
		background-color: rgb(52, 69, 85);
		border-radius: 0;
	}

	& ::-webkit-scrollbar-track {
		background-color: rgb(26, 36, 46);
		border-radius: 0;
	}

	@media screen and (max-width: 1300px) {
		height: 230px;
	}

	@media screen and (max-width: 767px) {
		height: 200px;
	}
`;

const Card = styled.div`
	width: 150px;
	height: 260px;
	position: relative;

	:hover {
		cursor: pointer;
	}

	@media screen and (max-width: 1300px) {
		width: 125px;
		height: 210px;

		img {
			width: 125px;
			height: 210px;
		}
	}

	@media screen and (max-width: 767px) {
		width: 105px;
		height: 180px;

		img {
			width: 105px;
			height: 180px;
		}
	}
`;

const ChampionName = styled.span`
	width: 150px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 10;
	bottom: 0;
	font-size: 2rem;
	color: #fff;
	background-color: #000;
	opacity: 0.7;

	@media screen and (max-width: 1300px) {
		width: 125px;
		height: 40px;
	}

	@media screen and (max-width: 767px) {
		width: 105px;
		height: 35px;
		font-size: 1.5rem;
	}
`;

const ChampionInfo = styled.div`
	width: 350px;
	height: 260px;
	padding: 20px 15px;
	background-color: rgb(26, 36, 46);
	position: relative;
	color: #fff;
	overflow-y: auto;

	@media screen and (max-width: 1300px) {
		width: 300px;
		height: 210px;
	}

	@media screen and (max-width: 767px) {
		width: 220px;
		height: 180px;
	}
`;

const CardTopArea = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const CardSubject = styled.div`
	display: flex;
	flex-direction: column;
`;

const CardName = styled.span`
	font-size: 2.3rem;

	@media screen and (max-width: 1300px) {
		font-size: 2rem;
	}

	@media screen and (max-width: 767px) {
		font-size: 1.8rem;
	}
`;

const CardTitle = styled.span`
	font-size: 1.7rem;

	@media screen and (max-width: 1300px) {
		font-size: 1.3rem;
	}
`;

const MoveDetailPage = styled.button`
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: inherit;
	font-size: 1.6rem;
	background-color: #fff;
	border: none;

	:hover {
		cursor: pointer;
		background-color: skyblue;
	}

	@media screen and (max-width: 1300px) {
		height: 30px;
		font-size: 1.4rem;
	}

	@media screen and (max-width: 767px) {
		height: 25px;
		font-size: 1.2rem;
	}
`;

const Info = styled.div`
	margin: 20px 0;
`;

const barGraph = keyframes`
    from {
        width: 0;
    }
`;

const Graph = styled.div`
	font-size: 1.7rem;
	position: relative;
	margin-bottom: 5px;

	::after {
		content: '';
		height: 15px;
		position: absolute;
		left: 100px;
		animation: ${barGraph} linear 0.5s;
	}

	@media screen and (max-width: 767px) {
		font-size: 1.3rem;

		::after {
			left: 70px;
		}
	}
`;

const Attack = styled(Graph)<{ attack: number }>`
	::after {
		width: ${(props) => props.attack * 10}px;
		background: linear-gradient(to bottom, hotpink, red);
	}
`;
const Magic = styled(Graph)<{ magic: number }>`
	::after {
		width: ${(props) => props.magic * 10}px;
		background: linear-gradient(to bottom, cornflowerblue, blue);
	}
`;
const Defense = styled(Graph)<{ defense: number }>`
	::after {
		width: ${(props) => props.defense * 10}px;
		background: linear-gradient(to bottom, lightGreen, darkGreen);
	}
`;
const Difficulty = styled(Graph)<{ difficulty: number }>`
	::after {
		width: ${(props) => props.difficulty * 10}px;
		background: linear-gradient(to bottom, indianred, purple);
	}
`;

const Tips = styled.div``;

const TipsText = styled.span`
	margin-bottom: 10px;
	display: flex;
	gap: 5px;
	align-items: center;
	font-size: 1.9rem;

	@media screen and (max-width: 767px) {
		font-size: 1.5rem;
	}
`;

const TipsImage = styled.div`
	width: 20px;
	height: 20px;
	background: url('/img/tips.png') no-repeat;
	background-size: cover;
	background-position: center center;
`;

const TipList = styled.ul`
	padding: 0 10px;
`;

const Tip = styled.li`
	list-style: circle;
	margin-bottom: 5px;
	font-size: 1.6rem;

	@media screen and (max-width: 767px) {
		font-size: 1.3rem;
	}
`;

interface ChampionListProps {
	championList?: ChampionProps[];
	selectChampion: ChampionProps | null;
	screenSize: string;
}

function ChampionSlide({ championList, selectChampion, screenSize }: ChampionListProps) {
	const dispatch = useAppDispatch();
	const championDetail: any = useAppSelector((state) => state.champions.championDetail);
	const slider = useRef<HTMLDivElement>(null);
	const [mouseIsDown, setMouseDown] = useState<boolean>(false);
	const [startX, setStartX] = useState<number>(0);
	const [scrollLeft, setScrollLeft] = useState<number>(0);
	const [championInfo, openChampionInfo] = useState<string>('');

	const scrollLeftValue = screenSize === 'big' ? 165 : screenSize === 'middle' ? 140 : 120;
	const scrollButtonValue = screenSize === 'big' ? 1000 : 750;

	useEffect(() => {
		if (selectChampion !== null && championList !== undefined) {
			dispatch(csrFetch.getChampionDetail(selectChampion.id));
			openChampionInfo(selectChampion.id);

			championList.forEach((champion, index) => {
				if (champion.id === selectChampion.id && slider.current !== null) {
					slider.current.scrollTo({
						left: scrollLeftValue * index,
						behavior: 'smooth'
					});
				}
			});
		}
	}, [selectChampion, championList, slider]);

	const clickChmpionDetail = (id: string) => {
		openChampionInfo(id);
		dispatch(csrFetch.getChampionDetail(id));
	};

	const scrollMoveLeft = () => {
		if (slider.current !== null) {
			setScrollLeft(scrollLeft - scrollButtonValue);
			slider.current.scrollTo({
				left: scrollLeft - scrollButtonValue,
				behavior: 'smooth'
			});
		}
	};

	const scrollMoveRight = () => {
		if (slider.current !== null) {
			setScrollLeft(scrollLeft + scrollButtonValue);
			slider.current.scrollTo({
				left: scrollLeft + scrollButtonValue,
				behavior: 'smooth'
			});
		}
	};

	const mouseLeave = (e: MouseEvent<HTMLDivElement>) => {
		setMouseDown(false);
		if (slider.current !== null) {
			slider.current.classList.remove('active');
		}
	};

	const mouseUp = (e: MouseEvent<HTMLDivElement>) => {
		setMouseDown(false);
		if (slider.current !== null) {
			slider.current.classList.remove('active');
		}
	};

	const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
		setMouseDown(true);
		if (slider.current !== null) {
			slider.current.classList.add('active');
			setStartX(e.pageX - slider.current.offsetLeft);
			setScrollLeft(slider.current.scrollLeft);
		}
	};

	const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!mouseIsDown) {
			return false;
		}
		e.preventDefault();
		if (slider.current !== null) {
			const x = e.pageX - slider.current.offsetLeft;
			const walk = x - startX;
			slider.current.scrollLeft = scrollLeft - walk;
		}
	};

	return (
		<SlideContainer>
			<Slider
				ref={slider}
				onMouseDown={(e) => mouseDown(e)}
				onMouseLeave={(e) => mouseLeave(e)}
				onMouseUp={(e) => mouseUp(e)}
				onMouseMove={(e) => mouseMove(e)}>
				<MdArrowBackIos className="navBack" onClick={scrollMoveLeft} />
				<MdArrowForwardIos className="navForward" onClick={scrollMoveRight} />
				{championList !== undefined &&
					championList.map((champion, index) => {
						return (
							<CardContainer key={index}>
								<Card onClick={() => clickChmpionDetail(champion.id)}>
									<Image
										src={`${process.env.PUBLIC_URL}/img/championSlideImage/${champion.id}.png`}
										width={150}
										height={260}
										alt="ChampionLoadingImg"
									/>
									<ChampionName>{champion.name}</ChampionName>
								</Card>
								{championInfo === champion.id && (
									<ChampionInfo>
										<CardTopArea>
											<CardSubject>
												<CardName>{champion.name}</CardName>
												<CardTitle>{champion.title}</CardTitle>
											</CardSubject>
											<Link href={`/champions/${champion.id}`} shallow={true}>
												<MoveDetailPage>챔피언 상세보기</MoveDetailPage>
											</Link>
										</CardTopArea>
										<Info>
											<Attack attack={champion.info.attack}>
												평타데미지
											</Attack>
											<Magic magic={champion.info.magic}>스킬데미지</Magic>
											<Defense defense={champion.info.defense}>방어</Defense>
											<Difficulty difficulty={champion.info.difficulty}>
												난이도
											</Difficulty>
										</Info>
										<Tips>
											<TipsText>
												<TipsImage />
												Tips
											</TipsText>
											<TipList>
												{championDetail !== undefined &&
													championDetail[champion.id] !== undefined &&
													championDetail[champion.id].allytips.map(
														(tip: string, tipIdx: number) => {
															return <Tip key={tipIdx}>{tip}</Tip>;
														}
													)}
											</TipList>
										</Tips>
									</ChampionInfo>
								)}
							</CardContainer>
						);
					})}
			</Slider>
		</SlideContainer>
	);
}

export default ChampionSlide;
