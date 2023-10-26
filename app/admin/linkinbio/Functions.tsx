'use server'

import { getServerSession } from 'next-auth';
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { RedirectType, redirect } from 'next/navigation';
import { setMessage } from '@/app/components/flashMessage/FlashMessage';
import prisma from '@/app/components/DB';

const zCoerceNum = z.coerce.number();
const zCoerceStr = z.coerce.string();

const zNum = z.number();

const createLinkInBio = async (data: FormData) => {
    const session = await getServerSession();

    const user = await prisma.user.findUnique({
        where: {
            email: zCoerceStr.parse(session?.user?.email)
        }
    });

    if (user) {
        const name = zCoerceStr.parse(data.get('name'))
        const description = zCoerceStr.parse(data.get('description'))
        const userId = zNum.parse(user.id)

        const linkInBio = await prisma.linkInBio.create({
            data: {
                name: name,
                description: description,
                ownerId: userId
            }
        });

        console.log('linkInBio Added: ')
        console.log(linkInBio);

        const token = await setMessage('Successfully Added a Link in Bio');

        redirect('/admin/linkinbio/' + linkInBio.id + '?_fmt=' + token, RedirectType.push)
    }
}

const getLinkInBio = async (id: number) => {
    const linkInBio = await prisma.linkInBio.findUnique({
        where: {
            id: zCoerceNum.parse(id)
        }
    });

    return linkInBio
}

const updateLinkInBio = async (data: FormData) => {
    const linkInBio = await prisma.linkInBio.update({
        where: {
            id: zCoerceNum.parse(data.get('id')),
        },
        data: {
            name: zCoerceStr.parse(data.get('name')),
            description: zCoerceStr.parse(data.get('description'))
        },
    })

    console.log('linkInBio Updated: ')
    console.log(linkInBio);

    const token = await setMessage('Successfully Updated a Link in Bio');

    redirect('/admin/linkinbio/' + linkInBio.id + '?_fmt=' + token, RedirectType.push)
}

const deleteLinkInBio = async (id: number) => {
    const linkInBio = await prisma.linkInBio.update({
        where: {
            id: id,
        },
        data: {
            deleted: true
        },
    })

    console.log('linkInBio deleted: ')
    console.log(linkInBio);

    const token = await setMessage('Successfully Deleted a Link in Bio');

    redirect('/admin/linkinbio/?_fmt=' + token, RedirectType.push)
}

export { createLinkInBio, getLinkInBio, updateLinkInBio, deleteLinkInBio }