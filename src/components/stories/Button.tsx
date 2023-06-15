import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
	label: string;
	size?: 'small' | 'large';
	onClick?: () => void;
}

export default function Button({ label, size, ...props }: ButtonProps) {
	return (
		<SearchButton size={size} {...props}>
			{label}
		</SearchButton>
	);
}

const SearchButton = styled.button<{ size?: string }>`
	width: ${(props) => (props.size === 'small' ? '48px' : '72px')};
	height: ${(props) => (props.size === 'small' ? '15px' : '30px')};
	font-size: ${(props) => (props.size === 'small' ? '1.2rem' : '1.5rem')};
`;
