import { getLinkInBio } from '../Functions';
import EditUI from '../EditUI';

const LinkInBioEditPage = async ({params} : {params: {id: number}}) => {
    const linkInBio = await getLinkInBio(params.id);

    if(linkInBio){
        return (
            <EditUI id={linkInBio.id} name={linkInBio.name} description={linkInBio.description} />
        )
    }else{
        throw new Error('Record does not exist: ' + params.id);
    }

    
}

export default LinkInBioEditPage