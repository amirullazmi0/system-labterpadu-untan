import { Link } from "@inertiajs/react"
import { useState } from "react"

const Navbar = ({ lab, auth }) => {
    console.log('lab : ', lab);
    const [authName, setAuthName] = useState(auth.user.name)
    const [authLevel, setAuthKelas] = useState(auth.user.level)
    return (
        <>
            <div className="navbar-admin">
                <div className="flex justify-end mr-5">
                    <div className="dropdown dropdown-end dropdown-hover">
                        <label tabIndex={0} className="grid">
                            <div className="flex justify-end">
                                <div className="na-head1">{authName}</div>
                            </div>
                            <div className="flex justify-end">
                                {authLevel == "1" &&
                                    <div className="flex justify-end">
                                        {/* <small className="na-head2">Admin</small> */}
                                        <span className="badge btn-green mr-1">Laboran</span>
                                    </div>
                                }
                                {
                                    lab.map((lab) => (
                                        auth.user.lab_id == lab.id &&
                                        <>
                                            <span className="badge btn-blue">{lab.name}</span>
                                        </>
                                    ))
                                }
                            </div>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                            <div className="">
                                <Link className="btn btn-block btn-ghost btn-black-nav mb-1">Profil</Link>
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