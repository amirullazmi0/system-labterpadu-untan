import { Link, router } from "@inertiajs/react"
import { useEffect, useState, useRef } from "react"

const ProfilItem = ({ user, berkass, notif, errors, props }) => {
    const [isiBerkas, setIsiBerkas] = useState(props.temp_berkas)

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
        router.post('/super/' + user.id + '/profil', data)
    }

    const handlePassword = () => {
        const data = {
            oldPassword, newPassword1, newPassword2
        }
        router.post('/super/' + user.id + '/password/update', data)
        setOldPassword('')
        setNewPassword1('')
        setNewPassword2('')
    }

    const [namaBerkas, setNameBerkas] = useState('')
    const [fileBerkas, setFileBerkas] = useState('')

    const [idBerkasEdit, setIdBerkasEdit] = useState('')
    const [namaBerkasEdit, setNameBerkasEdit] = useState('')
    const [fileBerkasEdit, setFileBerkasEdit] = useState('')

    const renderModalEdit = (event) => {
        setModal(true)
        setNameBerkasEdit(event.name)
        setIdBerkasEdit(event.id)
    }
    // const renderModalEdit
    const fileInputRef = useRef(null)
    const fileInputRefEdit = useRef(null)
    const [modal, setModal] = useState(false)
    const modalOn = () => {
        setModal(true)
    }

    const modalOff = () => {
        setModal(false)
        fileInputRef.current.type = "text"
        fileInputRef.current.value = null;
        fileInputRef.current.type = "file"

        fileInputRefEdit.current.type = "text"
        fileInputRefEdit.current.value = null;
        fileInputRefEdit.current.type = "file"
    }


    const handleAddBerkas = (e) => {
        const name = namaBerkas
        const berkas = fileBerkas
        const data = {
            name, berkas
        }
        router.post('/super/berkas/add', data)
        setNameBerkas('')
        setFileBerkas('')
        setModal(false)
        fileInputRef.current.type = "text"
        fileInputRef.current.value = null;
        fileInputRef.current.type = "file"

        fileInputRefEdit.current.type = "text"
        fileInputRefEdit.current.value = null;
        fileInputRefEdit.current.type = "file"

    }
    const handleEditBerkas = (e) => {
        const id = idBerkasEdit
        const name = namaBerkasEdit
        const berkas = fileBerkasEdit
        const data = {
            id, name, berkas
        }
        router.post('/super/berkas/' + id + '/update', data)
        setIdBerkasEdit('')
        setNameBerkasEdit('')
        setFileBerkasEdit('')
        setModal(false)
        fileInputRef.current.type = "text"
        fileInputRef.current.value = null;
        fileInputRef.current.type = "file"

        fileInputRefEdit.current.type = "text"
        fileInputRefEdit.current.value = null;
        fileInputRefEdit.current.type = "file"
    }

    const handleDeleteBerkas = (e) => {
        if (window.confirm('Are you sure you want to delete this data?')) {
            const name = e.name
            const data = {
                name
            }
            router.get('/super/berkas/' + e.id + '/delete', data)
        }
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
                                        <textarea className="textarea textarea-bordered" value={address ? address : ""} onChange={(address) => setAddress(address.target.value)} placeholder="Masukan Alamat"></textarea>
                                    </div>
                                    <div className="col-span-2 mt-2">
                                        <button onClick={() => handleUpdateProfil()} className="btn btn-blue btn-sm lg:btn-wide w-full">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                        <div className="lg:col-span-2">
                            <div className="card">
                                <div className="grid grid-cols-1">
                                    {errors.berkas &&
                                        <div className="col-span-1">
                                            <div className="alert alert-error shadow-lg mb-4">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{errors.berkas}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {notif.message &&
                                        <div className="col-span-1">
                                            <div className="alert alert-success shadow-lg mb-5">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{notif.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {notif.berkasDelete &&
                                        <div className="col-span-1">
                                            <div className="alert alert-error shadow-lg mb-4">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{notif.berkasDelete}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="col-span-1">
                                        <div className="flex items-center justify-start mb-3">
                                            <div className="text-xl font-bold mr-2">Update Berkas</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                            </svg>
                                            <button onClick={() => modalOn()} className="ml-auto">
                                                <label htmlFor="modal-add" className="btn btn-sm ml-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </label>
                                            </button>
                                            {/* Put this part before </body> tag */}
                                            <input type="checkbox" id="modal-add" className="modal-toggle" />
                                            <div className={modal == true ? "modal" : "modal-out"}>
                                                <div className="modal-box relative">
                                                    <button onClick={() => modalOff()} className="">
                                                        <label htmlFor="modal-add" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                                    </button>
                                                    <h3 className="text-lg font-bold">Tambah Berkas</h3>
                                                    <div className="form-control">
                                                        <label htmlFor="" className="label">
                                                            Nama
                                                        </label>
                                                        <input type="text" name="name" value={namaBerkas ? namaBerkas : ""} onChange={(e) => setNameBerkas(e.target.value)} placeholder="Masukan Nama Berkas" className="input input-md input-bordered" />
                                                    </div>
                                                    <div className="form-control">
                                                        <label htmlFor="" className="label">
                                                            File
                                                        </label>
                                                        <input type="file" ref={fileInputRef} name="berkas" accept=".pdf" onChange={(e) => setFileBerkas(e.target.files[0])} placeholder="Masukan Nama Berkas" className="file-input file-input-md input-bordered" />
                                                    </div>
                                                    <div className="flex justify-center mt-3">
                                                        <button htmlFor="modal-add" className="btn btn-sm btn-blue btn-wide" onClick={() => handleAddBerkas()}>
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {props.temp_berkas.map((b, index) => (
                                            <div key={b.id} className="lg:col-span-2 col-span-2 w-full border rounded p-2 m-1 mb-3">
                                                <div className="grid grid-cols-5 lg:grid-cols-7">
                                                    <div className="col-span-5 lg:col-span-7">
                                                        <div className="flex items-center">
                                                            {/* <span>Nama : </span> */}
                                                            <span>{b.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-3 lg:col-span-5 mr-1">
                                                        {b.berkas ?
                                                            <Link href={'/file/berkas/' + b.berkas} className="btn btn-green btn-sm mt-1 w-full">
                                                                {b.berkas}
                                                            </Link>
                                                            :
                                                            <label className="label">
                                                                <span className="label-text text-error">Tidak Ada File Berkas</span>
                                                            </label>
                                                        }
                                                    </div>
                                                    <div className="col-span-2 lg:col-span-2">
                                                        <div className="grid grid-cols-2">
                                                            <button onClick={() => renderModalEdit(b)} className="mt-1">
                                                                <label htmlFor="modal-edit" className="btn btn-sm btn-blue">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </label>
                                                            </button>
                                                            {/* Put this part before </body> tag */}
                                                            <input type="checkbox" id="modal-edit" className="modal-toggle" />
                                                            <div className={modal == true ? "modal" : "modal-out"}>
                                                                <div className="modal-box relative">
                                                                    <button onClick={() => modalOff()} className="">
                                                                        <label htmlFor="modal-edit" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                                                    </button>
                                                                    <h3 className="text-lg font-bold">Edit Berkas</h3>
                                                                    <div className="form-control">
                                                                        <label htmlFor="" className="label">
                                                                            Nama
                                                                        </label>
                                                                        <input type="text" name="name" value={namaBerkasEdit ? namaBerkasEdit : ""} onChange={(e) => setNameBerkasEdit(e.target.value)} placeholder="Masukan Nama Berkas" className="input input-md input-bordered" />
                                                                    </div>
                                                                    <div className="form-control">
                                                                        <label htmlFor="" className="label">
                                                                            File
                                                                        </label>
                                                                        <input type="file" ref={fileInputRefEdit} name="berkas" accept=".pdf" onChange={(e) => setFileBerkasEdit(e.target.files[0])} placeholder="Masukan Nama Berkas" className="file-input file-input-md input-bordered" />
                                                                    </div>
                                                                    <div className="flex justify-center mt-3">
                                                                        <button className="btn btn-sm btn-blue btn-wide" onClick={() => handleEditBerkas()}>
                                                                            Update
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => handleDeleteBerkas(b)} className="btn btn-sm btn-red mt-1 ml-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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