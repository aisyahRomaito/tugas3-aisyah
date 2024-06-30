import { IoContract, IoHome } from "react-icons/io5";
import { FaCircleInfo, FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center py-6 px-8 bg-white-800 text-teal-500 shadow-lg rounded-lg">
      <div className="flex items-center">
        <h1 className="text-xl font-bold mr-4 text-stroke-1 stroke-white">
          <span className="text-5xl font-bold"> Daftar Music </span>
        </h1>
        <h2 className="text-1xl font-semibold">
          {name ? `Hai ${name}` : "Tanpa Nama"}
        </h2>
      </div>
      <div className=" flex w-1/2 items-center">
        <ul className="flex justify-around w-full items-center">
          <Link className="flex gap-5 items-center" to="/">
            <IoHome size={30} />
            <p>Home</p>
          </Link>

          <Link className="flex gap-5 items-center" to="/about">
            <FaCircleInfo size={30} />
            <p>About</p>
          </Link>

          <Link className="flex gap-5 items-center" to="/contact">
            <FaCircleUser  size={30} />
            <p>Contact</p>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
