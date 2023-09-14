import { useRouter } from 'next/router';
import { summonerNameState } from 'store/record';
import styled from 'styled-components';
import { winningRate } from 'utils/common';
import { RankingType } from 'utils/recordType';

interface RankingProps {
	rankList: RankingType[];
}

export default function Ranking({ rankList }: RankingProps) {
    const router = useRouter();
	const { setSummonerName } = summonerNameState();
    const searchSummoner = (ranker: RankingType) => {
		setSummonerName(ranker.summonerName);
		router.push({
			pathname: `/record/${ranker.summonerName}`,
			query: {
				fromRank: true
			}
		});
	};

	return (
		<RankingTable>
			<thead>
				<tr>
					<TableHeader>
						<RankingNumber>#</RankingNumber>
						<SummonerName>소환사명</SummonerName>
						<Tier>티어</Tier>
						<LeaguePoint>LP</LeaguePoint>
						<WinningRate>승률</WinningRate>
					</TableHeader>
				</tr>
			</thead>
			<tbody>
				<TableBody>
                    {rankList.map((ranker) => (
                        <TableContent
                            key={ranker.summonerId}
                            onClick={() => searchSummoner(ranker)}>
                            <RankingNumber>{ranker.idx}</RankingNumber>
                            <SummonerName>{ranker.summonerName}</SummonerName>
                            <Tier>
                                {ranker.tier}
                            </Tier>
                            <LeaguePoint>{`${ranker.leaguePoints} LP`}</LeaguePoint>
                            <WinningRate>
                                <WinningGraph>
                                    <WinRate
                                        winsRate={winningRate(ranker.wins, ranker.losses)}>
                                        <Wins>{ranker.wins}W</Wins>
                                    </WinRate>
                                    <LoseRate
                                        lossesRate={100 - winningRate(ranker.wins, ranker.losses)}>
                                        <Losses>{ranker.losses}L</Losses>
                                    </LoseRate>
                                </WinningGraph>
                                <WinningRateText>
                                    {`${winningRate(ranker.wins, ranker.losses)} %`}
                                </WinningRateText>
                            </WinningRate>
                        </TableContent>
                    ))}
				</TableBody>
			</tbody>
		</RankingTable>
	);
}

const RankingTable = styled.table`
	width: 870px;
	height: 600px;
	border-radius: 5px;
	background-color: rgb(52, 69, 85);
	color: #ccc;
	font-size: 1.5rem;
`;

const TableHeader = styled.th`
	width: 100%;
	height: 30px;
	padding: 10px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const RankingNumber = styled.div`
	width: 50px;
    padding-left: 10px;
    display: flex;
    justify-content: flex-start;
`;

const SummonerName = styled.div`
	width: 380px;
`;

const Tier = styled.div`
	width: 120px;
    display: flex;
    justify-content: center;
`;

const LeaguePoint = styled.div`
	width: 100px;
    display: flex;
    justify-content: center;
`;

const WinningRate = styled.div`
	width: 200px;
	display: flex;
	align-items: center;
    justify-content: center;
	gap: 10px;
	position: relative;
`;

const WinningGraph = styled.div`
	width: 150px;
	height: 20px;
	border-radius: 5px;
`;

const WinRate = styled.div<{ winsRate: number }>`
	width: ${(props) => props.winsRate * 1.5 + 'px'};
	height: 100%;
	border-radius: 5px 0 0 5px;
	display: flex;
	justify-content: flex-end;
	background-color: #4983ff;
	position: absolute;
	left: 0;
	line-height: 20px;
`;

const LoseRate = styled.div<{ lossesRate: number }>`
	width: ${(props) => props.lossesRate * 1.5 + 'px'};
	height: 100%;
	border-radius: 0 5px 5px 0;
	display: flex;
	justify-content: flex-end;
	background-color: #ff4848;
	position: absolute;
	left: ${(props) => 150 - props.lossesRate * 1.5 + 'px'};
	line-height: 20px;
`;

const Wins = styled.span`
	font-size: 1.2rem;
	color: #fff;
	position: absolute;
	left: 5px;
`;

const Losses = styled.span`
	font-size: 1.2rem;
	color: #fff;
	position: absolute;
	right: 5px;
`;

const WinningRateText = styled.span`
	font-size: 1.3rem;
	color: #fff;
`;

const TableBody = styled.tr``;

const TableContent = styled.td`
	width: 100%;
	height: 30px;
	padding: 10px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);

	:hover {
		cursor: pointer;
		background-color: rgb(77, 97, 116);
	}
`;
