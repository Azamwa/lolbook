import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useAtomValue, useSetAtom } from 'jotai';
import { screenSizeState } from 'store/common';
import { skinNumberState } from 'store/champions';
import { ChampionDetailType } from 'utils/types';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

interface ChampionSkinProps {
	championDetail: ChampionDetailType;
}
interface Skin {
	id: string;
	num: number;
	name: string;
	chromas: boolean;
}

function ChampionSkin({ championDetail }: ChampionSkinProps) {
	const [currentSkin, setCurrentSkin] = useState<Skin>(championDetail.skins[0]);
	const slider = useRef<HTMLDivElement>(null);
	const [scrollLeft, setScrollLeft] = useState<number>(0);
	const screenSize = useAtomValue(screenSizeState);
	const setSkinNumber = useSetAtom(skinNumberState);
	const scrollLeftValue = screenSize === 'big' ? 500 : screenSize === 'middle' ? 350 : 165;

	const changeskinNumber = (skinNumber: number, index: number) => {
		setCurrentSkin(championDetail.skins[index]);
		if (slider.current !== null) {
			setScrollLeft(index * 130);
			slider.current.scrollTo({
				left: 165 * index,
				behavior: 'smooth'
			});
		}
		setSkinNumber(skinNumber);
	};

	const scrollMoveLeft = () => {
		if (slider.current !== null) {
			if (scrollLeft >= scrollLeftValue) {
				setScrollLeft(scrollLeft - scrollLeftValue);
			}
			slider.current.scrollTo({
				left: scrollLeft - scrollLeftValue,
				behavior: 'smooth'
			});
		}
	};

	const scrollMoveRight = () => {
		if (slider.current !== null) {
			if (scrollLeft < championDetail.skins.length * 130 - scrollLeftValue) {
				setScrollLeft(scrollLeft + scrollLeftValue);
			}
			slider.current.scrollTo({
				left: scrollLeft + scrollLeftValue,
				behavior: 'smooth'
			});
		}
	};

	return (
		<ChampionSkinContainer>
			<SkinBackground champion={championDetail.id} skinId={currentSkin.num} />
			<SkinContainer>
				<SkinName>
					{currentSkin.name === 'default' ? championDetail.name : currentSkin.name}
				</SkinName>
				<SkinList>
					<MdArrowBackIos className="navBack" onClick={scrollMoveLeft} />
					<SliderContainer ref={slider}>
						{championDetail.skins.map((skin, index) => {
							return (
								<SkinImage
									key={index}
									skinNumber={skin.num === currentSkin.num}
									onClick={() => changeskinNumber(skin.num, index)}>
									<Image
										src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championDetail.id}_${skin.num}.jpg`}
										width={135}
										height={80}
										alt="skinListImage"
										priority={false}
									/>
								</SkinImage>
							);
						})}
					</SliderContainer>
					<MdArrowForwardIos className="navForward" onClick={scrollMoveRight} />
				</SkinList>
			</SkinContainer>
		</ChampionSkinContainer>
	);
}

const ChampionSkinContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

const SkinBackground = styled.div<{ champion: string; skinId: number }>`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 11;
	background: linear-gradient(to left top, transparent 30%, black) right top / cover,
		${(props) =>
			`url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.champion}_${props.skinId}.jpg)`};
	background-repeat: no-repeat;
	background-size: cover;
	background-position: right top;

	@media screen and (max-width: 767px) {
		background: ${(props) =>
			`url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${props.champion}_${props.skinId}.jpg)`};
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}
`;

const SkinContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	z-index: 13;
`;

const SkinName = styled.span`
	width: 100%;
	height: 30px;
	font-size: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-style: italic;

	::before,
	::after {
		width: 20%;
		content: '';
		height: 2px;
		background-color: #fff;
	}

	::before {
		margin-right: 10px;
	}

	::after {
		margin-left: 10px;
	}

	@media screen and (max-width: 767px) {
		font-size: 1.8rem;
	}
`;

const SkinList = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	gap: 20px;
	font-size: 4rem;

	svg:hover {
		cursor: pointer;
	}

	@media screen and (max-width: 767px) {
		font-size: 4rem;
		gap: 10px;
	}
`;

const SliderContainer = styled.div`
	width: 70%;
	height: 200px;
	display: flex;
	justify-content: 'space-between';
	align-items: center;
	gap: 30px;
	z-index: 13;
	overflow: hidden;
`;

const SkinImage = styled.div<{ skinNumber: boolean }>`
	img {
		width: ${(props) => props.skinNumber && '200px'};
		height: ${(props) => props.skinNumber && '120px'};
		border: 1px solid ${(props) => (props.skinNumber ? 'brown' : 'rgb(235, 102, 45)')};

		:hover {
			cursor: pointer;
		}
	}
`;

export default ChampionSkin;
