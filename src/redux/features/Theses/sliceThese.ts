import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../Api/apiSlice";


const sliceThese = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      getTheses: build.query({
        query: () => ({
          url: `/theses`,
        }),
        providesTags: ['Theses'] 
      }),
      getTheseUser: build.query({
        query: (userId) => ({
          url: `/user/${userId}/theses`,
        }),
        providesTags: ['Theses'] 
      }),
      getThese: build.query({
        query: thesesId => ({
          url: `/these/${thesesId}`,
        }),
        providesTags: ['These'] 
      }),
      addtheses: build.mutation({
        query: newDpart => ({
            url: '/theses',
            method: 'POST',
            body: newDpart,
        }),
        invalidatesTags: ['Theses', 'These']
    }),
    edittheses: build.mutation({
        query: newtheses => ({
          url: `/these/${newtheses.id}`,
          method: 'PUT',
          body: newtheses,
        }),
        invalidatesTags: ['Theses', 'These']
      }),
      deletetheses: build.mutation({
        query: (id) => ({
          url: `/these/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Theses', 'These']
      })
    })    
});

export const { 
    useAddthesesMutation,
    useGetTheseUserQuery,
    useGetTheseQuery,
    useGetThesesQuery,
    useEditthesesMutation,
    useDeletethesesMutation
} = sliceThese;
