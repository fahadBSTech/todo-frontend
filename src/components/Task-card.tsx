import Image from "next/image";
import { useRouter } from "next/navigation";
import { Task, UpdateTask } from "@/types/task";

interface TaskCardProps {
	task: Task;
	onToggle: (id: number, updateReq: UpdateTask) => void;
	onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete }) => {
	const router = useRouter();
	return (
		<div
			key={task.id}
			className='flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-taskCard'>
			<button
				onClick={() => onToggle(task.id, { completed: !task.completed })}
				className='mr-4'>
				{task.completed ? (
					<Image src='/assets/check.png' alt='Checked' width={24} height={24} />
				) : (
					<Image
						src='/assets/uncheck.png'
						alt='Unchecked'
						width={24}
						height={24}
					/>
				)}
			</button>
			<span
				onClick={() => router.push(`/task-detail/${task.id}`)}
				className={`flex-1 ${task.completed ? "line-through" : ""}`}>
				{task.title}
			</span>
			<button
				onClick={() => {
					if (confirm("Are you sure you want to delete this task?")) {
						onDelete(task.id);
					}
				}}
				className='text-red-500 hover:text-red-700'>
				<Image
					src='/assets/trash.png'
					alt='Delete'
					width={24}
					height={24}
					className='opacity-100'
				/>
			</button>
		</div>
	);
};

export default TaskCard;
