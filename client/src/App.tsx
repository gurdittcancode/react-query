import { useState } from 'react';
import PostsList1 from './PostsList1';
import PostsList2 from './PostsList2';
import Post from './Post';
import CreatePost from './CreatePost';
import PostListPaginated from './PostListPaginated';
import PostListInfinite from './PostListInfinite';
import { useQueryClient } from '@tanstack/react-query';
import { getPost } from './api/posts';

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  const queryClient = useQueryClient();

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ['posts', 1],
      queryFn: () => getPost(1),
    });
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}>
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }>
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      <br />

      {currentPage}
    </div>
  );
}
