import Box from "@mui/material/Box"
import footer_img from "../assets/footerimg.png"
import {  Typography } from "@mui/material"
import { Link } from "react-router-dom"

function Footer(){
    return(
        <Box sx={{height:{xs:"300px", md:"248px" , overflow:"clip"} ,
        bgcolor:"black",
        padding:"30px 50px 60px 50px",
        width:"100%"
        }}>
            <Box 
            component="img"
            src={footer_img}
            sx={{
                width :"132px",
                height:"98px",
            }}
            />

            <hr style={{width:'100%' , marginBottom:"20px"}} />

             <Typography color="primary" sx={{fontSize:"12px", mb:{xs:"10px" ,md:"0px"} }} >
               © {new Date().getFullYear()} <Typography sx={{ display:"inline",fontSize:"12px" , color:'primary.main'}} component={Link} to="/home">| Neth BookPoint</Typography>
            </Typography>


            <Typography sx={{fontSize:"14px" }} color="secondary.main" align="center">
                Visit our branches in Galle, Kurunegala, Kandy, and Colombo,
                 and register for our online platform to enjoy maximum benefits!
            </Typography>

           
        </Box>
    )
}
export default Footer