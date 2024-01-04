import React, { useEffect, useState, useRef } from "react";
import OAuthSignin from "./OAuthSignin";
import {
  DriveCreateFolder,
  DriveGetImageURL,
  DriveImageUpload,
  DriveGetFileTXT,
  DriveUploadTXT,
  DriveSettingPermission
} from "./DriveFunctions";
const CLIENT_ID =
  "557583745758-309h7bo1ig8fr138bhrnsbq2miktbbe8.apps.googleusercontent.com";
const SECRET_ID = "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";
const Redirect_URL = "http://localhost:5173";
const API_KEY = "AIzaSyBVZijyd80Gx16qFcC52E4FOboPQW0eDfg";
const ACCESS_TOKEN =
  "ya29.a0AfB_byBIIVOJuhlE2ufD8fQPdJEExzOQZDViDRaZjIQflFnrINMF1FTOSH8axowuWShoeQBjpPQL0s2SNEvMezPZZLds3zJiWkIXArxipKivHCU3eWTbGXozciqql2_aCg2dQ-mEd9F3v25vdT56DgQTc00AOyEAsXBgaCgYKAYQSARASFQHGX2MiK43wKwRhKCYzZ6IRe4LHOw0171";
export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Function to extract the access token from the URL fragment
    const extractAccessToken = () => {
      const fragment = window.location.hash.substring(1);
      const fragmentParams = new URLSearchParams(fragment);
      const accessToken = fragmentParams.get("access_token");

      if (accessToken) {
        console.log("Access Token:", accessToken);
        setAccessToken(accessToken);
        // TODO: Store the access token securely (e.g., in state, local storage)
      }
    };

    // Check if the URL contains an access token
    extractAccessToken();

    // Listen for changes in the URL hash (e.g., due to redirects)
    window.addEventListener("hashchange", extractAccessToken);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("hashchange", extractAccessToken);
    };
  }, []);
  const handleUploadTXT = async () => {
    const response = await DriveUploadTXT(accessToken, "hello world");
  };
  const handleGetFileTXT = async (
    accessToken: string | null,
    fileId: string
  ) => {
    const res = await DriveGetFileTXT(accessToken, fileId);
  };
  
  // upload image
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      await DriveImageUpload(accessToken, selectedFile)
      // DriveSettingPermission(accessToken, res.id)
    }
  };
  const handleGetFileImageURL = async (
    accessToken: string | null,
    fileId: string
  ) => {
    DriveGetImageURL(accessToken, fileId);
    // link to see image: <img alt="something" src="https://drive.google.com/uc?id=1BqipEiZVolCemaMccDn1uxNNa_Q_JZgh" />
  };

  const folderNameRef = useRef<HTMLInputElement | null>(null);
  const handleDriveCreateFolder = () => {
    if (!folderNameRef.current) return;
    const nameFolder = folderNameRef.current.value;
    DriveCreateFolder(accessToken, nameFolder);
  };
  return (
    <div>
      <OAuthSignin
        CLIENT_ID={CLIENT_ID}
        SECRET_ID={SECRET_ID}
        Redirect_URL={Redirect_URL}
        API_KEY={API_KEY}
      />
      <button onClick={handleUploadTXT}>Upload</button>
      <button
        onClick={() =>
          handleGetFileTXT(accessToken, "1-4zu2y-ohSnlxjG0TOt1rdSqHS8llTjC")
        }
      >
        Read file
      </button>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button
        onClick={() =>
          handleGetFileImageURL(
            accessToken,
            "1BqipEiZVolCemaMccDn1uxNNa_Q_JZgh"
          )
        }
      >
        Read image
      </button>
      {imageSrc && <img src={imageSrc} alt="Google Drive Image" />}
      {/* <img alt="something" src="https://drive.google.com/uc?id=1BqipEiZVolCemaMccDn1uxNNa_Q_JZgh" /> */}
      <input type="text" ref={folderNameRef} />
      <button onClick={handleDriveCreateFolder}>Create Folder</button>
    </div>
  );
}
// id image: 1BqipEiZVolCemaMccDn1uxNNa_Q_JZgh
