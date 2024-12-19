import Image from "next/image";
import { useRouter } from "next/navigation";
import { CreateTask } from "@/types/task";
import { useForm, SubmitHandler } from "react-hook-form";

type CreateTaskProps = {
	handleTaskPost?: (task: CreateTask) => void;
	handleTaskUpdate?: (taskId: number, task: CreateTask) => void;
	taskId?: number;
	taskTitle?: string;
	taskColor?: string;
};

type FormValues = {
	title: string;
	color: string;
};

const TaskForm: React.FC<CreateTaskProps> = ({
	taskId,
	handleTaskPost,
	handleTaskUpdate,
	taskTitle,
	taskColor,
}) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm<FormValues>({
		defaultValues: {
			title: taskTitle || "",
			color: taskColor || "",
		},
	});
	const colors = [
		"red",
		"orange",
		"yellow",
		"green",
		"blue",
		"purple",
		"violet",
		"pink",
		"brown",
	];

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		if (taskId !== undefined && handleTaskUpdate) {
			handleTaskUpdate(taskId, data);
		} else if (handleTaskPost) {
			handleTaskPost(data);
		}
		router.push("/");
	};

	const handleBack = () => {
		router.push("/");
	};

	return (
		<div className='flex flex-col w-1/2 items-start justify-center gap-4 px-4 sm:px-6 lg:px-8'>
			<button onClick={handleBack} className='text-blue-500 mb-4'>
				<Image
					src={"/assets/arrow-left.png"}
					alt='Back Arrow'
					width={20}
					height={20}
				/>
			</button>
			<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
				<label htmlFor='title' className='text-textColor'>
					Title
				</label>
				<input
					type='text'
					placeholder='Ex. Brush your teeth'
					id='title'
					{...register("title", { required: "Title is required" })}
					className='w-full rounded px-2 py-3 bg-taskCard mt-4 mb-8'
				/>
				{errors.title && (
					<span className='text-red-500'>{errors.title.message}</span>
				)}
				<label htmlFor='color' className='text-textColor'>
					Color
				</label>
				<div id='color' className='flex gap-2 mt-4'>
					{colors.map((clr) => (
						<button
							key={clr}
							type='button'
							className={`w-6 h-6 rounded-full cursor-pointer ${
								watch("color") === clr ? "ring-2 ring-blue-500" : ""
							}`}
							style={{ backgroundColor: clr }}
							onClick={() => {
								setValue("color", clr);
							}}
							aria-label={`Select ${clr} color`}></button>
					))}
				</div>
				{errors.color && (
					<span className='text-red-500'>{errors.color.message}</span>
				)}
				<button
					type='submit'
					className={`mt-8 px-6 py-2 rounded-md flex justify-center items-center gap-[8px] w-full max-w-[736px] h-[52px] bg-createTaskButtonColor text-white`}>
					{taskId !== undefined ? `Save` : `Add Task`}
					<Image
						src={taskId !== undefined ? "/assets/tick.png" : "/assets/plus.png"}
						alt='Plus Icon'
						width={16}
						height={16}
						className='w-4 h-4'
					/>
				</button>
			</form>
		</div>
	);
};

export default TaskForm;
