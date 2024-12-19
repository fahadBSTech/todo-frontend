import Image from "next/image";

const EmptyState = () => {
	return (
		<div className='flex flex-col w-full max-w-[736px] items-center text-grayCustom gap-4 px-6 py-16 rounded-lg border-t border-emptyStateBoxborderColor'>
			<Image
				src='/assets/Clipboard.svg'
				alt='Task Icon'
				width={16}
				height={16}
			/>
			<p className='text-lg font-bold  text-center'>
				You don&apos;t have any tasks registered yet.
			</p>
			<p className='text-center'>Create tasks and organize your to-do items.</p>
		</div>
	);
};

export default EmptyState;
