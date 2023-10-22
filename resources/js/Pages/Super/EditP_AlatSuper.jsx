import EditP_AlatItem from '@/Components/Super/EditP_AlatItem';
import Navbar from '@/Components/Super/Navbar';
import Sidebar from '@/Components/Super/Sidebar';
import Tron from '@/Components/Super/Tron';


import { Head, Link } from '@inertiajs/react';

export default function EditP_AlatSuper(props) {
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <Navbar active={props.active} auth={props.auth} />
                <Tron />
                <div className="grid grid-cols-1 lg:grid-cols-9">
                    <div className="lg:col-span-2"></div>
                    <div className="col-span-7 dashboard-isi">
                        <EditP_AlatItem
                            pinjam={props.daftar_p_alat}
                            p_alat={props.p_alat}
                            p_alatId={props.p_alatId}
                            p_alatTotal={props.p_alatTotal}
                            count_p_alat={props.count_p_alat}
                            lab={props.lab}
                            alat={props.alat}
                            errors={props.errors}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
