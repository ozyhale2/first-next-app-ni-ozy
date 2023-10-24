import CreateUI from "./CreateUI"

const Links = async (props: {linkInBioId: number}) => {
    return (
        <>
            <CreateUI linkInBioId={props.linkInBioId}  />
            <div>Links</div>
        </>
    )
}

export default Links