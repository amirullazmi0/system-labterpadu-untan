import Navbar from '@/Components/Admin/Navbar';
import Sidebar from '@/Components/Admin/Sidebar';
import Tron from '@/Components/Admin/Tron';
import EditLaboranItem from '@/Components/Super/EditLaboranItem';
import { Head, Link } from '@inertiajs/react';

export default function EditLaboranSuper(props) {
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
                        {/* <AddLaboranItem lab={props.lab} errors={props.errors} /> */}
                        <EditLaboranItem lab={props.lab} errors={props.errors} user={props.user[0]} />
                    </div>
                </div>
            </div>
        </>
    )
}