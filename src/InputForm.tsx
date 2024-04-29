import React, { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "./common/keys";
import "./InputForm.css";
import { Video } from "./common/types";

interface InputFormProps {
  video: Video;
  setIsSubmitted: (value: boolean) => void;
  isSubmitted: boolean;
  setShowVideoTitle: (value: boolean) => void;
  setShowCheckWarning: (value: boolean) => void;
  setPrompt: (value: string) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  video,
  setIsSubmitted,
  isSubmitted,
  setShowVideoTitle,
  setShowCheckWarning,
  setPrompt,
}) => {
  console.log("🚀 > isSubmitted=", isSubmitted)
  const queryClient = useQueryClient();
  const instagramRef = useRef<HTMLInputElement | null>(null);
  const facebookRef = useRef<HTMLInputElement | null>(null);
  const xRef = useRef<HTMLInputElement | null>(null);
  const blogRef = useRef<HTMLInputElement | null>(null);
  const textRadioRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOthersSelect = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.display = "block";
    }
  };

  const handleOthersDeselect = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.display = "none";
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrompt("");

    if (instagramRef.current) {
      setPrompt("write a Instagram post with emojis, 100 words or less. Do not provide an explanation. Do not provide a summary.")
      setShowCheckWarning(false);
      setIsSubmitted(true);
      setShowVideoTitle(true);
    } else if (textAreaRef.current) {
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
    queryClient.invalidateQueries({ queryKey: queryKey });

  }

  return (
    <div className="inputForm" data-cy="data-cy-inputForm">
      <div className="inputForm__title">
        Tell me what social post you want to generate
      </div>
      <form className="inputForm__form" onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            className="inputForm__form__radio"
            data-cy="data-cy-inputForm-radio"
            name="platform"
            value="instagram"
            id="instagram"
            ref={instagramRef}
            disabled={isSubmitted}
          />
        Instagram
        </label>{" "}
        <label>
          <input
            type="radio"
            className="inputForm__form__radio"
            data-cy="data-cy-inputForm-radio"
            name="platform"
            value="facebook"
            ref={facebookRef}
            disabled={isSubmitted}
          />
        Facebook
        </label>{" "}
        <label>
          <input
            type="radio"
            className="inputForm__form__radio"
            data-cy="data-cy-inputForm-radio"
            name="platform"
            value="x"
            ref={xRef}
            disabled={isSubmitted}
          />
        X (Twitter)
        </label>{" "}
        <label>
          <input
            type="radio"
            className="inputForm__form__radio"
            data-cy="data-cy-inputForm-radio"
            name="platform"
            value="blog"
            ref={blogRef}
            disabled={isSubmitted}
          />
        Blog
        </label>{" "}
        <label>
          <input
            type="radio"
            className="inputForm__form__radio"
            data-cy="data-cy-inputForm-radio"
            name="platform"
            value="others"
            ref={textRadioRef}
            onChange={handleOthersSelect}
            onBlur={handleOthersDeselect}
            disabled={isSubmitted}
          />
        Others
          <textarea
            className="inputForm__form__textarea"
            data-cy="data-cy-inputForm-textarea"
            id="prompt"
            name="prompt"
            placeholder="Write your post here..."
            ref={textAreaRef}
            style={{ display: "none" }}
            disabled={isSubmitted}
            />
          </label>{" "}
        <button
          className="inputForm__form__button"
          data-cy="data-cy-inputForm-button"
          type="submit"
          disabled={isSubmitted}
        >
          Generate
        </button>{" "}
      </form>
    </div>
  );
};
