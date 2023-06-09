import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BASE_URL,
  errorToast,
  sendRequest,
  successToast,
} from "../helper/utils";
import { useSelector, useDispatch } from "react-redux";
import { buttonDisable, buttonEnable } from "../reducer/authReducer";

export default function Home() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectPost, setSelectedPost] = useState("");
  const dispatch = useDispatch();
  const storedUser = JSON.parse(localStorage.getItem("user_data"));

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = { title, description };
    if (selectPost?._id) {
      dispatch(buttonDisable());
      const response = await sendRequest(
        `${BASE_URL}/post/update/${selectPost._id}`,
        {
          method: "post",
          payload: formData,
        }
      );

      if (response.status === 200) {
        dispatch(buttonEnable());
        successToast(response.data?.desc);
        getAllPOSt();
      } else {
        errorToast(response.data?.desc);
      }
    } else {
      dispatch(buttonDisable());

      const response = await sendRequest(BASE_URL + "/post/create", {
        payload: formData,
      });
      dispatch(buttonEnable());

      if (response.status === 200) {
        successToast(response.data?.desc);
        getAllPOSt();
      } else {
        errorToast(response.data?.desc);
      }
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await sendRequest(`${BASE_URL}/post/delete/${postId}`, {
        method: "post",
      });
      if (response.status === 200) {
        getAllPOSt();
        successToast("Post deleted successfully");
      } else {
        errorToast("Unable to delete post");
      }
    } catch (error) {
      console.error(error);
      errorToast("Unable to delete post");
    }
  };

  const handleEdit = async (postId) => {
    const post = posts.find((p) => p._id === postId);
    if (post) {
      setSelectedPost(post);
      setTitle(post.title);
      setDescription(post.description);
    }
  };

  const getAllPOSt = async () => {
    const response = await sendRequest(BASE_URL + `/posts`, {
      method: "get",
    });

    if (response.status == 200) {
      setPosts(response.data);
    } else {
      errorToast("Backend Server Error");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getAllPOSt();
  }, []);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-item-center">
        <div className="col-6  mt-2">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between">
                <div> Add Post</div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={logout}
                >
                  {" "}
                  Logout
                </button>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </form>
            </div>
          </div>

          {posts.length > 0 &&
            posts.map((post) => {
              console.log(storedUser.id, "AAAAA.................");
              console.log(post.userID?._id, "AAAwwwwwwAA.................");
              return (
                <div className="card  mt-1 bg-primary">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <span className="badge bg-primary text-capitalize">
                          {post.userID?.name}
                        </span>
                      </div>
                      <h1 className="text-capitalize">{post.title}</h1>
                      <p>{post.description}</p>
                      <div className="d-flex justify-content-between">
                        {(post.userID?.role === "admin" ||
                          post.userID?._id.toString() ===
                            storedUser.id?.toString()) && 
                            <>
                              <span
                                className="badge bg-warning"
                                type="button"
                                onClick={() => handleEdit(post._id)}
                              >
                                Edit Post
                              </span>
                              <span
                                className="badge bg-danger"
                                type="button"
                                onClick={() => handleDelete(post._id)}
                              >
                                Delete Post
                              </span>
                            </>
                          }

                        <span className="badge bg-success ">Add Comment</span>
                      </div>
                    </li>
                    <li className="list-group-item">Comment 1</li>
                    <li className="list-group-item">Comment 2</li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
