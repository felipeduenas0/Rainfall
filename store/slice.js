import {createSlice} from "@reduxjs/toolkit";

export const Slice = createSlice({
    name: 'sections',
    initialState: {
        email: '',
        precipitationImages: [],
        evapotranspirationImages: [],
        landType: [],
        landUse: [],
        slope: [],
        selectedCategories: [],
        fieldCapacity: 0.1
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPrecipitationImages: (state, action) => {
            state.precipitationImages = action.payload;
        },
        setEvapotranspirationImages: (state, action) => {
            state.evapotranspirationImages = action.payload;
        },
        setLandType: (state, action) => {
            state.landType = action.payload;
        },
        setLandUse: (state, action) => {
            state.landUse = action.payload;
        },
        setSlope: (state, action) => {
            state.slope = action.payload;
        },
        setSelectedCategories: (state, action) => {
            state.selectedCategories = action.payload;
        },
        setFieldCapacity: (state, action) => {
            state.fieldCapacity = action.payload;
        }
    }
});

export const {
    setEmail,
    setPrecipitationImages,
    setEvapotranspirationImages,
    setLandType,
    setLandUse,
    setSlope,
    setSelectedCategories,
    setFieldCapacity
} = Slice.actions;
