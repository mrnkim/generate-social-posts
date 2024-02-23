import { useQuery } from "@tanstack/react-query";
import keys from "./keys";
import apiConfig from "./apiConfig";

export function useGetVideos(indexId) {
  return useQuery({
    queryKey: [keys.VIDEOS, indexId],
    queryFn: async () => {
      try {
        const response = await apiConfig.SERVER.get(
          `${apiConfig.INDEXES_URL}/${indexId}/videos`,
          {
            params: { page_limit: apiConfig.PAGE_LIMIT },
          }
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },
  });
}

export function useGetVideo(indexId, videoId, enabled) {
  return useQuery({
    queryKey: [keys.VIDEOS, indexId, videoId],
    queryFn: async () => {
      try {
        if (!enabled) {
          return null;
        }
        const response = await apiConfig.SERVER.get(
          `${apiConfig.INDEXES_URL}/${indexId}/videos/${videoId}`
        );

        if (response.data.error) {
          throw new Error(response.data.error);
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: enabled,
    onError: (error) => {
      console.error("useGetVideo hook error:", error);
    },
  });
}

export async function fetchVideoInfo(queryClient, url) {
  try {
    const response = await queryClient.fetchQuery({
      queryKey: [keys.VIDEO, url],
      queryFn: async () => {
        const response = await apiConfig.SERVER.get(
          `/video-info?url=${encodeURIComponent(url)}`
        );
        const respData = response.data;
        return respData;
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching video information:", error);
    throw error;
  }
}

export function useGenerateTtitleTopicHashtag(types, videoId, enabled) {
  return useQuery({
    queryKey: [keys.VIDEOS, "topic", videoId],
    queryFn: async () => {
      if (!enabled) {
        return null;
      }

      const response = await apiConfig.SERVER.post(`/videos/${videoId}/gist`, {
        data: { types: Array.from(types) },
      });
      const respData = response.data;
      return respData;
    },
    enabled: enabled,
  });
}

// export function useGenerateTitle(data, videoId, enabled) {
//   return useQuery({
//     queryKey: [keys.VIDEOS, "title", videoId],
//     queryFn: async () => {
//       if (!enabled) {
//         return null;
//       }

//       const response = await apiConfig.SERVER.post(`/videos/${videoId}/gist`, {
//         data,
//       });
//       const respData = response.data;
//       return respData;
//     },
//     enabled: enabled,
//   });
// }

// export function useGenerateHashtag(data, videoId, enabled) {
//   return useQuery({
//     queryKey: [keys.VIDEOS, "hashtag", videoId],
//     queryFn: async () => {
//       if (!enabled) {
//         return null;
//       }

//       const response = await apiConfig.SERVER.post(`/videos/${videoId}/gist`, {
//         data,
//       });
//       const respData = response.data;
//       return respData;
//     },
//     enabled: enabled,
//   });
// }

export function useGetTask(taskId) {
  return useQuery({
    queryKey: [keys.TASK, taskId],
    queryFn: () =>
      apiConfig.SERVER.get(`${apiConfig.TASKS_URL}/${taskId}`).then(
        (res) => res.data
      ),
    refetchInterval: (data) => {
      return data?.status === "ready" || data?.status === "failed"
        ? false
        : 5000;
    },
    refetchIntervalInBackground: true,
  });
}
