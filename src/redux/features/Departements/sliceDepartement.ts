import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../Api/apiSlice";


const sliceDepartement = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      getDepartements: build.query({
        query: () => ({
          url: `/departements`,
        }),
        providesTags: ['Departements'] 
      }),
      getDepartement: build.query({
        query: departementId => ({
          url: `/departement/${departementId}`,
        }),
        providesTags: ['Departement'] 
      }),
      addDepartement: build.mutation({
        query: newDpart => ({
            url: '/departements',
            method: 'POST',
            body: newDpart,
        }),
        invalidatesTags: ['Departements', 'Departement']
    }),
    editDepartement: build.mutation({
        query: newDepartement => ({
          url: `/departement/${newDepartement.id}`,
          method: 'PUT',
          body: newDepartement,
        }),
        invalidatesTags: ['Departements', 'Departement']
      }),
      deleteDepartement: build.mutation({
        query: (id) => ({
          url: `/departement/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Departements', 'Departement']
      })
    })    
});

export const { 
    useAddDepartementMutation,
    useGetDepartementQuery,
    useGetDepartementsQuery,
    useEditDepartementMutation,
    useDeleteDepartementMutation
} = sliceDepartement;
