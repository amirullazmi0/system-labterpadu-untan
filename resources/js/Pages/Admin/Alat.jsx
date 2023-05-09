import AlatItem from '@/Components/Admin/AlatItem';
import Navbar from '@/Components/Admin/Navbar';
import Sidebar from '@/Components/Admin/Sidebar';
import Tron from '@/Components/Admin/Tron';
import { Head, Link } from '@inertiajs/react';

export default function Alat(props) {
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <Navbar lab={props.lab} auth={props.auth} active={props.active} />
                <Tron />
                <div className="grid grid-cols-1 lg:grid-cols-9">
                    <div className="lg:col-span-2"></div>
                    <div className="col-span-7 dashboard-isi">
                        <AlatItem notif={props.flash} alat={props.alat} />
                    </div>
                </div>
            </div>
        </>
    )
}
