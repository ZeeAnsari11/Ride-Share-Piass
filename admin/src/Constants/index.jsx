import {BiSolidUserCheck,BiSolidUserDetail,BiSolidUserX} from "react-icons/bi"
const Routes= {
    "1": {
        key: "1",
        name: "All Users",
        path: "/?type=all",
        icon: <BiSolidUserDetail  style={{fontSize:"22px"}}/>
    
    },
    "2": {  
        key: "2",
        name: "VerifiedUser ",
        path: "/?type=verified",
        icon:<BiSolidUserCheck style={{fontSize:"22px"}} />
    },
    "3": {  
        key: "3",
        name: "NonVerifiedUser ",
        path: "/?type=non-verified",
        icon:<BiSolidUserX style={{fontSize:"22px"}} />
    },
 
};
export default Routes;  