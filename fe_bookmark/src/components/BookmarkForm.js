import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json,
    redirect
  } from 'react-router-dom';
  import { getAccessToken } from '../utils/auth';
import { axiosInstance } from '../utils/axios';
  
  import classes from './BookmarkForm.module.css';
  
  function BookmarkForm({ method, bookmark }) {
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();
  
    const isSubmitting = navigation.state === 'submitting';
  
    function cancelHandler() {
      navigate('..');
    }
  
    return (
      <Form method={method} className={classes.form}>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={bookmark ? bookmark.title : ''}
          />
        </p>
        <p>
          <label htmlFor="link">Link</label>
          <input
            id="link"
            type="link"
            name="link"
            required
            defaultValue={bookmark ? bookmark.link : ''}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={bookmark ? bookmark.description : ''}
          />
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    );
  }
  
  export default BookmarkForm;
  
  export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
    const access_token = getAccessToken();
  
    const bookmarkData = {
      title: data.get('title'),
      link: data.get('link'),
      description: data.get('description'),
    };
  
    let url = 'http://localhost:3333/bookmarks';
  
    if (method === 'PATCH') {
      const bookmarkId = params.bookmarkId;
      url = 'http://localhost:3333/bookmarks/' + bookmarkId;
    }

    console.log(bookmarkData)
    console.log(method)
  
    const response = await axiosInstance(url, {
      method: request.method,
      headers: {
        Authorization: "Bearer " + access_token,
      },
      body: bookmarkData,
    });
  
    if (response.status === 422) {
      return response;
    }
  
    if (!response) {
      throw json({ message: 'Could not save bookmark.' }, { status: 500 });
    }
  
    return redirect('/bookmarks');
  }
  
  