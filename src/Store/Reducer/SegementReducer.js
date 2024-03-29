import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { ConfigureStore } from "../ConfigureStore";


const initialState = {
    isLoading: false,
    isError: false,
    segmentDetails: {
        segment_name: "",
        schema: []
    }
}



export const schemaPost = createAsyncThunk("schemapost", async (requestData) => {
    console.log("request",requestData)
    const response = await fetch('https://webhook.site/00000000-0000-0000-0000-000000000000', {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json));

});



const SegementReducer = createSlice({
    name: "list",
    initialState,
    reducers: {
        updateSegmentInfo: (state, action) => {
            if (action.payload.key === "clear") {
                state.segmentDetails = {
                    segment_name: "",
                    schema: []
                }
            }
            if (action.payload.key === "schema") {
                if (action.payload.index >= 0) {
                    state.segmentDetails.schema[action.payload.index].key = action.payload.value.key;
                    state.segmentDetails.schema[action.payload.index].value = action.payload.value.value;
                } else {
                    state.segmentDetails.schema = [...state.segmentDetails.schema, action.payload.value];
                }
            } else {
                state.segmentDetails.segment_name = action.payload.value;
            }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(schemaPost.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(schemaPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.mealsList = action.payload;
        })
        builder.addCase(schemaPost.rejected, (state, action) => {
            state.isError = true;
        })
    }
});


export const { updateSegmentInfo } = SegementReducer.actions

export default SegementReducer.reducer;