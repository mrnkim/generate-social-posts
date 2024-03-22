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
      <div className="inputForm__title">
        Tell Me What social post you want to generate
      </div>
      <form className="inputForm__form">
        <textarea
          className="inputForm__form__textarea"
          type="text"
          id="prompt"
          name="prompt"
          placeholder="Write a very short Instagram post with emojis"
          ref={textAreaRef}
        />
        <button className="inputForm__form__button" onClick={handleSubmit}>
          Generate
        </button>{" "}
      </form>
    </div>
  );
}
