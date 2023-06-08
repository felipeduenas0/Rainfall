import {configureStore} from "@reduxjs/toolkit";
import {Slice} from "./slice";

export default configureStore({

    reducer: {
        sections: Slice.reducer
    },
    middleware: (getDefaultMiddleware) => {

        return getDefaultMiddleware({
            serializableCheck: false,
        });

    }

});
