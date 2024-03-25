import { React, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoFileUploadForm } from "./VideoFileUploadForm";
import { Result } from "./Result";
import "./GenerateSocialPosts.css";
import { useGetVideo } from "./apiHooks";
import keys from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { ErrorBoundary } from "./ErrorBoundary";
import WarningIcon from "./Warning.svg";
import greenWarningIcon from "./Warning_Green.svg";

/** Generate Titles and Hashtags
 *
 * App -> GenerateSocialPosts -> {VideoFileUploadForm, Video, InputForm, Result}
 *
 */

export function GenerateSocialPosts({ index, videoId, refetchVideos }) {
  const { data: video, isLoading } = useGetVideo(
    index,
    videoId,
    Boolean(videoId)
  );

  const [prompt, setPrompt] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showVideoTitle, setShowVideoTitle] = useState(false);
  const [showCheckWarning, setShowCheckWarning] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const queryClient = useQueryClient();

  const vidTitleRaw = video?.metadata?.video_title;
  const vidTitleClean = decodeAndCleanFilename(vidTitleRaw);

  /** Return clean video file name  */
  function decodeAndCleanFilename(filename) {
    let decodedFilename = filename;
    try {
      decodedFilename = decodeURIComponent(filename);
    } catch (error) {
      console.error("Error decoding filename:", error);
    }
    const cleanedFilename = decodedFilename
      .replace(/%20/g, " ")
      .replace(/\([^)]*\)/g, "");
    return cleanedFilename;
  }

  async function resetPrompt() {
    setPrompt("");
  }

  useEffect(() => {
    const fetchData = async () => {
      await queryClient.invalidateQueries({
        queryKey: [keys.VIDEOS, index, videoId],
      });
    };
    fetchData();
    resetPrompt();
    setIsSubmitted(false);
    setShowVideoTitle(false);
    setShowCheckWarning(false);
    setSelectedFile(null);
    setIsFileUploading(false);
  }, [index, videoId, queryClient]);

  return (
    <div className="GenerateSocialPosts">
      <h1 className="GenerateSocialPosts__appTitle">
        Generate Social Posts for Your Video
      </h1>
      <VideoFileUploadForm
        index={index}
        refetchVideos={refetchVideos}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        isFileUploading={isFileUploading}
        setIsFileUploading={setIsFileUploading}
      />
      {!video && (
        <div className="GenerateSocialPosts__uploadMessageWrapper">
          <img
            className="GenerateSocialPosts__uploadMessageWrapper__warningIcon"
            src={greenWarningIcon}
            alt="greenWarningIcon"
          ></img>
          <div>
            <p className="GenerateSocialPosts__uploadMessageWrapper__message">
              Please upload a video
            </p>
          </div>
        </div>
      )}
      {!isFileUploading && (
        <>
          <ErrorBoundary>
            {isLoading && <LoadingSpinner />}
            {video && (
              <Video
                url={video.hls?.video_url}
                width={"381px"}
                height={"214px"}
              />
            )}
          </ErrorBoundary>
          {showVideoTitle && (
            <div className="GenerateSocialPosts__videoTitle">
              {vidTitleClean}
            </div>
          )}
          {showCheckWarning && (
            <div className="GenerateSocialPosts__warningMessageWrapper">
              <img
                className="GenerateSocialPosts__warningMessageWrapper__warningIcon"
                src={WarningIcon}
                alt="WarningIcon"
              ></img>
              <div className="GenerateSocialPosts__warningMessageWrapper__warningMessage">
                Please select one of the checkboxes
              </div>
            </div>
          )}
          {video && (
            <InputForm
              video={video}
              setIsSubmitted={setIsSubmitted}
              setShowVideoTitle={setShowVideoTitle}
              setShowCheckWarning={setShowCheckWarning}
              setPrompt={setPrompt}
            />
          )}
          {video && (
            <Result video={video} isSubmitted={isSubmitted} prompt={prompt} />
          )}
        </>
      )}
    </div>
  );
}
