export const winningRate = (win: number, lose: number) => {
	return Math.floor((win * 100) / (win + lose));
};

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
