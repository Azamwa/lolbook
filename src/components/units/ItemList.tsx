import React from 'react';
import itemListStyle from 'styles/components/itemList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(itemListStyle);

function ItemList() {
	return <div className={cx('listContainer')}></div>;
}

export default ItemList;
