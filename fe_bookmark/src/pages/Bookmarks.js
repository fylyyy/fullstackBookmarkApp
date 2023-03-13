import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import BookmarksList from '../components/BookmarksList';
import { getAccessToken } from '../utils/auth';
import { axiosInstance } from '../utils/axios';
import AsyncError from './AsyncError';

function BookmarksPage() {
  const { bookmarks } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={bookmarks} errorElement={
            <AsyncError />
          }>
        {(loadedBookmarks) =>
        <BookmarksList bookmarks={loadedBookmarks} />
        }
      </Await>
    </Suspense>
  );
}

export default BookmarksPage;

async function loadBookmarks() {
  const access_token = getAccessToken()
  const response = await axiosInstance.get('http://localhost:3333/bookmarks',{
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  });

  if (!response) {
    throw json(
      { message: "Could not fetch bookmarks." },
      {
        status: 500,
      }
    );
  }
  
  return response.data;
}

export function loader() {
  return defer({
    bookmarks: loadBookmarks(),
  });
}