'use client'
import { useState } from 'react';
import { deleteLink } from './Functions';

const DeleteUI = (props: {id : number}) => {

    const [isShowModal, showModal] = useState(false);

    const submitHandler = (data: FormData) => {
        showModal(false)
        deleteLink(props.id)
    }

    return (
        <>
            <button className='btn btn-error btn-xs' onClick={() => { showModal(true) }}>Delete</button>&nbsp;

            <dialog id="my_modal_1" className={`modal ` + (isShowModal ? `modal-open` : ``)}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">Are you sure you want to delete this record?</p>
                    <div className="modal-action">
                        <form action={submitHandler}>
                            <button type="submit" className="btn btn-primary mr-1">Yes</button>
                            <button type="button" className="btn btn-neutral" onClick={() => { showModal(false) }}>No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DeleteUI