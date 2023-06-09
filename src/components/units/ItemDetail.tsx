import React, { useMemo } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useAtom, useAtomValue } from 'jotai';
import { fromItemState, openDetailState, selectItemState } from 'store/items';
import { versionListState } from 'store/version';
import { ItemListType, ItemType } from 'utils/types';

interface ItemDetailProps {
	allItems: ItemListType;
}
export default function ItemDetail({ allItems }: ItemDetailProps) {
	const version = useAtomValue(versionListState)[0];
	const [selectItem, setSelectItem] = useAtom(selectItemState);
	const [fromItemList, setFromItemList] = useAtom(fromItemState);
	const [openDetail, setOpenDetail] = useAtom(openDetailState);

	const flavorText = useMemo(() => {
		let text: RegExpMatchArray | null | string = '';
		if (
			selectItem?.description !== undefined &&
			selectItem?.description.includes('flavorText')
		) {
			text = selectItem?.description.match(/<flavorText>(.*?)<\/flavorText>/g) + '';
			text = text.replace(/<[^>]*>?/g, '');
		} else if (
			selectItem?.description !== undefined &&
			selectItem?.description.includes('rules')
		) {
			text = selectItem?.description.match(/<rules>(.*?)<\/rules>/);
			if (text !== null) {
				text = text[1].replace(/<[^>]*>?/g, '');
			}
		}
		return text;
	}, [selectItem]);

	const description: string[] = useMemo(() => {
		let text: string = '';
		if (selectItem?.description !== undefined) {
			let regExpMatch: RegExpMatchArray | string | null = null;
			if (selectItem.description.includes('rules')) {
				regExpMatch = selectItem.description.match(/<mainText>(.*?)<rules>/);
				if (regExpMatch !== null) {
					text = regExpMatch[1] + '';
				}
			} else if (selectItem.description.includes('flavorText')) {
				regExpMatch = selectItem.description.match(/<mainText>(.*?)<flavorText>/);
				if (regExpMatch !== null) {
					text = regExpMatch[1] + '';
				}
			} else {
				text = selectItem.description;
			}

			if (selectItem.description.includes('<li>')) {
				text = text.replace(/<li>/, '<br>');
			}

			return text.split('<br>').map((sentence: string) => {
				return sentence.replace(/<[^>]*>?/g, '');
			});
		}
		return [];
	}, [selectItem, flavorText]);

	const changeSelectItem = (item: ItemType) => {
		setOpenDetail();
		setSelectItem(item);
		setFromItemList({ itemIdList: item.from, itemList: allItems });
	};

	return (
		<ItemDetailContainer openDetail={openDetail}>
			<SrollbarContainer>
				<ItemBuild>
					<PartSubject>아이템 빌드</PartSubject>
					{selectItem !== null && (
						<BuildList>
							{selectItem.into?.map((id, index) => {
								return (
									<Image
										src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`}
										width={35}
										height={35}
										alt="intoItem"
										key={index}
										onClick={() => changeSelectItem(allItems[id])}
									/>
								);
							})}
						</BuildList>
					)}
				</ItemBuild>
				<ItemCombination>
					<PartSubject>아이템 조합식</PartSubject>
					{selectItem?.from && (
						<Combination>
							<CombinedItem>
								<Image
									src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${selectItem?.image?.full}`}
									width={35}
									height={35}
									alt="combinedItem"
								/>
							</CombinedItem>
							<FirstCombination numberOfItems={selectItem?.from.length}>
								{selectItem?.from.map((id, index) => {
									return (
										<ChildrenImageWrap
											key={index}
											fromItem={
												fromItemList !== null &&
												fromItemList !== undefined &&
												fromItemList[index]?.from !== undefined
											}>
											<Image
												src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`}
												width={35}
												height={35}
												alt="combination"
												onClick={() => changeSelectItem(allItems[id])}
											/>
										</ChildrenImageWrap>
									);
								})}
							</FirstCombination>
							{fromItemList.length > 0 && (
								<SecondCombination numberOfItems={selectItem?.from.length}>
									{fromItemList?.map((fromItem, fromItemIdx) => {
										return (
											<GrandsonItemWrap
												key={fromItemIdx}
												grandSonLength={fromItem?.from?.length}>
												{fromItem?.from?.map((id, grandsonIdx) => {
													return (
														<GrandSonImgWrap key={grandsonIdx}>
															<Image
																src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`}
																width={35}
																height={35}
																alt="combination"
																onClick={() =>
																	changeSelectItem(allItems[id])
																}
															/>
														</GrandSonImgWrap>
													);
												})}
											</GrandsonItemWrap>
										);
									})}
								</SecondCombination>
							)}
						</Combination>
					)}
				</ItemCombination>
				<ItemDescription>
					{selectItem !== undefined && (
						<>
							<MainInfoWrap>
								<Image
									src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${selectItem?.image?.full}`}
									width={40}
									height={40}
									alt="itemImage"
								/>
								<ItemMainInfo>
									<ItemName>{selectItem?.name}</ItemName>
									<ItemGold>
										<CoinImage />
										{selectItem?.gold.total}
										<br />
									</ItemGold>
								</ItemMainInfo>
							</MainInfoWrap>
							<DescriptionWrap>
								{description.map((content: string, index: number) => {
									return (
										<Descriptions key={index}>
											{content} <br />
										</Descriptions>
									);
								})}
								<FlavorText>{flavorText}</FlavorText>
							</DescriptionWrap>
						</>
					)}
				</ItemDescription>
			</SrollbarContainer>
			<CloseButton onClick={setOpenDetail}>닫기</CloseButton>
		</ItemDetailContainer>
	);
}

const ItemDetailContainer = styled.div<{ openDetail: boolean }>`
	min-width: 310px;
	width: 40%;
	max-width: 650px;
	min-height: 691px;
	height: 85%;
	background-color: rgb(33, 47, 61);
	position: relative;

	& ::-webkit-scrollbar {
		color: black;
	}

	& ::-webkit-scrollbar-thumb {
		background-color: rgb(52, 69, 85);
	}

	& ::-webkit-scrollbar-track {
		background-color: rgb(26, 36, 46);
	}

	@media screen and (max-width: 1300px) {
		min-height: 620px;
	}

	@media screen and (max-width: 767px) {
		display: ${(props) => (props.openDetail ? 'block' : 'none')};
		width: 55%;
		min-height: 540px;
	}
`;

const SrollbarContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 30px;
	overflow-x: hidden;
	overflow-y: auto;
`;

const PartSubject = styled.div`
	color: #fff;
	font-size: 2rem;
	margin-bottom: 10px;
`;

const ItemBuild = styled.div`
	min-height: 80px;
	padding-bottom: 20px;
	border-bottom: 1px solid #fff;
`;

const BuildList = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 15px;

	img {
		:hover {
			cursor: pointer;
		}
	}
`;

const ItemCombination = styled.div`
	padding: 20px 0;
	border-bottom: 1px solid #fff;
	min-height: 100px;
`;

const Combination = styled.div``;

const CombinedItem = styled.div`
	height: 55px;
	position: relative;
	display: flex;
	justify-content: center;

	img {
		:hover {
			cursor: pointer;
		}
	}

	::after {
		content: '';
		width: 1px;
		height: 20px;
		background-color: rgb(93, 109, 126);
		position: absolute;
		top: 35px;
		left: 50%;
	}
`;

const FirstCombination = styled.div<{ numberOfItems: number }>`
	height: 70px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${(props) => props.numberOfItems === 2 && '20px'};

	img {
		:hover {
			cursor: pointer;
		}
	}

	::before {
		content: '';
		width: ${(props) =>
			props.numberOfItems === 1 ? 0 : props.numberOfItems === 2 ? 'calc(30% + 20px)' : '60%'};
		height: 1px;
		background-color: rgb(93, 109, 126);
		position: absolute;
		top: 0;
	}
`;

const ChildrenImageWrap = styled.div<{ fromItem: boolean }>`
	width: 30%;
	height: 100%;
	padding-top: 18px;
	position: relative;
	display: flex;
	justify-content: center;

	::before {
		content: '';
		background-color: rgb(93, 109, 126);
		width: 1px;
		height: 17.5px;
		position: absolute;
		top: 0;
		left: 50%;
	}

	::after {
		display: ${(props) => (props.fromItem ? 'block' : 'none')};
		content: '';
		background-color: rgb(93, 109, 126);
		width: 1px;
		height: 17.5px;
		position: absolute;
		top: 52.5px;
		left: 50%;
	}
`;

const SecondCombination = styled.div<{ numberOfItems: number }>`
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	gap: ${(props) => props.numberOfItems === 2 && '20px'};
`;

const GrandsonItemWrap = styled.div<{ grandSonLength: number | undefined }>`
	width: 30%;
	height: 100%;
	position: relative;
	display: flex;
	justify-content: ${(props) =>
		props.grandSonLength !== undefined && props.grandSonLength < 2
			? 'center'
			: 'space-between'};

	::before {
		content: '';
		background-color: rgb(93, 109, 126);
		width: ${(props) =>
			props.grandSonLength !== undefined && props.grandSonLength > 1
				? 'calc(100% - 35px)'
				: 0};
		height: 1px;
		position: absolute;
		top: 0;
		left: 17.5px;
	}
`;

const GrandSonImgWrap = styled.div`
	width: 35px;
	height: 50px;
	padding: 15px 0;
	position: relative;

	img {
		:hover {
			cursor: pointer;
		}
	}

	::before {
		content: '';
		background-color: rgb(93, 109, 126);
		width: 1px;
		height: 15px;
		position: absolute;
		top: 0;
		left: 17.5px;
	}
`;

const ItemDescription = styled.div`
	padding: 20px 0;
`;

const MainInfoWrap = styled.div`
	display: flex;
	gap: 12px;
`;

const ItemMainInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
`;

const ItemName = styled.span`
	font-size: 1.8rem;
	color: #fff;
`;

const ItemGold = styled.div`
	display: flex;
	align-items: center;
	gap: 3px;
	font-size: 1.8rem;
	color: orange;
`;

const CoinImage = styled.div`
	width: 18px;
	height: 18px;
	margin-bottom: 3px;
	background: url('/img/doge.png') no-repeat;
	background-size: cover;
	background-position: center;
`;

const DescriptionWrap = styled.div`
	padding: 15px 0;
`;

const Descriptions = styled.p`
	font-size: 1.6rem;
	font-weight: lighter;
	color: rgba(255, 255, 255, 0.7);
	margin-bottom: 3px;
`;

const FlavorText = styled.p`
	margin-top: 15px;
	font-size: 1.4rem;
	font-weight: 700;
	color: rgb(84, 153, 199);
	font-family: sans-serif;
	font-style: italic;
	word-spacing: -3px;
`;

const CloseButton = styled.div`
	width: 100%;
	height: 40px;
	font-size: 1.5rem;
	display: none;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 10px;
	background-color: rgb(235, 102, 45);

	:hover {
		cursor: pointer;
	}

	@media screen and (max-width: 767px) {
		display: flex;
	}
`;
