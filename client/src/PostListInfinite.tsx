import { useInfiniteQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getPostsPaginated } from './api/posts';

interface PostListInfiniteProps {}

const PostListInfinite: FC<PostListInfiniteProps> = () => {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    getNextPageParam: (prevData) => prevData.nextPage,
    // returns next page
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam),
  });

  if (status === 'pending') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <h1>Post List Infinite</h1>
      {data.pages
        .flatMap((data) => data.posts)
        .map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
  );
};

export default PostListInfinite;
