import { useState } from 'react';
import PostsList1 from './PostsList1';
import PostsList2 from './PostsList2';
import Post from './Post';
import CreatePost from './CreatePost';

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }>
        New Post
      </button>
      <br />

      {currentPage}
    </div>
  );
}
