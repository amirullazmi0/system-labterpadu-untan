import { Link } from "@inertiajs/react"
import React, { useEffect, useRef, useState } from "react";

const Navbar = ({ active, props }) => {
    const [berkas, SetBerkas] = useState(props.temp_berkas)
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
                    <div className="flex justify-center">
                        <Link href={route('home')}>
                            <div className={iniActive == "dashboard" ? "sidebar-item active" : "sidebar-item"}>Dashboard</div>
                        </Link>
                        <Link href={route('ruangan')}>
                            <div className={iniActive == "ruangan" ? "sidebar-item active" : "sidebar-item"}>Ruangan</div>
                        </Link>
                        <Link>
                            <div className="sidebar-item">Alat</div>
                        </Link>
                        <Link>
                            <div className="sidebar-item">Download</div>
                        </Link>
                    </div>
                </ul>
            </>
        )
    }
    return (
        <>
            <div className="nav-user-logo">
                <div className="card">
                    <div className="flex items-center mt-5">
                        <img className="navbar-img " src="/img/untan.png" alt="" />
                        <Link className="">
                            <div className="navbar-brand">UPT</div>
                            <div className="navbar-brand"> LABORATORIUM </div>
                            <div className="navbar-brand">TERPADU</div>
                            <div className="navbar-brand2">universitas tanjungpura</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="navbar navbar-user flex justify-end">
                <div className="nav-label mr-auto">
                    <div className="flex items-center">
                        <div className="nl-img">
                            <img src="/img/untan.png" alt="" />
                        </div>
                        <div className="grid">
                            <div className="nl-head1">UPT Laboratorium Terpadu</div>
                            <div className="nl-head2">Universitas Tanjungpura</div>
                        </div>
                    </div>
                </div>
                <div className="navbar-item">
                    <ul className="menu menu-horizontal flex items-center">
                        <Link href={route('home')}>
                            <div className={iniActive == "dashboard" ? "sidebar-item active" : "sidebar-item"}>Dashboard</div>
                        </Link>
                        <Link href={route('ruangan')}>
                            <div className={iniActive == "ruangan" ? "sidebar-item active" : "sidebar-item"}>Ruangan</div>
                        </Link>
                        <Link href={route('alat')}>
                            <div className={iniActive == "alat" ? "sidebar-item active" : "sidebar-item"}>Alat</div>
                        </Link>
                        {/* <Link>
                                <div className="sidebar-item">Download</div>
                            </Link> */}
                        <div className="sidebar-item dropdown dropdown-end dropdown-hover">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 w-52">
                                {berkas.map((bb) => (
                                    <Link href={bb.berkas ? ("/file/berkas/" + bb.berkas) : "#"} className="btn btn-block btn-white">{bb.name}</Link>
                                ))}
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
            </div >
            <div id={sidebar ? 'sidebar-on' : 'sidebar-off'} ref={myRef}>{iniSidebar()}</div>
        </>
    )
}

export default Navbar