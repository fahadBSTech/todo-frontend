"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import EmptyState from "@/components/Empty-state";
import Header from "@/components/Header";
import Info from "@/components/Info";
import { useTasks } from "@/hooks/use-tasks";
import TaskList from "@/components/Task-list";

const Home = () => {
	const {
		tasks,
		taskCount,
		completedTaskCount,
		handleTaskDelete,
		handleTaskUpdate,
	} = useTasks();
	const router = useRouter();

	return (
		<div className='bg-background min-h-screen text-gray-300'>
			<Header />
			<main className='flex flex-col items-center justify-center gap-4 px-4 sm:px-6 lg:px-8'>
				<button
					onClick={() => router.push("/create-task")}
					className='-mt-7 mb-16 bg-createTaskButtonColor text-white px-6 py-2 rounded-md flex justify-center items-center gap-[8px] w-full max-w-[736px] h-[52px]'>
					Create Task
					<Image
						src='/assets/plus.png'
						alt='Plus Icon'
						width={16}
						height={16}
						className='w-4 h-4'
					/>
				</button>
				<Info tasksCount={taskCount} completed={completedTaskCount} />
				{taskCount > 0 ? (
					<TaskList
						tasks={tasks}
						onDelete={handleTaskDelete}
						onToggle={handleTaskUpdate}
					/>
				) : (
					<EmptyState />
				)}
			</main>
		</div>
	);
};
export default Home;
