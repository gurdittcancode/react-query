import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getPosts } from './api/posts';

import { FC } from 'react';

interface PostsList2Props {}

const PostsList2: FC<PostsList2Props> = () => {
  const postsQuery: UseQueryResult<{ id: number; title: string }[]> = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (postsQuery.status === 'pending') return <h1>Loading...</h1>;
  if (postsQuery.status === 'error') {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Post List 2</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostsList2;
