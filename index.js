import React from 'react';

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
					<input
						type="email"
						class="form-control"
						value={value}
						onBlur={e => onChange({ Id: original.Id, [id]: e.target.value })}
						onChange={e => onChangeText(index, id, e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								onChange({ Id: original.Id, [id]: e.target.value });
								e.target.blur();
							}
							return;
						}}
					/>
				);
			} else {
				return <span>{value}</span>;
			}
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
