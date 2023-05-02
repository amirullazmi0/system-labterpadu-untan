import Navbar from '@/Components/Super/Navbar';
import Sidebar from '@/Components/Super/Sidebar';
import Tron from '@/Components/Super/Tron';
import EditP_RuanganItem from '@/Components/Super/EditP_RuanganItem';
import { Head, Link } from '@inertiajs/react';

export default function EditP_RuanganSuper(props) {
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <Navbar active={props.active} auth={props.auth} />
                <Tron />
                <div className="grid grid-cols-1 lg:grid-cols-9">
                    <div className="lg:col-span-2"></div>
                    <div className="col-span-7 dashboard-isi">
                        <EditP_RuanganItem pr={props.p_ruangan[0]} ruangan={props.ruangan} errors={props.errors} />
                    </div>
                </div>
            </div>
        </>
    )
}
