import Navbar from '@/Components/User/Navbar'
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import Tron from '@/Components/User/Tron'
import { Head } from '@inertiajs/react'

export default function Home(props) {
    const events = [
        { title: 'Meeting', start: new Date() }
    ]
    const handleDateClick = (arg) => { // bind with an arrow function
        console.log(arg);
    }
    const handleEventClick = (arg) => { // bind with an arrow function
        console.log(arg);
    }

    const eventRuangan = () => {
        return (
            <>
                <h2>Peminjaman Ruangan</h2>
            </>
        )
    }

    const eventAlat = () => {
        return (
            <>
                <h2>Peminjaman Alat</h2>
            </>
        )
    }
    return (
        <>
            <Head title="Dashboard" />
            <div className="bg-body">
                <Tron />
                <Navbar active={props.active} />
                <div className="p-4">
                    <div className="card-home">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2">
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
                            <div className="">
                                <div className="grid">
                                    <div className="event-ruangan border mb-4">{eventRuangan()}</div>
                                    <div className="event-alat border">{eventAlat()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
