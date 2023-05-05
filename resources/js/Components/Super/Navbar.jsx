import { Link, router } from "@inertiajs/react"
import { useState, useEffect, useRef } from "react"
import Sidebar from "./Sidebar"

const Navbar = ({ auth, active }) => {
    const [authName, setAuthName] = useState(auth.user.name)
    const [authLevel, setAuthKelas] = useState(auth.user.level)
    const [name, setName] = useState(auth.user.name)
    const myRef = useRef(null);
    
    const [sidebarActive, setSidebarActive] = useState(false)
    const sidebarOn = () => {
        return (
            setSidebarActive(true)
        )
    }
    const sidebarOff = () => {
        return (
            setSidebarActive(false)
        )
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (myRef.current && !myRef.current.contains(event.target)) {
                myRef.current.classList.remove("show");
                setSidebarActive(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
    }, [myRef]);

    const handleClick = () => {
        const data = [
            name
        ]
        router.get('/super/' + auth.user.id + "/profil", data)
    }
    return (
        <>
            <div className={sidebarActive == false ? "sidebar-none" : "sidebar-active"} ref={myRef}>
                <div className="sidebar-admin">
                    <button className="btn btn-blue btn-sidebar" onClick={() => sidebarOff()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <Sidebar active={active} />
                </div>
            </div>
            <div className="navbar-admin">
                <div className="flex items-center justify-end mr-5">
                    <div className="mr-auto" >
                        <button className="block lg:hidden button-nav" onClick={() => sidebarOn()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="dropdown dropdown-end dropdown-hover">
                        <label tabIndex={0} className="grid">
                            <div className="na-head1">{authName}</div>
                            {authLevel == "0" &&
                                <div className="flex justify-end">
                                    {/* <small className="na-head2">Admin</small> */}
                                    <span className="badge btn-green">Admin</span>
                                </div>
                            }
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                            <div className="navnav">
                                {/* <button onClick={handleClick} className={active == "profil" ? "btn btn-block btn-ghost btn-black-nav mb-1 active" : "btn btn-block btn-ghost btn-black-nav mb-1"}>Profil</button> */}
                                <Link hmethod="get" href={'/super/' + auth.user.id + '/profil'} data={{ name: authName }} className={active == "profil" ? "btn btn-block btn-ghost btn-black-nav mb-1 active" : "btn btn-block btn-ghost btn-black-nav mb-1"}>Profil</Link>
                                <Link className="btn btn-block btn-ghost btn-black-nav" method="post" href={route('logout')} as="button">Log Out</Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar