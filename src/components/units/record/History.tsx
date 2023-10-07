import React from 'react'
import { SummonerType, matchListType } from 'utils/recordType';

interface HistoryProps {
    summoner: SummonerType;
    matchList: matchListType[];
}

export default function History({ summoner, matchList }: HistoryProps) {
  return (
    <div>History</div>
  )
}
