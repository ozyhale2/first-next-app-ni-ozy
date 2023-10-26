import prisma from '@/app/components/DB';
import Link from 'next/link';
import React from 'react'
import LinkItem from './LinkItem';

const LinkInBioFrontPage = async ({ params }: { params: { slug: string } }) => {
  const linkInBio = await prisma.linkInBio.findFirst({
    where: {
      slug: params.slug
    },
    include: {
      links: true,
      owner: true
    }
  })

  console.log(linkInBio);

  return (
    <>
      {linkInBio ? (
        <Linktree name={linkInBio.owner.name} description={linkInBio.description} links={linkInBio.links} />
      ) : (
        <></>
    )}
      
    </>
  )
}

const Linktree = (props: { name: string, description: string | null, links: object[] }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="p-4 rounded shadow-lg text-center">
        <h1 className="text-3xl font-semibold mb-2">{props.name}</h1>
        <p className='mb-8'>{props.description}</p>
        <div className="grid grid-cols-1 gap-4">
          {props.links.map( (link : any) => {
            return (
              <div key={link.id}>
                <LinkItem href={link.link} title={link.name} />
              </div>
            )
          } )}
        </div>
      </div>
    </div>
  );
};

export default LinkInBioFrontPage