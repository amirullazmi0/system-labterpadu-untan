import { Link } from "@inertiajs/react"

const DetailLaboranItem = ({ props }) => {
    const handle = (e) => {
        handleDelete(e)
    }
    const handleDelete = (e) => {
        if (window.confirm('Are you sure you want to delete this data?')) {
            const name = e.name
            const data = {
                name
            }
            router.get('/super/laboran/' + e.id + '/delete', data)
        }
    };
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="lg:flex grid lg:items-center ml-1">
                        <Link className="btn btn-sm btn-green" method="get" href={route('super-laboran')}>
                            Daftar Laboran
                        </Link>
                    </div>
                    <div className="card">
                        <div className="flex">
                            <div className="head1">
                                <span className="font-bold uppercase text-xl">Laboran | </span>
                                <span>{props.user[0].name}</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="grid grid-cols-5">
                                <div className="col-span-1">
                                    Email
                                </div>
                                <div className="col-span-1">
                                    :
                                </div>
                                <div className="col-span-3">
                                    {props.user[0].email}
                                </div>
                            </div>
                            <div className="grid grid-cols-5">
                                <div className="col-span-1">
                                    Posisi
                                </div>
                                <div className="col-span-1">
                                    :
                                </div>
                                <div className="col-span-3">
                                    {props.user[0].level == '1' && "Laboran"}
                                </div>
                            </div>
                            <div className="grid grid-cols-5">
                                <div className="col-span-1">
                                    Lab
                                </div>
                                <div className="col-span-1">
                                    :
                                </div>
                                <div className="col-span-3">
                                    {props.lab.map((lab) => (
                                        lab.id == props.user[0].lab_id && lab.name
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-5">
                                <div className="col-span-1">
                                    Alamat
                                </div>
                                <div className="col-span-1">
                                    :
                                </div>
                                <div className="col-span-3">
                                    {!props.user[0].address ? "-" : props.user[0].address}
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-5">
                            <Link method="get" href={'/super/laboran/' + props.user[0].id + '/edit'} data={{ name: props.user[0].name }} className="btn btn-sm btn-orange mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </Link>
                            {/* method="get" href={'/super/laboran/' + laboran.id + '/delete'} data={{ name: laboran.name }} */}
                            <button className="btn btn-sm btn-red" onClick={() => handle(props.user[0])}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DetailLaboranItem