const DriveCreateFolder = async (
  accessToken: string | null,
  folderName: string
) => {
  if (accessToken === null) return;

  // Metadata for the new folder
  const metadata = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder",
  };

  // Make a fetch request to create the folder
  fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(metadata),
  })
    .then((res) => res.json())
    .then((folder) => {
      console.log("Created Folder:", folder);
      // TODO: Handle the created folder details as needed
    })
    .catch((error) => {
      console.error("Create Folder Error:", error);
    });
};
const DriveGetImageURL = async (accessToken: string | null, fileId: string) => {
  if (accessToken === null) return;

  // Make a fetch request to get content of the specified file by ID
  fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    method: "GET",
    headers: new Headers({ Authorization: "Bearer " + accessToken }),
  })
    .then((res) => res.blob())
    .then((blob) => {
      // Create a data URL from the blob
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    })
    .catch((error) => {
      console.error("File Content Error:", error);
    });
};
const DriveImageUpload = async (accessToken: string | null, file: File) => {
  if (accessToken === null) return;

  var metadata = {
    name: file.name,
    mimeType: file.type,
    parents: ['1q49YCMK_qZLyjOWZqfAx6vOhyxb-djEC'],
    role: 'reader',
    type: 'anyone',
  };

  var form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file);

  fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
      body: form,
    }
  )
    .then((res) => res.json())
    .then((val) => {
      console.log("val", val);
      // this return Image's id on Drive
      DriveSettingPermission(accessToken, val.id)
      
    });
};
const DriveGetFileTXT = async (accessToken: string | null, fileId: string) => {
  if (accessToken === null) return;

  // Make a fetch request to get content of the specified file by ID
  fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    method: "GET",
    headers: new Headers({ Authorization: "Bearer " + accessToken }),
  })
    .then((res) => res.text())
    .then((content) => {
      console.log("File Content:", content);
      // TODO: Handle the file content as needed
      return content;
    })
    .catch((error) => {
      console.error("File Content Error:", error);
    });
};
const DriveUploadTXT = async (accessToken: string | null, fileTXT: string | null) => {
  if (accessToken === null) return;
  var fileContent = fileTXT ? fileTXT : ("No content provides"); // As a sample, upload a text file.
  var file = new Blob([fileContent], {type: 'text/plain'});
  var metadata = {
      'name': 'helloworld', // Filename at Google Drive
      'mimeType': 'text/plain', // mimeType at Google Drive
  };
  
  var form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);
  
  fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: form,
  }).then((res) => {
      return res.json();
  }).then(function(val) {
      console.log(val);
      DriveSettingPermission(accessToken, val.id)
  });
};
const DriveSettingPermission = async (accessToken: string | null, fileID: string) =>{
  if (accessToken === null) return;
  const sharingResponse = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileID}/permissions`,
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        role: "reader",
        type: "anyone",
      }),
    }
  );

  if (!sharingResponse.ok) {
    console.error("Failed to set sharing permissions.");
    return;
  }
  console.log("File uploaded and sharing permissions set successfully.");
}
export {
  DriveCreateFolder,
  DriveGetImageURL,
  DriveImageUpload,
  DriveGetFileTXT,
  DriveUploadTXT,
  DriveSettingPermission
};
