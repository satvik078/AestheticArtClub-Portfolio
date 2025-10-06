import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const UploadArtSection = () => {
  const [images, setImages] = useState([]); // { url, public_id }
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  
  // Owner check (replace with auth logic if needed)
  const isOwner = true;

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
      setImages((prev) => [{ url: res.data.url, public_id: res.data.public_id }, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, []);

  // Delete image handler
  const handleDelete = async (public_id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`https://aestheticartclub-portfolio.onrender.com/images/${public_id}`);
      setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete image. Try again.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="max-w-5xl mx-auto py-10 text-center">
      {/* Upload Box */}
      {isOwner && (
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
      )}

      {/* Error Message */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Image Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
        {images.map((img, idx) => (
          <div key={img.public_id} className="relative">
            <img
              src={img.url}
              alt={`Art ${idx}`}
              className="rounded-xl shadow-md w-full h-60 object-cover"
            />
            {isOwner && (
              <button
                onClick={() => handleDelete(img.public_id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadArtSection;
