import React from 'react'
import { cookies } from 'next/headers'
import Alert from './Alert';
import bcrypt from 'bcrypt'

const FlashMessage = () => {
    const message = getMessage();
    const token = getMessageToken();

    return (
        <Alert message={message} token={token} />
    )
}

const getMessage = () => {
    return cookies().get('FlashMessage')?.value
}

const getMessageToken = () => {
    return cookies().get('FlashMessageToken')?.value
}

const setMessage = async (message: string) => {
    const token = await bcrypt.hash(message, 10);

    cookies().set('FlashMessage', message);
    cookies().set('FlashMessageToken', token);

    return token
}

export {FlashMessage, setMessage}