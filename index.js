import React from 'react';
import InputEmail from '@volenday/input-email';

export default props => {
	const {
		editable = false,
		format = [],
		headerStyle = {},
		id,
		onChange,
		onChangeText,
		style = {},
		...defaultProps
	} = props;

	return {
		...defaultProps,
		style: { ...style, display: 'flex', alignItems: 'center' },
		headerStyle: { ...headerStyle, display: 'flex', alignItems: 'center' },
		Cell: ({ index, original, value }) => {
			if (editable) {
				return (
					<InputEmail
						id={id}
						onBlur={e => onChange({ Id: original.Id, [id]: e.target.value })}
						onChange={(field, value) => onChangeText(index, field, value)}
						onPressEnter={e => {
							onChange({ Id: original.Id, [id]: e.target.value });
							e.target.blur();
						}}
						withLabel={false}
						value={value}
					/>
				);
			}

			return <span>{value}</span>;
		},
		Filter: ({ filter, onChange }) => {
			return (
				<input
					type="email"
					class="form-control"
					onChange={e => onChange(e.target.value)}
					value={filter ? filter.value : ''}
					placeholder="Search..."
				/>
			);
		}
	};
};
