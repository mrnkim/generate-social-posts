import React, {useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {keys} from './common/keys'
import "./InputForm.css";
import { Video } from './common/types';


/** Receive user's check prompt for the API call
 *
 * GenerateSocialPosts -> {InputForm}
*
*/

interface InputFormProps {
  video: Video;
  setIsSubmitted: (value: boolean) => void;
  setShowVideoTitle: (value: boolean) => void;
  setShowCheckWarning: (value: boolean) => void;
  setPrompt: (value: string) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  video,
  setIsSubmitted,
  setShowVideoTitle,
  setShowCheckWarning,
  setPrompt,
}) => {
  const queryClient = useQueryClient();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  /** Receive and set user input */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrompt("");

    if (textAreaRef.current) {
      const inputValue = textAreaRef.current.value.trim();
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

    type QueryKey = readonly [string, string, "gist"];
    const queryKey: QueryKey = [keys.VIDEOS, video._id, "gist"];
    queryClient.invalidateQueries({queryKey: queryKey});  }

  return (
    <div className="inputForm" data-cy="data-cy-inputForm">
      <div className="inputForm__title">
        Tell me what social post you want to generate
      </div>
      <form className="inputForm__form" onSubmit={handleSubmit}>
        <textarea
          className="inputForm__form__textarea"
          id="prompt"
          name="prompt"
          placeholder="Write a very short Instagram post with emojis"
          ref={textAreaRef}
        />
        <button className="inputForm__form__button" type="submit">
          Generate
        </button>{" "}
      </form>
    </div>
  );
}
