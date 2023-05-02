import Navbar from '@/Components/Super/Navbar';
import Sidebar from '@/Components/Super/Sidebar';
import Tron from '@/Components/Super/Tron';
import EditLaboranItem from '@/Components/Super/EditLaboranItem';
import { Head, Link } from '@inertiajs/react';

export default function EditLaboranSuper(props) {
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <Navbar active={props.active} auth={props.auth} />
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
