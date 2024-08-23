import { useState } from 'react'
import '../App.css'
import { useAppSelector } from '../app/hooks';
import FilterIcon from '../icons/FilterIcon.svg?react';
import { useGetPostsQuery } from '../api/posts';
import { PostComponent } from '../components/PostComponent';

export default function AllPostsPage() {
  const { isLoading, error } = useGetPostsQuery(20)

  const [filter, setFilter] = useState(true)

  const posts = useAppSelector((state) => state.posts.value);

  const postsMapping = posts.filter(x => filter || x.liked).map((x, i) => {
    return <PostComponent i={i} title={x.title} text={x.text} liked={x.liked} />
  })

  const noPosts = (
    <div className='card'>No posts</div>
  )

  return (
    <>
      <h1>Posts sample</h1>
      <button onClick={(e) => {
          e.preventDefault()
          setFilter(!filter)
        }} className='actions__button' style={{
          backgroundColor: "gray"
        }}><FilterIcon /></button>
        <div style={{
            width: '100%'
        }}>
            {error ? (
                <h3>Loading error</h3>
            ) : isLoading ? (
                <h3>Loading</h3>
            ) : postsMapping.length > 0 ?  postsMapping : noPosts}
        </div>
    </>
  )
}