import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import axios from 'axios';
import { useAtom } from 'jotai';
import { rankListState, riotAPI } from 'store/record';
import SearchForm from 'components/common/SearchForm';
import { RankingType } from 'utils/recordType';
import Ranking from 'components/units/Ranking';
import Pagenation from 'components/common/Pagenation';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const page = context.query.page ?? 1;
	const header = {
		headers: {
			Accept: 'application/json',
			'Accept-Encoding': 'identity'
		}
	};
	try {
		const ranking = await axios.get(
			`${riotAPI}/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=${page}&api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
			header
		);
		return {
			props: {
				ranking: ranking.data
			}
		};
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: '/error'
			}
		};
	}
};

interface RecordProps {
	ranking: RankingType[];
	e?: any;
}

export default function index({ ranking }: RecordProps) {
	const [rankList, setRankList] = useAtom(rankListState);

	useEffect(() => {
		setRankList(ranking);
	}, [ranking]);
	return (
		<>
			<Background>
				<Image src="/img/background/in73r6sbixz31.webp" alt="background" fill />
			</Background>
			<PageWrap>
				<PageContent>
					<SearchForm />
					<RankingSection>
						<RankingTitle>
							# 랭킹<span>그랜드마스터 이상의 소환사만 표시합니다. </span>
						</RankingTitle>
						<Ranking rankers={rankList} />
					</RankingSection>
					{/* <Pagenation /> */}
				</PageContent>
			</PageWrap>
		</>
	);
}

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	z-index: -1;
`;

const PageWrap = styled.div`
	width: 100vw;
	height: 100vh;
`;

const PageContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;
`;

const RankingSection = styled.section``;

const RankingTitle = styled.p`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 5px;
	font-size: 3rem;
	color: rgb(52, 69, 85);

	span {
		font-size: 1.5rem;
	}
`;
