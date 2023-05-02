import Navbar from '@/Components/Super/Navbar';
import Sidebar from '@/Components/Super/Sidebar';
import Tron from '@/Components/Super/Tron';
import P_RuanganItem from '@/Components/Super/P_RuanganItem';
import { Head, Link } from '@inertiajs/react';

export default function P_RuanganSuper(props) {
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <Navbar active={props.active} auth={props.auth} />
                <Tron />
                <div className="grid grid-cols-1 lg:grid-cols-9">
                    <div className="lg:col-span-2"></div>
                    <div className="col-span-7 dashboard-isi">
                        <P_RuanganItem notif={props.flash} p_ruangan={props.p_ruangan} ruangan={props.ruangan} />
                    </div>
                </div>
            </div>
        </>
    )
}
