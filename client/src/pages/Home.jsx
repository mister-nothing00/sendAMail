import React, { memo } from "react";
import "./style.pages.css";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Other from "../components/Other.jsx";
import Contact from "../components/Contact.jsx";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaRegCopyright } from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section>
          <About />
          <Other />
          <div className="icon">
            <IoIosArrowDropdownCircle className="bounce" size={20} />
          </div>
        </section>

        <Contact />
      </main>

      <footer style={{width:"100%"}}>
      <FaRegCopyright />
        <span >
          2025 Francesco di Vita made with ❤️.
        </span>
      </footer>
    </>
  );
}

export default memo(Home);
