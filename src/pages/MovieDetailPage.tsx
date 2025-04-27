import React from 'react'
import { useParams, Link } from 'react-router-dom'

const MovieDetailPage = () => {
  const { slugId } = useParams<{ slugId: string }>();
  const id = slugId?.split("-").pop();
  console.log(id);
  return (
    <div>
      MovieDetailPage
    <p>Movie id:{id}</p>
    <Link to="/">Back to Home</Link>
      </div>
  )
}

export default MovieDetailPage