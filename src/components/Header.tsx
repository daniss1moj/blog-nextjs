import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
	return (
		<header className="flex items-center justify-between gap-x-2 font-bold px-10 py-5">
			<div className="flex items-center gap-x-2">
				<Link href="/">
					<Image
						width={50}
						height={50}
						className="rounded-full"
						src="https://cdn.freebiesupply.com/logos/large/2x/blogger-1-logo-png-transparent.png"
						alt="logo"
					/>
				</Link>
				<h1>Big Blog</h1>
			</div>
			<div>
				<Link
					href="/"
					className="px-5 py-3 text-sm md:text-base bg-gray-900 text-[#f7ab0a] flex items-center rounded-full text-center">
					Sign Up
				</Link>
			</div>
		</header>
	);
};

export default Header;
