import Navbar from '@/Components/Super/Navbar';
import P_AlatItem from '@/Components/Super/P_AlatItem';
import Sidebar from '@/Components/Super/Sidebar';
import Tron from '@/Components/Super/Tron';
import { Head, Link } from '@inertiajs/react';

export default function P_AlatSuper(props) {
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
                        <P_AlatItem notif={props.flash} p_alat={props.p_alat} alat={props.alat} />
                    </div>
                </div>
            </div>
        </>
    )
}
