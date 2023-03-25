import { Link } from "@inertiajs/react"
import React, { useEffect, useRef, useState } from "react";

const Navbar = ({ active }) => {
    const [iniActive, setIniActive] = useState(active)
    const [sidebar, setSidebar] = useState(false);
    const myRef = useRef(null);
    useEffect(() => {
        // Fungsi untuk menyembunyikan elemen ketika pengguna mengklik di luar elemen tersebut
        function handleClickOutside(event) {
            if (myRef.current && !myRef.current.contains(event.target)) {
                myRef.current.classList.remove("show");
                setSidebar(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
    }, [myRef]);

    const closeSidebar = () => {
        if (sidebar == true) {
            setSidebar(false)
        }
        setSidebar(false)
    }

    const openSidebar = () => {
        setSidebar(true)
    }

    const iniSidebar = () => {
        return (
            <>
                <ul className="menu menu-horizontal">
                    <Link>
                        <div className={iniActive == "dashboard" ? "sidebar-item active" : "sidebar-item"}>Dashboard</div>
                    </Link>
                    <Link>
                        <div className="sidebar-item">Ruangan</div>
                    </Link>
                    <Link>
                        <div className="sidebar-item">Alat</div>
                    </Link>
                    <Link>
                        <div className="sidebar-item">Download</div>
                    </Link>
                </ul>
            </>
        )
    }
    return (
        <>
            <div className="navbar navbar-user p-3">
                <div className="flex flex-1">
                    <img className="navbar-img" src="/img/untanLogo.png" alt="" />
                    <Link className="grid">
                        <div className="navbar-brand">UPT LABORATORIUM TERPADU</div>
                        <div className="navbar-brand2">universitas tanjungpura</div>
                    </Link>
                </div>
                <div className="flex">
                    <div className="navbar-item">
                        <ul className="menu menu-horizontal">
                            <Link>
                                <div className={iniActive == "dashboard" ? "sidebar-item active" : "sidebar-item"}>Dashboard</div>
                            </Link>
                            <Link>
                                <div className="sidebar-item">Ruangan</div>
                            </Link>
                            <Link>
                                <div className="sidebar-item">Alat</div>
                            </Link>
                            {/* <Link>
                                <div className="sidebar-item">Download</div>
                            </Link> */}
                            <div className="dropdown dropdown-end dropdown-hover">
                                <label tabIndex={0} className="">Download</label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <div className="">
                                        <Link className="btn btn-block btn-ghost btn-blue-nav">Berkas1</Link>
                                        <Link className="btn btn-block btn-ghost btn-blue-nav">Berkas2</Link>
                                        <Link className="btn btn-block btn-ghost btn-blue-nav">Berkas3</Link>
                                        <Link className="btn btn-block btn-ghost btn-blue-nav">Berkas4</Link>
                                    </div>
                                </ul>
                            </div>
                        </ul>
                    </div>
                    <div className="navbar-button">
                        {sidebar == false ?
                            <button className="btn-ghost" onClick={() => openSidebar()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                                </svg>
                            </button>
                            :
                            <button className="btn-ghost" onClick={() => closeSidebar()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        }
                    </div>
                </div>
            </div>
            <div id={sidebar ? 'sidebar-on' : 'sidebar-off'} ref={myRef}>{iniSidebar()}</div>
        </>
    )
}

export default Navbar