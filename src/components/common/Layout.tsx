import React from 'react';
import LayoutStyle from 'styles/components/layout.module.scss';
import classNames from 'classnames/bind';
import Navigation from './Navigation';

type LayoutProps = {
	children: React.ReactNode;
};

const cx = classNames.bind(LayoutStyle);

function Layout({ children }: LayoutProps) {
	return (
		<>
			<Navigation />
			<div className={cx('layoutContainer')}>{children}</div>
		</>
	);
}

export default Layout;
