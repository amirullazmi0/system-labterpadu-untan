import Navbar from '@/Components/Super/Navbar';
import ProfilItem from '@/Components/Super/ProfilItem';
import Tron from '@/Components/Super/Tron';
import { Head, Link } from '@inertiajs/react';

export default function ProfilSuper(props) {
    console.log('props : ', props.temp_berkas);
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <Navbar active={props.active} auth={props.auth} />
                <Tron />
                <div className="grid grid-cols-1 lg:grid-cols-9">
                    <div className="lg:col-span-2"></div>
                    <div className="col-span-7 dashboard-isi">
                        <ProfilItem props={props} user={props.user[0]} berkass={props.temp_berkas} notif={props.flash} errors={props.errors} />
                    </div>
                </div>
            </div>
        </>
    )
}
