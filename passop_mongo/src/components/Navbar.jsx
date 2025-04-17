import React from 'react'

const Navbar = () => {
    return (
        <nav className=' bg-slate-800 text-white ' >
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <div className="logo font-bold  text-2xl">
                    <span className='text-[gold]' >&lt;</span>
                    Pass
                    <span className='text-[gold]' >OP&gt;</span>

                </div>
                <button className='bg-gray-800 flex rounded-full my-5 justify-between items-center hover:bg-slate-900 font-bold ring-white ring-1 ' >
                    <img className='invert p-1 w-10' src="/icons/github.svg" alt="github logo" />
                    <span className='px-2 pr-2' >GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
