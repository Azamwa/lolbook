import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ChampionProps } from 'utils/types';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const SlideContainer = styled.div`
	width: 90vw;
	height: 350px;
	margin-top: 50px;
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
	}

	.navForward {
		font-size: 6rem;
		color: rgb(235, 102, 45);
		position: absolute;
		right: -60px;

		:hover {
			cursor: pointer;
		}
	}
`;

const CardContainer = styled.div`
	height: 300px;
	display: flex;
	position: relative;
`;

const Card = styled.div`
	width: 170px;
	height: 300px;
	position: relative;

	:hover {
		cursor: pointer;
	}
`;

const ChampionName = styled.span`
	width: 170px;
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
`;

const ChampionInfo = styled.div`
	width: 350px;
	height: 100%;
	background-color: rgb(26, 36, 46);
`;

interface ChampionListProps {
	championList?: ChampionProps[];
}

function ChampionSlide({ championList }: ChampionListProps) {
	const slider = useRef<HTMLDivElement>(null);
	const [mouseIsDown, setMouseDown] = useState<boolean>(false);
	const [startX, setStartX] = useState<number>(0);
	const [scrollLeft, setScrollLeft] = useState<number>(0);
	const [championInfo, openChampionInfo] = useState<string>('');
	// useEffect(() => {
	// 	console.log(championList);
	// }, [championList]);

	const scrollMoveLeft = () => {
		if (slider.current !== null) {
			setScrollLeft(scrollLeft - 1000);
			slider.current.scrollTo({
				left: scrollLeft - 1000,
				behavior: 'smooth'
			});
		}
	};

	const scrollMoveRight = () => {
		if (slider.current !== null) {
			setScrollLeft(scrollLeft + 1000);
			slider.current.scrollTo({
				left: scrollLeft + 1000,
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
								<Card onClick={() => openChampionInfo(champion.name)}>
									<Image
										src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
										width={170}
										height={300}
										alt="ChampionLoadingImg"
									/>
									<ChampionName>{champion.name}</ChampionName>
								</Card>
								{championInfo === champion.name && <ChampionInfo></ChampionInfo>}
							</CardContainer>
						);
					})}
			</Slider>
		</SlideContainer>
	);
}

export default ChampionSlide;
