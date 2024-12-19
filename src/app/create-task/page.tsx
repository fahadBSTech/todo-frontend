"use client";

import Header from "@/components/Header";
import TaskForm from "@/components/Task-form";
import { useTasks } from "@/hooks/use-tasks";

const Home = () => {
	const { handleTaskPost } = useTasks();
	return (
		<div className='bg-background min-h-screen text-gray-300 relative'>
			<div className='bg-black w-full h-[calc(50%+36px)] absolute left-0 z-[-1]'></div>
			<Header />
			<main className='flex flex-col items-center justify-center gap-4 mt-32 px-4 sm:px-6 lg:px-8'>
				<TaskForm handleTaskPost={handleTaskPost} />
			</main>
		</div>
	);
};

export default Home;
