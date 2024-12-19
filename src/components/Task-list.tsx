import React from "react";
import TaskCard from "./Task-card";
import { Task, UpdateTask } from "@/types/task";

interface TaskListProps {
	tasks: Task[];
	onToggle: (id: number, updateReq: UpdateTask) => void;
	onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
	return (
		<div className='w-full max-w-[736px] items-center space-y-4'>
			{tasks.map((task) => (
				<TaskCard
					key={`task-item-${task.id}`}
					task={task}
					onToggle={onToggle}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default TaskList;
