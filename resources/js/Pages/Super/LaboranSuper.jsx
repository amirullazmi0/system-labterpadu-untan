import Navbar from '@/Components/Admin/Navbar';
import Sidebar from '@/Components/Admin/Sidebar';
import Tron from '@/Components/Admin/Tron';
import LaboranItem from '@/Components/Super/LaboranItem';
import { Head, Link } from '@inertiajs/react';

export default function LaboranSuper(props) {
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <div className="sidebar-admin">
                    <Sidebar active={props.active} />
                </div>
                <Navbar auth={props.auth} />
                <Tron />
                <div className="grid grid-cols-1 lg:grid-cols-9">
                    <div className="lg:col-span-2"></div>
                    <div className="col-span-7 dashboard-isi">
                        <LaboranItem laboran={props.laboran} lab={props.lab} notif={props.flash} />
                    </div>
                </div>
            </div>
        </>
    )
}
