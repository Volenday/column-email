import React, { memo, Suspense, useRef } from 'react';
import { Skeleton } from 'antd';

const browser = typeof process.browser !== 'undefined' ? process.browser : true;

export default ({ editable = false, format = [], id, onChange, ...defaultProps }) => {
	return {
		...defaultProps,
		Cell: props =>
			browser ? (
				<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
					<Cell {...props} other={{ editable, id, onChange, withLabel: false }} />
				</Suspense>
			) : null,
		Filter: props =>
			browser ? (
				<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
					<Filter {...props} />
				</Suspense>
			) : null
	};
};

const Cell = memo(({ other: { editable, id, onChange, withLabel }, row: { original }, value }) => {
	if (typeof value == 'undefined') return null;

	if (editable) {
		const InputEmail = require('@volenday/input-email').default;
		const { Controller, useForm } = require('react-hook-form');
		const formRef = useRef();
		const originalValue = value;
		const { control, handleSubmit } = useForm({ defaultValues: { [id]: value } });

		const submit = data => onChange({ ...data, Id: original.Id });

		return (
			<form onSubmit={handleSubmit(submit)} ref={formRef}>
				<Controller
					control={control}
					name={id}
					render={({ name, onChange, value }) => (
						<InputEmail
							id={name}
							onBlur={() =>
								originalValue !== value &&
								formRef.current.dispatchEvent(new Event('submit', { cancelable: true }))
							}
							onChange={e => onChange(e.target.value)}
							onPressEnter={e => e.target.blur()}
							value={value}
							withLabel={withLabel}
						/>
					)}
				/>
			</form>
		);
	}

	return <span>{value}</span>;
});

const Filter = memo(({ column: { filterValue, setFilter } }) => {
	const InputEmail = require('@volenday/input-email').default;
	const { Controller, useForm } = require('react-hook-form');
	let timeout = null;

	const formRef = useRef();
	const { control, handleSubmit } = useForm({ defaultValues: { filter: filterValue ? filterValue : '' } });

	const submit = data => setFilter(values.filter);

	return (
		<form onSubmit={handleSubmit(submit)} ref={formRef}>
			<Controller
				control={control}
				name="filter"
				render={({ name, onChange, value }) => (
					<InputEmail
						id={name}
						onChange={e => {
							onChange(e.target.value);

							if (value !== '' && e.target.value === '') {
								formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
							} else {
								timeout && clearTimeout(timeout);
								timeout = setTimeout(
									() => formRef.current.dispatchEvent(new Event('submit', { cancelable: true })),
									300
								);
							}
						}}
						onPressEnter={() => formRef.current.dispatchEvent(new Event('submit', { cancelable: true }))}
						placeholder="Search..."
						withLabel={false}
						value={value}
					/>
				)}
			/>
		</form>
	);
});
