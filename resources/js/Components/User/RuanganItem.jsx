import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import HomeItem from '@/Components/User/HomeItem'
import moment from 'moment';
import 'moment/locale/id';
import Paginator from './Paginator';

const RuanganItem = ({ props }) => {
    moment.locale('id');
    const [p_ruangan, setPRuangan] = useState(props.p_ruangan.data)
    const [ruangan, setRuangan] = useState(props.ruangan)

    const renderRuangan = () => {
        return (
            <>
                <div className="overflow-x-auto">
                    <table className="table-auto table-compact w-full border-collapse0">
                        <thead>
                            <tr className='text-center border border-slate-300'>
                                <th></th>
                                <th>Ruangan</th>
                                <th className='border border-slate-300' >Deskripsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ruangan.map((rr, index) => (
                                <tr className='text-center border-slate-300' key={rr.id}>
                                    <th className='border border-slate-300'>{index + 1}</th>
                                    <td className='border border-slate-300'>{rr.name}</td>
                                    <td className='border border-slate-300'>{rr.desc ? rr.desc : " - "}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    const renderPRuangan = () => {
        return (
            <>
                <div className="overflow-x-auto">
                    <table className="table-auto table-compact w-full border-collapse0">
                        <thead >
                            <tr className='text-center border border-slate-300'>
                                <th></th>
                                <th>Nama</th>
                                <th className='border border-slate-300'>Ruangan</th>
                                <th className='border border-slate-300'>Kegiatan</th>
                                <th className='border border-slate-300'>Tanggal</th>
                                <th className='border border-slate-300'>Waktu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {p_ruangan.map((pr, index) => {
                                return (
                                    <tr className='text-center border border-slate-300' key={pr.id} >
                                        <th className='border border-slate-300'>{index + 1}</th>
                                        <td className='border border-slate-300'>{pr.name}</td>
                                        <td className='border border-slate-300'>{pr.ruangan.name}</td>
                                        <td className='border border-slate-300'>{pr.event}</td>
                                        <td className='border border-slate-300'>{moment(pr.date_start).format('DD MMMM YYYY')} {pr.date_end ? " - " + moment(pr.date_end).format('DD MMMM YYYY') : ""}</td>
                                        <td className='border border-slate-300'>{moment(pr.time_start, "HH:mm:ss").format("HH.mm")} - {moment(pr.time_end, "HH:mm:ss").format("HH.mm")}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
            </>
        )
    }
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <div className="card-user-item">
                        <div className="cu-head">
                            Daftar Ruangan
                        </div>
                        <div className="cu-body">
                            {renderRuangan()}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3">
                    <div className="card-user-item">
                        <div className="cu-head">
                            Daftar Peminjaman Ruangan
                        </div>
                        <div className="cu-body">
                            {renderPRuangan()}
                            <Paginator meta={props.p_ruangan.meta} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RuanganItem