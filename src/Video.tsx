import React from "react";
import ReactPlayer from "react-player";
import "./Video.css";

/** Shows a video
 *
 * GenerateSocialPosts -> Video
 * GenerateSocialPosts -> {VideoFileUploadForm} -> Task -> Video
 *
 */

interface Props {
  url: string;
  start?: number;
  end?: number;
  width: string;
  height: string;
}

const Video: React.FC<Props> = ({ url, start, end, width, height }) => {
  return (
    <div className="video" style={{ width: width, height: height }}>
      <ReactPlayer
        key={url}
        className="video__reactPlayer"
        data-cy="data-cy-video"
        url={start || end ? `${url}?start=${start}&end=${end}` : url}
        controls
      />
    </div>
  );
}

export default Video;
