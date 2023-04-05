import Navbar from '@/Components/Super/Navbar';
import Sidebar from '@/Components/Super/Sidebar';
import Tron from '@/Components/Super/Tron';
import EditRuanganItem from '@/Components/Super/EditRuanganItem';
import { Head, Link } from '@inertiajs/react';

export default function EditRuanganSuper(props) {
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
                        <EditRuanganItem ruangan={props.ruangan[0]} errors={props.errors} />
                    </div>
                </div>
            </div>
        </>
    )
}
