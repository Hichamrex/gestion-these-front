import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../Api/apiSlice";


const sliceAgentRecherche = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      getAgentRecherches: build.query({
        query: () => ({
          url: `/agent-recherches`,
        }),
        providesTags: ['AgentRecherches'] 
      }),
      getAgentRecherche: build.query({
        query: AgentRechercheId => ({
          url: `/agent-recherche/${AgentRechercheId}`,
        }),
        providesTags: ['AgentRecherche'] 
      }),
      addAgentRecherche: build.mutation({
        query: newDpart => ({
            url: '/agent-recherches',
            method: 'POST',
            body: newDpart,
        }),
        invalidatesTags: ['AgentRecherches', 'AgentRecherche']
    }),
    editAgentRecherche: build.mutation({
        query: newAgentRecherche => ({
          url: `/agent-recherche/${newAgentRecherche.id}`,
          method: 'PUT',
          body: newAgentRecherche,
        }),
        invalidatesTags: ['AgentRecherches', 'AgentRecherche']
      }),
      deleteAgentRecherche: build.mutation({
        query: (id) => ({
          url: `/agent-recherche/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['AgentRecherches', 'AgentRecherche']
      })
    })    
});

export const { 
    useAddAgentRechercheMutation,
    useGetAgentRechercheQuery,
    useGetAgentRecherchesQuery,
    useEditAgentRechercheMutation,
    useDeleteAgentRechercheMutation
} = sliceAgentRecherche;
