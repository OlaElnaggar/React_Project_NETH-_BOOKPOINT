import Box from "@mui/material/Box"
import Nav from "../components/nav"
import { Outlet } from "react-router-dom"
import Footer from "../components/footer"

function MainLayout() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
            <Box>
                <Nav />
                <Box >
                    <Outlet />
                </Box>

            </Box>
            <Footer />
        </Box>
    )
}

export default MainLayout