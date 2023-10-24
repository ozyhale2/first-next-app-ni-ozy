'use client'
import React, { useState } from 'react'
import { addLink } from './Functions';

const CreateUI = (props: { linkInBioId: number }) => {

    const [isShowModal, showModal] = useState(false);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const submitHandler = (data: FormData) => {
        showModal(false)
        addLink(data)
        setName('')
        setLink('')
    }

    return (
        <>
            <button className="btn btn-primary btn-sm" onClick={() => showModal(true)}>Add Link</button>
            <dialog className={`modal ` + (isShowModal ? `modal-open` : ``)}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Link</h3>
                    <form action={submitHandler}>
                        <input type="hidden" name="linkInBioId" value={props.linkInBioId} />
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="url"
                                name="link"
                                value={link}
                                onChange={e => setLink(e.target.value)}
                                id="link"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="link"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >Link</label>
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" className="btn" onClick={() => showModal(false)}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default CreateUI