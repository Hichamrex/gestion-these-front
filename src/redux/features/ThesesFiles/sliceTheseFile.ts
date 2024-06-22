import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../Api/apiSlice";
import { formatBodyFile } from "../../../utils/customFunctions";


const sliceTheseFile = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      getFiles: build.query({
        query: () => ({
          url: `/files`,
        }),
        providesTags: ['Files'] 
      }),
      downloadFile: build.query({
        query: (id: number) => ({
            url: `/files/download/${id}`,
            responseType: 'blob',
        }),
        // invalidatesTags: ['Theses', 'These']
    }),
    addNewFile: build.mutation({
        query: (data: any) => {
            return {
                url: `/files`,
                method: 'POST',
                body: formatBodyFile(data),
                // formData: true
            };
        },
        invalidatesTags: ['Files']
    }),
      deleteFile: build.mutation({
        query: (id) => ({
          url: `/file/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Files']
      })
    })    
});

export const { 
    useAddNewFileMutation,
    useGetFilesQuery,
    useDeleteFileMutation,
    useDownloadFileQuery,
} = sliceTheseFile;
