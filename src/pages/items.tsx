import React from 'react';
import itemsStyle from 'styles/pages/items.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(itemsStyle);

function items() {
	return (
		<div>
			<div className={cx('Background')} />
			<div>asdasdasdsad</div>
		</div>
	);
}

export default items;
