import Navbar from '@/Components/Admin/Navbar';
import ProfilItem from '@/Components/Admin/ProfilItem';
import Tron from '@/Components/Admin/Tron';
import { Head, Link } from '@inertiajs/react';

export default function ProfilAdmin(props) {
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <Navbar lab={props.lab} auth={props.auth} active={props.active} />
                <Tron />
                <div className="grid grid-cols-1 lg:grid-cols-9">
                    <div className="lg:col-span-2"></div>
                    <div className="col-span-7 dashboard-isi">
                        <ProfilItem user={props.user[0]} notif={props.flash} errors={props.errors} />
                    </div>
                </div>
            </div>
        </>
    )
}
