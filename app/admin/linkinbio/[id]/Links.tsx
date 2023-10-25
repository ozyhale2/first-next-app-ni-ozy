import CreateUI from "./CreateUI"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Links = async (props: { linkInBioId: number }) => {

    const linkRecords = await prisma.links.findMany({
        where: {
          deleted: false,
          linkInBioId: props.linkInBioId
        }
      });

    return (
        <>
            <CreateUI linkInBioId={props.linkInBioId} />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Link</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {linkRecords.map((linkRecord) => {
                            return <tr key={linkRecord.id} className="hover">
                                <th>{linkRecord.id}</th>
                                <td>{linkRecord.name}</td>
                                <td>{linkRecord.link}</td>
                                <td>
                                    <button className="btn btn-error btn-xs mr-1" type="button">Delete</button>
                                    <button className="btn btn-info btn-xs" type="button">Edit</button>
                                </td>
                            </tr>
                        })}
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Links