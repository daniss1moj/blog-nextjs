import BlogList from '../../components/BlogList';
import { groq } from 'next-sanity';
import { client } from '../../lib/sanity.client';

const query = groq`
	*[_type=='post'] {
		...,
		author->,
		categories[]->
	} | order(_createdAt desc)
`;

const Page = async () => {
	const posts = await client.fetch(query);
	return (
		<div>
			<BlogList posts={posts} />
		</div>
	);
};

export default Page;
