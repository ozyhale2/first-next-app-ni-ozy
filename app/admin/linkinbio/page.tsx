import React from 'react'
import CreateUI from './CreateUI'
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import DeleteUI from './DeleteUI';
import prisma from '@/app/components/DB';

const LinkInBioPage = async () => {
  const linkInBios = await prisma.linkInBio.findMany({
    where: {
      deleted: false
    }
  });

  return (
    <>
      <CreateUI />
      <div className="overflow-x-auto mt-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Slug</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {linkInBios.map((linkInBio) => {
              return <tr key={linkInBio.id} className="hover">
                <th>{linkInBio.id}</th>
                <td>{linkInBio.name}</td>
                <td>{linkInBio.description}</td>
                <td>{linkInBio.slug}</td>
                <td>
                  <DeleteUI id={linkInBio.id} />
                  <Link href={`/admin/linkinbio/` + linkInBio.id} className='btn btn-info btn-xs'>Edit</Link>
                </td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
    </>
  )
}

export default LinkInBioPage