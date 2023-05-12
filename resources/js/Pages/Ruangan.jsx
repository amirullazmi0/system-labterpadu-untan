import Navbar from '@/Components/User/Navbar'
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import Tron from '@/Components/User/Tron'
import { Head } from '@inertiajs/react'
import RuanganItem from '@/Components/User/RuanganItem'

export default function Ruangan(props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="bg-body">
            <Navbar props={props} active={props.active} />
                <Tron />
                <div className="card-user">
                    {/* <HomeItem props={props} /> */}
                    <RuanganItem props={props} />
                </div>
            </div>
        </>
    );
}
