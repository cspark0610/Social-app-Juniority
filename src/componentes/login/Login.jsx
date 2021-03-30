import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useFirebaseApp } from "reactfire";
import { db } from "../../firebase/firebase";
import { setCurrentUser } from "../../store/currentUser";

import juniority from "../assets/juniority.svg";

const Login = () => {
  const firebase = useFirebaseApp();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const [formData, setFormData] = useState({ email: "", password1: "" });
  const {  email, password1 } = formData;
  const history = useHistory();

  const handleChange = (text) => (e) => {
    //console.log(e.target.value);
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password1)
      .then((user) => {
        db.collection('user').where("id", "==", user.user.uid).get()
            .then(doc => doc.forEach(data => {
                dispatch(setCurrentUser(data.data()));
                sessionStorage.setItem('currentUser', JSON.stringify(data.data()));
                history.push('/');
            }))
      });
  };

  return (
    <>
    { currentUser ? history.push('/') : (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-6xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w1/2 xl:w5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-4xl xl:text-3xl font-black"> LOGIN</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex-1 mt-8 text-indigo-800"
          >
            <div className="mx-auto max-w-xs relative">
              <input
                type="email"
                placeholder="Email"
                onChange={handleChange("email")}
                value={email}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange("password1")}
                value={password1}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              />

              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                {" "}
                <i className="fas fa-sign-in-alt fa 1x w-6-ml-2" />{" "}
                <span className="ml-3">LOG IN </span>{" "}
              </button>
              <a href="/password-recovery">Forgot Password?</a>
            </div>
            <div className="my-12 border-b text-center">
              <div className="flex-1 leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or sign with social login <i className="fab fa-google w-10" />{" "}
                <i className="fab fa-facebook w-10-ml-2" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Link
                to="/register"
                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
              >
                <i className="fas fa-user-plus fa 1x w-6-ml-2 text-indigo-500" />
                <span className="ml-4">Are you new? Register</span>
              </Link>
            </div>
          </form>
        </div>
        <div
          className="flex-1 bg-indigo-100 text-center hidden lg:flex"
          style={{
            backgroundImage: `url(${juniority})`,
            minHeight: "500px",
            objectFit: "cover",
          }}
        >
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <h1 className="text-2xl xl:text-3xl font-black"> JUNIORITY</h1>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default Login;
