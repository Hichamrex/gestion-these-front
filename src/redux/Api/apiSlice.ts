import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ['Departements', 'Departement', 'Laboratoires', 'Laboratoire', 'AgentRecherches', 
                'AgentRecherche', 'Users', 'User', 'Theses', 'These', 'Files'],
                //  baseQuery: fetchBaseQuery({ baseUrl: 'http://52.138.195.196:8080/api/v1.0' }),
                 baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
                 endpoints: () => ({
    }),
});