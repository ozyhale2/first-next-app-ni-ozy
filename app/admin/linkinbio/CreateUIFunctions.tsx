'use server'

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

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

    if(user){
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

        redirect('/admin/linkinbio/' + linkInBio.id)
    }
}

export default createLinkInBio