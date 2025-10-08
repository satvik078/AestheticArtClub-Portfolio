import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const BACKEND_URL = "https://aestheticartclub-portfolio.onrender.com";

const UploadArtSection = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages((prev) => [{ url: res.data.url, public_id: res.data.public_id }, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    axios.get(`${BACKEND_URL}/images`).then((res) => setImages(res.data));
  }, []);

  // Delete handler
  const handleDelete = async (public_id) => {
    try {
      await axios.delete(`${BACKEND_URL}/delete`, {
        data: { public_id }
      });
      setImages(images.filter(img => img.public_id !== public_id));
    } catch (err) {
      alert("Delete failed");
    }
  };

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
        {images.map((img, idx) => (
          <div key={img.public_id || idx} className="relative">
            <img src={img.url} alt={`Art ${idx}`} className="rounded-xl shadow-md" />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
              onClick={() => handleDelete(img.public_id)}
            >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadArtSection;
