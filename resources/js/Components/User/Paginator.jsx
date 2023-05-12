import { Link, router } from "@inertiajs/react";


const Paginator = ({ meta }) => {
    const prev = meta.links[0].url
    const next = meta.links[meta.links.length - 1].url
    const current = meta.current_page

    const handlePrev = () => {
        router.get(prev)
    }
    const handleNext = () => {
        router.get(next)
    }
    return (
        <>
            <div className="flex justify-center mt-5">
                <div className="flex items-center">
                    {prev ?
                        <button onClick={() => handlePrev()} className="btn rounded-none btn-outline btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>

                        </button>
                        : ""
                    }
                    <button className="btn bordered rounded-none btn-sm">{current}</button>
                    {next ?
                        <button onClick={() => handleNext()} className="btn rounded-none btn-outline btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                        : ""
                    }
                </div>
            </div>
        </>
    )
}
export default Paginator