import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'store/index';
import { csrFetch } from 'store/csrFetch';
import classNames from 'classnames/bind';
import navigationStyle from 'styles/components/navigation.module.scss';

const cx = classNames.bind(navigationStyle);

function Navigation() {
	const version = useAppSelector((state) => state.version.lastVersion);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(csrFetch.getVersionList());
	}, [dispatch, version]);

	return (
		<div className={cx('navBar', 'background-orange')}>
			<div className={cx('logoHeader')}>
				<Link href="/">
					<span className={cx('title')}>LOLIPOP</span>
				</Link>
			</div>
			<div className={cx('menuList')}>
				<Link href="/items">
					<div className={cx('menu')}>아이템 정보</div>
				</Link>
				<Link href="/champions">
					<div className={cx('menu')}>챔피언 정보</div>
				</Link>
			</div>

			<div className={cx('version')}>Version {version}</div>
		</div>
	);
}

export default Navigation;
