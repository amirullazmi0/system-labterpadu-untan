import { Link, router } from "@inertiajs/react"
import { useEffect, useState, useRef } from "react"

const ProfilItem = ({ user, notif, errors }) => {
    console.log('errors : ', errors);
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState(user.address)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const handleUpdateProfil = () => {
        const data = {
            name, email, address
        }
        router.post('/admin/' + user.id + '/profil', data)
    }

    const handlePassword = () => {
        const data = {
            oldPassword, newPassword1, newPassword2
        }
        router.post('/admin/' + user.id + '/password/update', data)
        setOldPassword('')
        setNewPassword1('')
        setNewPassword2('')
    }
    return (
        <>
            <div className="lab-item mt-5">
                <div className="grid grid-cols-1">
                    <div className="grid lg:grid-cols-5 grid-cols-1">
                        <div className="lg:col-span-3">
                            <div className="card">
                                {notif.success &&
                                    <div className="col-span-2">
                                        <div className="alert alert-success shadow-lg mb-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>{notif.success}</span>
                                            </div>
                                        </div>
                                    </div>
                                }
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
                                        <input type="text" value={name ? name : ""} onChange={(name) => setName(name.target.value)} placeholder="Nama Anda" className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control lg:col-span-1 col-span-2 w-full">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" value={email ? email : ""} onChange={(email) => setEmail(email.target.value)} placeholder="Email Anda" className="input input-bordered w-full" />
                                        {errors.email &&
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.email}</span>
                                            </label>
                                        }
                                    </div>
                                    <div className="form-control lg:col-span-2 col-span-2 w-full">
                                        <label className="label">
                                            <span className="label-text">Alamat</span>
                                        </label>
                                        <textarea className="textarea textarea-bordered mt-2" value={address ? address : ""} rows={5} onChange={(address) => setAddress(address.target.value)} placeholder="Masukan Alamat"></textarea>
                                    </div>
                                    <div className="col-span-2 mt-2">
                                        <button onClick={() => handleUpdateProfil()} className="btn btn-blue btn-sm lg:btn-wide w-full">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="card">
                                <div className="grid grid-cols-2 gap-2">
                                    {notif.error &&
                                        <div className="col-span-2">
                                            <div className="alert alert-error shadow-lg mb-4">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{notif.error}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {notif.update &&
                                        <div className="col-span-2">
                                            <div className="alert alert-success shadow-lg mb-5">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{notif.update}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
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
                                        <input type="password" value={oldPassword} onChange={(oldPassword) => setOldPassword(oldPassword.target.value)} placeholder="Password Lama" className="input input-bordered w-full max-w-xs" />
                                        <hr className="mt-5" />
                                    </div>
                                    <div className="form-control lg:col-span-2 col-span-2 w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Password Baru</span>
                                        </label>
                                        <input type="password" value={newPassword1} onChange={(newPassword1) => setNewPassword1(newPassword1.target.value)} placeholder="Password Baru" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div className="form-control lg:col-span-2 col-span-2 w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Konfirmasi Password</span>
                                        </label>
                                        <input type="password" value={newPassword2} onChange={(newPassword2) => setNewPassword2(newPassword2.target.value)} placeholder="Masukan Kembali Password Baru" className={oldPassword && newPassword1 && newPassword2 && newPassword1 != newPassword2 ? "input input-bordered w-full max-w-xs input-error" : "input input-bordered w-full max-w-xs"} />
                                        {oldPassword && newPassword1 && newPassword2 && newPassword1 != newPassword2 &&
                                            <label className="label">
                                                <span className="label-text text-error">Konfirmasi Password Tidak Sama</span>
                                            </label>
                                        }
                                    </div>
                                    <div className="col-span-2 mt-2">
                                        <button onClick={() => handlePassword()} className="btn btn-blue btn-sm lg:btn-wide w-full">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default ProfilItem