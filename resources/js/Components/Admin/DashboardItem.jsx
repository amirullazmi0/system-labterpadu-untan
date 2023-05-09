import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import moment from 'moment/moment'

const DashboardItem = ({ props }) => {
    const today = moment();
    const [theDay, setTheDay] = useState(today)

    const formatToday = moment(theDay).format('DD MMMM YYYY')
    const formatToday2 = moment(theDay).format('YYYY-MM-DD')
    const [p_alat, setPAlat] = useState(props.p_alat)
    const [alat, setAlat] = useState(props.aalat)


    const handleDateClick = (arg) => { // bind with an arrow function
        setTheDay(arg.date)
        // console.log(arg.dateStr);
    }
    const handleEventClick = (arg) => { // bind with an arrow function
        // console.log(arg);
    }

    useEffect(() => {
        // update nilai total tersedia pada state alat setelah p_alat berubah
        const alatWithTotalTersedia = alat.map((aa) => {
            const totalPemakaian = p_alat.reduce((total, pp) => {
                const DateStart = moment(pp.date_start)._i
                const DateEnd = moment(pp.date_end)._i

                if ((pp.alat_id == aa.id) && ((DateStart == formatToday2) || (pp.date_end && DateEnd == formatToday2) || (pp.date_end && moment(formatToday2).isBetween(DateStart, DateEnd)))) {
                    return total + pp.total
                } else {
                    return total
                }
            }, 0);

            console.log(totalPemakaian);
            return {
                ...aa,
                totalTersedia: aa.total - totalPemakaian
            };
        });

        setAlat(alatWithTotalTersedia);

    }, [p_alat]);

    const eventAlat = (
        p_alat.map((aa) => {
            return (
                {
                    id: aa.id,
                    title: aa.aa_name,
                    start: aa.date_start + 'T' + aa.time_start,
                    end: aa.date_end + 'T' + aa.time_end,
                    backgroundColor: aa.aa_color,
                    borderColor: aa.aa_color
                }
            )
        })
    )

    const [kurangTersedia, setKurangTersedia] = useState(false)
    const tersedia = () => {
        return (
            alat.map((aa) => {
                const [totalTersedia, setTotalTersedia] = useState(aa.total)
                const total = p_alat.map((pp) => {
                    const DateStart = moment(pp.date_start)._i
                    const DateEnd = moment(pp.date_end)._i

                    if ((pp.alat_id == aa.id) && ((DateStart == formatToday2) || (pp.date_end && DateEnd == formatToday2) || (pp.date_end && moment(formatToday2).isBetween(DateStart, DateEnd)))) {
                        return aa.total - pp.total
                    } else {
                        return aa.total
                    }
                })
                console.log('total : ', total[0]);
                return (
                    <>
                        <div className="flex justify-end items-center m-1">
                            <li className='mr-auto' >{aa.name}</li>
                            {
                                p_alat.map((pp) => {
                                    const DateStart = moment(pp.date_start)._i
                                    const DateEnd = moment(pp.date_end)._i

                                    if ((pp.alat_id == aa.id) && ((DateStart == formatToday2) || (pp.date_end && DateEnd == formatToday2) || (pp.date_end && moment(formatToday2).isBetween(DateStart, DateEnd)))) {
                                        return (
                                            <div className="tidak-tersedia">
                                                {pp.total}
                                            </div>
                                        )
                                    }
                                })
                            }
                            < div className="tersedia">
                                {total[0] - total[1] == 0 ?
                                    total[0]
                                    :
                                    total[0] < total[1] ? total[0] : total[1]
                                }
                            </div>
                        </div >
                        <hr />
                    </>
                )
            }
            )
        )
    }

    return (
        <>
            <div className="dashboard-item grid grid-cols-1 lg:grid-cols-7">
                <div className="lg:col-span-5">
                    <div className="card">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            dateClick={handleDateClick}
                            initialView="dayGridMonth"
                            events={eventAlat}
                            eventClick={handleEventClick}
                        />
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="card mb-2">
                        <div className="card-head ">Ketersediaan</div>
                        <div className="card-body">
                            {/* {today.toDateString()} */}
                            <div className="date">
                                {formatToday}
                            </div>
                            <hr />
                            <div className='ml-5 mb-3'>
                                {tersedia()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardItem