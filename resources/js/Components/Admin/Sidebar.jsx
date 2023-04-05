import { Link } from "@inertiajs/react"
import { useState } from "react"

const Sidebar = ({ active }) => {
    const [iniActive, setActive] = useState(active)
    return (
        <>
            <div className="sa-base">
                <div className="sa-head flex items-center justify-center">
                    <img src="/img/untanAdmin.png" alt="" />
                    <div className="head1">upt laboratorium terpadu</div>
                </div>
                <hr className="mt-3 mb-3" />
                <div className="sa-body">
                    <ul>
                        <Link method="get" href={route('admin')} className={iniActive == 'dashboard' ? "sa-item active flex items-center" : "sa-item flex items-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <div className="text">
                                Dashboard
                            </div>
                        </Link>
                        <Link method="get" href={route('admin-alat')} className={iniActive == 'alat' ? "sa-item active flex items-center" : "sa-item flex items-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                            </svg>

                            <div className="text">
                                Alat
                            </div>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar