import React from 'react';
import InputEmail from '@volenday/input-email';
import { Formik } from 'formik';

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
		Cell: ({ original, value }) => {
			if (editable) {
				return (
					<Formik
						enableReinitialize={true}
						initialValues={{ [id]: value }}
						onSubmit={values => onChange({ ...values, Id: original.Id })}
						validateOnBlur={false}
						validateOnChange={false}
						render={({ handleChange, submitForm, values }) => (
							<InputEmail
								id={id}
								onBlur={submitForm}
								onChange={handleChange}
								onPressEnter={e => {
									submitForm(e);
									e.target.blur();
								}}
								withLabel={false}
								value={values[id]}
							/>
						)}
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
