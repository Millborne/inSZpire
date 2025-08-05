import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const { VITE_TEAM_AND_POSITION_SERVICE } = import.meta.env;
interface generalProps {
  queryParameters: string;
  method?: string;
  body?: any;
}

export const teamsAPI = createApi({
  reducerPath: "teams",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_TEAM_AND_POSITION_SERVICE,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["teams"],
  endpoints: (builder) => ({
    fetchTeams: builder.query({
      query: (data: generalProps) =>
        `/api/v1/teams${data.queryParameters}`,
      transformResponse: (response: any) => response.data,
    }),
    actionTeams: builder.mutation({
      query: (data: generalProps) => ({
        url: `/api/v1/teams${data.queryParameters}`,
        method: data.method,
        body: data.body ?? undefined,
      }),
    }),
  }),
});

// ✅ export hook normally
export const { useFetchTeamsQuery, useActionTeamsMutation } = teamsAPI;

// ✅ custom service function using the hook without redefining it
export const useTeamMemberService = () => {
  const [
    generalAction,
    {
      data: actionData,
      isError: actionIsError,
      isLoading: actionIsLoading,
      isSuccess: actionIsSuccess,
      error: actionError,
      reset: actionReset,
    },
  ] = useActionTeamsMutation();

  // ✅ Declare updateTeam properly here
  const updateTeam = async (teamData: any) => {
    return generalAction({
      queryParameters: "/update",
      method: "PUT",
      body: teamData,
    });
  };

  const createTeamMember = async (teamMemberData: any) => {
    return generalAction({
      queryParameters: "/create",
      method: "POST",
      body: teamMemberData,
    });
  };

  const updateTeamMember = async (teamMemberData: any) => {
    return generalAction({
      queryParameters: "/update",
      method: "PUT",
      body: teamMemberData,
    });
  };

  const viewTeamMembers = async (filters: any) => {
    return generalAction({
      queryParameters: "/list",
      method: "POST",
      body: filters,
    });
  };

  const viewTeamMemberDetails = async (tm_ID: string) => {
    return generalAction({
      queryParameters: `/details/${tm_ID}`,
      method: "GET",
    });
  };

  const viewTeamMembersByEmployee = async (emp_ID: string) => {
    return generalAction({
      queryParameters: `/employee/${emp_ID}`,
      method: "GET",
    });
  };

  const viewTeamMembersByTeam = async (team_ID: string) => {
    return generalAction({
      queryParameters: `/team/${team_ID}`,
      method: "GET",
    });
  };

  const getTeamMember = async (tm_ID: string) => {
    return generalAction({
      queryParameters: `/list?tm_ID=${tm_ID}`,
      method: "POST",
      body: { tm_ID },
    });
  };

  // ✅ Now it's safe to return updateTeam
  return {
    generalAction,
    actionData,
    actionIsError,
    actionIsLoading,
    actionIsSuccess,
    actionError,
    actionReset,
    createTeamMember,
    updateTeamMember,
    updateTeam, // ✅ fixed
    viewTeamMembers,
    viewTeamMemberDetails,
    viewTeamMembersByEmployee,
    viewTeamMembersByTeam,
    getTeamMember,
  };
};




