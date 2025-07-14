import apiEndpoints from "@/config/apiEndpoints";
import apiRequest from "@/utils/apiRequest";
import { useQuery } from "@tanstack/react-query";
import { TApiResponse , TPost} from "@/types";

export function GetPosts() {
  
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response:TApiResponse<TPost[]> = await apiRequest({
        url: apiEndpoints.posts.list,
        method: "GET",
      }) as TApiResponse<TPost[]>;

      if (!response.ok) {
        throw new Error(response.message || "Failed to fetch posts");
      }

      return response.data;
    },
  });
}

export function GetPostById(id: number) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response: TApiResponse<TPost> = await apiRequest({
        url: apiEndpoints.posts.getById(id),
        method: "GET",
      }) as TApiResponse<TPost>;

      if (!response.ok) {
        throw new Error(response.message || "Failed to fetch post");
      }

      return response.data;
    },
  });
}
