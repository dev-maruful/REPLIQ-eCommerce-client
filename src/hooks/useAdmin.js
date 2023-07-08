import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const API = useAxios();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await API(`/users/${user?.email}`);
      return res?.data?.role;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
