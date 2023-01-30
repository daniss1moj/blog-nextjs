import { groq } from 'next-sanity';
import { client } from '../../../../lib/sanity.client';
import { Post } from '../../../../../typings';
import urlFor from '../../../../lib/urlFor';
import Image from 'next/image';

import PortableTextComponent from '../../../../components/PortableTextComponent';

type Props = {
	params: {
		slug: string;
	};
};

export const revalidate = 60;

export async function generateStaticParams() {
	const query = groq`
        *[_type=='post'] {
            slug
        }
    `;
	const slugs: Post[] = await client.fetch(query);
	const slugRoutes = slugs.map((slug) => slug.slug.current);
	return slugRoutes.map((slug) => {
		return {
			slug,
		};
	});
}

const Post = async ({ params: { slug } }: Props) => {
	const query = groq`
                *[_type=='post' && slug.current == $slug][0] {
                    ...,
                    author->,
                    categories[]->
                }
            `;

	const post: Post = await client.fetch(query, {
		slug,
	});

	return (
		<article className="px-10 pb-20">
			<section className="space-y-2 border border-[#f7ab0a] text-white">
				<div className="relative min-h-56 flex flex-col md:flex-row justify-between">
					<div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
						<Image
							className="object-cover
                    object-center mx-auto"
							src={urlFor(post?.mainImage).url()}
							alt={post?.author?.name}
							fill
						/>
					</div>
				</div>
				<section className="p-5 bg-[#f7a80a] w-full">
					<div className="flex flex-col md:flex-row justify-between gap-5">
						<div>
							<h1 className="text-xl md:text-4xl font-extrabold">{post.title}</h1>
							<p>
								{new Date(post._createdAt).toLocaleDateString('en-US', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>
						</div>
						<div className="flex items-center space-x-2 p-2 flex-shrink-0 w-full basis-1/5 max-w-[150px] justify-center">
							<Image
								className="rounded-full"
								src={urlFor(post.author.image).url()}
								alt={post.author.name}
								height={40}
								width={40}
							/>
							<div>
								<h3 className="text-lg font-bold">{post?.author.name}</h3>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-end mt-auto ">
						{post?.categories?.map((category) => {
							return (
								<p
									key={category._id}
									className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4">
									{category.title}
								</p>
							);
						})}
					</div>
				</section>
			</section>
			<div className="font-normal text-xl py-5">
				<PortableTextComponent body={post.body} />
			</div>
		</article>
	);
};

export default Post;
