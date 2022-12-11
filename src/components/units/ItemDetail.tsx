import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'store/index';
import Image from 'next/image';
import doge from '/public/img/doge.png';

const ItemDetailContainer = styled.div`
	min-width: 310px;
	width: 40%;
	min-height: 691px;
	background-color: rgb(33, 47, 61);
	padding: 30px;
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

	img {
		margin-bottom: 3px;
	}
`;

interface itemDetailProps {
	changeItem: (id: string) => void;
}

interface DescriptionProps {
	stats: {
		name: null | RegExpMatchArray;
		value: null | RegExpMatchArray;
	};
	passive: {
		name: string[];
		text: string[];
	};
	active: {
		name: string[];
		text: string[];
	};
	rarityMythic?: string;
	flavorText?: string;
}

function ItemDetail({ changeItem }: itemDetailProps) {
	const item = useAppSelector((state) => state.items.itemDetail);
	const fromItemList = useAppSelector((state) => state.items.fromItemList);
	const version = useAppSelector((state) => state.version);

	const spreadFromItem = useMemo(() => {
		let spreadItem: string[] = [];
		fromItemList?.forEach((fromItem) => {
			if (fromItem.from !== undefined) {
				fromItem?.from.forEach((id) => {
					spreadItem.push(id);
				});
			}
		});
		return spreadItem;
	}, [fromItemList]);

	useEffect(() => {
		let description: DescriptionProps = {
			stats: {
				name: [''],
				value: ['']
			},
			passive: {
				name: [],
				text: []
			},
			active: {
				name: [],
				text: []
			},
			rarityMythic: '',
			flavorText: ''
		};
		if (item?.description !== undefined) {
			let stats: RegExpMatchArray | string | null =
				item?.description.match(/<stats>(.+)<\/stats>/);
			let skill: RegExpMatchArray | string | null = item?.description.match(
				/<(passive|active)>(.+)(<\/maintext>)$/g
			);
			console.log(skill);
			if (stats !== null) {
				stats = stats[1].replace(/\s/g, '');
				description.stats.name = stats.match(/[가-힣]+/g);
				description.stats.value = stats.match(/[0-9]+/g);
			}

			// console.log(description);
		}
	}, [item]);

	return (
		<ItemDetailContainer>
			{version.status === 'complete' && (
				<>
					<ItemBuild>
						<PartSubject>아이템 빌드</PartSubject>
						{item !== undefined && (
							<BuildList>
								{item.into?.map((id, index) => {
									return (
										<Image
											src={`https://ddragon.leagueoflegends.com/cdn/${version.lastVersion}/img/item/${id}.png`}
											width={35}
											height={35}
											alt="intoItem"
											key={index}
											onClick={() => changeItem(id)}
										/>
									);
								})}
							</BuildList>
						)}
					</ItemBuild>
					<ItemCombination>
						<PartSubject>아이템 조합식</PartSubject>
						{item?.from && (
							<Combination>
								<CombinedItem>
									<Image
										src={`https://ddragon.leagueoflegends.com/cdn/${version.lastVersion}/img/item/${item?.image?.full}`}
										width={35}
										height={35}
										alt="combinedItem"
									/>
								</CombinedItem>
								<FirstCombination numberOfItems={item?.from.length}>
									{item?.from.map((fromItem, index) => {
										return (
											<ChildrenImageWrap
												key={index}
												fromItem={
													fromItemList !== null &&
													fromItemList !== undefined &&
													fromItemList[index]?.from !== undefined
												}>
												<Image
													src={`https://ddragon.leagueoflegends.com/cdn/${version.lastVersion}/img/item/${fromItem}.png`}
													width={35}
													height={35}
													alt="combination"
													onClick={() => changeItem(fromItem)}
												/>
											</ChildrenImageWrap>
										);
									})}
								</FirstCombination>
								{spreadFromItem.length > 0 && (
									<SecondCombination numberOfItems={item?.from.length}>
										{fromItemList?.map((fromItem, fromItemIdx) => {
											return (
												<GrandsonItemWrap
													key={fromItemIdx}
													grandSonLength={fromItem?.from?.length}>
													{fromItem?.from?.map((id, grandsonIdx) => {
														return (
															<GrandSonImgWrap key={grandsonIdx}>
																<Image
																	src={`https://ddragon.leagueoflegends.com/cdn/${version.lastVersion}/img/item/${id}.png`}
																	width={35}
																	height={35}
																	alt="combination"
																	onClick={() => changeItem(id)}
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
						{item !== undefined && (
							<MainInfoWrap>
								<Image
									src={`https://ddragon.leagueoflegends.com/cdn/${version.lastVersion}/img/item/${item?.image?.full}`}
									width={40}
									height={40}
									alt="itemImage"
								/>
								<ItemMainInfo>
									<ItemName>{item?.name}</ItemName>
									<ItemGold>
										<Image src={doge} width={18} height={18} alt="coin" />
										{item?.gold.total}
										<br />
									</ItemGold>
								</ItemMainInfo>
							</MainInfoWrap>
						)}
					</ItemDescription>
				</>
			)}
		</ItemDetailContainer>
	);
}

export default ItemDetail;
