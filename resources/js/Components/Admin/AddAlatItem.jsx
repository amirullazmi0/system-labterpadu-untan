import { Link, router } from "@inertiajs/react"
import { useState } from "react"

const AddAlatItem = ({ alat, errors }) => {
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

    const [total, setTotal] = useState([1])
    const valueTotal = (event) => {
        const no = event.target.getAttribute("no");
        setTotal(prevItems => {
            const NTotal = [...prevItems];
            NTotal[no] = event.target.value
            return NTotal
        })
    }

    const [color, setColor] = useState(['#000000'])
    const valueColor = (event) => {
        const no = event.target.getAttribute("no");
        setColor(prevItems => {
            const NColor = [...prevItems];
            NColor[no] = event.target.value
            return NColor
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

    const handleSubmit = () => {
        const data = {
            name, total, color, desc
        }
        // console.log("data : ", data);
        router.post('/admin/add-alat', data)
    }

    const [banyakAlat, setBanyakAlat] = useState(jumlah)

    const tambahFormAlat = (e) => {
        !name[e - 1] || name[e - 1] != null && setBanyakAlat(banyakAlat + 1)
        setTotal(prevItems => {
            const NTotal = [...prevItems];
            NTotal[e] = 1
            return NTotal
        })
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
        setBanyakAlat(banyakAlat - 1)
        name.splice(banyakAlat - 1, 1)
        total.splice(banyakAlat - 1, 1)
        color.splice(banyakAlat - 1, 1)
        desc.splice(banyakAlat - 1, 1)
    }
    const renderFormAlat = () => {
        const formAlat = []
        for (let i = 0; i < banyakAlat; i++) {
            formAlat.push(
                <>
                    <div className="grid grid-cols-4 lg:grid-cols-7">
                        <div className="lg:col-span-7 col-span-4">
                            <h2 className="font-bold">Form Alat {i + 1}</h2>
                        </div>
                        <div className="lg:col-span-2 col-span-4 form-control m-2">
                            <label className="label">
                                <span className="label-text">Nama Alat</span>
                            </label>
                            <input no={i} type="text" placeholder="Nama Alat" className={!name[i] ? "input input-bordered input-error w-full" : "input input-bordered w-full"} onChange={valueName} />
                            <label className="label">
                                {!name[i] &&
                                    < span className="label-text-alt text-error">Form Nama Harus di Isi</span>
                                }
                            </label>
                        </div>
                        <div className="lg:col-span-1 col-span-2 form-control m-2">
                            <label className="label">
                                <span className="label-text">Total</span>
                            </label>
                            <input type="number" min={1} no={i} onChange={valueTotal} placeholder="1" className="input input-bordered  w-full" />
                            <label className="label">
                                {errors.total && !total[i] &&
                                    <span className="label-text-alt text-error">{errors.total}</span>
                                }
                            </label>
                        </div>
                        <div className="lg:col-span-1 col-span-2 form-control m-2">
                            <div className="items-center">
                                <label className="label">
                                    <span className="label-text">Warna Label</span>
                                </label>
                                <input type="color" no={i} onChange={valueColor} placeholder="example@gmail.com" className="input input-bordered w-32" />
                                <label className="label">
                                    {errors.color && !color[i] &&
                                        <span className="label-text-alt text-error">{errors.color}</span>
                                    }
                                </label>
                            </div>
                        </div>
                        <div className="col-span-4 lg:col-span-3 form-control m-2">
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
                    </div >
                </>
            )
        }

        return formAlat
    }
    return (
        <>
            <div className="laboran-item">
                <div className="grid grid-cols-1">
                    <div className="lg:flex grid lg:items-center ml-1">
                        <Link className="btn btn-sm btn-green" method="get" href={route('admin-alat')}>
                            Daftar Alat
                        </Link>
                        <h1 className="hidden lg:block" >Form Tambah Alat</h1>
                    </div>
                    <div className="card">
                        {renderFormAlat()}
                        <div className="flex justify-end items-center">
                            <button className="btn btn-sm" onClick={() => tambahFormAlat(banyakAlat)}>
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
export default AddAlatItem