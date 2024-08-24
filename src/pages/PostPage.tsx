import { useAppSelector } from '../app/hooks';
import { PostState } from '../reducers/posts/postsReducer'
import '../App.css'

import { Link, useParams } from 'react-router-dom';
import { PostComponent } from '../components/PostComponent';

export function PostPage() {
  const { postIndex } = useParams()

  const posts = useAppSelector((state) => state.posts.value);

  const postsMapping = posts.filter((_x: PostState, i: number) => i == Number(postIndex)).map((x, i) => {
    return <PostComponent key={"post" + i} i={Number(postIndex)} title={x.title} text={x.text} liked={x.liked} />
  })

    if (postsMapping.length == 0) {
      return (
        <p>
          No post found <Link to={import.meta.env.BASE_URL}>Go to home</Link>
        </p>
      ) 
    }

    return postsMapping
}