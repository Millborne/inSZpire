import { useEffect, useState } from "react";
import { useTeamMemberService } from "./teamMemberAPI"; // rename to useTeamService if you've done that

// Team details hook
// export const useTeamDetails = ({
//     queryParameters,
//     method,
//     disableFetch = false,
// }: {
//     queryParameters?: string;
//     method?: string;
//     disableFetch?: boolean;
// }) => {
//     const { data, isSuccess, isError, isLoading, isFetching, error, refetch } =
//         useFetchTeamDetailsQuery(
//             {
//                 queryParameters: queryParameters ?? "",
//                 method: method,
//             },
//             { skip: disableFetch }
//         );

//     return {
//         data,
//         isSuccess,
//         isError,
//         isLoading,
//         isFetching,
//         error,
//         refetch,
//     };
// };

// Team members hook
export const useTeamMembers = ({
  queryParameters,
  method = "POST",
  disableFetch = false,
}: {
  queryParameters?: string;
  method?: string;
  disableFetch?: boolean;
}) => {
  const {
    viewTeamMembers,
    generalAction,
    actionData,
    actionIsError,
    actionIsLoading,
    actionIsSuccess,
    actionError,
    actionReset,
  } = useTeamMemberService(); // or useTeamService if renamed

  const [data, setData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Define updateTeam here
  const updateTeam = async (teamData: any) => {
    return generalAction({
      queryParameters: "/update",
      method: "PUT",
      body: teamData,
    });
  };

  const refetch = async () => {
    if (disableFetch) return;
    try {
      setIsLoading(true);
      setIsFetching(true);
      const result = await viewTeamMembers({
        search: queryParameters ?? "",
      });
      setData(result);
      setIsSuccess(true);
      setIsError(false);
      setError(null);
    } catch (err: any) {
      setError(err);
      setIsError(true);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParameters, method]);

  return {
    data,
    isSuccess,
    isError,
    isLoading,
    isFetching,
    error,
    refetch,

    // mutation actions
    generalAction,
    updateTeam, // ✅ now safely exposed
    actionData,
    actionIsError,
    actionIsLoading,
    actionIsSuccess,
    actionError,
    actionReset,
  };
};



