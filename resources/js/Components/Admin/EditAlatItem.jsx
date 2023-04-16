import { Link, router } from "@inertiajs/react"
import { useState } from "react"

const EditAlatItem = ({ alat, errors }) => {
    const [Notif, setNotif] = useState(false);

    const [name, setName] = useState(alat.name)
    const [total, setTotal] = useState(alat.total)
    const [color, setColor] = useState(alat.color)
    const [desc, setDesc] = useState('')

    const handleSubmit = (e) => {
        const data = {
            name, total, color, desc
        }
        router.post('/admin/alat/' + e.id + '/edit', data)
    }
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="flex items-center ml-1">
                        <Link className="btn btn-sm btn-green" method="get" href={route('admin-alat')}>
                            Daftar Alat
                        </Link>
                        <h1 >Form Edit Alat</h1>
                    </div>
                    <div className="card">
                        <div className="grid lg:grid-cols-4">
                            <div className="lg:col-span-2 col-span-4 form-control m-2">
                                <label className="label">
                                    <span className="label-text">Nama Alat</span>
                                </label>
                                <input type="text" placeholder="Nama Alat" className="input input-bordered w-full" value={name ? name : ""} onChange={(name) => setName(name.target.value)} />
                                <label className="label">
                                    {errors.name &&
                                        <span className="label-text-alt text-error">{errors.name}</span>
                                    }
                                </label>
                            </div>
                            <div className="lg:col-span-1 col-span-2 form-control m-2">
                                <label className="label">
                                    <span className="label-text">Total</span>
                                </label>
                                <input type="text" value={total ? total : ""} onChange={(total) => setTotal(total.target.value)} placeholder="Total Alat" className="input input-bordered  w-full" />
                                <label className="label">
                                    {errors.total &&
                                        <span className="label-text-alt text-error">{errors.total}</span>
                                    }
                                </label>
                            </div>
                            <div className="lg:col-span-1 col-span-2 form-control m-2">
                                <label className="label">
                                    <span className="label-text">Warna Label</span>
                                </label>
                                <input type="color" value={color ? color : ""} onChange={(color) => setColor(color.target.value)} placeholder="example@gmail.com" className="input input-bordered  w-full" />
                                <label className="label">
                                    {errors.color &&
                                        <span className="label-text-alt text-error">{errors.color}</span>
                                    }
                                </label>
                            </div>
                            <hr className="col-span-4" />
                        </div>
                        <div className="flex justify-center">
                            <button className="btn btn-sm btn-wide btn-blue mt-5" onClick={() => handleSubmit(alat)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditAlatItem