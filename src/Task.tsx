import React, { Suspense, useEffect, Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { keys } from "./common/keys";
import LoadingSpinner from "./common/LoadingSpinner";
import { useGetTask } from "./common/apiHooks";
import "./Task.css";
import  Video  from "./Video";
import ErrorFallback from './common/ErrorFallback';

/** Gets and shows status of a task
 *
 * VideoUrlUploadForm -> Task -> Video
 *
 */

interface TaskProps {
  taskId: string;
  setTaskId: Dispatch<SetStateAction<string | null>>;
  refetchVideos: () => void;
}

export const Task:React.FC<TaskProps> = ({ taskId, setTaskId, refetchVideos }) => {
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
  }, [queryClient, taskId]);

  return (
    <div className="task">
      <div className="task__loadingSpinner">
        <LoadingSpinner />
      </div>
      <div className="task__status">
        {task && task.status ? `${task.status}...` : null}
      </div>
      <ErrorBoundary fallbackRender={ErrorFallback}>
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
