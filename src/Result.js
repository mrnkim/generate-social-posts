import { React, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import "./Result.css";
import { useGenerate } from "./apiHooks";
import keys from "./keys";
import { ErrorBoundary } from "./ErrorBoundary";

/** Shows the results
 *
 * GenerateTitlesAndHashtags -> Result
 *
 */

export function Result({ video, isSubmitted, prompt }) {
  const { data: result } = useGenerate(
    prompt,
    video?._id,
    Boolean(video?._id && prompt?.length > 0 && isSubmitted)
  );

  console.log("🚀 > Result > result=", result)
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([keys.VIDEOS, video?._id, "generate"]);
  }, [prompt, video?._id]);

  return (
    <ErrorBoundary>
      <div className="result">
        <div className="resultTitle">Generated post</div>
        <div>{result?.data}</div>
      </div>
    </ErrorBoundary>
  );
}
