import dayjs from "dayjs";


export const winningRate = (win: number, lose: number) => {
	return Math.floor((win * 100) / (win + lose));
};

export const timeStampToDate = (timeStamp: number) => {
    const date = dayjs(timeStamp).format('YYYY-MM-DD, hh:mm:ss')
    return date;
}

export const romeToNumber = (rome: string) => {
	const number: { [key: string]: number } = {
		I: 1,
		II: 2,
		III: 3,
		IV: 4,
		V: 5
	};
	return number[rome];
};

export const selectStyle = {
	control: (base: any) => ({
		...base,
		height: '15px',
		minWidth: 130,
		background: '#212F3D',
		border: 'none',
		margin: 0,
		borderRadius: 0,
		fontSize: '1.5rem',
		fontFamily: 'system-ui',
		fontWeight: 700
	}),

	menu: (base: any) => ({
		...base,
		background: '#212F3D',
		color: '#ABB2B9',
		borderRadius: 0,
		fontSize: '1.5rem',
		fontFamily: 'system-ui',
		fontWeight: 700
	}),

	menuList: (base: any) => ({
		...base,
		borderRadius: 0
	}),

	singleValue: (base: any) => ({
		...base,
		color: '#ABB2B9'
	})
};
