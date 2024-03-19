import { React, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import "./InputForm.css";

/** Receive user's check prompt for the API call
 *
 * GenerateSocialPosts -> {InputForm}
 *
 */
export function InputForm({
  video,
  setIsSubmitted,
  setShowVideoTitle,
  setShowCheckWarning,
  prompt,
  setPrompt,
}) {
  const queryClient = useQueryClient();
  const textAreaRef = useRef(null);

  /** Receive and set user input */
  async function handleSubmit(event) {
    event.preventDefault();

    if (textAreaRef && textAreaRef.current) {
      const inputValue = textAreaRef.current.value;

      if (inputValue.length > 0) {
        setPrompt(inputValue);
        setIsSubmitted(true);
        setShowVideoTitle(true);
        setShowCheckWarning(false);
      } else {
        setShowVideoTitle(false);
        setShowCheckWarning(true);
        return;
      }
    }

    queryClient.invalidateQueries([keys.VIDEOS, video._id, "gist"]);
  }

  return (
    <div className="inputForm">
      <div className="title">What social post do you want to generate?</div>
      <form className="form">
        <div>
          <textarea type="text" id="prompt" name="prompt" ref={textAreaRef} />
        </div>
        <button className="generateButton" onClick={handleSubmit}>
          Generate
        </button>{" "}
      </form>
    </div>
  );
}
