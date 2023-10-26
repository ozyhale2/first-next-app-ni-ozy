'use server'

import { getServerSession } from 'next-auth';
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { redirect, RedirectType } from 'next/navigation';
import { setMessage } from '@/app/components/flashMessage/FlashMessage';

const zCoerceNum = z.coerce.number();
const zCoerceStr = z.coerce.string();

const zNum = z.number();
const prisma = new PrismaClient();

const addLink = async (data: FormData) => {
    const name = zCoerceStr.parse(data.get('name'))
    const linkValue = zCoerceStr.parse(data.get('link'))
    const linkInBioId = zCoerceNum.parse(data.get('linkInBioId'))

    const link = await prisma.links.create({
        data: {
            name: name,
            link: linkValue,
            linkInBioId: linkInBioId
        }
    });

    console.log('Link Added: ')
    console.log(link);

    const token = await setMessage('Successfully Added a Link');

    redirect('/admin/linkinbio/' + linkInBioId + '?_fmt=' + token)
}

const updateLink = async (data: FormData) => {
    const linkObject = await prisma.links.update({
        where: {
            id: zCoerceNum.parse(data.get('id')),
        },
        data: {
            name: zCoerceStr.parse(data.get('name')),
            link: zCoerceStr.parse(data.get('link'))
        },
    })

    console.log('Link Updated: ')
    console.log(linkObject);

    const token = await setMessage('Successfully Updated a Link');

    redirect('/admin/linkinbio/' + linkObject.linkInBioId + '?_fmt=' + token, RedirectType.push)
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

    redirect('/admin/linkinbio/?_fmt=' + token)
}

export { addLink, getLinkInBio, updateLink, deleteLinkInBio }