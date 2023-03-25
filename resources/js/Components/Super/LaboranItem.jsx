import { Link } from "@inertiajs/react"
import { useState } from "react"

const LaboranItem = ({ laboran, lab, success }) => {
    const alertSuccess = () => {
        return (
            <>
                <div className="alert alert-success shadow-lg mb-5">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{success}</span>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="card">
                        {success != null &&
                            alertSuccess()
                        }
                        <div className="flex mb-3">
                            <Link method="get" href={route('super-add-laboran')} className="btn btn-sm btn-blue mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </Link>
                            <Link className="btn btn-sm btn-green">
                                Export
                            </Link>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto">
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
                                                <Link className="btn btn-sm btn-red">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LaboranItem