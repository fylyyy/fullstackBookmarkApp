import { Link } from 'react-router-dom';

import classes from './BookmarksList.module.css';

function BookmarksList({bookmarks}) {
  return (
    <div className={classes.bookmarks}>
      <h1>All bookmarks</h1>
      <ul className={classes.list}>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id} className={classes.item}>
            <Link to={`/bookmarks/${bookmark.id}`}>
              <div className={classes.content}>
                <h2>{bookmark.title}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookmarksList;
