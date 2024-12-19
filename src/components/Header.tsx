import Image from "next/image";
const Header = () => {
	return (
		<header className='bg-black flex flex-col items-center gap-8'>
			<h1 className='text-4xl font-bold text-blue-400 mt-16 mb-20'>
				<Image
					src='/assets/logo.png'
					alt='Todo App'
					width={226}
					height={48}
					className='opacity-100'
				/>
			</h1>
		</header>
	);
};

export default Header;
