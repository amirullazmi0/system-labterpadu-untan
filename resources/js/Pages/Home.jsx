import Navbar from '@/Components/User/Navbar';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Home(props) {
    const events = [
        { title: 'Meeting', start: new Date() }
    ]

    return (
        <>
            <div className="bg-body">
                <Navbar />
                <img src={""} alt="" />
                <div className="p-4">
                    <div className="card-home">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2">
                                <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    initialView="dayGridMonth"
                                />
                            </div>
                            <div className="">
                                <div className="grid">
                                    <div className="event-ruangan border mb-4">

                                    </div>
                                    <div className="event-alat border ">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
