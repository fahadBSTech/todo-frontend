"use client";

import TaskForm from "@/components/Task-form";
import Header from "@/components/Header";
import { useTasks } from "@/hooks/use-tasks";
import { useParams } from "next/navigation";

const Home = () => {
	const { handleTaskUpdate, tasks } = useTasks();
	const { taskId } = useParams();
	const task = tasks.find((task) => task.id === Number(taskId));

	return (
		<div className='bg-background min-h-screen text-gray-300 relative'>
			<div className='bg-black w-full h-[calc(50%+36px)] absolute left-0 z-[-1]'></div>
			<Header />
			<main className='flex flex-col items-center justify-center gap-4 mt-32 px-4 sm:px-6 lg:px-8'>
				{!task ? (
					<div>Task not found</div>
				) : (
					<TaskForm
						handleTaskUpdate={handleTaskUpdate}
						taskId={task.id}
						taskTitle={task.title}
						taskColor={task.color}
					/>
				)}
			</main>
		</div>
	);
};

export default Home;
