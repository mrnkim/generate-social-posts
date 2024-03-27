import React, { Suspense, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { keys } from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { useGetTask } from "./apiHooks";
import "./Task.css";
import { Video } from "./Video";

/** Gets and shows status of a task
 *
 * VideoUrlUploadForm -> Task -> Video
 *
 */
export function Task({ taskId, setTaskId, refetchVideos }) {
  const { data: task } = useGetTask(taskId);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (task && (task.status === "ready" || task.status === "failed")) {
      setTaskId(null);
      refetchVideos();
    }
  }, [task, task?.status]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [keys.TASK, taskId],
    });
  }, [queryClient, keys.TASK, taskId]);

  return (
    <div className="task">
      <div className="task__loadingSpinner">
        <LoadingSpinner />
      </div>
      <div className="task__status">
        {task && task.status ? `${task.status}...` : null}
      </div>
      <ErrorBoundary>
        {task && task.hls?.video_url && (
          <div className="task__video">
            <Video url={task.hls?.video_url} width={"381px"} height={"214px"} />
          </div>
        )}
        <Suspense fallback={<LoadingSpinner />}></Suspense>
      </ErrorBoundary>
    </div>
  );
}
