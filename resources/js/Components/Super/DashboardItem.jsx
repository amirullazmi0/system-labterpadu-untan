import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import moment from 'moment/moment'
import 'moment/locale/id';
import swal from 'sweetalert'

const DashboardItem = ({ props }) => {
    moment.locale('id');
    const today = moment();
    const [theDay, setTheDay] = useState(today)

    const formatToday = moment(theDay).format('DD MMMM YYYY')
    const formatToday2 = moment(theDay).format('YYYY-MM-DD')

    const [p_ruangan, setPRuangan] = useState(props.p_ruangan)
    const [p_alat, setPAlat] = useState(props.p_alat)

    const [popUp, setPopUp] = useState(false)
    const handleDateClick = (arg) => { // bind with an arrow function
        setTheDay(arg.date)
        setTheDay(arg.date)
    }

    const handleClosePopUp = () => {
        setPopUp(false)
    }

    const [popUpData, setPopUpData] = useState(null);
    const handleEventCC = (arg) => {
        const kode = arg.event.id[0]
        const id = arg.event.id.slice(1)
        if (kode == "A") {
            p_alat.map((item) => {
                if (item.id == id) {
                    setPopUp(true)
                    setPopUpData(item);
                }
            })
        } else {
            p_ruangan.map((item) => {
                if (item.id == id) {
                    setPopUp(true)
                    setPopUpData(item);
                }
            })
        }
    }

    const renderPopUp = () => {
        console.log(popUpData);
        return (
            <>
                <div className={popUp == true ? "card-popUp-on" : "card-popUp-off"}>
                    {popUpData ?
                        <>
                            <div className="flex justify-end">
                                <button onClick={() => handleClosePopUp()} className='btn btn-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="grid grid-cols-6">
                                <div className="col-span-2">Nama</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-3">{popUpData.name}</div>

                                <div className="col-span-2">{popUpData.ruangan_id ? "ruangan" : "alat"}</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-3">{popUpData.ruangan_id ? popUpData.ruangan.name : popUpData.alat.name}</div>

                                {popUpData.alat_id &&
                                    <>
                                        <div className="col-span-2">Total</div>
                                        <div className="col-span-1">:</div>
                                        <div className="col-span-3">{popUpData.total}</div>
                                    </>
                                }

                                <div className="col-span-2">Tanggal</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-3">{moment(popUpData.date_start).format('DD MMMM YYYY')} {popUpData.date_end &&
                                    <>
                                        - {moment(popUpData.date_end).format('DD MMMM YYYY')}
                                    </>
                                }
                                </div>

                                <div className="col-span-2">Waktu</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-3">{popUpData.time_start} {popUpData.time_end &&
                                    <>
                                        - {popUpData.time_end}
                                    </>
                                }
                                </div>

                                <div className="col-span-2">Deskripsi</div>
                                <div className="col-span-1">:</div>
                                <div className="col-span-3">{popUpData.Desc}</div>

                            </div>
                        </>
                        : null
                    }
                </div>
            </>
        )
    }

    const eventRuangan = (
        p_ruangan.map((pp) => {
            return (
                {
                    id: "R" + pp.id,
                    title: pp.ruangan.name,
                    start: pp.date_start + 'T' + pp.time_start,
                    end: pp.date_end + 'T' + pp.time_end,
                    backgroundColor: pp.ruangan.color,
                    borderColor: pp.ruangan.color,
                }
            )
        })
    )

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

    const renderPRuangan = (
        p_ruangan.map((pp) => {
            const DateStart = moment(pp.date_start)._i
            const DateEnd = moment(pp.date_end)._i

            return (
                DateStart == formatToday2 || (pp.date_end && DateEnd == formatToday2) || (pp.date_end && moment(formatToday2).isBetween(DateStart, DateEnd)) ?
                    <li> {pp.ruangan.name} ({pp.event})</li >
                    : ""
            )
        })
    )
    const renderPAlat = (
        p_alat.map((aa) => {
            const DateStart = moment(aa.date_start)._i
            const DateEnd = moment(aa.date_end)._i

            return (
                DateStart == formatToday2 || (aa.date_end && DateEnd == formatToday2) || (aa.date_end && moment(formatToday2).isBetween(DateStart, DateEnd)) ?
                    <li> {aa.alat.name} ({aa.event})</li >
                    : ""
            )
        })
    )


    return (
        <>
            <div className="dashboard-item">
                <div className="grid lg:grid-cols-7">
                    <div className="lg:col-span-5">
                        <div className="card">
                            {renderPopUp()}
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                dateClick={handleDateClick}
                                initialView="dayGridMonth"
                                events={[...eventRuangan, ...eventAlat]}
                                locale={'id'}
                                eventClick={handleEventCC}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="card mb-2">
                            <div className="card-head ">Keterangan</div>
                            <div className="card-body">
                                <div className="date">
                                    {formatToday}
                                </div>
                                <hr />
                                <div className='ml-5 mb-3'>
                                    <div className="font-bold">Peminjaman Ruangan</div>
                                    {renderPRuangan}
                                </div>
                                <div className='ml-5 mb-3'>
                                    <div className="font-bold">
                                        Peminjaman Alat
                                    </div>
                                    {renderPAlat}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardItem