import { React, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import "./Result.css";
import { useGenerate } from "./apiHooks";
import keys from "./keys";
import { ErrorBoundary } from "./ErrorBoundary";
import LoadingSpinner from "./LoadingSpinner";

/** Shows the results
 *
 * GenerateSocialPosts -> Result
 *
 */

export function Result({ video, isSubmitted, prompt }) {
  const {
    data: result,
    isLoading,
    isFetching,
  } = useGenerate(
    prompt,
    video?._id,
    Boolean(video?._id && prompt?.length > 0 && isSubmitted)
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([keys.VIDEOS, video?._id, "generate"]);
  }, [prompt, video?._id]);

  return (
    <ErrorBoundary>
      <div className="result">
        {!isLoading && !isFetching && result && (
          <>
            {" "}
            <div className="result__resultTitle">Generated post</div>
            <div className="result__resultData">{result?.data}</div>
          </>
        )}
        {(isLoading || isFetching) && <LoadingSpinner />}
      </div>
    </ErrorBoundary>
  );
}
