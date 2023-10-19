import React from 'react'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const zCoerceStr = z.coerce.string();
const zNum = z.number();
const prisma = new PrismaClient();

async function createLinkInBio(data: FormData) {
    'use server'

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

const LinkInBioCreatePage = () => {
    return (
        <form action={createLinkInBio} className='lg:w-1/3'>
            <div className="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="name"
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
                    type="description"
                    name="description"
                    id="description"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                />
                <label
                    htmlFor="description"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Description</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default LinkInBioCreatePage