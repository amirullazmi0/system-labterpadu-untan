import { Link, router } from "@inertiajs/react"
import { useState } from "react"

const AddRuanganItem = ({ errors }) => {
    const [Notif, setNotif] = useState(false);

    const [name, setName] = useState([])
    const valueName = (event) => {
        const no = event.target.getAttribute("no");
        setName(prevItems => {
            const NName = [...prevItems];
            NName[no] = event.target.value
            return NName
        })
    }

    const [color, setColor] = useState(['#000000'])
    const valueColor = (event) => {
        const no = event.target.getAttribute("no");
        setColor(prevItems => {
            const NDesc = [...prevItems];
            NDesc[no] = event.target.value
            return NDesc
        })
    }
    const [desc, setDesc] = useState([''])
    const valueDesc = (event) => {
        const no = event.target.getAttribute("no");
        setDesc(prevItems => {
            const NColor = [...prevItems];
            NColor[no] = event.target.value
            return NColor
        })
    }

    const [jumlah, setJumlah] = useState(1)
    const [banyakAlat, setBanyakAlat] = useState(jumlah)

    const tambahForm = (e) => {
        name[e - 1] != null && setBanyakAlat(banyakAlat + 1)
        setColor(prevItems => {
            const NColor = [...prevItems];
            NColor[e] = '#000000'
            return NColor
        })
        setDesc(prevItems => {
            const NDesc = [...prevItems];
            NDesc[e] = ''
            return NDesc
        })
    }
    const kurangFormAlat = () => {
        color.splice(banyakAlat - 1, 1)
        desc.splice(banyakAlat - 1, 1)
        name.splice(banyakAlat - 1, 1)
        setBanyakAlat(banyakAlat - 1)
    }

    const renderFormRuangan = () => {
        const formRuangan = []
        for (let i = 0; i < banyakAlat; i++) {
            formRuangan.push(
                <div key={i}>
                    <div className="grid grid-cols-2 lg:grid-cols-6">
                        <div className="col-span-2 lg:col-span-6">
                            <h2 className="font-bold">Form Ruangan {i + 1}</h2>
                        </div>
                        <div className="lg:col-span-2 form-control m-2">
                            <label className="label">
                                <span className="label-text">Nama Ruangan</span>
                            </label>

                            <input no={i} type="text" placeholder="Nama Ruangan" className={name[i] == null || !name[i] || name[i] == "" ? "input input-bordered input-error w-full" : "input input-bordered  w-full"} onChange={valueName} />
                            <label className="label">
                                {errors.name || name[i] == null || !name[i] || name[i] == "" ?
                                    <span className="label-text-alt text-error">Nama Ruangan Harus Di isi</span> : ""
                                }
                            </label>
                        </div>
                        <div className="form-control m-2">
                            <label className="label">
                                <span className="label-text">Warna Label</span>
                            </label>
                            <input no={i} type="color" onChange={valueColor} placeholder="example@gmail.com" className="input input-bordered  w-full" />
                            <label className="label">
                                {errors.color &&
                                    <span className="label-text-alt text-error">{errors.color}</span>
                                }
                            </label>
                        </div>
                        <div className="col-span-2 lg:col-span-3 form-control m-2">
                            <div className="items-center">
                                <label className="label">
                                    <span className="label-text">Deskripsi</span>
                                </label>
                                <div className="flex">
                                    <textarea no={i} onChange={valueDesc} className="textarea lg:w-96 w-full textarea-bordered" placeholder="Deskripsi Ruangan"></textarea>
                                    {i > 0 &&
                                        <button className="text-red-500 w-10 h-10 rounded-full" onClick={kurangFormAlat}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    }
                                    <label className="label">
                                        {errors.desc &&
                                            <span className="label-text-alt text-error">{errors.desc}</span>
                                        }
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return formRuangan
    }


    const handleSubmit = () => {
        const data = {
            name, color, desc
        }
        router.post('/super/add-ruangan', data)
    }
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="lg:flex grid lg:items-center ml-1">
                        <Link className="btn btn-sm btn-green" method="get" href={route('super-ruangan')}>
                            Daftar Ruangan
                        </Link>
                        <h1 className="hidden lg:block">Form tambah Ruangan</h1>
                    </div>
                    <div className="card">
                        {renderFormRuangan()}
                        <div className="flex justify-end items-center">
                            <button className="btn btn-sm" onClick={() => tambahForm(banyakAlat)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
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
export default AddRuanganItem