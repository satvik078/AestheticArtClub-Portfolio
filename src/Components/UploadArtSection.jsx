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

  // Handle file drop / upload
  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
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
      setImages((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, []);

  // Delete image
  const handleDelete = async (public_id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`https://aestheticartclub-portfolio.onrender.com/images/${public_id}`);
      setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
    }
  };

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
        {uploading ? <p className="text-blue-600 font-medium">Uploading...</p> : <p>Drag & drop your art here, or click to upload</p>}
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
        {images.map((img) => (
          <div key={img.public_id} className="relative">
            <img src={img.url} alt="Uploaded Art" className="rounded-xl shadow-md" />
            <button
              onClick={() => handleDelete(img.public_id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadArtSection;
