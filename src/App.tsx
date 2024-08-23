import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import AllPostsPage from "./pages/AllPostsPage"
import { PostPage } from "./pages/PostPage"
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { useGetPostsQuery } from "./api/posts";
import { enqueueSnackbar } from "notistack";
import { initData, PostState } from "./reducers/posts/postsReducer";

function App() {

  const { data, isLoading } = useGetPostsQuery(20)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function run () {

      if (isLoading || !data)
        return

      try {
        const newPosts: PostState[] = data.data.map((x, i) => ({
          title: `Post ${i}`,
          text: x,
          liked: false
        }))

        dispatch(initData(newPosts))
      } catch (ex: unknown) {
        if (ex instanceof Error) {
          console.error(ex)
          enqueueSnackbar(ex.message, {
            variant: "error",
            anchorOrigin: {
              horizontal: 'right',
              vertical: 'top'
            }
          })
        }
      }
    }

    run()
  }, [data, isLoading, dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPostsPage />}></Route>
        <Route path="/posts/:postIndex" element={<PostPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
