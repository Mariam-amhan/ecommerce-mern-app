import React, { useState, useEffect, useRef, useContext } from "react";
import Logo from "../assets/logo.png";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const [DisplayMenu, setDisplayMenu] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const menuRef = useRef(null); // Dropdown menüye referans

  const context = useContext(Context);
  const navigrate = useNavigate();
  const searchInput = useLocation();
  const UrlSearch = new URLSearchParams(searchInput?.search);

  const searchQuery = UrlSearch.getAll("q");

  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.userLogout.url, {
      method: SummaryApi.userLogout.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigrate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  // Menünün dışına tıklayınca kapanmasını sağlamak için useEffect ile bir olay dinleyici ekliyoruz
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false); // Menünün dışında bir yere tıklandıysa menüyü kapat
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: Bileşen unmount olduğunda dinleyiciyi kaldır
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigrate(`/search?q=${value}`);
    } else {
      navigrate("/search");
    }
  };

  return (
    <div>
      <header className=" h-16 shadow-md bg-white fixed w-full z-40 ">
        <div className=" h-full container mx-auto flex items-center px-4 justify-between ">
          <div className=" w-[50px] ">
            <Link to={"/"}>
              <img src={Logo} alt="logo" className=" rounded-lg" />
            </Link>
          </div>

          <div className=" hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-3">
            <input
              type="text"
              placeholder="search product here..."
              className=" w-full outline-none pl-2"
              onChange={handleSearch}
              value={search}
            />
            <div className=" text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
              <GrSearch />
            </div>
          </div>

          <div className=" flex items-center gap-5 px-4">
            {/** user icon start*/}
            <div className=" relative flex justify-center">
              {user && (
                <div
                  onClick={() => setDisplayMenu((preve) => !preve)}
                  className=" text-3xl cursor-pointer flex justify-center relative"
                >
                  <FaRegCircleUser />
                </div>
              )}
              {user?._id && DisplayMenu && (
                <div className="absolute h-fit bg-white p-2 bottom-0 top-11 shadow-lg rounded z-10">
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={"/admin-panel/all-products"}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                        onClick={() => setDisplayMenu((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    {user && (
                      <Link
                        to={"/user-profile"}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 mb-1"
                      >
                        Profile
                      </Link>
                    )}

                    {user && (
                      <Link
                        to={"/my-order"}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 mb-1"
                      >
                        My Orders
                      </Link>
                    )}

                    {user?._id && (
                      <button
                        onClick={handleLogout}
                        className="  px-3 rounded-lg text-red-600 border-2 border-red-600 hover:bg-red-700 hover:text-white transition-all"
                      >
                        Log Out
                      </button>
                    )}
                  </nav>
                </div>
              )}
            </div>

            {/** user icon end*/}

            {/** shoppingCart section start*/}
            {user?._id && (
              <Link to={"/cart"} className=" text-2xl relative cursor-pointer ">
                <span>
                  <FaShoppingCart />
                </span>
                <div className=" bg-red-600 text-white w-5 h-5 rounded-full  flex items-center justify-center absolute -top-2 -right-3 ">
                  <p className=" text-sm">{context?.cartProductCount}</p>
                </div>
              </Link>
            )}
            {/** shoppingCart section end*/}

            {/** Login & Logout buttons section start*/}

            <div>
              {user?._id ? (
                <Link
                  to={"/login"}
                  className=" p-1 px-3 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all hidden"
                >
                  Login
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className=" p-1 px-3 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all "
                >
                  Login
                </Link>
              )}
            </div>

            {/** Login & Logout buttons section end*/}

            {/** user functions end*/}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
