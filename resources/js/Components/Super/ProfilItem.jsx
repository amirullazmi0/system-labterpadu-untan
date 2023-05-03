import { Link } from "@inertiajs/react"
import { useState } from "react"

const ProfilItem = ({ user, berkas }) => {
    console.log("user : ", berkas);
    return (
        <>
            <div className="lab-item mt-5">
                <div className="grid grid-cols-1">
                    <div className="grid lg:grid-cols-5 grid-cols-1">
                        <div className="lg:col-span-3">
                            <div className="card">
                                <div className="col-span-2">
                                    <div className="flex items-center">
                                        <div className="text-xl font-bold mr-2">Update Profil Anda</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="form-control lg:col-span-1 col-span-2 w-full">
                                        <label className="label">
                                            <span className="label-text">Nama</span>
                                        </label>
                                        <input type="text" placeholder="Nama Anda" className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control lg:col-span-1 col-span-2 w-full">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="Email Anda" className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control lg:col-span-2 col-span-2 w-full">
                                        <label className="label">
                                            <span className="label-text">Alamat</span>
                                        </label>
                                        <textarea className="textarea textarea-bordered" placeholder="Masukan Alamat"></textarea>
                                    </div>
                                    <div className="col-span-2 mt-2">
                                        <button className="btn btn-blue btn-sm btn-wide">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="col-span-2">
                                        <div className="flex items-center">
                                            <div className="text-xl font-bold mr-2">Update Password Anda</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="form-control lg:col-span-2 col-span-2 w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Password Lama</span>
                                        </label>
                                        <input type="password" placeholder="Password Lama" className="input input-bordered w-full max-w-xs" />
                                        <hr className="mt-5" />
                                    </div>
                                    <div className="form-control lg:col-span-2 col-span-2 w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Password Baru</span>
                                        </label>
                                        <input type="password" placeholder="Password Baru" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="form-control lg:col-span-2 col-span-2 w-full max-w-xs">
                                        <input type="password" placeholder="Masukan Kembali Password Baru" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="col-span-2 mt-2">
                                        <button className="btn btn-blue btn-sm btn-wide">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="card">
                                <div className="grid grid-cols-1">
                                    <div className="col-span-1">
                                        <div className="flex items-center">
                                            <div className="text-xl font-bold mr-2">Update Berkas</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                            </svg>
                                        </div>
                                        {berkas.map((b) => (
                                            <div key={b.id} className="form-control lg:col-span-2 col-span-2 w-full mb-2">
                                                <label className="label">
                                                    <span className="label-text">{b.name}</span>
                                                </label>
                                                <div className="flex items-center">
                                                    <input type="file" className="file-input file-input-md file-input-bordered w-full max-w-xs" />
                                                    <button className="btn btn-blue ml-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {b.berkas ?
                                                    <button className="btn btn-green btn-sm mt-1">
                                                        Nama BErkas
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                        </svg>
                                                    </button>
                                                    :
                                                    <button className="btn btn-red btn-sm mt-1">
                                                        Tidak Ada Berkas
                                                    </button>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfilItem