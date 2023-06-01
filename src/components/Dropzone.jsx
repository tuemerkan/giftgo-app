import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
const Dropzone = ({ setPicture }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // If you only want to handle one file
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result contains the Data URL which we will convert to Base64 string
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        setPicture(base64String);
      };
      reader.readAsDataURL(file);
    },
  });

  // Remove the image from the state
  const removeImage = (file) => {
    const newFiles = [...files]; // make a separate copy of the array
    const index = newFiles.indexOf(file);
    if (index !== -1) {
      newFiles.splice(index, 1);
      setFiles(newFiles);
    }
  };

  // File preview
  const thumbs = files.map((file) => (
    <div key={file.name} className="relative h-64">
      <img
        src={file.preview}
        className="w-full h-full object-cover"
        alt={file.name}
      />
      <button
        onClick={() => removeImage(file)}
        className="absolute top-0 right-0 p-2"
      ></button>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div>
      {files.length > 0 ? (
        <aside className="w-full h-64">{thumbs}</aside>
      ) : (
        <div
          {...getRootProps({
            className:
              "dropzone flex flex-col items-center justify-center w-full h-64 border-dashed border-2 border-gray-300 cursor-pointer",
          })}
        >
          <input {...getInputProps()} required />
          <p className="mb-2">Drop image or choose</p>
          <div className="flex items-center justify-center w-40 py-2 bg-white text-gray-800 rounded-md shadow">
            Upload Image
          </div>
        </div>
      )}
      <br />
    </div>
  );
};

export default Dropzone;
