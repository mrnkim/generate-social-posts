require("dotenv").config();
const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

/** Define constants and configure TL API endpoints */
const TWELVE_LABS_API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = "https://api.twelvelabs.io/v1.2";
const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER || 4001;

/** Set up middleware for Express */
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/** Define error handling middleware */
const errorLogger = (error, request, response, next) => {
  console.error(error);
  next(error);
};

const errorHandler = (error, request, response, next) => {
  return response
    .status(error.status || 500)
    .json(error || "Something Went Wrong...");
};

app.use(errorLogger, errorHandler);

process.on("uncaughtException", function (exception) {
  console.log(exception);
});

/** Set up Express server to listen on port 4002 */
app.listen(PORT_NUMBER, () => {
  console.log(`Server Running. Listening on port ${PORT_NUMBER}`);
});

const HEADERS = {
  "Content-Type": "application/json",
  "x-api-key": TWELVE_LABS_API_KEY,
};

/** Get videos */
app.get("/indexes/:indexId/videos", async (request, response, next) => {
  const params = {
    page_limit: request.query.page_limit,
  };

  try {
    const options = {
      method: "GET",
      url: `${API_BASE_URL}/indexes/${request.params.indexId}/videos`,
      headers: { ...HEADERS },
      data: { params },
    };
    const apiResponse = await axios.request(options);
    response.json(apiResponse.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Error Getting Videos";
    return next({ status, message });
  }
});

/** Get a video of an index */
app.get(
  "/indexes/:indexId/videos/:videoId",
  async (request, response, next) => {
    const indexId = request.params.indexId;
    const videoId = request.params.videoId;

    try {
      const options = {
        method: "GET",
        url: `${API_BASE_URL}/indexes/${indexId}/videos/${videoId}`,
        headers: { ...HEADERS },
      };
      const apiResponse = await axios.request(options);
      response.json(apiResponse.data);
    } catch (error) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Error Getting a Video";
      return next({ status, message });
    }
  }
);

/** Generate open-ended text of a video */
app.post("/videos/:videoId/generate", async (request, response, next) => {
  const videoId = request.params.videoId;
  let prompt = request.body.data;
  try {
    const options = {
      method: "POST",
      url: `${API_BASE_URL}/generate`,
      headers: { ...HEADERS, accept: "application/json" },
      data: { ...prompt, video_id: videoId, temperature: 0.3 },
    };
    const apiResponse = await axios.request(options);
    response.json(apiResponse.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Error Generating Text";
    return next({ status, message });
  }
});

/** Index a video and return a task ID */
app.post(
  "/index",
  upload.single("video_file"),
  async (request, response, next) => {
    const formData = new FormData();

    // Append data from request.body
    Object.entries(request.body).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const blob = new Blob([request.file.buffer], {
      type: request.file.mimetype,
    });

    formData.append("video_file", blob, request.file.originalname);

    const options = {
      method: "POST",
      url: `${API_BASE_URL}/tasks`,
      headers: {
        "x-api-key": TWELVE_LABS_API_KEY,
        accept: "application/json",
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
      data: formData,
    };
    try {
      const apiResponse = await axios.request(options);
      response.json(apiResponse.data);
    } catch (error) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Error indexing a Video";
      return next({ status, message });
    }
  }
);

/** Check the status of a specific indexing task */
app.get("/tasks/:taskId", async (request, response, next) => {
  const taskId = request.params.taskId;

  try {
    const options = {
      method: "GET",
      url: `${API_BASE_URL}/tasks/${taskId}`,
      headers: { ...HEADERS },
    };
    const apiResponse = await axios.request(options);
    response.json(apiResponse.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Error getting a task";
    return next({ status, message });
  }
});
