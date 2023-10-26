import React from 'react'
import { cookies } from 'next/headers'
import Alert from './Alert';
import bcrypt from 'bcrypt'
import {z} from 'zod';

const zCoerceStr = z.coerce.string();
const zCoerceNum = z.coerce.number();

enum MessageLevel{
    Info,
    Success,
    Warning,
    Error
}

const FlashMessage = () => {
    const message = getMessage();
    const token = getMessageToken();
    const level = getMessageLevel();

    let levelClass = 'info'

    if(level){
        let levelNum = zCoerceNum.parse(level);

        switch (levelNum) {
            case MessageLevel.Success:
                levelClass = 'success'
                break;
            case MessageLevel.Warning:
                levelClass = 'warning'
                break;
            case MessageLevel.Error:
                levelClass = 'error'
                break;
            default:
                levelClass = 'info'
                break;
        }
    }

    return (
        <Alert message={message} token={token} level={levelClass} />
    )
}

const getMessage = () => {
    return cookies().get('FlashMessage')?.value
}

const getMessageToken = () => {
    return cookies().get('FlashMessageToken')?.value
}

const getMessageLevel = () => {
    return cookies().get('FlashMessageLevel')?.value
}

const setMessage = async (message: string, level: number = MessageLevel.Info) => {
    const token = await bcrypt.hash(message, 10);

    cookies().set('FlashMessage', message, {maxAge: 1});
    cookies().set('FlashMessageLevel', zCoerceStr.parse(level), {maxAge: 1});
    cookies().set('FlashMessageToken', token, {maxAge: 1});

    return token
}

export {FlashMessage, setMessage, MessageLevel}