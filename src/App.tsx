import React from "react";
import "./App.css";
import { useEffect, Suspense } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {keys} from "./common/keys";
import LoadingSpinner from "./common/LoadingSpinner";
import { GenerateSocialPosts } from "./GenerateSocialPosts";
import { useGetVideos } from "./common/apiHooks";
import { ErrorBoundary } from "./common/ErrorBoundary";
import apiConfig from "./common/apiConfig";
import ErrorFallback from "./common/ErrorFallback";

/** App that generates the written summary, chapters, and highlights of a video
 *
 * App -> GenerateSocialPosts
 *
 */

function App() {
  const { data: videos, refetch: refetchVideos, isLoading, isError, error } = useGetVideos(apiConfig.INDEX_ID);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (apiConfig.INDEX_ID) {
      queryClient.invalidateQueries({queryKey: [keys.VIDEOS, apiConfig.INDEX_ID]});
    }
  }, [queryClient]);

  if (!apiConfig.INDEX_ID) {
    return <ErrorFallback error={new Error("Please provide index Id")} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorFallback error={error} />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="app">
          {videos?.data ? (
            <GenerateSocialPosts
              index={apiConfig.INDEX_ID}
              videoId={videos.data[0]?._id || null}
              refetchVideos={refetchVideos}
            />
          ) : (
            <ErrorFallback error={new Error("No videos data available")} />
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
