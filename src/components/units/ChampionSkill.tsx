import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ChampionDetailProps } from 'utils/types';

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
	}
`;

const SkillDescription = styled.div`
	margin-top: 30px;
`;

const SkillName = styled.span`
	display: inline-block;
	font-size: 2.5rem;
	margin-bottom: 10px;
`;

const DefaultValue = styled.div``;

const Value = styled.p`
	font-size: 1.5rem;
	color: #555;
	font-style: italic;
	margin-bottom: 5px;
`;

const Description = styled.p`
	margin: 15px 0;
	font-size: 1.7rem;
`;

const Postscript = styled.p`
	font-size: 1.5rem;
	font-style: italic;
	color: #008b8b;
`;

interface SkillProps {
	detailInfo: ChampionDetailProps;
}

function ChampionSkill({ detailInfo }: SkillProps) {
	const [selectedSkill, SetSelectedSkill] = useState<string>('0');

	const currentSkill = useMemo(() => {
		if (selectedSkill !== 'passive') {
			return detailInfo.spells[Number(selectedSkill)];
		} else {
			return detailInfo.passive;
		}
	}, [detailInfo, selectedSkill]);

	const passiveDescription = useMemo(() => {
		return detailInfo.passive.description.replace(/<[^>]*>?/g, ' ');
	}, [detailInfo]);

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
	}, [detailInfo, selectedSkill]);

	return (
		<SkillContainer>
			<SkillList>
				<>
					<Skill selectedSkill={selectedSkill === 'passive'}>
						<Image
							src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/passive/${detailInfo.passive.image.full}`}
							width={55}
							height={55}
							alt="skillImage"
							onClick={() => SetSelectedSkill('passive')}
						/>
						passive
					</Skill>

					{detailInfo.spells.map((spell, index) => {
						return (
							<Skill selectedSkill={selectedSkill === index.toString()} key={index}>
								<Image
									src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/${spell.image.full}`}
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
					{selectedSkill === 'passive' ? detailInfo.passive.name : currentSkill.name}
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

export default ChampionSkill;