import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import moment from 'moment/moment'

const DashboardItem = ({ props }) => {
    const today = moment();
    const [theDay, setTheDay] = useState(today)

    const events = [
        { title: 'Meeting', start: new Date() }
    ]
    const handleDateClick = (arg) => { // bind with an arrow function
        setTheDay(arg.date)
    }

    const handleEventClick = (arg) => { // bind with an arrow function
        console.log(arg);
    }

    const formatToday = moment(theDay).format('DD MMMM YYYY')
    const formatToday2 = moment(theDay).format('YYYY-MM-DD')

    const [dateRuangan, setDateRuangan] = useState()

    const [p_ruangan, setPRuangan] = useState(props.p_ruangan)
    const [p_alat, setPAlat] = useState(props.p_alat)
    const eventRuangan = (
        p_ruangan.map((pp) => {
            return (
                {
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
                    title: aa.alat.name,
                    start: aa.date_start + 'T' + aa.time_start,
                    end: aa.date_end + 'T' + aa.time_end,
                    backgroundColor: aa.alat.color,
                    borderColor: aa.alat.color
                }
            )
        })
    )
    const eventAll = [...eventAlat, ...eventRuangan]

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
                {/* <div className="grid grid-cols-1 lg:grid-cols-7">
                    <div className="lg:col-span-5">
                        <div className="grid grid-cols-3">
                            <div className="card">
                                <div className="head">Lab</div>
                                <div className="body">{props.jumlah_lab}</div>
                                <div className="flex justify-center lg:justify-end">
                                    <Link method="get" href={route('super-lab')} className="btn btn-sm btn-blue mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="card">
                                <div className="head">Laboran</div>
                                <div className="body">{props.jumlah_laboran}</div>
                                <div className="flex justify-center lg:justify-end">
                                    <Link method="get" href={route('super-laboran')} className="btn btn-sm btn-blue mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="card">
                                <div className="head">Ruangan</div>
                                <div className="body">{props.jumlah_ruangan}</div>
                                <div className="flex justify-center lg:justify-end">
                                    <Link method="get" href={route('super-ruangan')} className="btn btn-sm btn-blue mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="grid lg:grid-cols-7">
                    <div className="lg:col-span-5">
                        <div className="card">
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                dateClick={handleDateClick}
                                initialView="dayGridMonth"
                                events={eventAll}
                                locale={'id'}
                                todayClass={'my-today-class'}
                                eventClick={handleEventClick}
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

                                <div className='ml-5 mb-3'>
                                    <div className="font-bold">
                                        Analisis Penelitian
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

export default DashboardItem