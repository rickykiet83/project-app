import clsx from 'clsx';

const Input = ({
	className,
	...props
}: {
	className: string;
	props: HTMLInputElement;
}) => {
	return (
		<input
			{...props}
			className={clsx(
				'border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full',
				className
			)}
		/>
	);
};

export default Input;
