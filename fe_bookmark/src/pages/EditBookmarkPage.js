import { useRouteLoaderData } from "react-router-dom";

import BookmarkForm from "../components/BookmarkForm";

function EditBookmarkPage() {
  const data = useRouteLoaderData("bookmark-detail");

  return <BookmarkForm method="patch" bookmark={data.bookmark} />;
}

export default EditBookmarkPage;
