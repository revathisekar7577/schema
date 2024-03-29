import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./dashboard.scss"
import SideBar from "./SideBar";


const Dashboard = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const state = useSelector((state) => state.SegementReducer);

    const dashboardView = () => {
        try {
            return (
                <div>
                    <div className="heading-view">
                        <span style={{marginRight:"6px",fontSize:'18px'}}>{"<"}</span>{" "}View Audience
                    </div>
                    <button onClick={() => {console.log("gdgg");setIsOpenModal((prev) => !prev)}} 
                    className="save-btn">Save segment</button>
                    {isOpenModal &&
                       <SideBar setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal}/>
                    }

                </div>
            )
        } catch (e) {
            console.log("Error in dashboardView::", e);
        }
    }


    return (
        <>
            {dashboardView()}
        </>
    )
}

export default Dashboard;