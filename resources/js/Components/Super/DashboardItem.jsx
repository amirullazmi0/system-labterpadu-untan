import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import moment from 'moment/moment'
import swal from 'sweetalert'

const DashboardItem = ({ props }) => {
    const today = moment();
    const [theDay, setTheDay] = useState(today)

    const formatToday = moment(theDay).format('DD MMMM YYYY')
    const formatToday2 = moment(theDay).format('YYYY-MM-DD')


    const [dateRuangan, setDateRuangan] = useState()

    const [p_ruangan, setPRuangan] = useState(props.p_ruangan)
    const [p_alat, setPAlat] = useState(props.p_alat)

    const handleDateClick = (arg) => { // bind with an arrow function
        setTheDay(arg.date)
    }

    const [textEnd, setTextEnd] = useState('')

    const sweetEventRuangan = (event) => {
        event.date_end ?
            swal({
                title: event.ruangan.name + " (" + event.event + ")",
                text: moment(event.date_start).format('DD MMMM YYYY') + " - " + moment(event.date_end).format('DD MMMM YYYY'),
                buttons: {
                    cancel: "Close",
                },
            }) :
            swal({
                title: event.ruangan.name + " (" + event.event + ")",
                text: moment(event.date_start).format('DD MMMM YYYY'),
                buttons: {
                    cancel: "Close",
                },
            })
    }
    const sweetEventAlat = (event) => {
        console.log('wkwk Alat : ', event);
        event.date_end ?
            swal({
                title: event.alat.name + " (" + event.event + ")",
                text: moment(event.date_start).format('DD MMMM YYYY') + " - " + moment(event.date_end).format('DD MMMM YYYY'),
                buttons: {
                    cancel: "Close",
                },
            }) :
            swal({
                title: event.alat.name + " (" + event.event + ")",
                text: moment(event.date_start).format('DD MMMM YYYY'),
                buttons: {
                    cancel: "Close",
                },
            })
    }
    const handleEventClick = (arg) => { // bind with an arrow function
        const ee = arg.event.id
        const title = arg.event.title
        const first = ee[0]
        const slice = ee.slice(1)

        const Start = moment(arg.event.start).format('DD MMMM YYYY')

        {
            first == "R" ?
                <>
                    {p_ruangan.map((pp) => {
                        pp.id == slice &&
                            sweetEventRuangan(pp)
                    })}
                </>
                :
                <>
                    {p_alat.map((pp) => {
                        pp.id == slice &&
                            sweetEventAlat(pp)
                    })}
                </>
        }
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
                <div className="grid lg:grid-cols-7">
                    <div className="lg:col-span-5">
                        <div className="card">
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                dateClick={handleDateClick}
                                initialView="dayGridMonth"
                                events={[...eventRuangan, ...eventAlat]}
                                locale={'id'}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardItem