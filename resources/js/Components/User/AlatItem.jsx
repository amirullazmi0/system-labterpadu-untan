import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { Link, router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
// import DataTables from 'datatables.net-dt'
import Paginator from './Paginator'
import moment from 'moment/moment'
import 'moment/locale/id';

const AlatItem = ({ props }) => {
    moment.locale('id');

    const today = moment();
    const [theDay, setTheDay] = useState(today)

    const formatToday = moment(theDay).format('DD MMMM YYYY')
    const formatToday2 = moment(theDay).format('YYYY-MM-DD')

    const handleDateClick = (arg) => { // bind with an arrow function
        setTheDay(arg.date)
        // console.log(arg);
    }
    const [alat, setAlat] = useState(props.alat.data)
    const [p_alat, setPAlat] = useState(props.p_alat)
    const [id, setId] = useState(props.id)

    const handleAll = () => {
        router.get('/alat')
    }

    const handleAlat = (e) => {
        router.get('/alat/' + e.name)
    }

    const eventAlat = (
        p_alat.map((aa) => {
            return (
                {
                    id: "A" + aa.id,
                    title: aa.alat.name,
                    start: aa.date_start + 'T' + aa.time_start,
                    end: aa.date_end + 'T' + aa.time_end,
                    backgroundColor: aa.alat.color,
                    borderColor: aa.alat.color
                }
            )
        })
    )

    const tersedia = () => {
        return (
            alat.map((aa, index) => {
                const [totalTersedia, setTotalTersedia] = useState(aa.total)
                return (
                    <>
                        < tr className='text-center border-slate-300' key={aa.id} >
                            <th className='border border-slate-300'>{index + 1}</th>
                            <td className='border border-slate-300'>{aa.name}</td>
                            <td className='border border-slate-300'>{aa.lab.name}</td>
                            <td className='border border-slate-300'>
                                <div className="flex items-center justify-center">
                                    {
                                        p_alat.map((pp) => {
                                            const DateStart = moment(pp.date_start)._i
                                            const DateEnd = moment(pp.date_end)._i

                                            if ((pp.alat_id == aa.id) && ((DateStart == formatToday2) || (pp.date_end && DateEnd == formatToday2) || (pp.date_end && moment(formatToday2).isBetween(DateStart, DateEnd)))) {
                                                return (
                                                    <>
                                                        <div className="user-alat-sisa flex items-center mr-1">
                                                            {/* <div className="sisa mr-1">
                                                                Digunakan
                                                            </div> */}
                                                            {pp.total}
                                                        </div>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                    {totalTersedia}
                                </div>
                            </td>
                        </tr >
                    </>
                )
            }
            )
        )
    }
    const renderAlat = () => {
        return (
            <>
                <div className="overflow-x-auto mt-5">
                    <table className="table-auto table-compact w-full border-collapse0">
                        <thead>
                            <tr className='text-center border border-slate-300'>
                                <th></th>
                                <th>Alat</th>
                                <th className='border border-slate-300' >Lab</th>
                                <th className='border border-slate-300' >Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tersedia()}
                        </tbody>
                    </table>
                </div >
            </>
        )
    }
    return (
        <>
            <div className="grid lg:grid-cols-7">
                <div className="lg:col-span-3">
                    <div className="card-user-item">
                        <div className="cu-head">
                            Daftar Alat
                        </div>
                        <div className="cu-body">
                            <button onClick={() => handleAll(0)} className={id == 0 ? 'alat-name-user-active' : 'alat-name-user'}>
                                <small>Semua</small>
                            </button>
                            {props.lab.map((bb) => (
                                <>
                                    <span> | </span>
                                    <button onClick={() => handleAlat(bb)} className={bb.id == id ? 'alat-name-user-active' : 'alat-name-user'}>
                                        <small>{bb.name}</small>
                                    </button>
                                </>
                            ))}
                            {alat[0] != null ?
                                <>
                                    {renderAlat()}
                                    <div className="flex items-center justify-center">
                                        <div className="text-error">
                                            *
                                        </div>
                                        <div className="user-alat-sisa"></div>
                                        <p className='mr-1 ml-1'>=</p>
                                        <small>Jumlah Sedang Digunakan</small>
                                    </div>
                                    <Paginator meta={props.alat.meta} />
                                </>
                                :
                                <>
                                    <div className="flex justify-center mt-5">
                                        <div className="alat-error">
                                            Tidak Ada Data Alat
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4">
                    <div className="card-user-item">
                        <div className="cu-head">
                            {formatToday}
                        </div>
                        <div className="cu-body">
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                dateClick={handleDateClick}
                                events={[...eventAlat]}
                                locale={'id'}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="lg:col-span-2">
                    <div className="card-user-item">
                        <div className="cu-head">
                            Ketersediaan
                        </div>
                        <div className="cu-body">

                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default AlatItem