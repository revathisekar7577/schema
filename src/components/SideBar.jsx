import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { schemaPost, updateSegmentInfo } from '../Store/Reducer/SegementReducer';


const options = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Account Name", value: "account_name" },
    { label: "Age", value: "age" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
]
const SideBar = ({ isOpenModal, setIsOpenModal }) => {
    const dispatch = useDispatch();
    const [schemaName, setSchema] = useState("")
    const state = useSelector((state) => state.SegementReducer);

    const addToSchema = (e) => {
        e.preventDefault();
        const filteredoptions = options.find((x) => x.value === schemaName);
        if (filteredoptions) {
            let obj = {
                key: filteredoptions.value,
                value: filteredoptions.label
            };
            dispatch(updateSegmentInfo({ value: obj, key: "schema" }));
            setSchema("");
        }
    }

    const handleSchemaChange = (e, index) => {
        const filteredoptions = options.find((x) => x.value === e.target.value);
        if (filteredoptions) {
            let obj = {
                key: filteredoptions.value,
                value: filteredoptions.label
            };
            dispatch(updateSegmentInfo({ value: obj, index: index, key: "schema" }));
        }
    }


    const handleChange = (e, key) => {
        if (key === "segment_name") {
            dispatch(updateSegmentInfo({ key: "segment_name", value: e.target.value }));
        } else {
            setSchema(e.target.value)
        }
    }

    const saveSegment = () => {
        let arrayNew = state.segmentDetails.schema.map((x) => {return{[x?.key]: x?.value}});
        let data = {
            segment_name: state.segmentDetails.segment_name,
            schema: arrayNew
        }
        dispatch(schemaPost(data))
        dispatch(updateSegmentInfo({ key: "clear"}));
        setIsOpenModal(false)
    }


    const schemaView = () => {
        try {
            const { schema } = state.segmentDetails;
            let newSchemaOptions = options.filter((x) => {
                return !schema.some((y) => {
                    return y.key == x.value
                })
            })
            return (
                <div className="pl-15">
                    <div className="scehma-view">
                        {(state.segmentDetails.schema || []).map((schema, ind) => {
                            let className = ind %2 === 0 ? "bg-red" : "bg-green"
                            return (
                                <div className="d-flex align-center" key={"schema" + ind}>
                                    <div className={`rounded-border ${className}`}></div>
                                    <select
                                        style={{ width: "85%", height: "28px", marginLeft: "6px", marginTop: "10px" }}
                                        value={schema.key}
                                        onChange={(e) => handleSchemaChange(e, ind)}>
                                        <option value={schema.key} key={"option" + "-1"} disabled>{schema.value}</option> 
                                        {(newSchemaOptions || []).map((item, ind) => (
                                            <option
                                                key={"option" + ind}
                                                label={item.label}
                                                value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                    </div>
                                )
                            
                        })}
                    </div>
                </div>

            )
        } catch (e) {
            console.log("Error in schemaView::", e);
        }
    }

    const handleDisabled = ()=>{
        console.log("handleDisabled")
        if(state.segmentDetails.schema.length > 0 || state.segmentDetails.segment_name != ""){
            
            return false
        }
        return true
    }



    const sidebarView = () => {
        try {
           const { schema } = state.segmentDetails;
            let newSchemaOptions = options.filter((x) => {
                return !schema.some((y) => {
                    return y.key == x.value
                })
            })
            return (
                <div>
                    <div>
                        <div className="grey-overlay"></div>
                        <div className="sidebar-view">

                            <div className="heading-view">
                                <span style={{ marginRight: "6px", fontSize: '18px' }}>{"<"}</span>{" "}Saving Segment
                            </div>
                            <div className="pl-15 mt-10">
                                <label className="ft-14">Enter the Name of the Segement</label>
                                <input type="text" name="segment"
                                    placeholder="Name of the segment"
                                    className="mt-10"
                                    onChange={(e) => handleChange(e, "segment_name")} />
                                <div className="ft-14" style={{ marginTop: "20px" }}>To save your segment, you need to add the schemas to built the query.</div>
                                <div className="align-end mt-10">
                                    <div className="d-flex" style={{ justifyContent: "end" }}>
                                        <div className="d-flex align-center" style={{ marginRight: "13px" }}>
                                            <div className="rounded-border bg-red" style={{ marginRight: "3px" }}></div>
                                            <span>- User Traits</span>
                                        </div>
                                        <div className="d-flex align-center">
                                            <div className="rounded-border bg-green" style={{ marginRight: "3px" }}></div>
                                            <span>- Group Traits</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {state.segmentDetails.schema.length > 0 && schemaView()}
                                <div className="d-flex align-center ml-15 mt-10">
                                    <div className="rounded-border bg-grey"></div>
                                    <select
                                        style={{ width: "80%", height: "28px", marginLeft: "6px" }}
                                        value={schemaName}
                                        onChange={(e) => handleChange(e, "schema")}>
                                        <option value="" key={"0"}>Add schema to segment</option>
                                        {(newSchemaOptions || []).map((schema, ind) => (
                                            <option
                                                label={schema.label}
                                                value={schema.value} key={ind + schema.label}>{schema.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="add-to-schema" onClick={(e) => addToSchema(e)}>
                                    +<a href="">Add new schema</a>
                                </div>
                            </div>
                            {/* </div> */}
                            <div className="footer-view">
                                <button className="save-seg-btn" onClick={() => saveSegment()}>Save the segment</button>
                                <button className="cancel-btn" onClick={() => setIsOpenModal(!isOpenModal)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } catch (e) {
            console.log("Error in sidebarView::", e);
        }
    }

    return (
        <>
            {sidebarView()}
        </>
    )
}

export default SideBar;