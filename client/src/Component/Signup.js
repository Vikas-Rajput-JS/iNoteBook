import { validate } from "email-validator";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
export default function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [confpass, setcofrm] = useState("");

  const [err, seterr] = useState("");
  const [obj, setobj] = useState({name:'',email:'',password:'',confpass:''});
  const [err2, seterr2] = useState("");
  const [err3, seterr3] = useState("");
  const [err4, seterr4] = useState("");
const Navigate = useNavigate()
  const User = {name:name,email:email,password:password}
  async function Fetchdata() {
    const getdata = await fetch("http://localhost:5500/api/auth/signup", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email,password: password }),
    });
    const res = await getdata.json();
    console.log(res);
    console.log(res);
    if(res.err==='user already exists'){
      toast.warn5("User already exists !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    localStorage.setItem('jwt',res.AuthToken)
    if (res.AuthToken) {
      toast.success("Account Created Successfully !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      if(res.AuthToken){
  setTimeout(() => {
    Navigate('/login')
  }, 3000);
      }
   
    }}
  
    useEffect(()=>{
      localStorage.clear()
    },[])
  return (
    <section
      className="bg-gray-50 dark:bg-gray-900"
      style={{
        backgroundImage:
          "url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/7099fc28008799.56e41b31e770e.gif)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="flex  flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
        
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9_nqk71JQGGFi9n_TaRLAntk8yRBEs0dF_A&usqp=CAU"
            alt="logo"
          />
          Omninos Solution
        </a>
        <div className="w-full shadow-xl shadow-black bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and Account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="flex flex-col justify-start items-start">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Name"
                  required=""
                />

{obj.name ? (
                    <span className=" text-xs text-red-700">
                      Please Enter Name
                    </span>
                  ) : (
                    <span className=" text-xs text-red-700"></span>
                  )}
              </div>
              <div className="flex flex-col justify-start items-start">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Address
                </label>
                <input
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  type="email"
                  name="email"
                  id="email2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Email Address"
                  required=""
                />
                    {obj.email ? (
                    <span className=" text-xs text-red-700">
                      Please Enter Email
                    </span>
                  ) : (
                    <span className=" text-xs text-red-700"></span>
                  )}
              </div>
              <div className="flex flex-col justify-start items-start">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setpass(e.target.value);
                  }}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                             {obj.password ? (
                    <span className=" text-xs text-red-700">
                      Please Enter Password
                    </span>
                  ) : (
                    <span className=" text-xs text-red-700"></span>
                  )}
              </div>
              <div className="flex flex-col justify-start items-start">
                <label
                  for="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  onChange={(e) => {
                    setcofrm(e.target.value);
                  }}
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                             {obj.confpass ? (
                    <span className=" text-xs text-red-700">
                      Password Should Be Match
                    </span>
                  ) : (
                    <span className=" text-xs text-red-700"></span>
                  )}
              </div>

              <h1
                onClick={async () => {


                  if (email === "" && password === "" && !validator.isEmail(email) && name==='' ) {
                    setobj({ email: true, password: true,confpass:true, name:true });
                  }

                  if(email!=='' && name!=='' && password!=='' && confpass==='' && validator.isEmail(email) ){
                    setobj({ email: true, password: true,confpass:true, name:false });  
                  }

                  if (!validator.isEmail(email) && password !== "") {
                    setobj({ email: true, password: false });
                  } else if (password === "" && email !== "") {
                    setobj({ email: false, password: true });
                  } else if (email !== "" && password !== "") {
                    setobj({ email: false, password: false });
                  } else if (!validator.isEmail(email) && password !== "" ) {
                    setobj({ email: true, password: false });
                  }
                



                  // if (name === "") {
                  //   seterr("Name Is Required");
                  // } else seterr("");
                  // if (email === "") {
                  //   seterr2("Email Is Required");
                  // } else {
                  //   seterr2("");
                  // }
                  // if (password === "") {
                  //   seterr3("Password Is Required");
                  // } else {
                  //   seterr3("");
                  // }
                  // if (confpass === "") {
                  //   seterr4("Enter Your Password");
                  // }
                  // if (validator.isEmail(email)) {
                  //   seterr2("");
                  // } else {
                  //   seterr2("Enter Valid Email Address");
                  // }

                  // if (password !== confpass) {
                  //   seterr4("Password Should Be Match");
                  // } else {
                  //   seterr4("");
                  // }
                  if (
                    name === "" ||
                    email === "" ||
                    password === "" ||
                    confpass === "" ||
                    password !== confpass ||
                    !validator.isEmail(email)
                  ) {
                    console.log("err");
                    toast.warning('Please Enter Valid Credentials')
                  } else if(name !== "" ||
                  email !== "" ||
                  password !== "" ||
                  confpass !== "" ||
                  password !== confpass ||
                  validator.isEmail(email)){
    Fetchdata()
                    
                    console.log(User)
               
                  } 
                  }}
                  className="w-full text-white bg-amber-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-amber-600 cursor-pointer"
              >
                Create an account
              </h1>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                    Login here
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
