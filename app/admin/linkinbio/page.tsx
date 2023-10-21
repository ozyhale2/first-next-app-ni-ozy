import React from 'react'
import CreateUI from './CreateUI'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let linkInBios = []

const LinkInBioPage = async () => {
  const linkInBios = await prisma.linkInBio.findMany();

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
                  <button className='btn btn-error btn-xs'>Delete</button>&nbsp;
                  <button className='btn btn-info btn-xs'>Edit</button>
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