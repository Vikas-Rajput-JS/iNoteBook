import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
// import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import Icon from './svg.png'
import bg from './magicpattern-wave-generator-1693797929094.jpeg'

export default function Home() {
  const Navigate = useNavigate()
  const [logged, setlogged] = useState("Log   Out ");
  const [name, setname] = useState("");
  const [styl, setstyl] = useState("none");
  const [styl2, setstyl2] = useState("none");
  const [styl3, setstyl3] = useState("");
  // const[name,setname]=useState('')
  const [title, settitle] = useState("");
  const [tags, settags] = useState("");
  const [desc, setdesc] = useState("");
  const [author, setauthor] = useState("Omninos ");
  const [err, seterr] = useState("");
  const [err2, seterr2] = useState("");
  const [err3, seterr3] = useState("");
  const [err4, seterr4] = useState("");
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const [img, setimg] = useState("");
  const [text, settext] = useState("");
  const [post, setpost] = useState("");
  const [cont, setcont] = useState("");
  const [disp, setdisp] = useState("none");
  const[token,settoken] = useState('')
  const [show, setmore] = useState(false);
  const[Error,setError] = useState('')
  const jwt = localStorage.getItem('jwt')
  const[edit,setedit]=useState('')
  const getdata = async () => {
    const getdata = await fetch("http://localhost:5500/api/auth/getuser",{
      method:'Post',
      headers:{"Content-Type":"application/json","auth-token":jwt}
    });
    const res = await getdata.json();
      // console.log(res)
      if(res.name){
        setauthor(res.name)
        localStorage.setItem('auth',true)
        setlogged('Log Out')
      }else{
        setauthor('iNoteBook')
        setlogged('Log In')
        // seterr('sdfjsdkjh')
      }
  
    
  };

  const FetchNotes = async()=>{
    const getnote = await fetch('http://localhost:5500/api/notes/fetchnotes',{
      method:"get",
      headers:{"Content-Type":"application/json","auth-token":jwt}
    })
    const res = await getnote.json();
    if(jwt){
      setdata(res)

    }
    // console.log(res)

  }
  useEffect(() => {
  
    if (jwt) {
      Navigate("/Home");
    } else {
      Navigate("/login");
    }
  
    getdata()
    FetchNotes()
   
   
    if (jwt === undefined) {
      setlogged("Log in");
    setpost('none')
    setcont('none')
    setimg('"https://i.pinimg.com/originals/de/d0/bb/ded0bbdd8485e424327257405a86a884.gif')
    settext('Please Log In ')

    }
    
   
    //   console.log(data)
  }, [data]);

  async function Fetchdata() {
    const getdata = await fetch("http://localhost:5500/api/notes/addnote", {
      method: "Post",
      headers: { "Content-Type": "application/json","auth-token":jwt },
      body: JSON.stringify({
        title: title,
        tags: tags,
        description: desc,
      }),
    });
    const res = await getdata.json();

    if (res.Data) {
      seterr2("Credentials Does Not Match");
      toast.error("Enter Valid Credentials!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (res.name) {
      localStorage.setItem("name", res.name);
      toast.success("Post Created Successfully!!!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        setstyl("none");
      }, 100);
    }
  }
  async function updateData() {
    const noteid = localStorage.getItem('id')
    toast.success("Post Updated Successfully!!!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const getdata = await fetch(`http://localhost:5500/api/notes/updatenote/${noteid}`, {
      method: "Put",
      headers: { "Content-Type": "application/json","auth-token":jwt },
      body: JSON.stringify({
        tags: tags,
        description: desc,
        title: title,
      }),
    });
    const res = await getdata.json();

    setTimeout(() => {
      setstyl("none");
    }, 100);
  }

  const auth = localStorage.getItem("Auth");
  useEffect(() => {
    if (jwt === null) {
      setlogged("Log in");
    setpost('none')
    setcont('none')
    setimg("https://i.pinimg.com/originals/de/d0/bb/ded0bbdd8485e424327257405a86a884.gif")
    settext('Please Log In ')
    setauthor('iNoteBook ')
    setdisp('flex')
    setError('Please Log In To Access Notes')
    // Navigate('/login')

    }
    if (data.length < 1 && jwt) {
      setimg(
        "https://i.pinimg.com/originals/de/d0/bb/ded0bbdd8485e424327257405a86a884.gif"
      );
      settext("No Post Not to Display");
    } else {
      settext("");
      setimg("");
    
    }
    // if(!localStorage.getItem('Auth')){
    //   Navigate('/login') 
    // }else{
    //   Navigate('/Home')
    // }
  }, [data]);
   




  return (
    <>
      <div className="w-full h-full overflow-auto " style={{backgroundImage:`url(${bg})`}}>
        <header>
          <ToastContainer />
          <div
            className=" w-[95%] md:w-[35%] h-[80vh]  absolute top-[11vh] z-10 rounded-lg  shadow-black md:left-[33%] bg-transparent "
            style={{ display: `${styl}` }}
          >
            
            <section
              class="bg-gray-50  flex justify-center items-center w-full h-[80vh] bg-transparent "
             
            >
              <div class="flex w-full  flex-col items-center justify-center px-6 py-8 mx-auto md:h-[50vh] lg:py-0">
                <a class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  Create A Note
                </a>

                <div class="w-full shadow-xl shadow-black bg-white rounded-lg shadow dark:border md:mt-0  w-full xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Share Your Thoughts
                    </h1>
                    <form class="space-y-4 md:space-y-6 " action="#">
                      <div className="flex flex-col justify-start items-start">
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Author
                        </label>
                        <input
                          value={author}
                          onChange={(e) => {
                            setname(e.target.value);
                          }}
                          type="text"
                          name="email"
                          id="email"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Author Name"
                          required=""
                        />
                        <span className=" text-xs text-red-700">{err}</span>
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Title
                        </label>
                        <input
                          value={title}
                          onChange={(e) => {
                            settitle(e.target.value);
                          }}
                          type="text"
                          name="email"
                          id="email"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Title"
                          required=""
                        />
                        <span className=" text-xs text-red-700">{err2}</span>
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <label
                          for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Enter Tags
                        </label>
                        <input value={tags}
                          onChange={(e) => {
                            settags(e.target.value);
                          }}
                          type="text"
                          name="password"
                          id="password"
                          placeholder="Enter Popular Tags"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                        />
                        <span className=" text-xs text-red-700">{err3}</span>
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <label
                          for="message"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <textarea value={desc}
                          onChange={(e) => {
                            setdesc(e.target.value);
                          }}
                          id="message"
                          rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                        ></textarea>

                        <span className=" text-xs text-red-700">{err4}</span>
                      </div>

                      <h1
                        onClick={async () => {
                        
                          if (title === "") {
                            seterr2("Title Is Required");
                          } else {
                            seterr2("");
                          }
                          if (tags === "") {
                            seterr3("Tags are Required");
                          } else {
                            seterr3("");
                          }
                          if (desc === "") {
                            seterr4("Description is Required");
                          }

                          if (
                            name === "" &&
                            title === "" &&
                            tags === "" &&
                            desc === ""
                          ) {
                            console.log("not valid");
                          } else {
                            Fetchdata();
                            setstyl3("");
                            setstyl('none')
                          }
                        }}
                        class="w-full text-white bg-amber-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 cursor-pointer dark:focus:ring-primary-800 hover:bg-amber-600"
                      >
                        Create Note
                      </h1>
                    </form>
                    <button
                      onClick={() => {
                        setstyl("none");
                        setstyl3("");
                      }}
                      type="button"
                      class="text-white w-40 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <nav class="bg-sky-600 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-700 z-10 fixed w-[100%] ">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <a class="flex items-center">
                <img
                  className="w-8 h-8 mr-2 rounded-full"
                  src={Icon}
                  alt="logo"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  {author}
                </span>
              </a>
              <div class="flex items-center lg:order-2">
                <Link
                  to={"/login"}
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <a class="text-gray-800 dark:text-white hover:text-black hover:bg-white-50 focus:ring-4 focus:ring-gray-300 text-lg cursor-pointer font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 text-white hover:bg-white focus:outline-none dark:focus:ring-gray-800">
                    {logged}
                  </a>
                </Link>
                <a
                  class="text-white cursor-pointer bg-primary-700 text-white hover:bg-green-500 focus:ring-4 focus:ring-primary-300 font-medium hover:text-black rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none "
                  onClick={() => {
                    setstyl("flex");
                    setstyl3("blur(5px)");
                    console.log(styl3)
                    setname('')
                    settitle('')
                    settags('')
                    setdesc('')
                  }}
               style={{display:`${post}`}} >
                  New Post
                </a>
                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    class="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                id="mobile-menu-2"
              >
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <a
                      onClick={() => {
                        setstyl("none");
                      }}
                      class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 text-xl lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                      aria-current="page"
                    >
                      My Notes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <div className="w-auto h-auto mt-[10vh]    lg:grid grid-rows-2  grid-cols-3    " style={{filter:`${styl3}`}}>
          <img
            className="rounded-xl mt-5 absolute top-[15vh] shadow-xl left-[29%] "
            src={img}
            alt=""
          />
          <h1 className="text-2xl font-thin absolute top-[75vh] left-[45%] animate-pulse mt-10 text-black">
            {text}
          </h1>
          {data.map((item, id) => {
            return (
              <div
                className="w-[80%] pr-4 shadow-lg ml-10 sm:ml-5 shadow-black ml-5 overflow-auto h-[40vh] rounded-lg bg-white mt-5  flex flex-col justify-center items-start "
                style={{ filter:`blur(${styl3})`,display:`${cont}` }}
              >
                <h1 className="text-3xl font-semibold font-serif px-5 py-3">
                  {item.title}
                </h1>
                <h1 className="  px-1 py-1 flex  ">
                  <h1 className=" font-semibold px-2 ml-2 ">Description:</h1>
                  <h1 className=" ">
                    {show
                      ? item.description
                      : `${item.description.substring(0, 50)}`}{" "}
                    &nbsp;
                  </h1>

                  <button
                    className=" text-blue-500"
                    onClick={() => {
                      setmore(!show);
                    }}
                  >
                    {" "}
                    {show ? " " + " Show Less" : "Show More"}
                  </button>
                </h1>
                <h1 className=" font-semibold px-5 py-3">tags: {item.tags}</h1>
                <h1 className="  px-3 py-3 flex">
                  <h1 className=" font-semibold px-2">Author:</h1> {author}
                </h1>
                <div className="w-full h-[10vh] flex justify-end items-center ">
                  <FiEdit
                
                    color="green"
                    className="cursor-pointer mr-9"
                    onClick={() => {
                      setstyl2("");
                      setdata2(item);
                      setedit(item._id)
                      console.log(edit)
                      // console.log(data2);
                      setstyl3("blur(7px)");
                      localStorage.setItem('id',item._id)
                      setname(item.name)
                      setdesc(item.description)
                      settitle(item.title)
                      settags(item.tags)
                    }}
                    size={"28px"}
                  />

                  <AiTwotoneDelete
                    className="cursor-pointer mr-10"
                    color="red"
                    size={"30px"}
                  onClick={async()=>{
                    const dlete = await fetch(`http://localhost:5500/api/notes/deletenote/${item._id}`,{
                      method:'Delete',
                      headers:{"Content-Type":"application/json","auth-token":jwt}

                    })
                    const res = await dlete.json()
                    // console.log(res)
                    toast.success("Post Deleted Successfully!!!", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                  }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="w-[95%] md:w-[35%] h-[80vh]  absolute top-[11vh] z-10 rounded-lg  shadow-black md:left-[33%] bg-transparent"
          style={{ display: `${styl2}` }}
        >
          <section
            class=" rounded-xl flex justify-center items-center w-full h-[80vh] bg-transparent "
            
          >
            <div class="flex w-full  flex-col items-center justify-center px-6 py-8 mx-auto md:h-[50vh] lg:py-0">
              <a class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Edit Notes
              </a>
              <ToastContainer />
              <div class="w-full shadow-xl shadow-black bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Update Your Note
                  </h1>
                  <form class="space-y-4 md:space-y-6 " action="#">
                    <div className="flex flex-col justify-start items-start">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Author
                      </label>
                      <input
                        value={author}
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                        type="text"
                        name="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Author Name"
                        required=""
                      />
                      <span className=" text-xs text-red-700">{err}</span>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input value={title}
                        onChange={(e) => {
                          settitle(e.target.value);
                        }}
                        type="email"
                        name="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Title"
                        required=""
                      />
                      <span className=" text-xs text-red-700">{err2}</span>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Enter Tags
                      </label>
                      <input value={tags}
                        onChange={(e) => {
                          settags(e.target.value);
                        }}
                        type="text"
                        name="password"
                        id="password"
                        placeholder="Enter Popular Tags"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                      <span className=" text-xs text-red-700">{err3}</span>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                    <label
                          for="message"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <textarea value={desc}
                          onChange={(e) => {
                            setdesc(e.target.value);
                          }}
                          id="message"
                          rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                        ></textarea>
                      <span className=" text-xs text-red-700">{err4}</span>
                    </div>

                    <h1
                      onClick={async () => {
                        if (name === "") {
                          seterr("Name Is Required");
                        } else {
                          seterr("");
                        }
                        if (title === "") {
                          seterr2("Title Is Required");
                        } else {
                          seterr2("");
                        }
                        if (tags === "") {
                          seterr3("Tags are Required");
                        } else {
                          seterr3("");
                        }
                        if (desc === "") {
                          seterr4("Description is Required");
                        }

                        if (
                          name === "" ||
                          title === "" ||
                          tags === "" ||
                          desc === ""
                        ) {
                          console.log("not valid");
                        } else {
                          updateData();
                          setname("");
                        }
                      }}
                      class="w-full text-white bg-amber-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer hover:bg-amber-600"
                      onClick={async () => {
                        if (name === "") {
                          seterr("Name Is Required");
                        } else {
                          seterr("");
                        }
                        if (title === "") {
                          seterr2("Title Is Required");
                        } else {
                          seterr2("");
                        }
                        if (tags === "") {
                          seterr3("Tags are Required");
                        } else {
                          seterr3("");
                        }
                        if (desc === "") {
                          seterr4("Description is Required");
                        }

                        if (
                          name === "" ||
                          title === "" ||
                          tags === "" ||
                          desc === ""
                        ) {
                          console.log("not valid");
                        } else {
                          updateData();
                          setstyl2("none");
                          setstyl3("blur(0px)");
                        }
                      }}
                    >
                      Update Data
                    </h1>
                  </form>
                  <button
                    onClick={() => {
                      setstyl2("none");
                      setstyl3("");
                    }}
                    type="button"
                    class="text-white w-40 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      <img
            className="rounded-xl  mt-5 absolute top-[15vh] left-[29%]  shadow-xl" style={{display:`${disp}`}}
            src='https://i.pinimg.com/originals/de/d0/bb/ded0bbdd8485e424327257405a86a884.gif'
            alt=""
          />
           <h1 className="text-2xl font-thin absolute top-[75vh] left-[42%] animate-pulse mt-10 text-black">
            {Error}
          </h1>
      </div>
    </>
  );
}
