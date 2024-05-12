import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
];

function App() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      {postsQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}

      <button
        disabled={newPostMutation.isPending}
        onClick={() => newPostMutation.mutate('New Post')}>
        Add Post
      </button>
    </div>
  );
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
