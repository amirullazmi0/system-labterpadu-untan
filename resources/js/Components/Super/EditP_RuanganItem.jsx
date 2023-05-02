import { Link, router } from "@inertiajs/react"
import { useEffect, useState } from "react"

const EditP_RuanganItem = ({ pr, ruangan, errors }) => {
    const [Notif, setNotif] = useState(false);

    const [name, setName] = useState(pr.name)
    const [ruangan_id, setRuanganId] = useState(pr.ruangan_id)
    const [event, setEvent] = useState(pr.event)
    const [date_start, setDateStart] = useState(pr.date_start)
    const [date_end, setDateEnd] = useState(pr.date_end)
    const [time_start, setTimeStart] = useState(pr.time_start)
    const [time_end, setTimeEnd] = useState(pr.time_end)
    const [desc, setDesc] = useState(pr.desc)
    const [berkas, setBerkas] = useState('')
    const [berkasLama, setBerkasLama] = useState(pr.berkas)


    const [banyakHari, setBanyakHari] = useState(false)

    useEffect(() => {
        <>
            {pr.date_end && setBanyakHari(true)}
        </>
    }, [])

    const handleBanyakHari = () => {
        { banyakHari == false && setBanyakHari(true) }
        { banyakHari == true && setBanyakHari(false), setDateEnd('') }
    }
    const handleSubmit = () => {
        const data = {
            name, ruangan_id, event, date_start, date_end, time_start, time_end, desc, berkas
        }
        router.post('/super/p-ruangan/' + pr.id + '/edit', data)
    }
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="lg:flex grid lg:items-center ml-1">
                        <Link className="btn btn-sm btn-green" method="get" href={route('super-p-ruangan')}>
                            Daftar Peminjaman
                        </Link>
                        <h1 className="hidden lg:block">Form Edit Peminjaman Ruangan</h1>
                    </div>
                    <div className="card">
                        <div className="lg:grid lg:grid-cols-3">
                            {ruangan == null || ruangan.length == 0 &&
                                <div className="lg:col-span-3">
                                    <div className="alert alert-warning shadow-lg">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            <span>Warning: Tambahkan Ruangan Terlebih Dahulu!</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="form-control m-1">
                                <label className="label">
                                    <span className="label-text">Nama Peminjam</span>
                                </label>
                                <input type="text" placeholder="Nama Peminjam Ruangan" className="input input-bordered max-w-xs w-full" value={name ? name : ""} onChange={(name) => setName(name.target.value)} />
                                <label className="label">
                                    {errors.name && !name &&
                                        <span className="label-text-alt text-error">{errors.name}</span>
                                    }
                                </label>
                            </div>
                            <div className="form-control m-1">
                                <label className="label">
                                    <span className="label-text">Ruangan</span>
                                </label>
                                <select defaultValue={ruangan_id ? ruangan_id : "DEFAULT"} onChange={(ruangan_id) => setRuanganId(ruangan_id.target.value)} className="select select-bordered w-full max-w-xs" disabled={ruangan == null || ruangan.length == 0 ? true : false}>
                                    <option value="DEFAULT" className="hidden" disabled>Pilih Ruangan</option>
                                    {ruangan.map((ruangan) => (
                                        <option value={ruangan.id} key={ruangan.id}>{ruangan.name}</option>
                                    ))}
                                </select>
                                <label className="label">
                                    {errors.ruangan_id && !ruangan_id &&
                                        <span className="label-text-alt text-error">Please select ruangan</span>
                                    }
                                </label>
                            </div>
                            <div className="form-control m-1">
                                <label className="label">
                                    <span className="label-text">Nama Kegiatan / Event</span>
                                </label>
                                <input type="text" placeholder="Nama kegiatan atau event" className="input input-bordered max-w-xs w-full" value={event ? event : ""} onChange={(event) => setEvent(event.target.value)} />
                                <label className="label">
                                    {errors.event && !event &&
                                        <span className="label-text-alt text-error">{errors.event}</span>
                                    }
                                </label>
                            </div>
                            <div className="col-span-2">
                                <div className="card-form m-1">
                                    <div className="grid grid-cols-2">
                                        <div className="col-span-2">
                                            <div className="flex justify-end">
                                                <label className="ml-1 mr-3" htmlFor="">Banyak Hari</label>
                                                <input type="checkbox" checked={banyakHari == false ? false : "checked"}
                                                    onChange={handleBanyakHari}
                                                    className="checkbox" />
                                            </div>
                                        </div>
                                        <div className={banyakHari == false ? "col-span-2" : "col-span-1"}>
                                            <div className="form-control mr-1">
                                                <label className="label">
                                                    <span className="label-text">Tanggal Mulai</span>
                                                </label>
                                                <input type="date" className="input input-bordered w-full" value={date_start ? date_start : ""} onChange={(date_start) => setDateStart(date_start.target.value)} />
                                                <label className="label">
                                                    {errors.date_start && !date_start &&
                                                        <span className="label-text-alt text-error">{errors.date_start}</span>
                                                    }
                                                </label>
                                            </div>
                                        </div>
                                        <div className={banyakHari == false ? "form-control hidden" : "form-control block"}>
                                            <label className="label">
                                                <span className="label-text">Tanggal Selesai</span>
                                            </label>
                                            <input type="date" className="input input-bordered max-w-xs w-full" value={date_end ? date_end : ""} onChange={(date_end) => setDateEnd(date_end.target.value)} />
                                            <label className="label">
                                                {errors.date_end && !date_end &&
                                                    <span className="label-text-alt text-error">{errors.date_end}</span>
                                                }
                                            </label>
                                        </div>
                                        <div className="form-control mr-1">
                                            <label className="label">
                                                <span className="label-text">Waktu Mulai</span>
                                            </label>
                                            <input type="time" className="input input-bordered max-w-xs w-full" value={time_start ? time_start : ""} onChange={(time_start) => setTimeStart(time_start.target.value)} />
                                            <label className="label">
                                                {errors.time_start && !time_start &&
                                                    <span className="label-text-alt text-error">{errors.time_start}</span>
                                                }
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Waktu Selesai</span>
                                            </label>
                                            <input type="time" className="input input-bordered max-w-xs w-full" value={time_end ? time_end : ""} onChange={(time_end) => setTimeEnd(time_end.target.value)} />
                                            <label className="label">
                                                {errors.time_end && !time_end &&
                                                    <span className="label-text-alt text-error">{errors.time_end}</span>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-form m-1">
                                <div className="form-control m-1 mt-0">
                                    <label className="label">
                                        <span className="label-text">File .pdf (optional)</span>
                                    </label>
                                    <input type="file" accept=".pdf" onChange={(berkas) => setBerkas(berkas.target.files[0])} className="file-input file-input-md file-input-bordered w-full max-w-xs" />
                                    <label className="label">
                                        {errors.berkas &&
                                            <span className="label-text-alt text-error">{errors.berkas}</span>
                                        }
                                    </label>
                                    {berkasLama &&
                                        <>
                                            <Link className="btn btn-sm btn-orange">{berkasLama}</Link>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 lg:col-span-3 m-1">
                            <div className="grid grid-cols-2">
                                <div className="col-span-2 form-control mt-0 mb-0">
                                    <label className="label">
                                        <span className="label-text">Deskripsi</span>
                                    </label>
                                    <textarea rows="2" value={desc ? desc : ""} onChange={(desc) => setDesc(desc.target.value)} className="textarea textarea-bordered" placeholder="Deskripsi Ruangan"></textarea>
                                    <label className="label">
                                        {errors.desc &&
                                            <span className="label-text-alt text-error">{errors.desc}</span>
                                        }
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="btn btn-sm btn-wide btn-blue mt-5" onClick={() => handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditP_RuanganItem