import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { versionListState } from 'store/common';
import { useAtomValue } from 'jotai';
import { ChampionDetailType } from 'utils/types';

interface SkillProps {
	championDetail: ChampionDetailType;
}

function ChampionSkill({ championDetail }: SkillProps) {
	const [selectedSkill, SetSelectedSkill] = useState<string>('0');
	const version = useAtomValue(versionListState)[0];

	const currentSkill = useMemo(() => {
		if (selectedSkill !== 'passive') {
			return championDetail.spells[Number(selectedSkill)];
		} else {
			return championDetail.passive;
		}
	}, [championDetail, selectedSkill]);

	const passiveDescription = useMemo(() => {
		return championDetail.passive.description.replace(/<[^>]*>?/g, ' ');
	}, [championDetail]);

	const spellDescription = useMemo(() => {
		let text = '';
		if (selectedSkill !== 'passive') {
			text = currentSkill.tooltip
				.replace(/\<[/a-zA-Z0-9]+\>/g, '')
				.replace('{{ spellmodifierdescriptionappend }}', '');

			let effectBurnArray = text.match(/\{\{\se[0-9]\s\}\}/g);

			if (effectBurnArray !== null) {
				effectBurnArray.forEach((effect) => {
					let effectIndex = effect.match(/[0-9]/);

					if (effectIndex !== null && currentSkill.effectBurn !== null) {
						text = text.replace(effect, currentSkill.effectBurn[Number(effectIndex)]);
					}
				});
			}
			text = text.replace(/\{\{\s[a-zA-Z0-9*+-/=:]+\s\}\}/g, '?');
		}
		return text;
	}, [championDetail, selectedSkill]);

	return (
		<SkillContainer>
			<SkillList>
				<>
					<Skill selectedSkill={selectedSkill === 'passive'}>
						<Image
							src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${championDetail.passive.image.full}`}
							width={55}
							height={55}
							alt="skillImage"
							onClick={() => SetSelectedSkill('passive')}
						/>
						passive
					</Skill>

					{championDetail.spells.map((spell, index) => {
						return (
							<Skill selectedSkill={selectedSkill === index.toString()} key={index}>
								<Image
									src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
									width={55}
									height={55}
									alt="skillImage"
									onClick={() => SetSelectedSkill(index.toString())}
								/>
								{spell.id.slice(-1)}
							</Skill>
						);
					})}
				</>
			</SkillList>
			<SkillDescription>
				<SkillName>
					{selectedSkill === 'passive' ? championDetail.passive.name : currentSkill.name}
				</SkillName>
				{selectedSkill !== 'passive' && (
					<DefaultValue>
						<Value>
							<>
								재사용 대기시간&#40;초&#41;:&nbsp;
								{currentSkill.cooldownBurn}
							</>
						</Value>
						<Value>
							<>소모값:&nbsp;{currentSkill.costBurn}</>
						</Value>
						<Value>
							<>
								범위:&nbsp;
								{currentSkill.rangeBurn === '25000' ? '0' : currentSkill.rangeBurn}
							</>
						</Value>
					</DefaultValue>
				)}
				{selectedSkill === 'passive' && <Description>{passiveDescription}</Description>}
				{selectedSkill !== 'passive' && (
					<Description>
						{!currentSkill.tooltip.includes('br')
							? spellDescription
							: spellDescription.split('<br />').map((line, lineIndex) => {
									return (
										<span key={lineIndex}>
											{line} <br />
										</span>
									);
							  })}
					</Description>
				)}
				<Postscript>
					&#40;?&#41; 로 표시된 값은 라이엇API에서 제공하지 않는 데이터입니다. <br />
					정확한 값은 LOL클라이언트에서 확인하실 수 있습니다.
				</Postscript>
			</SkillDescription>
		</SkillContainer>
	);
}

const SkillContainer = styled.div``;

const SkillList = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Skill = styled.div<{ selectedSkill: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	font-size: 1.5rem;

	img {
		:hover {
			cursor: pointer;
			border: 2px solid rgb(174, 214, 241);
		}
		border: 2px solid ${(props) => (props.selectedSkill ? 'violet' : 'none')};

		@media screen and (max-width: 1300px) {
			width: 50px;
			height: 50px;
		}
	}
`;

const SkillDescription = styled.div`
	margin-top: 30px;

	@media screen and (max-width: 1300px) {
		margin-top: 20px;
	}
`;

const SkillName = styled.span`
	display: inline-block;
	font-size: 2.5rem;
	margin-bottom: 10px;

	@media screen and (max-width: 1300px) {
		font-size: 1.8rem;
	}
`;

const DefaultValue = styled.div``;

const Value = styled.p`
	font-size: 1.5rem;
	color: #555;
	font-style: italic;
	margin-bottom: 5px;

	@media screen and (max-width: 1300px) {
		font-size: 1.3rem;
	}
`;

const Description = styled.p`
	margin: 15px 0;
	font-size: 1.7rem;

	@media screen and (max-width: 1300px) {
		font-size: 1.3rem;
	}
`;

const Postscript = styled.p`
	font-size: 1.5rem;
	font-style: italic;
	color: #008b8b;

	@media screen and (max-width: 1300px) {
		font-size: 1.2rem;
	}
`;

export default ChampionSkill;
