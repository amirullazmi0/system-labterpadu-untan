import DetailPAlatItem from '@/Components/Super/DetailPAlatItem';
import Navbar from '@/Components/Super/Navbar';
import Sidebar from '@/Components/Super/Sidebar';
import Tron from '@/Components/Super/Tron';
import { Head, Link } from '@inertiajs/react';

export default function DetailPAlatSuper(props) {
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
                        {/* <DetailPRuanganItem props={props} /> */}
                        <DetailPAlatItem props={props} />
                    </div>
                </div>
            </div>
        </>
    )
}
