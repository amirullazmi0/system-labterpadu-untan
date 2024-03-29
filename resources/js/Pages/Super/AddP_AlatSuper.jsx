import AddP_AlatItem from '@/Components/Super/AddP_AlatItem';
import Navbar from '@/Components/Super/Navbar';
import Sidebar from '@/Components/Super/Sidebar';
import Tron from '@/Components/Super/Tron';


import { Head, Link } from '@inertiajs/react';

export default function AddP_AlatSuper(props) {
    // console.log('props :', props);
    return (
        <>
            <Head title={props.title} />
            <div className="bg-body">
                <Navbar active={props.active} auth={props.auth} />
                <Tron />
                <div className="grid grid-cols-1 lg:grid-cols-9">
                    <div className="lg:col-span-2"></div>
                    <div className="col-span-7 dashboard-isi">
                        <AddP_AlatItem pinjam={props.daftar_p_alat} lab={props.lab} alat={props.alat} errors={props.errors} />
                    </div>
                </div>
            </div>
        </>
    )
}
