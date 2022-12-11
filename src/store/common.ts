import { createSlice } from '@reduxjs/toolkit';

type CommonState = {
	pending: boolean;
};

const initialState: CommonState = {
	pending: false
};

const common = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setPending(state) {
			state.pending = true;
		},
		setComplete(state) {
			state.pending = false;
		}
	}
});

export const { setPending, setComplete } = common.actions;

export default common;
