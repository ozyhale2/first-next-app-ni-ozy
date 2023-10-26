import { FlashMessage } from "@/app/components/flashMessage/FlashMessage"
import NavBar from "@/app/components/navBar/NavBar"

export default function LinkInBioAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavBar />
            <FlashMessage />
            <div className='container m-4'>
                {children}
            </div>
        </>
    )
}