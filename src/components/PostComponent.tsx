import { Link, useLocation, useNavigate } from "react-router-dom"

import LikeIcon from '../icons/LikeIcon.svg?react';
import DeleteIcon from '../icons/DeleteIcon.svg?react';
import BackIcon from '../icons/BackIcon.svg?react';

import { removePost, toggleLike } from '../reducers/posts/postsReducer';
import { useAppDispatch } from "../app/hooks";

export type PostComponentProps = {
    i: number,
    title: string,
    text: string,
    liked: boolean
}

export function PostComponent(props: PostComponentProps) {

    const location = useLocation()

    const { i, title, text, liked } = props

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    function likePost(idx: number) {
        dispatch(toggleLike(idx))
    }

    function deletePost(idx: number) {
        dispatch(removePost(idx))
    }

    return (
        <div className='card'>
            <h2>{title}</h2>
            <p className='card__content'>{text}</p>
            {location.pathname == "/" ? <Link to={`/posts/${i}`}>Go to post</Link> : ""}
            <div className='actions'>
                <button onClick={(e) => {
                    e.preventDefault()
                    navigate("/")
                }} className='actions__button' style={{
                    backgroundColor: "gray"
                }}><BackIcon /></button>
                    <button onClick={(e) => {
                    e.preventDefault()
                    likePost(i)
                }} className='actions__button' style={{
                    backgroundColor: liked ? "red" : "gray"
                }}><LikeIcon /></button>
                <button onClick={(e) => {
                    e.preventDefault()
                    deletePost(i)
                }} className='actions__button' style={{
                    backgroundColor: "gray"
                }}><DeleteIcon /></button>
            </div>
        </div>
    )
}