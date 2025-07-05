import apiEndpoints from "@/config/apiEndpoints";
import apiRequest from "@/utils/apiRequest";
import { useQuery } from "@tanstack/react-query";

export function getPosts() {
  
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response: any = await apiRequest({
        url: apiEndpoints.posts.list,
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(response.message || "Failed to fetch posts");
      }

      return response.data;
    },
  });
}

export function getPostById(id: number) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response: any = await apiRequest({
        url: apiEndpoints.posts.getById(id),
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(response.message || "Failed to fetch post");
      }

      return response.data;
    },
  });
}
