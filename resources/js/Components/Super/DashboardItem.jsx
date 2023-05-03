import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

const DashboardItem = ({ props }) => {
    const today = new Date()
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const formatToday = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
    const events = [
        { title: 'Meeting', start: new Date() }
    ]
    const handleDateClick = (arg) => { // bind with an arrow function
        console.log(arg);
    }
    const handleEventClick = (arg) => { // bind with an arrow function
        console.log(arg);
    }
    return (
        <>
            <div className="dashboard-item">
                <div className="grid grid-cols-1 lg:grid-cols-7">
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

                            {/* laboran */}
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

                            {/* Ruangan */}
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
                </div>
                <div className="grid lg:grid-cols-7">
                    <div className="lg:col-span-5">
                        <div className="card">
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                dateClick={handleDateClick}
                                initialView="dayGridMonth"
                                events={[
                                    { title: 'event 1', date: '2023-03-01', color: 'red' },
                                    { title: 'event 2', date: '2023-03-22' }
                                ]}
                                eventClick={handleEventClick}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="card mb-2">
                            <div className="card-head ">Keterangan</div>
                            <div className="card-body">
                                {/* {today.toDateString()} */}
                                <div className="date">
                                    {formatToday}
                                </div>
                                <hr />
                                <div className='ml-5 mb-3'>
                                    <div className="font-bold">
                                        Peminjaman Alat
                                    </div>
                                    <li>asdas</li>
                                    <li>asdas</li>
                                    <li>asdas</li>
                                    <li>asdas</li>
                                </div>
                                <div className='ml-5 mb-3'>
                                    <div className="font-bold">
                                        Peminjaman Ruangan
                                    </div>
                                    <li>asdas</li>
                                    <li>asdas</li>
                                    <li>asdas</li>
                                    <li>asdas</li>
                                </div>

                                <div className='ml-5 mb-3'>
                                    <div className="font-bold">
                                        Analisis Penelitian
                                    </div>
                                    <li>asdas</li>
                                    <li>asdas</li>
                                    <li>asdas</li>
                                    <li>asdas</li>
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