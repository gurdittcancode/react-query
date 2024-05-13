import { Dispatch, FC, FormEvent, SetStateAction, useRef } from 'react';
import { createPost } from './api/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Post from './Post';

interface CreatePostProps {
  setCurrentPage: Dispatch<SetStateAction<JSX.Element>>;
}

const CreatePost: FC<CreatePostProps> = ({ setCurrentPage }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(['posts', data.id], data);
      //   manually adding entry in cache
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: true });
      // queries that match exactly
      //   marking it as stale, usually runs for every query that starts with "posts"
      setCurrentPage(<Post id={data.id} />);
    },
  });

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current?.value as string,
      body: bodyRef.current?.value as string,
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isPending}>
          {createPostMutation.isPending ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
