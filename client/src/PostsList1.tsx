import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPosts } from './api/posts';

import { FC } from 'react';

interface PostsList1Props {}

const PostsList1: FC<PostsList1Props> = () => {
  const postsQuery: UseQueryResult<{ id: number; title: string }[]> = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    // refetchInterval: 1000, //ms
    initialData: [{ id: 1, title: 'Initial Data' }],
    // it's going to persist, use placeholderData instead
  });

  // const queries = useQueries({queries: postsQuery.data.map(post => {
  //   return {
  //  queryKey: ["posts", post.id], queryFn: (post.id) => getPost(post.id)
  // }
  // to run multiple queries
  // })})
  // console.log(queries.map(q => q.data))

  if (postsQuery.status === 'pending') return <h1>Loading...</h1>;
  if (postsQuery.status === 'error') {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostsList1;
