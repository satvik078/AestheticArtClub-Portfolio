import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const UploadArtSection = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all images from backend
  const fetchImages = async () => {
    try {
      const res = await axios.get("https://aestheticartclub-portfolio.onrender.com/images");
      setImages(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload file handler
  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://aestheticartclub-portfolio.onrender.com/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Add the newly uploaded image at the top
      setImages((prev) => [res.data.url, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="max-w-4xl mx-auto py-10 text-center">
      {/* Upload Box */}
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

      {/* Error Message */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Image Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
        {images.map((url, idx) => (
          <img key={idx} src={url} alt={`Art ${idx}`} className="rounded-xl shadow-md" />
        ))}
      </div>
    </div>
  );
};

export default UploadArtSection;
