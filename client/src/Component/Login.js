import { validate } from "email-validator";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
export default function Login() {
  const [name, setname] = useState("");
  const [User, setuser] = useState({});
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [confpass, setcofrm] = useState("");
  const Navigate = useNavigate();
  const [err, seterr] = useState("");
  const [err2, seterr2] = useState("");
  const [Err, setErr] = useState(true);
  const [obj, setobj] = useState({});
  const Auth = localStorage.getItem("Auth");
const[token,settoken] = useState('')
const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      Navigate("/Home");
    } else {
      Navigate("/login");
    }
    const Data = JSON.parse(localStorage.getItem("User"));
    if (Data) {
      setuser(Data);
    } else {
      localStorage.clear("jwt");
      setuser({ Err: "User not Found" });
    }
    console.log(Data);
  }, []);

  async function Fetchdata() {
    const getdata = await fetch('http://localhost:5500/api/auth/login',{
        method:'Post',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:email,password:password})
    })
        const res = await getdata.json()
        console.log(res)
        localStorage.setItem('jwt',res.token)
        settoken(res.token)
   console.log(token)
        if(res.Data){
            seterr2('Credentials Does Not Match')
            toast.error('Enter Valid Credentials!', {
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
    if(res.token){
        toast.success('LogIn Successfully!!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

            //        localStorage.setItem('token',res.auth)
       
    }if(res.token){
      localStorage.setItem('jwt',res.token)
      setTimeout(() => {
        Navigate('/Home')
      }, 3000);
    
    }
    // if(res.user){

  }


  return (
    <div>
      <section
        className="bg-gray-50 w-full h-auto dark:bg-gray-900 overflow-auto"
        style={{
          backgroundImage:
            "url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/7099fc28008799.56e41b31e770e.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex  flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9_nqk71JQGGFi9n_TaRLAntk8yRBEs0dF_A&usqp=CAU"
              alt="logo"
            />
            Omninos Solution
          </a>
          <ToastContainer />
          <div className="w-full shadow-xl shadow-black bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                LogIn To Omninos
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    type="email"
                    name="email"
                    id="email"
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
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={password}
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

                <h1
                  onClick={async () => {
                    // if( email===''){
                    //     seterr2('Password Is Required')
                    //     setErr(false)
                    //     setobj({email:false,password:false})

                    // }else{
                    //     seterr2('')
                    //     setobj({email:true,password:true})
                    // }

                    // if(email===''){
                    //     setobj({email:true,password:false})
                    // }else{
                    //     setobj({email:true,password:false})
                    // }

                    // if(validator.isEmail(email)){
                    //     seterr('')
                    //     setobj({email:false,password:''})
                    // }else{
                    //     seterr('Enter Valid Email Address')
                    //     setemail('')
                    //     setobj({email:true,password:false})
                    // }

           
                    if (email === "" && password === "" && !validator.isEmail(email)) {
                        setobj({ email: true, password: true });
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
    
                    if (
                      email === "" &&
                      password === "" &&
                      !validator.isEmail(email)
                    ) {
                      console.log("not valid");

                      //    setErr(false)
                    } else {
                      Fetchdata();
                    }
                  }}
                  className="w-full text-white bg-amber-500 hover:bg-primary-700 focus:ring-4 focus:outline-none cursor-pointer focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-amber-600 cursor-pointer"
                >
                  Log In
                </h1>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have Acccount ?{" "}
                  <Link to={"/"}>
                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                      Signup Here
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
