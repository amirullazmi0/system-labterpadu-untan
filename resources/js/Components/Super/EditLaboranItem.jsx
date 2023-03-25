import { Link, router } from "@inertiajs/react"
import { useState } from "react"

const EditLaboranItem = ({ lab, errors, user }) => {
    const [Notif, setNotif] = useState(false);

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [level, setLevel] = useState('1')
    const [lab_id, setLab_id] = useState(user.lab_id)
    const [address, setAddress] = useState(user.address)
    console.log('address : ', address);
    const handleSubmit = () => {
        const data = {
            name, email, password, level, lab_id, address
        }
        router.post('/super/add-laboran', data)
        console.log('data : ', data);
        setNotif(true)
        // setName('')
        // setEmail('')
        setPassword('')
        // setLab_id('')
        // setAddress('')
    }
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="flex items-center ml-1">
                        <Link className="btn btn-sm btn-green" method="get" href={route('super-laboran')}>
                            Daftar Laboran
                        </Link>
                        <h1>Form Edit laboran</h1>
                    </div>
                    <div className="card">
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            <div className="form-control m-2">
                                <label className="label">
                                    <span className="label-text">Nama Lengkap</span>
                                </label>
                                <input type="text" placeholder="Nama Lengkap" className="input input-bordered max-w-xs" value={name} onChange={(name) => setName(name.target.value)} />
                                <label className="label">
                                    {errors.name &&
                                        <span className="label-text-alt text-error">{errors.name}</span>
                                    }
                                </label>
                            </div>
                            <div className="form-control m-2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" value={email} onChange={(email) => setEmail(email.target.value)} placeholder="example@gmail.com" className="input input-bordered max-w-xs" />
                                <label className="label">
                                    {errors.email &&
                                        <span className="label-text-alt text-error">{errors.email}</span>
                                    }
                                </label>
                            </div>
                            {/* <div className="form-control m-2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" value={password} onChange={(password) => setPassword(password.target.value)} placeholder="password" className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                    {errors.password &&
                                        <span className="label-text-alt text-error">{errors.password}</span>
                                    }
                                </label>
                            </div> */}
                            <div className="form-control m-2">
                                <label className="label">
                                    <span className="label-text">Lab</span>
                                </label>
                                <select defaultValue={lab_id} onChange={(lab_id) => setLab_id(lab_id.target.value)} className="select select-bordered w-full max-w-xs">
                                    {/* <option value="DEFAULT" className="hidden" disabled>Pilih Lab</option> */}
                                    {lab.map((lab) => (
                                        <option value={lab.id} key={lab.id}>{lab.name}</option>
                                    ))}
                                </select>
                                <label className="label">
                                    {errors.lab_id &&
                                        <span className="label-text-alt text-error">Please select lab</span>
                                    }
                                </label>
                            </div>
                            <div className="col-span-1 lg:col-span-2 form-control m-2">
                                <label className="label">
                                    <span className="label-text">Alamat</span>
                                </label>
                                <textarea value={address} onChange={(address) => setAddress(address.target.value)} className="textarea textarea-bordered" placeholder="Alamat"></textarea>
                                <label className="label">
                                    {errors.address &&
                                        <span className="label-text-alt text-error">{errors.address}</span>
                                    }
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="btn btn-sm btn-wide btn-blue mt-5" onClick={() => handleSubmit()} >Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditLaboranItem