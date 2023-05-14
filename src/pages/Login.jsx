import React, { useState } from "react";
import {
  BASE_URL,
  errorToast,
  sendRequest,
  successToast,
} from "../helper/utils";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { buttonDisable,buttonEnable } from "../reducer/authReducer";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(buttonDisable());


    let formData = {
      email,
      password,
    };
    const response = await sendRequest(BASE_URL + "/login", {
      payload: formData,
    });
    dispatch(buttonEnable());
    if (response.status === 200) {

      const user_data = {
        _token: response.data?.token || "",
        name: response.data?.result?.name || "",
        email: response.data?.result?.email || "",
        role :response.data?.result?.role || "",
      };
      localStorage.setItem("user_data", JSON.stringify(user_data));
      successToast(response.data?.desc);
      navigate("/home");
    } else if (response.status === 201) {
      successToast(response.data?.desc);
    }
    
    else {
      errorToast(response.data?.desc);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <div className="row d-flex justify-content-center align-item-center">
        <div className="col-6 border border-2 mt-2">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="mb-2 btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
