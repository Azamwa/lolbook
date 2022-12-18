import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ChampionDetailProps } from 'utils/types';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

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
`;

const SkinContainer = styled.div`
	width: 100%;
	height: 200px;
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

interface ChampionSkinProps {
	detailInfo: ChampionDetailProps;
}
interface Skin {
	id: string;
	num: number;
	name: string;
	chromas: boolean;
}

function ChampionSkin({ detailInfo }: ChampionSkinProps) {
	const [currentSkin, setCurrentSkin] = useState<Skin>(detailInfo.skins[0]);
	const slider = useRef<HTMLDivElement>(null);
	const [scrollLeft, setScrollLeft] = useState<number>(0);

	const changeskinNumber = (index: number) => {
		setCurrentSkin(detailInfo.skins[index]);
		if (slider.current !== null) {
			setScrollLeft(index * 130);
			slider.current.scrollTo({
				left: 130 * index,
				behavior: 'smooth'
			});
		}
	};

	const scrollMoveLeft = () => {
		if (slider.current !== null) {
			if (scrollLeft >= 500) {
				setScrollLeft(scrollLeft - 500);
			}
			slider.current.scrollTo({
				left: scrollLeft - 500,
				behavior: 'smooth'
			});
		}
	};

	const scrollMoveRight = () => {
		if (slider.current !== null) {
			if (scrollLeft < detailInfo.skins.length * 130 - 500) {
				setScrollLeft(scrollLeft + 500);
			}
			slider.current.scrollTo({
				left: scrollLeft + 500,
				behavior: 'smooth'
			});
		}
	};

	return (
		<ChampionSkinContainer>
			<SkinBackground champion={detailInfo.id} skinId={currentSkin.num} />
			<SkinContainer>
				<SkinName>
					{currentSkin.name === 'default' ? detailInfo.name : currentSkin.name}
				</SkinName>
				<SkinList>
					<MdArrowBackIos className="navBack" onClick={scrollMoveLeft} />
					<SliderContainer ref={slider}>
						{detailInfo.skins.map((skin, index) => {
							return (
								<SkinImage
									key={index}
									skinNumber={skin.num === currentSkin.num}
									onClick={() => changeskinNumber(index)}>
									<Image
										src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${detailInfo.id}_${skin.num}.jpg`}
										width={135}
										height={80}
										alt="skinListImage"
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

export default ChampionSkin;
