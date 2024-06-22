import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../Api/apiSlice";


const sliceUser = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      getUsers: build.query({
        query: () => ({
          url: `/users`,
        }),
        providesTags: ['Users'] 
      }),
      getUsersCounts: build.query({
        query: () => ({
          url: `/users/counts`,
        }),
        providesTags: ['Users'] 
      }),
      getUser: build.query({
        query: UserId => ({
          url: `/user/${UserId}`,
        }),
        providesTags: ['User'] 
      }),
      addUser: build.mutation({
        query: newDpart => ({
            url: '/users',
            method: 'POST',
            body: newDpart,
        }),
        invalidatesTags: ['Users', 'User']
    }),
    editUser: build.mutation({
        query: newUser => ({
          url: `/user/${newUser.id}`,
          method: 'PUT',
          body: newUser,
        }),
        invalidatesTags: ['Users', 'User']
      }),
      deleteUser: build.mutation({
        query: (id) => ({
          url: `/user/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Users', 'User']
      })
    })    
});

export const { 
    useAddUserMutation,
    useGetUsersCountsQuery,
    useGetUserQuery,
    useGetUsersQuery,
    useEditUserMutation,
    useDeleteUserMutation
} = sliceUser;
