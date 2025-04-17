import React from 'react'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])



    // function for saving password
    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"

        } else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"

        }
    }

    // function for saving password
    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            console.log([...passwordArray, form])
            setForm({ "site": "", "username": "", "password": "" })
            toast('Password saved!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

            });
        }
        else {
            toast.info('Password Not Saved!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
    }

    // function for deleting passwords
    const deletePassword = (id) => {
        console.log("Deleting password with id:", id);
        let c = confirm("Do you really want to delete?")
        if (c) {

            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast.info('Password Deleted!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
    }

    // function for editing passwords
    const editPassword = (id) => {
        console.log("Editing Password with id:", id);
        setForm(passwordArray.filter(i => i.id === id)[0])
    }



    // function for handling change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // function for copying credentials
    const copyText = (text) => {
        toast.info('Copied to Clipboard!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"

            />

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className=" text-white max-w-4xl p-2 md:p-0 md:mycontainer min-h-[85vh] ">
                <h1 className='text-4xl font-bold text-center' ><span className='text-[gold]' >&lt;</span>
                    Pass
                    <span className='text-[gold]' >OP&gt;</span></h1>
                <p className='text-[gold] text-lg text-center' >Your own Password Manager</p>
                <div className="text-white flex flex-col p-4 gap-6 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-[gold] w-full text-fuchsia-800 px-4 py-1 ' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full gap-3  ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-[gold] w-full text-fuchsia-800 px-4 py-1 ' type="text" name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-[gold] w-full text-fuchsia-800 px-4 py-1 ' type="password" name='password' id='password' />
                            <span className='absolute right-[2px] top-[4px] text-black cursor-pointer' onClick={showPassword} >
                                <img ref={ref} className='invert p-1' width={26} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center rounded-full px-3 py-2 w-fit bg-slate-600 hover:bg-slate-700 gap-2 border border-[gold]' >
                        <lord-icon className='invert'
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4' >Your Password</h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden border border-white mb-10 ">
                        <thead className='bg-slate-800 text-[gold]' >
                            <tr>
                                <th className='py-2' >Site</th>
                                <th className='py-2' >Username</th>
                                <th className='py-2' >Password</th>
                                <th className='py-2' >Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-900' >
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-white text-center' >
                                        <div className='flex justify-center items-center' >
                                            <a href={item.site} target='_blank' > {item.site}</a>
                                            <div>
                                                <img className='w-5 cursor-pointer ml-2' src="/icons/copy.png" alt="copy" onClick={() => { copyText(item.site) }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center ' >
                                        <div className='flex justify-center items-center' >

                                            {item.username}
                                            <div>
                                                <img className='w-5 cursor-pointer ml-2' src="/icons/copy.png" alt="copy" onClick={() => { copyText(item.username) }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center' >
                                        <div className='flex justify-center items-center' >
                                            {item.password}
                                            <div>
                                                <img className='w-5 cursor-pointer ml-2' src="/icons/copy.png" alt="copy" onClick={() => { copyText(item.password) }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center' >
                                        {/* edit button */}
                                        <span className='invert pr-2 cursor-pointer' onClick={() => { editPassword(item.id) }} >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                state="hover-line"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        {/* delete button */}
                                        <span className='invert pl-2 cursor-pointer' onClick={() => { deletePassword(item.id) }} >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                                trigger="morph"
                                                state="morph-trash-in"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
