import { Link, router } from "@inertiajs/react"
import { useCallback, useEffect, useState } from "react"
import Paginator from "../User/Paginator"
import { read, utils, writeFile, writeFileXLSX } from "xlsx"

const LaboranItem = ({ props }) => {
    const [laboran, setLaboran] = useState(props.laboran.data)
    const [lab, setLab] = useState(props.lab)
    const [notif, setNotif] = useState(props.flash)

    const [pres, setPres] = useState([]);
    /* get state data and export to XLSX */
    const [datax, setDatax] = useState(
        props.laboranExport.map((ll) => (
            { Nama: ll.name, Email: ll.email, Lab: ll.lab.name, Alamat: ll.address }
        ))
    )
    useEffect(() => {
        (async () => {
            const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
            const wb = read(f); // parse the array buffer
            const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
            const data = utils.sheet_to_json(ws); // generate objects
            setPres(datax); // update state
        })();
    }, []);

    const exportFile = useCallback(() => {
        const ws = utils.json_to_sheet(pres);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "dataLaboranUPTLabTerpadu.xlsx");
    }, [pres]);

    const alertSuccess = () => {
        return (
            <>
                <div className="alert alert-success shadow-lg mb-5">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{notif.success}</span>
                    </div>
                </div>
            </>
        )
    }
    const alertDelete = () => {
        return (
            <>
                <div className="alert alert-warning shadow-lg mb-5">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{notif.delete}</span>
                    </div>
                </div>
            </>
        )
    }

    const handle = (e) => {
        handleDelete(e)
    }
    const handleDelete = (e) => {
        if (window.confirm('Are you sure you want to delete this data?')) {
            const name = e.name
            const data = {
                name
            }
            router.get('/super/laboran/' + e.id + '/delete', data)
        }
    };

    const [renderUP, setRenderUP] = useState(false)
    const [nameUP, setNameUP] = useState('')
    const [emailUP, setEmailUP] = useState('')
    const [newpassword1, setNewPassword1] = useState(false)
    const [newpassword2, setNewPassword2] = useState(false)

    const handleUP = (event) => {
        setRenderUP(true)
        setNameUP(event.name)
        setEmailUP(event.email)
    }
    const closeUP = () => {
        setRenderUP(false)
        setNameUP('')
        setEmailUP('')
        setNewPassword1(false)
        setNewPassword2(false)
    }

    const handleUpdatePassLaboran = () => {
        const data = {
            newpassword1, newpassword2
        }
        router.post('/super/laboran/' + emailUP + '/password', data)
        setRenderUP(false)
        setNameUP('')
        setEmailUP('')
        setNewPassword1(false)
        setNewPassword2(false)
    }
    const renderUpdatePassword = () => {
        return (
            <div className={renderUP == false ? "card-update-off w-96" : "card-update w-96"}>
                <div className="cu-head flex items-center">
                    <div>
                        Ubah Password
                        <div className="flex items-center text-sm">
                            <span>
                                <small>
                                    Nama : {nameUP}
                                </small>
                            </span>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-ghost  ml-auto" onClick={closeUP}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="cu-body">
                    <div className="form-control">
                        <label className="label">
                            <span>
                                <small>Password Baru</small>
                            </span>
                        </label>
                        <input className="input input-bordered input-sm w-full" value={newpassword1 ? newpassword1 : ""} onChange={(e) => setNewPassword1(e.target.value)} placeholder="Masukan Password Baru" type="password" />
                    </div>
                    <div className="form-control mt-5">
                        <input className={newpassword2 && newpassword2 != newpassword1 ? "input input-bordered input-error input-sm" : "input input-bordered input-sm"} value={newpassword2 ? newpassword2 : ""} onChange={(e) => setNewPassword2(e.target.value)} placeholder="Masukan Kembali Password" type="password" />
                    </div>
                    {newpassword2 && newpassword2 != newpassword1 &&
                        <label className="label">
                            <span className="text-error"><small>Masukan kembali password yang sama</small></span>
                        </label>
                    }
                    <hr className="mt-4" />

                    <div className="flex justify-center">
                        <button disabled={newpassword1 && newpassword2 ? false : true} onClick={() => handleUpdatePassLaboran()} className="btn btn-wide btn-sm btn-blue mt-4">
                            update
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    {renderUpdatePassword()}
                    <div className="card">
                        {notif.success != null &&
                            alertSuccess()
                        }
                        {notif.delete != null &&
                            alertDelete()
                        }
                        <div className="flex mb-3">
                            <Link method="get" href={route('super-add-laboran')} className="btn btn-sm btn-blue mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </Link>
                            <button onClick={exportFile} className="btn btn-sm btn-green">
                                Export
                            </button>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto">
                            {laboran && laboran.length > 0 ?
                                <>
                                    <table className="table w-full">
                                        {/* head */}
                                        <thead className="text-center">
                                            <tr>
                                                <th>No</th>
                                                <th>Name</th>
                                                <th>Lab</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {laboran.map((laboran, index) => (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>{laboran.name}</td>
                                                    <td>
                                                        {lab.map((lab) => (
                                                            <div key={lab.id}>
                                                                {laboran.lab_id == lab.id && lab.name}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td>
                                                        <Link method="get" href={'/super/laboran/' + laboran.id} data={{ name: laboran.name }} className="btn btn-sm btn-green mr-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                                            </svg>
                                                        </Link>
                                                        <Link method="get" href={'/super/laboran/' + laboran.id + '/edit'} data={{ name: laboran.name }} className="btn btn-sm btn-orange mr-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </Link>
                                                        <button onClick={() => handleUP(laboran)} className="btn btn-sm btn-blue mr-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                                            </svg>
                                                        </button>
                                                        {/* method="get" href={'/super/laboran/' + laboran.id + '/delete'} data={{ name: laboran.name }} */}
                                                        <button className="btn btn-sm btn-red" onClick={() => handle(laboran)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                                :
                                <>
                                    <div className="flex justify-center p-5">
                                        <div className="font-bold text-xl uppercase">tidak ada data laboran</div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="mt-4">
                            <Paginator meta={props.laboran.meta} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LaboranItem