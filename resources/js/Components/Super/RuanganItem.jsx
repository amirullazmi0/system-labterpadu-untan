import { Link, router } from "@inertiajs/react"
import { useCallback, useEffect, useState } from "react"
import Paginator from "../User/Paginator"
import { read, utils, writeFile, writeFileXLSX } from "xlsx"

const RuanganItem = ({ props }) => {
    const [notif, setNotif] = useState(props.flash)
    const [ruangan, setRuangan] = useState(props.ruangan.data)

    const [pres, setPres] = useState([]);
    /* get state data and export to XLSX */
    const [datax, setDatax] = useState(
        props.ruanganExport.map((ll) => (
            {
                Nama: ll.name,
                Warna: ll.color,
                Deskripsi: ll.desc
            }
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
        writeFileXLSX(wb, "dataRuanganUPTLabTerpadu.xlsx");
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
            router.get('/super/ruangan/' + e.id + '/delete', data)
        }
    };
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="card">
                        {notif.success != null &&
                            alertSuccess()
                        }
                        {notif.delete != null &&
                            alertDelete()
                        }
                        <div className="flex mb-3">
                            <Link method="get" href={route('super-add-ruangan')} className="btn btn-sm btn-blue mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </Link>
                            <button onClick={exportFile} className="btn btn-sm btn-green">
                                Export
                            </button>
                        </div>
                        {ruangan && ruangan.length > 0 ?
                            <>
                                <div className="overflow-x-auto">
                                    <>
                                        <table className="table w-full">
                                            <thead className="text-center">
                                                <tr>
                                                    <th>No</th>
                                                    <th>Ruangan</th>
                                                    <th>Warna Label</th>
                                                    <th>Deskripsi</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                {ruangan.map((ruangan, index) => (
                                                    <tr key={ruangan.id}>
                                                        <th >{index + 1}</th>
                                                        <td>{ruangan.name}</td>
                                                        <td className="flex justify-center">
                                                            <p style={{ backgroundColor: ruangan.color, color: 'rgb(255, 255, 255)', borderRadius: '5px', padding: '10px', width: '50px' }}>
                                                            </p>
                                                        </td>
                                                        <td>{ruangan.desc ? ruangan.desc : "-"}</td>
                                                        <td>
                                                            <Link method="get" href={'/super/ruangan/' + ruangan.id + '/edit'} data={{ name: ruangan.name }} className="btn btn-sm btn-orange mr-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                            </Link>
                                                            <button className="btn btn-sm btn-red" onClick={() => handle(ruangan)}>
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
                                </div>
                            </>
                            :
                            <>
                                <div className="flex justify-center p-5">
                                    <div className="font-bold text-xl uppercase">tidak ada data ruangan</div>
                                </div>
                            </>}
                        <div className="mt-4">
                            <Paginator meta={props.ruangan.meta} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RuanganItem