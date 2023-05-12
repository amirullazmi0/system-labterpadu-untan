import Navbar from '@/Components/User/Navbar'
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import Tron from '@/Components/User/Tron'
import { Head } from '@inertiajs/react'
import AlatItem from '@/Components/User/AlatItem'

export default function Alat(props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="bg-body">
                <Navbar props={props} active={props.active} />
                <Tron />
                <div className="card-user">
                    <AlatItem props={props} />
                </div>
            </div>
        </>
    );
}
