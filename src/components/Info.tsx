type InformationProps = {
	tasksCount: number;
	completed: number;
};

const Info = ({ tasksCount, completed }: InformationProps) => {
	return (
		<div className='flex justify-between w-full max-w-[736px] pb-2'>
			<div className='flex gap-2'>
				<span className='text-blue-400 font-inter font-bold'>Tasks</span>
				<span className='bg-gray-700 px-2 py-1 rounded-full text-sm inline-flex items-center justify-center'>
					{tasksCount}
				</span>
			</div>
			<div className='flex gap-2'>
				<span className='text-customPurple font-inter font-bold text-left'>
					Completed
				</span>
				<span className='bg-gray-700 px-2 py-1 rounded-full text-sm inline-flex items-center justify-center'>
					{completed ? `${completed} of ${tasksCount}` : 0}
				</span>
			</div>
		</div>
	);
};

export default Info;
