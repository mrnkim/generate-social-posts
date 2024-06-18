<a id="readme-top"></a>

# Generate Social Posts for Your Video

## 👋 Introduction

Use this app to effortlessly create social media posts of any type from short, fun Instagram updates to in-depth blog posts loaded with details. As a video content creator, you may already have fantastic video content. With this app, you can swiftly transform it into written content suitable for various social media platforms!

📌 Check out the [Demo](https://generate-social-posts-vercel-client.vercel.app/)! (_Note: This simplified version of the app does not include the video upload form_)

<div align="center">
  <a href="https://generate-social-posts-vercel-client.vercel.app/">
    <img src="public/screenshot.jpeg" alt="search result screenshot" style="border: 1px solid black;" />
  </a>
</div>

### Built With

- [Twelve Labs API](https://docs.twelvelabs.io/docs)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [React Query](https://tanstack.com/query/latest)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔑 Getting Started

### Step 1. Generate Twelve Labs API Key

Visit [Twelve Labs Playground](https://playground.twelvelabs.io/) to generate your API Key

- Upon signing up, you'll receive free credits to index up to 10 hours of video content!

### Step 2 (Option 1). Start the App on Replit

1. Click the button below and fork the repl

   [![Run on Replit](https://replit.com/badge/github/mrnkim/generate-social-posts)](https://replit.com/@twelvelabs/generate-social-posts)

2. Update Secrets (equivalent to .env)

   ```
   REACT_APP_API_KEY=<YOUR API KEY>
   REACT_APP_INDEX_ID=<YOUR INDEX ID>
   ```

3. Stop and Run the Repl again

### Step 2 (Option 2). Start the App Locally

1. Clone the current repo

   ```sh
   git clone git@github.com:mrnkim/generate-social-posts.git
   ```

2. Create `.env` file in the root directory and provide the values for each key

   ```
    REACT_APP_API_KEY=<YOUR_API_KEY>
    REACT_APP_INDEX_ID=<YOUR_INDEX_ID>
    REACT_APP_SERVER_URL=<YOUR_SERVER_URL> //e.g., http://localhost
    REACT_APP_PORT_NUMBER=<YOUR_PORT_NUMBER> //e.g., 4001
   ```

3. Start the server

   ```sh
   node server.js
   ```

4. Install and start the client

   ```sh
   npm install
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🎯 What's Next?

- Add more tests
- Improve error handling and add data validations

<p align="right">(<a href="#readme-top">back to top</a>)</p>
