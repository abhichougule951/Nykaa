/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { FaSignOutAlt, FaUserEdit, FaHistory } from "react-icons/fa";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon as XMarkIcon,
  UserIcon,
} from "@heroicons/react/solid";

import Card from "../home/Home";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const username = sessionStorage.getItem("username");

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const handleSearch = () => {
    onSearch(searchTerm);

    setSearchOpen(false);
  };

  const renderCart = () => {
    return <div className="fixed inset-0 z-50 overflow-hidden"></div>;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");

    setShowLogout(false);

    sessionStorage.removeItem("cartId");
  };
  const headerStyle = {
    backgroundImage:
      'url("https://img.freepik.com/free-vector/v915_53876-174944.jpg?w=1060&t=st=1704822974~exp=1704823574~hmac=c0d935186d3ae84e883373aae92a4f07876cf8598c0890cf1ae42f602d788fe5")',
    backgroundSize: "cover",
    backgroundPosition: "cover",
    height: "140px",
  };

  return (
    <div style={{ backgroundColor: "rgb(243, 243, 243)" }}>
      <header className="relative" style={headerStyle}>
        <p
          className={`flex items-center text-white 
            bg-gradient-to-r from-gray-700 via-gray-400 to-gray-600 
            p-1 mt-1 mr-2 cursor-pointer hover:bg-gray-700 hover:shadow-md transition-colors`}
        >
          Nykaa
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <Link to={"/"}>
                    <img
                      className="h-10 w-auto"
                      src="https://cdn.iconscout.com/icon/free/png-512/free-nykaa-3384872-2822953.png?f=webp&w=512"
                      alt=""
                    />
                  </Link>
                </a>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">
                      India
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className="bg-white">
                  {/* ... */}

                  <header className="relative bg-white">
                    {/* Search */}
                    <div className="flex lg:ml-6 items-center">
                      {/* Display the first letter of the username */}

                      <div className="relative">
                        {username ? (
                          <div className="relative group">
                            <div
                              className={`flex items-center text-white  bg-gradient-to-r from-gray-700 via-gray-400 to-gray-600 p-1 mt-1 mr-2 cursor-pointer hover:bg-gray-700 hover:shadow-md transition-colors`}
                              onClick={() => setShowLogout(!showLogout)}
                            >
                              <div className="flex items-center">
                                {/* Welcome message */}
                                <span className="text-xs font-medium mr-2">
                                  Welcome {username}
                                </span>
                                {/* User logo */}
                                <img
                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///8AAAD+/v4EBAT7+/v4+PgICAjm5ub19fW0tLQ3NzeqqqqXl5cvLy/g4OC3t7eioqLs7OyMjIwRERGbm5vj4+NdXV3X19dKSkq1tbXDw8Onp6fIyMhSUlIaGhrV1dVpaWl6eno6OjptbW1BQUEkJCSFhYWPj48iIiIWFhZhYWF9fX1zc3NPT0+yHw76AAATl0lEQVR4nO1dC3uiOhMOMSgqonhf77Wtrd3u//97X2YSkoAoCSB6vsc5p7vtVsi8TDKZWwZCLIkC6e/yfsz8InOZ04+ZXzRCL4QvhG4/vhC+6EUvetGzUj36K0+1ulMNcK7xVs9dXghfCF8In4Q4n5QyKr8hjGr0hDKS/EnFr/+LJPgnjCHOLAbAR+F3VKD/LxKKSSELosVmtRoCrVabRRSIf6ZCxuxhXFYhxBZ0ok3/bX4cfJ4nnqbJ+XNwnL+tN1EnVp/9D9JiNN4OvNs0mI9Hi0czakuMEywt+L6zmhZhS+GcrjpwGWWCHgvkKqHa4OuLxdOfHvDdssSHn+v9TGOOLIC7PDFC/ud+ulR8t2wwwofk55bTPQHN87QISTDr9s5KMFb4JMbko+dedxY8r2rd/D0r6Qm5WMkwdQUH+XfzaCBp8kG/8OnZ+ZPHfMuQj8Pvux2crIz5j4ZHhPojJA57lyIT3Lfa1yDiby5nM/zYC2O89TNslMBFfJKcmcya3w+2h3G47ne73T/8q78Oxwdzp8xehj+eYoD4aHhALB7vJGOpGdcS0N7DVRz4PgpDBkPxD98P4lX4LoCmLpO38nbj+CkA0v5AI0pPuHl/EyGPYHyylHvEiHQoGLfq5pmprUXff9wsZTA7+fxkK1MEmrvzIYwcbheFh/MFRPx7xYQT0vgOQgPUMLODMTdbQAhvPpwxYu8TgUTZbDg/p+4i5+thhuZg0LQ0fZhjwUhylDx8/GYOqh5VrKVtwvCz/JtOd27cR916FDzCzgFFvjh6XtuUIf/qnSImQhk+MGXDFgNzzxexCxad9K4jZMhHOC5I8/sGH3A6SVS7WjnfXHyU2wCgVtCLt0KIEQAqVhvlgvzWC1Jq1cm00UAH58hnJFpqfSAxHlakBn3A77A6aHxylGVEmE8bEiSofTIceNJUabUFD9uNT2xX3u3bM+JvtuKmeozBkDTmVoFmC7VSb+Nz/lihSqzhIcu7rD5wfrT1DhI25hozEs9xZuppOugG3EhhtQVc+YQkQXdgbLTw3TxuKp4DOjTlE5w6MHUZqWWWyhvxPzsnTwMEKR5djIiCQa4EoDFA2FePVuxX88WNa6vEvBlZbGGQxDfhf/XRwLkjQojCdPUMxWUyClKbQo0IfZ+BTdHW26Pn/eF2Rg1T9SpCjiT09OoALb7PPNUaEeJ83S/1YDBuWMeOdB0hYeN0dOKL7xABbI/3QIjWHPG/DHz861THpngd4dgzlUyrC1xQdqdZSjGjwchQG3Hw3bg6wFxCX+ldb4P8r2XcgEEMtm281Euf//V+H0Ocb1HBWO+C/K+3QGbP7kqYgwt+tf7m/335qYVRFzEiAcr1EOKDvLsM5RihGXX0vu5hiDMyVd4p///cxfnD7m7yM5EsIN2JDHUhB9N7uPxdudbFbNkTkd68e3BBxnd8stdGBt+Fu7UOgkqmr3YlbmIMHpEPWwyUH+MJ66Y2Q5z7gyQy9/ndvqY7u9F+Z+79EfFrUwJchvFRxXtb3i56SOqEe907FbJseR9xfUqAu0VzT+GDKfqQYDuX2GJghGXn9UXEKahRbaotwMWo6dZubHCInsFJWJ4N036CePxQTf+Wdy5IfeUYYCLATTGELIiJKFWB1ZZH+4kRdh5yO6ScM5Uai0//nmHJFKnpLKvwvy9iO0RkzJTjwHwRsnBBKDYtyUyPa5tye785Fn/US09HocMiJZNllSUcs8VwFL69H95/x9PuBoLGDOLKuQCvM83QfZM7o7ckObVIbgghmjAyckq/pGh157DKYS7W80+znsbbfYz3MeIvKPbPImTkV62Ztjdi5WyO9BydaIdiGRQa9XnMrg/GPqb31Y8TStIJIf9dkFRCcK4mUVW9ztfxUd+v7eQucQcAVEon8WDzaL4Xjq4DQ5TEbZ3a6FUN2zA/sdbgjn+c3CUM7Qf9zxsA+ez/5drCIXWGVX5/jJmwrmrYdAxuvoiTu4RRlpzsfhqhx9eS400Z+TLuOas2S+lBbz/bgDq5S9xxDRMUV6iNs23rEAYV2i/YJo+o7R2qIVwZItgnuseWgoOS0zWEYn1/2xfQyO1lryaB563KAANCNSEdMgjKjoh9cQsGGMHbuQ4uTdwAY/aBCa6ZRsiTcFdhuDJ1N2Bj9RMRtLx/QeFWmLqWLL5Nd+4m8RHWLhqVfzL4J/mCQHjJODifDfFAexQRc1iCvpSgnQiRzSmxlwNYWpH2MgZxudAbn6NjTy2jk1PWhdJOz2u3VXKsCCDwuXZY4cDLST0cb1wuIMZFuPOSMqBBzBehb78V0i2uEatZ2pJ/OKgbbsozPsFkcZG3i13Nb2k5jSULXBb2gR9wGRh5u7ULXoH52dEWnM1IXb3Ox67mtxgknqjRPxzyPRiHV/lpa4T84z9E+VI2TAYf6ilOYjeAEmGoUsx8y7E3OvgUCnRKzF6GHOOQJE6yxUCMb9Yq0R6WQEg6yu/1ti5zgLtDJ6OMyF6G3KPtEIdZSqiybOBKd4RdT62ljZvhOPPQHnOVYRstX2uEXNdvkmudI8QYAkYXBQ3Hd99FGzMyv4nlFk1m9ssBynoOIsoPjp1bgBiUxUbt9bAK7bUxJYtJEZDrgpzaK0VY8Ktkr2nxeeZk2PDH84a7Kfz3DYVcDrr0y1HJpIRor7QhjkU+PU9y+eYUAedG0GynEjFddAutrw2+yyMEdWo9EKzErijV4APuZi4xKX7pWo3Z61CnivJNBRF63sEeITAFCl8Ot3aJK/Il21MIXdPm7xXwcSvasShIFRV5PQffh+uzvdYWjkNCJKyKEB392YW6cLJ3mKUUHEy8rOXNHX3LjaVPeI3cpgxlemsauRinvi7T6TsatcMKIoQLB06jMTRMBC1dPKhYsXnuOCI8eVVmKcQk3BB2zurK2IHTqdJQc+LnZxbyAtUwwkelVcgpdqnp5puinKYtMBfs6UeNN3QockKE56oIwQi2R2ik/rj3ZU2zZK8QeQEnhNXgeRBYd7EvRF5FUG9mjXCjhkOju1mEoNpcZOjrDdg+DjJV14SE2SPEcHG13dADpe+QTgJrO1SXWi1E5HPgJZUXC8eqJ1pdhiPiYJxAGHGRVGfATkML2aVypsG+jarbJdlU1yx18NWAOzFtgOOEiQI26V4UyPEHM4cV4fBA60D4x2kdwrSZq9MnmFopBshNtiRX2ydOig3uvqu6DvcuCDFR1Ff8jixkCFyiWYJ8btzOqcDFH1Zx7hsUO3lBMCSqfmT4ZKE2IE4qrAR+iasrA3Ty7DNOF9RytdqQInWieG7xeOAgh7gAUpclsgHNWt5I/jYZctApzm9yqUdquHf30dB7qrISy9Spv6shIxtdqqKQLedIMlDDHjBSaEZ2LdbhWiEslT9uNoqBtHIJ1vAPvCmEcYnTE5UjUdRiT8tQrBD+WsxSM2QdlDkfUjWaWAJhoG4wt9hKKTkmH//0y8iQjXOZtwM4Ccog9FVV0rH4w/zeanf5VwZh5ah+GYT/kjsMiptqURKoB3IogY9Wy8wkDrcbQqoqAz+L893cZ1ahnXGZ4lR+TZnsGia6Sp6FoXSsAmfFRfbMmGQOiSBzOFomQ4rZlUGnHELtsk8WxTaNEcJYl0HISma5W0mWuwzCtbrPxoLnlfq0azBYQiR++UqFUgcMzAM9xUaKGZ3rl8AnesqRN2fTrSWqTcpV/GqEQwupaIQVTk+xrWe9Ft0rhi5Ih/ZdEZYt3SxT9dUvfdSIOiLUny6PkCWVe5ZCxMo9FpQcTZRFNytDUInRt0Nxotcvp2SQXGVYxzrEgs9oYKdt4EMhHjQuPZ4LwrQudbTYmGycKy2v4EfNwSvUFtWF3ysxku9jNx7Xg2PUUZem9kNXhNiWJEhM1ODWUQuBsM110b+ZHMiHg1o+K7aeryNcWcgwZdO4ARQlLUn/YzyNcLwZektOIyQXiKXo2rnMzaahabvUiaCR1foY0iSn6uOJkoJWtHiiRJ/a2/ROG9fWHmm7tBhhyrdwgUfon4M5ufmE4/8VnwoSzTOF0DuQuVyGbpWGad/CzT+0uT+sG2iJtz/JBwNFESyVqdYnu+QnBImTXarLB5xIT3ICy2FMZGLPJp2k/cPAAmHKx7cgrHpmq/nEUzm5kKpudHh+VJzOO5sw9ek8iRCrBXvaYP8YxUyCK/Q3/KTQ1M7HT8VpbBDyEbpHT9mXUHz9N0jYorIluTxh+Zs6YSkatInP+ajFE8cZ/5pGUo5FLJhxmmKBk1SszYaCPiwe5dS3wDVcqvWgTsnKn4xTslSckpXPCbYWo2Ui0ORvRGwygk6xtky81IJWWym75OnjN7uVup84b0aV/kn+8InZHKyj6z+MtfoJQf5Cj8qMlxaSbcyb+YK5/da7QvMOsnbT5UtwEzq9dptW30db6ZZwnGLexKyevpG34BLgCsYPd/lswYi9ERZy3ApMoBHE1+L+54Z1N48Iu13i7Ji3sMs94frZfFx15fGfP7rA1g2LWuTCFr9KC+ff6Kugh5lT7knnD/lF2+vKlPkkgK5YVw7+cN8XfzHAfe3GcyJ+NJ/Iwwi5CNuyJdwNGabzh/Y5YO9mIsgnszlG1HIRtrRIeuNb2SS/LzputK76kkJznW/5qqkccKFJS7N5fMKyFUNiaa2uTtBLCjfCDEv6IwvdE+yHy+JrBUzcYtllsfplHt9ChplajMuOALhRTz2nioSPn/FwFgQBvtrBD4LOJvxd7jzbpwRy/BfnqJsStRiwE5v1NCynri0g/l/07ewev55/3x/z+c/P/N9A/c4eIp/vOV1jMvU0C2ODvY6QXNREZb0I6s+NLb4QYHIiIkX4dND8sbwLHoi+CFaVrIky69roZeUeYz8CnxVvLS8tx5b6V/GNdTSO2+S7i5Aqy9S12cgQKFObaD4ycK+2lesPSxGMOdTeiJSHc20ikg7VvPvpjQjs5p/HABSbJmyMzOSHMO182kfNdY1wJh8H/sCJz/iKhV1lAUKZVpxSN2VrhDN13sYjg5DIVQOrEYhL33zmtGSdd6ZW30Aod9dH4EsOh/8laRmWqtWnqfMW0kXFJd4pXYVQE6EZIjrai0dunrdwkKFxZqabIMRd4/dBE1RTm1vLlGmExpkZh/NL+twTn6ZJ1AECEX3PutfFnQiW4pao+E7Zc0+ps2uyCSQ2g7feou9GaGp0dRlx6uyaw+k8ff4Q7HWJEE/oPwXCY6xCI2XPH+acIQXz6MFLUFNI5DvsjKYBa7cD5yzKngNOuok8BX3GSWda2SEIzwE71OLQy7Pc/KE9fKcwaIR1O5R8Ky7fnN5+AS5u+jy+7CP8JMSNNx8TOUkbK+fz+JhXSfVUAM/8WDRwY4SlKT5n6aB4dOypgJTti7F/lLV2SfDUiRShJ9gqU3OQ7W3yPHoG6ANMtPK9TQSl+tNQXaX6eIInvyFV+tMISvUYIov8+P1jCMNqgT6A5NxjCCnTJ2p1bbRHEBqnuhute58ogTDV6yuYPsrvzSHc4oOBtJLL9PpCSvdr+/otGLVJQp6q92vL9NyzLOFqilrSj6vWcy/VN/HpSM5QcPppOYRG70tpNzwNTlXNoHtfOiLUAXyzf+kzkjCb3clIURxcS9KbpbI9aI0sTPTcMvScOwRlETK6Lh7jobQuVd1vICSsVzzKA6lX+SWzmBd4dPgpn5Ke7NUAQtJ95H5MqxFqYV9914LiC4QQ0Pj3lELE3D5x6W6cjxDfotN7Sn0q3m9R9a1hmXeUPBkN4f3lFWUoYKbfM/MEJDgpdT4yl3yG3V6faC0iK1tq3yS+gLi6iT+857K8633f08U7ux5Prdrf2WUeS3kOqvZW2WwRFFL63XmPoiQRU/HdeXkIqfH+wwcjbFVXo7kyVO+wfDABD+PK1mieDH3qfz0BxHreQ5qHMPsu2UcBxPLzel5dnUvp9wE3DM677/uABWXf6dwsQvyq5Z3O1wFevJe7cYz1vJf7KmXerd40PtwHaXBPhFCTkRSOPwIiWjINvAQ1OjatbqSSOZaKHLqTOHPS7EzF0aBnYCMIoRwpbHhjxJOpFdouOCKEgYaDJsP9rbY3GBJ2v30+TVzZcJspsj3RUw8tI3yhRV2zNNfyvoA5OicHHe40YeVJGP41GdW8C9oghAYtx6SzxZ0QIro216ELqIBqGCEuiWDkefd0iuWtR0HZ9/9VQhhgHdns4N1bhocZ+jX1WjIWCMFDg2AsWwle7oOQ0wpPz7EmLJlrRM3eHjVMWPMWg1LtxmonFo93XnIwtgaE6oztbhw/TnAGQS1qLMt36pIh3uUUk6aMmNskKlfj8Pabf50w8q9eGItePo+GR5L2MoR0uoWs21O3I3KXtWUmaqLN310iBFmvZHXM1GupK4DOfyt037svMRLMur2zZtx20hoa6tzrzgLyZJJTJLbO/TR5u7ul4jHqyZbTPSEu729vmLCPRwDbx/SnJzHayRD+6P1MYXPAVmhPi1AQqr/OKixo8pWiQbjCWnRsv+R8rMCdLKy2omvx+/3otC3COdieRouLUWuHlM9lFYTJdUEn2vTf5sfB59k8VDQ5fw6O87f+JuoEOSP+RxCmX+0bRIvNajgc/uFfq80iClKfz3Y1qBXOTS4ryVC0WsMOSHn3wC4nomNZVoT/EYTg8TDRKgpuIsDIOyY/JJ5R0zJ80Yte9KIXvehFL/p/oLrs0vJ0J2DXuKxy7QvhC+Gd6P8K4f8ATXPyYFybKQ8AAAAASUVORK5CYII=" // Replace with the path to your user logo image
                                  alt="User Logo"
                                  className="h-6 w-6 rounded-full"
                                />

                                <span className="ml-2">▼</span>
                              </div>
                            </div>
                            {showLogout && (
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white text-gray-700 py-2 px-4 rounded-md z-50 shadow-lg">
                                <button
                                  onClick={handleLogout}
                                  className="flex items-center w-full text-left px-4 py-2 hover:bg-pink-100 focus:outline-none focus:bg-pink-100 transition duration-300 border-t border-b border-pink-200"
                                >
                                  <FaSignOutAlt className="mr-2 text-red-500" />{" "}
                                  Logout
                                </button>
                                <Link to="/editprofile">
                                  <button className="flex items-center w-full text-left px-4 py-2 hover:bg-pink-100 focus:outline-none focus:bg-pink-100 transition duration-300 border-b border-pink-200" >
                                    <FaUserEdit className="mr-2 text-blue-500" />{" "}
                                    Edit Profile
                                  </button>
                                </Link>
                                <Link to="/orderhistory">
                                  <button className="flex items-center w-full text-left px-4 py-2 hover:bg-pink-100 focus:outline-none focus:bg-pink-100 transition duration-300">
                                    <FaHistory className="mr-2 text-green-500" />{" "}
                                    Order History
                                  </button>
                                </Link>
                              </div>
                            )}
                          </div>
                        ) : (
                          // Sign-in button
                          <Link
                            to="/login"
                            className="block w-full text-left hover:bg-white-800 focus:outline-none"
                          >
                            Sign in
                          </Link>
                        )}
                      </div>

                      <button
                        onClick={openSearch}
                        className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <span className="sr-only">Search</span>

                        <SearchIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <Link to="/beautyadvice">
                        <button className="text-xs bg-purple-700 text-white hover:bg-purple-900 focus:outline-none focus:ring focus:border-purple-300 px-2 py-1 ml-2 h-7 w-15 mt-1">
                          Beauty Advice
                        </button>
                      </Link>
                    </div>

                    {/* Search Bar */}
                    <Transition.Root show={searchOpen} as={Fragment}>
                      <Dialog
                        as="div"
                        className="fixed inset-0 z-50 overflow-hidden"
                        onClose={closeSearch}
                      >
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          {/* Background overlay */}
                          <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                          </Transition.Child>

                          <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <div className="inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all sm:my-3 sm:align-middle sm:min-w-sm sm:w-min h-15 w-35">
                              <div className="p-6 flex items-center">
                                <form className="flex items-center">
                                  <label htmlFor="search" className="sr-only">
                                    Search
                                  </label>
                                  <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    className="block w-full border-gray-300 rounded-md p-2 mr-2"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    style={{ width: "200px", height: "27px" }}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                  />
                                  <Link to={"/"}>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault(); // Prevent the default form submission behavior
                                        handleSearch();
                                      }}
                                      className="bg-pink-600 text-white font-serif py-2 px-4 text-xs hover:bg-pink-400 "
                                      style={{
                                        fontSize: "10px",
                                        backgroundColor: "#f160c3",
                                        fontFamily: "serif",
                                        marginLeft: "auto",
                                        marginTop: "1",
                                      }}
                                    >
                                      Search
                                    </button>
                                  </Link>
                                </form>
                              </div>
                            </div>
                          </Transition.Child>
                        </div>
                      </Dialog>
                    </Transition.Root>
                  </header>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={"/cart"}>
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Link>
                  {/* <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"></span> */}
                  <span className="sr-only">items in cart, view bag</span>
                </div>
                {cartOpen}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
