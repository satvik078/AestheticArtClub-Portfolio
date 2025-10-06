import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const UploadArtSection = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post("https://aestheticartclub-portfolio-1.onrender.com", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages((prev) => [res.data.url, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    axios.get("https://aestheticartclub-portfolio-1.onrender.com/images").then((res) => setImages(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 text-center">
      <div
        {...getRootProps()}
        className={`border-4 border-dashed p-10 rounded-2xl cursor-pointer transition-all ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-blue-600 font-medium">Uploading...</p>
        ) : (
          <p>Drag & drop your art here, or click to upload</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
        {images.map((url, idx) => (
          <img key={idx} src={url} alt={`Art ${idx}`} className="rounded-xl shadow-md" />
        ))}
      </div>
    </div>
  );
};

export default UploadArtSection;
