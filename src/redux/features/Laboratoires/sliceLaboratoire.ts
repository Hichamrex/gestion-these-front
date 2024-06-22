import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../Api/apiSlice";


const sliceLaboratoire = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      getLaboratoires: build.query({
        query: () => ({
          url: `/laboratoires`,
        }),
        providesTags: ['Laboratoires'] 
      }),
      getLaboratoire: build.query({
        query: LaboratoireId => ({
          url: `/laboratoire/${LaboratoireId}`,
        }),
        providesTags: ['Laboratoire'] 
      }),
      addLaboratoire: build.mutation({
        query: newDpart => ({
            url: '/laboratoires',
            method: 'POST',
            body: newDpart,
        }),
        invalidatesTags: ['Laboratoires', 'Laboratoire']
    }),
    editLaboratoire: build.mutation({
        query: newLaboratoire => ({
          url: `/laboratoire/${newLaboratoire.id}`,
          method: 'PUT',
          body: newLaboratoire,
        }),
        invalidatesTags: ['Laboratoires', 'Laboratoire']
      }),
      deleteLaboratoire: build.mutation({
        query: (id) => ({
          url: `/laboratoire/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Laboratoires', 'Laboratoire']
      })
    })    
});

export const { 
    useAddLaboratoireMutation,
    useGetLaboratoireQuery,
    useGetLaboratoiresQuery,
    useEditLaboratoireMutation,
    useDeleteLaboratoireMutation
} = sliceLaboratoire;
