import React, { useState } from "react";
import { BASE_URL, errorToast, sendRequest, successToast } from '../helper/utils';
import { useNavigate } from "react-router-dom";

import { useSelector,useDispatch } from "react-redux";
import { buttonDisable,buttonEnable } from "../reducer/authReducer";



export default function SignUp() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch()



  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role :"admin"


  });

  const handleSubmit =  async(event) => {
    event.preventDefault();
 


    dispatch(buttonDisable());


    const response = await sendRequest(BASE_URL + '/signup', { payload: formData });
    // Add your logic for form submission here
    
    dispatch(buttonEnable());

    if(response.status === 200){
     const user_data = {
        _token: response.data?.token || '',
        name: response.data?.newUser?.name || '',
        email: response.data?.newUser?.email || ''
    };
    localStorage.setItem('user_data', JSON.stringify(user_data));
    successToast(response.data?.desc)
      navigate("/")
    }else if (response.status === 201) {
      successToast(response.data?.desc)
      navigate("/")
    }
    else{
      errorToast(response.data?.desc);
    }
    };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <div className="row d-flex  justify-content-center align-item-center   ">
        <div className="col-6 border border-2 mt-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 ">
              <label htmlFor="name" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 ">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required

              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required

              />
            </div>

            <button type="submit" className=" mb-2 btn btn-primary"  disabled={authState.loading}>
              Submit
            </button>
            <button type="button" className=" mx-1  mb-2 btn btn-primary"   onClick={()=> navigate("/")}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
