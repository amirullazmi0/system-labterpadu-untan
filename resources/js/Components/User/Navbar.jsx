import { Link } from "@inertiajs/react"
import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
    const [iniActive, setIniActive] = useState()
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
        setSidebar(false)
    }

    const openSidebar = () => {
        setSidebar(true)
    }

    const iniSidebar = () => {
        return (
            <>
                <Link>
                    <div className="sidebar-item">Dashboard</div>
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
            </>
        )
    }

    return (
        <>
            <div className="navbar navbar-user p-3">
                <div className="flex-1">
                    <img className="navbar-img" src="/img/untanLogo.png" alt="" />
                    <Link className="grid">
                        <div className="navbar-brand ">UPT LABORATORIUM TERPADU</div>
                        <div className="navbar-brand2">universitas tanjungpura</div>
                    </Link>
                </div>
                <div className="flex">
                    <div className="navbar-item">
                        <ul className="menu menu-horizontal px-1">
                            <Link>
                                <div className="sidebar-item">Dashboard</div>
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
                    </div>
                    <div className="navbar-button">
                        <button className="btn-ghost" onClick={() => openSidebar()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* id={sidebar ? 'sidebar-on' : 'sidebar-off'} */}
            <div id={sidebar ? 'sidebar-on' : 'sidebar-off'} ref={myRef}>{iniSidebar()}</div>
        </>
    )
}

export default Navbar