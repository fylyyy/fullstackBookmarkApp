import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';

import classes from './BookmarkItem.module.css';

function BookmarkItem({ bookmark }) {
  const submit = useSubmit();
  const token = useRouteLoaderData('root')

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.bookmark}>
      <h1>{bookmark.title}</h1>
      <p>Description: {bookmark.description}</p>
      <p>Link: <a href={bookmark.link}>{bookmark.link}</a></p>
      {token && 
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
      }

    </article>
  );
}

export default BookmarkItem;
