import Navbar from '@/Components/Super/Navbar';
import Sidebar from '@/Components/Super/Sidebar';
import Tron from '@/Components/Super/Tron';
import DashboardItem from '@/Components/Super/DashboardItem';
import { Head, Link } from '@inertiajs/react';

export default function DashboardSuper(props) {
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <Navbar active={props.active} auth={props.auth} />
                <Tron />
                <div className="grid grid-cols-1 lg:grid-cols-9">
                    <div className="lg:col-span-2"></div>
                    <div className="col-span-7 dashboard-isi">
                        <DashboardItem props={props} />
                    </div>
                </div>
            </div>
        </>
    )
}
