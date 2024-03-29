import { Link, router } from "@inertiajs/react"
import moment from "moment/moment"
import { useEffect, useState } from "react"

const AddP_AlatItem = ({ pinjam, lab, alat, errors }) => {
    const [jumlah, setJumlah] = useState(1)
    const [name, setName] = useState('')
    const [event, setEvent] = useState('')
    const [date_start, setDateStart] = useState('')
    const [date_end, setDateEnd] = useState('')
    const [time_start, setTimeStart] = useState('')
    const [time_end, setTimeEnd] = useState('')
    const [desc, setDesc] = useState('')
    const [berkas, setBerkas] = useState('')
    const [alat_id, setAlatId] = useState([])
    const [banyakHari, setBanyakHari] = useState(false);
    const [banyakAlat, setBanyakAlat] = useState(jumlah)
    const [aalat, setAlat] = useState(alat)

    const valueAlatId = (event) => {
        const selectedIndex = event.target.selectedIndex; // mendapatkan index dari opsi yang dipilih
        const selectedOption = event.target.options[selectedIndex]; // mendapatkan elemen <option> yang dipilih
        const no = selectedOption.getAttribute("no");

        setAlatId(prevItems => {
            const alatID = [...prevItems]
            alatID[no] = event.target.value
            return alatID
        })

        setTotal(prevItems => {
            const Ntotal = [...prevItems];
            Ntotal[no] = 0
            return Ntotal
        })
    }
    const [total, setTotal] = useState([1])
    const valueTotal = (event) => {
        const no = event.target.getAttribute("no");
        setTotal(prevItems => {
            const Ntotal = [...prevItems];
            Ntotal[no] = event.target.value
            return Ntotal
        })
    }

    const handleBanyakHari = () => {
        { banyakHari == false && setBanyakHari(true) }
        { banyakHari == true && setBanyakHari(false), setDateEnd('') }
    }

    const tambahFormAlat = (e) => {
        {
            alat_id[e - 1] != null && setBanyakAlat(banyakAlat + 1)
            setTotal(prevItems => {
                const Ntotal = [...prevItems];
                Ntotal[e] = 1
                return Ntotal
            })

        }
    }
    const kurangFormAlat = () => {
        setBanyakAlat(banyakAlat - 1)
        alat_id.splice(banyakAlat - 1, 1)
        total.splice(banyakAlat - 1, 1)
    }

    const [notAvailable, setNotAvailable] = useState([])
    const isNotAvailable = () => {
        const roomsNotAvailable = [];

        for (let j = 0; j < pinjam.length; j++) {
            const waktuMulai = moment(time_start, "HH:mm");
            const waktuSelesai = moment(time_end, "HH:mm");
            const waktuMulaiPinjam = moment(pinjam[j].time_start, "HH:mm");
            const waktuSelesaiPinjam = moment(pinjam[j].time_end, "HH:mm");
            if ((pinjam[j].date_start && date_start && ((moment(date_start).isSame(pinjam[j].date_start)) || (moment(date_start).isSame(pinjam[j].date_end))) || (moment(date_start).isAfter(pinjam[j].date_start) && moment(date_start).isBefore(pinjam[j].date_end)))
                || (pinjam[j].date_end && date_end && ((moment(date_end).isSame(pinjam[j].date_start)) || (moment(date_end).isSame(pinjam[j].date_end))) || (moment(date_end).isAfter(pinjam[j].date_start) && moment(date_end).isBefore(pinjam[j].date_end)))
            ) {
                if ((waktuMulai >= waktuMulaiPinjam && waktuMulai <= waktuSelesaiPinjam) || (waktuSelesai >= waktuMulaiPinjam && waktuSelesai <= waktuSelesaiPinjam)) {
                    const existingItemIndex = roomsNotAvailable.findIndex(ite => ite.id == pinjam[j].alat_id);
                    if (existingItemIndex) {
                        roomsNotAvailable.push({
                            id: pinjam[j].alat_id,
                            name: pinjam[j].alat.name,
                            total: parseInt(pinjam[j].total),
                            dis: true,
                        });
                    } else {
                        roomsNotAvailable[existingItemIndex].total += parseInt(pinjam[j].total);

                    }
                }
            }
        }
        setNotAvailable(roomsNotAvailable); // Langkah 3

    }

    const renderFormAlat = () => {
        const formAlat = []
        for (let i = 0; i < banyakAlat; i++) {
            formAlat.push(
                <>
                    <div className="grid grid-cols-10">
                        <label className="col-span-10 " htmlFor="">Form Alat {i + 1}</label>
                        <div className="lg:col-span-5 col-span-5 form-control">
                            <select defaultValue={'DEFAULT'} className="select select-bordered w-full" onChange={valueAlatId} disabled={alat == null || alat.length == 0 ? true : false}>
                                <option value="DEFAULT" className="hidden" disabled>Pilih Alat</option>
                                {alat.map((alat, index) => {
                                    const notFound = notAvailable.find((not) => not.id == alat.id)
                                    const to = alat.total
                                    if (notFound) {
                                        const sisa = parseInt(alat.total) - parseInt(notFound.total);

                                        // Merubah total pada alat yang ada di dalam state aalat
                                        const updatedAlat = [...aalat];
                                        updatedAlat[index] = { total: parseInt(alat.total) - parseInt(notFound.total) };
                                        // setAlat(updatedAlat);

                                        return (
                                            <option className="bg-yellow-400 text-white" no={i} value={alat.id} key={index + 1}>
                                                {alat.name} (Sisa : {updatedAlat[index].total})
                                            </option>
                                        )
                                    } else {
                                        return (
                                            <option className="" no={i} value={alat.id} key={index + 1}>
                                                {alat.name} (Tersedia : {alat.total})
                                            </option>
                                        );
                                    }
                                })}
                            </select>
                            <label className="label">
                                {errors.alat_id && !alat_id[i] &&
                                    <span className="label-text-alt text-error">Please select alat</span>
                                }
                            </label>
                        </div>
                        <div className="form-control lg:ml-4 m-1">
                            <div className="flex items-center">
                                <label className="label">
                                    <span className="label-text">Total</span>
                                </label>
                                {alat.map((alat, index) => {
                                    if (alat.id == alat_id[i]) {
                                        const notFound = notAvailable.find((not) => not.id == alat.id)
                                        if (notFound) {
                                            return (
                                                <input
                                                    key={alat.id}
                                                    no={i}
                                                    defaultValue={1}
                                                    value={parseInt(total[i]) > parseInt(alat.total) ? parseInt(alat.total) : parseInt(total[i])}
                                                    onChange={valueTotal}
                                                    type="number"
                                                    min={0}
                                                    max={parseInt(alat.total) - parseInt(notFound.total)}
                                                    className="input w-44 text-center input-bordered bg-white" />
                                            )
                                        } else {
                                            return (
                                                <input
                                                    key={alat.id}
                                                    no={i}
                                                    defaultValue={1}
                                                    value={parseInt(total[i]) > parseInt(alat.total) ? parseInt(alat.total) : parseInt(total[i])}
                                                    onChange={valueTotal}
                                                    type="number"
                                                    min={0}
                                                    max={parseInt(alat.total)}
                                                    className="input w-44 text-center input-bordered bg-white" />
                                            )
                                        }

                                    }
                                })}
                                {i > 0 &&
                                    <button className="text-red-500 rounded-full" onClick={kurangFormAlat}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                }
                            </div>
                        </div>
                    </div >
                </>
            )
        }

        return formAlat
    }
    const handleSubmit = () => {
        const data = {
            name, alat_id, total, event, date_start, date_end, time_start, time_end, desc, berkas
        }
        console.log('data : ', data);
        router.post('/super/add-p-alat', data)
    }


    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="lg:flex grid lg:items-center ml-1">
                        <Link className="btn btn-sm btn-green" method="get" href={route('super-p-ruangan')}>
                            Daftar Peminjaman
                        </Link>
                        <h1 className="hidden lg:block" >Form Tambah Peminjaman Alat</h1>
                    </div>
                    <div className="card">
                        <div className="lg:grid lg:grid-cols-3">
                            {alat == null || alat.length == 0 &&
                                <div className="lg:col-span-3">
                                    <div className="alert alert-warning shadow-lg">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            <span>Warning: Tambahkan Alat Terlebih Dahulu!</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="lg:col-span-1 form-control m-1">
                                <label className="label">
                                    <span className="label-text">Nama Peminjam</span>
                                </label>
                                <input type="text" placeholder="Nama Peminjam Alat" className="input input-bordered max-w-xs w-full" value={name} onChange={(name) => setName(name.target.value)} />
                                <label className="label">
                                    {errors.name && !name &&
                                        <span className="label-text-alt text-error">{errors.name}</span>
                                    }
                                </label>
                            </div>

                            <div className="lg:col-span-2 form-control m-1">
                                <label className="label">
                                    <span className="label-text">Nama Kegiatan / Event</span>
                                </label>
                                <input type="text" placeholder="Nama kegiatan atau event" className="input input-bordered w-full" value={event} onChange={(event) => setEvent(event.target.value)} />
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
                                                <input type="date" className="input input-bordered w-full" value={date_start} onChange={(date_start) => setDateStart(date_start.target.value)} />
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
                                            <input type="date" className="input input-bordered max-w-xs w-full" value={date_end} onChange={(date_end) => setDateEnd(date_end.target.value)} />
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
                                            <input type="time" className="input input-bordered max-w-xs w-full" value={time_start} onChange={(time_start) => setTimeStart(time_start.target.value)} />
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
                                            <input type="time" className="input input-bordered max-w-xs w-full" value={time_end} onChange={(time_end) => setTimeEnd(time_end.target.value)} />
                                            <label className="label">
                                                {errors.time_end && !time_end &&
                                                    <span className="label-text-alt text-error">{errors.time_end}</span>
                                                }
                                            </label>
                                        </div>
                                        <button onClick={() => isNotAvailable()} className="mt-5 mb-3 btn btn-sm lg:btn-wide">
                                            Cek Alat
                                        </button>
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
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="card-form m-1">
                                    {renderFormAlat()}
                                    <div className="flex justify-end items-center">
                                        <button className="btn btn-sm" onClick={() => tambahFormAlat(banyakAlat)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 lg:col-span-3 m-1">
                                <div className="grid grid-cols-2">
                                    <div className="col-span-2 form-control mt-0 mb-0">
                                        <label className="label">
                                            <span className="label-text">Deskripsi</span>
                                        </label>
                                        <textarea rows="2" value={desc} onChange={(desc) => setDesc(desc.target.value)} className="textarea textarea-bordered" placeholder="Deskripsi Peminjaman"></textarea>
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
            </div>
        </>
    )
}
export default AddP_AlatItem