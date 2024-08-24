import { Link, useLocation, useNavigate } from "react-router-dom"

import LikeIcon from '../icons/LikeIcon.svg?react';
import DeleteIcon from '../icons/DeleteIcon.svg?react';
import BackIcon from '../icons/BackIcon.svg?react';

import { removePost, toggleLike } from '../reducers/posts/postsReducer';
import { useAppDispatch } from "../app/hooks";
import { useRef } from "react";

export type PostComponentProps = {
    i: number,
    title: string,
    text: string,
    liked: boolean
}

export function PostComponent(props: PostComponentProps) {

    const cardRef = useRef(null)
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
        <div ref={cardRef} className='card' onClick={(e) => {
            if (e.target == cardRef.current)
                navigate(`${import.meta.env.BASE_URL}posts/${i}`)
        }}>
            <h2>{title}</h2>
            <p className='card__content'>{text}</p>
            {location.pathname == import.meta.env.BASE_URL ? <Link to={`${import.meta.env.BASE_URL}posts/${i}`}>Go to post</Link> : ""}
            <div className='actions'>

                {location.pathname == import.meta.env.BASE_URL ? "" : 
                <button onClick={(e) => {
                    e.preventDefault()
                    navigate(import.meta.env.BASE_URL)
                }} className='actions__button' style={{
                    backgroundColor: "gray"
                }}><BackIcon /></button>}

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