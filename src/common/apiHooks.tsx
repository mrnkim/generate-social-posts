import { useQuery } from "@tanstack/react-query";
import { keys } from "./keys";
import apiConfig from "./apiConfig";
import { Task } from "./types"

export function useGetVideos(indexId: string | undefined) {
  return useQuery({
    queryKey: [keys.VIDEOS, indexId],
    queryFn: async () => {
      try {
        if (!indexId) return Error;
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

export function useGetVideo(indexId: string, videoId: string, enabled: boolean) {
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
        console.error("useGetVideo hook error:", error);
        throw error;
      }
    },
    enabled: enabled,
  });
}

export function useAnalyze(prompt: string, videoId: string, enabled: boolean) {
  return useQuery({
    queryKey: [keys.VIDEOS, "analyze", videoId, prompt],
    queryFn: async () => {
      if (!enabled) {
        return null;
      }

      const response = await apiConfig.SERVER.post(
        `/videos/${videoId}/analyze`,
        {
          data: { prompt: prompt },
        }
      );
      const respData = response.data;
      return respData;
    },
    enabled: enabled,
  });
}

export function useGetTask(taskId: string) {
  return useQuery<Task, Error, Task, [string, string]>({
    queryKey: [keys.TASK, taskId],
    queryFn: async (): Promise<Task> => {
      try {
        const response = await apiConfig.SERVER.get(`${apiConfig.TASKS_URL}/${taskId}`);
        const respData: Task = response.data;
        return respData;
      } catch (error) {
        console.error("Error fetching task:", error);
        throw error;
      }
    },
    refetchInterval: (query) => {
      const data = query.state.data;
      return data && (data.status === "ready" || data.status === "failed")
        ? false
        : 5000;
    },
    refetchIntervalInBackground: true,
  });
}
