import React, { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "./common/keys";
import "./InputForm.css";
import { Video } from "./common/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

const WarningIcon:string = require("./common/Warning.svg").default;
interface InputFormProps {
  video: Video;
  setIsSubmitted: (value: boolean) => void;
  isSubmitted: boolean;
  setShowVideoTitle: (value: boolean) => void;
  setPrompt: (value: string) => void;
  setPlatform: (value: string) => void;
}

/** Form to get user input
 *
 * GenerateSocialPosts -> { InputForm }
 *
 */

export const InputForm: React.FC<InputFormProps> = ({
  video,
  setIsSubmitted,
  isSubmitted,
  setShowVideoTitle,
  setPrompt,
  setPlatform,
}) => {
  const [showCheckWarning, setShowCheckWarning] = useState(false);
  const queryClient = useQueryClient();
  const instagramRef = useRef<HTMLInputElement | null>(null);
  const facebookRef = useRef<HTMLInputElement | null>(null);
  const xRef = useRef<HTMLInputElement | null>(null);
  const blogRef = useRef<HTMLInputElement | null>(null);
  const textRadioRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOthersSelect = () => {
    setPrompt("")
    setPlatform("")
    setIsSubmitted(false)
    setShowCheckWarning(false);
    queryClient.invalidateQueries({queryKey: [keys.VIDEOS, video?._id, "generate", prompt]});
    if (textAreaRef.current) {
      textAreaRef.current.value="";
      textAreaRef.current.style.display = "block";
    }
  };

  const handleOthersDeselect = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.display = "none";
    }
  };

  const handleRadioChange = () => {
    if (!textRadioRef.current?.checked && textAreaRef.current) {
      handleOthersDeselect();
      setPrompt("")
      setPlatform("")
      setIsSubmitted(false)
      setShowCheckWarning(false);
      queryClient.invalidateQueries({queryKey: [keys.VIDEOS, video?._id, "generate", prompt]});
      textAreaRef.current.value="";
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let promptValue = "";
    let platformValue = "";

    if (instagramRef.current?.checked) {
      promptValue = "Write a summary. Format should be a Instagram post. 100 words or less. Use emojis. Do not provide your answer (e.g., Certainly). Provide only the summary. Do not provide an explanation. ";
      platformValue = "Instagram";
    } else if (facebookRef.current?.checked) {
      promptValue = "Write a summary. Format should be a Facebook post. 150 words or less. Use emojis. Do not provide your answer (e.g., Certainly). Provide only the summary. Do not provide an explanation. ";
      platformValue = "Facebook";
    } else if (xRef.current?.checked) {
      promptValue = "Write a summary. Format should be a X (formerly Twitter) post. 50 words or less. Use emojis. Do not provide your answer (e.g., Certainly). Provide only the summary. Do not provide an explanation. ";
      platformValue = "X";
    } else if (blogRef.current?.checked) {
      promptValue = "Write a summary with details. Format should be a blog post. Divide sections with subtitles. Do not provide your answer (e.g., Certainly). Provide only the summary. Do not provide an explanation. ";
      platformValue = "Blog";
    } else if (textRadioRef.current?.checked) {
      const inputValue = textAreaRef.current?.value.trim();
      if (inputValue?.length && inputValue?.length > 0) {
        promptValue = inputValue;
        platformValue = `"${inputValue}"`;
      } else {
        setShowCheckWarning(true);
        return;
      }
    }
    setPrompt(promptValue);
    setIsSubmitted(true);
    setShowVideoTitle(true);
    setPlatform(platformValue);
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
            onChange={handleRadioChange}
          />
          <FontAwesomeIcon icon={faInstagram} /> Instagram
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
            onChange={handleRadioChange}
          />
          <FontAwesomeIcon icon={faFacebook} /> Facebook
        </label>{" "}
        <div className="inputForm_form_radioWrapper">
          <label>
            <input
              type="radio"
              className="inputForm__form__radio"
              data-cy="data-cy-inputForm-radio"
              name="platform"
              value="x"
              ref={xRef}
              disabled={isSubmitted}
              onChange={handleRadioChange}
            />
            <FontAwesomeIcon icon={faXTwitter} /> X(Twitter)
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
              onChange={handleRadioChange}
            />
            <FontAwesomeIcon icon={faBlog} /> Blog
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
              onBlur={(e) => {
                if (!textAreaRef.current?.contains(e.relatedTarget as Node)) {
                  handleOthersDeselect();
                }
              }}
              disabled={isSubmitted}
            />
            <FontAwesomeIcon icon={faCommentDots} /> Others
            </label>{" "}
            <textarea
              className="inputForm__form__textarea"
              data-cy="data-cy-inputForm-textarea"
              id="prompt"
              name="prompt"
              placeholder="Write your own requirements / prompt here"
              ref={textAreaRef}
              style={{ display: showCheckWarning ? "block" : "none" }}
              disabled={isSubmitted}
              />
            {showCheckWarning && (
              <div className="inputForm__form__warningMessageWrapper">
                <img
                  className="inputForm__form__warningMessageWrapper__warningIcon"
                  src={WarningIcon}
                  alt="WarningIcon"
                ></img>
                <div className="inputForm__form__warningMessageWrapper__warningMessage">
                Please provide your own requirements / prompt
                </div>
              </div>
            )}
          </div>
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
