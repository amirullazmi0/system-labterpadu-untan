import { Link, router } from "@inertiajs/react"
import { useState } from "react"

const AddRuanganItem = ({ errors }) => {
    const [Notif, setNotif] = useState(false);

    const [name, setName] = useState('')
    const [color, setColor] = useState('#000000')
    const [desc, setDesc] = useState('')

    const handleSubmit = () => {
        const data = {
            name, color, desc
        }
        console.log('data : ', data);
        router.post('/super/add-ruangan', data)
    }
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="flex items-center ml-1">
                        <Link className="btn btn-sm btn-green" method="get" href={route('super-ruangan')}>
                            Daftar Ruangan
                        </Link>
                        <h1>Form tambah Ruangan</h1>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="card">
                                <div className="lg:grid lg:grid-cols-2">
                                    <div className="form-control m-2">
                                        <label className="label">
                                            <span className="label-text">Nama Ruangan</span>
                                        </label>
                                        <input type="text" placeholder="Nama Ruangan" className="input input-bordered  max-w-xs w-full" value={name} onChange={(name) => setName(name.target.value)} />
                                        <label className="label">
                                            {errors.name &&
                                                <span className="label-text-alt text-error">{errors.name}</span>
                                            }
                                        </label>
                                    </div>
                                    <div className="form-control m-2">
                                        <label className="label">
                                            <span className="label-text">Warna Label</span>
                                        </label>
                                        <input type="color" value={color} onChange={(color) => setColor(color.target.value)} placeholder="example@gmail.com" className="input input-bordered  w-full" />
                                        <label className="label">
                                            {errors.color &&
                                                <span className="label-text-alt text-error">{errors.color}</span>
                                            }
                                        </label>
                                    </div>
                                    <div className="col-span-1 lg:col-span-2 form-control m-2">
                                        <label className="label">
                                            <span className="label-text">Deskripsi</span>
                                        </label>
                                        <textarea value={desc} onChange={(desc) => setDesc(desc.target.value)} className="textarea textarea-bordered" placeholder="Deskripsi Ruangan"></textarea>
                                        <label className="label">
                                            {errors.desc &&
                                                <span className="label-text-alt text-error">{errors.desc}</span>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button className="btn btn-sm btn-wide btn-blue mt-5" onClick={() => handleSubmit()}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddRuanganItem