import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { rankingAPI } from 'store';
import SearchForm from 'components/common/SearchForm';
import { RankingType } from 'utils/recordType';
import Ranking from 'components/units/Ranking';
import Pagenation from 'components/common/Pagenation';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let page = context.query.page ?? '1';
    
    try {
        const data = await rankingAPI(page as string);
        return {
            props: { rankingType: data }
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
}


export default function index({ ranking }: RecordProps) {
	const router = useRouter();

	return (
		<>
			<Background>
				<Image src="/img/background/in73r6sbixz31.webp" alt="background" fill />
			</Background>
			<PageWrap>
				<PageContent>
					<SearchForm />
					<RankingSection>
						{/* <Ranking rankers={rankList} /> */}
					</RankingSection>
					{/* <Pagenation /> */}
					<button onClick={() => router.push({ query: { page: 1 } })}>1</button>
					<button onClick={() => router.push({ query: { page: 2 } })}>2</button>
					<button onClick={() => router.push({ query: { page: 3 } })}>3</button>
					<button onClick={() => router.push({ query: { page: 4 } })}>4</button>
					<button onClick={() => router.push({ query: { page: 5 } })}>5</button>
					<button onClick={() => router.push({ query: { page: 6 } })}>6</button>
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

const RankingSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const RankingSelectForm = styled.div`
	width: 150px;
	margin-bottom: 7px;
`;
