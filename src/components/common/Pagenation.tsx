import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useAtom } from 'jotai';
import { currentPageState } from 'store/record';
import { useRouter } from 'next/router';

export default function Pagenation() {
	const router = useRouter();
	const [pageGroup, setPageGroup] = useState<number>(
		Math.floor((+(router.query?.page ?? 0) - 1) / 10)
	);
	const [currentPage, setCurrentPage] = useAtom(currentPageState);

	const movePage = (page: number) => {
		if (page === currentPage) return;
		router.push({ query: { page } });
	};

	useEffect(() => {
		setCurrentPage(+(router.query.page ?? 1));
	}, [router.query]);

	const pageGroupPrev = () => {
		if (pageGroup === 0) return;
		setPageGroup(pageGroup - 1);
	};

	return (
		<PageContainer>
			<GroupMoveButton onClick={pageGroupPrev}>
				<MdArrowBackIos />
			</GroupMoveButton>
			{new Array(10).fill(null).map((_, index) => (
				<PageButton
					key={index}
					currentPage={currentPage === pageGroup * 10 + index + 1}
					onClick={() => movePage(pageGroup * 10 + index + 1)}>
					{pageGroup * 10 + index + 1}
				</PageButton>
			))}
			<GroupMoveButton onClick={() => setPageGroup(pageGroup + 1)}>
				<MdArrowForwardIos />
			</GroupMoveButton>
		</PageContainer>
	);
}

const PageContainer = styled.div`
	width: 800px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 15px;
`;

const GroupMoveButton = styled.button`
	width: 30px;
	height: 30px;
	font-size: 1.5rem;
	background-color: #333;
	color: #aaa;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PageButton = styled.button<{ currentPage: boolean }>`
	width: 40px;
	height: 40px;
	background-color: ${(props) => (props.currentPage ? '#555' : '#333')};
	color: ${(props) => (props.currentPage ? '#fff' : '#aaa')};
	font-size: 1.5rem;
	font-weight: 700;

	:hover {
		background-color: #222;
	}
`;
