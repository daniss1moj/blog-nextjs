import { Post } from '../../typings';
import Image from 'next/image';
import urlFor from '../lib/urlFor';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import ClientSideRoute from './ClientSideRoute';

type Props = {
	posts: Post[];
};

const BlogList = ({ posts }: Props) => {
	return (
		<div>
			<div className="border-[#f7ab0a] mb-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-10 justify-items-center">
				{posts.map((post) => {
					return (
						<ClientSideRoute route={`/post/${post.slug.current}`}>
							<div
								key={post._id}
								className="group cursor-pointer flex flex-col w-full ">
								<div
									className="relative w-full h-80
                             group-hover:scale-105 transition-all duration-200 ease-out">
									<Image
										className="object-cover object-left
                            lg:object-center"
										src={urlFor(post?.mainImage).url()}
										alt={post?.author?.name}
										fill
									/>
									<div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded  text-white p-5 flex flex-col items-start gap-y-3">
										<div>
											<p className="font-bold">{post.title}</p>
											<p>
												{new Date(post._createdAt).toLocaleDateString(
													'en-US',
													{
														day: 'numeric',
														month: 'long',
														year: 'numeric',
													},
												)}
											</p>
										</div>
										<div>
											{post?.categories?.map((category) => {
												return (
													<div
														key={category._id}
														className="bg-[#f7ab0a]
                                            text-center text-black px-3 py-1 rounded-full text-sm font-semibold">
														<p>{category?.title}</p>
													</div>
												);
											})}
										</div>
										<div className="flex items-center gap-x-3">
											<p>Read post</p>
											<ArrowUpRightIcon className="w-5 h-5" />
										</div>
									</div>
								</div>
							</div>
						</ClientSideRoute>
					);
				})}
			</div>
		</div>
	);
};

export default BlogList;
