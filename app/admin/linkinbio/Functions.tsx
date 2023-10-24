'use server'

import { getServerSession } from 'next-auth';
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';
import { setMessage } from '@/app/components/flashMessage/FlashMessage';

const zCoerceNum = z.coerce.number();
const zCoerceStr = z.coerce.string();

const zNum = z.number();
const prisma = new PrismaClient();

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

        redirect('/admin/linkinbio/' + linkInBio.id + '?_fmt=' + token)
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
            description: zCoerceStr.parse(data.get('name'))
        },
    })

    console.log('linkInBio Updated: ')
    console.log(linkInBio);

    const token = await setMessage('Successfully Updated a Link in Bio');

    redirect('/admin/linkinbio/' + linkInBio.id + '?_fmt=' + token)
}

export { createLinkInBio, getLinkInBio, updateLinkInBio }