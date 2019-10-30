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
			if (typeof value == 'undefined') return null;

			if (editable) {
				return (
					<Formik
						enableReinitialize={true}
						initialValues={{ [id]: value }}
						onSubmit={values => onChange({ ...values, Id: original.Id })}
						validateOnBlur={false}
						validateOnChange={false}>
						{({ handleChange, submitForm, values }) => (
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
					</Formik>
				);
			}

			return <span>{value}</span>;
		},
		Filter: ({ filter, onChange }) => {
			return (
				<Formik
					enableReinitialize={true}
					initialValues={{ filter: filter ? filter.value : '' }}
					onSubmit={values => onChange(values.filter)}
					validateOnBlur={false}
					validateOnChange={false}>
					{({ handleChange, submitForm, values }) => (
						<InputEmail
							id="filter"
							onBlur={submitForm}
							onChange={e => {
								handleChange(e);
								if (values.filter != '' && e.target.value == '') submitForm(e);
							}}
							onPressEnter={submitForm}
							placeholder="Search..."
							withLabel={false}
							value={values.filter}
						/>
					)}
				</Formik>
			);
		}
	};
};
