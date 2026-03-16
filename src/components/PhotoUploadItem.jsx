import React, { useState } from 'react';
import { Camera, Upload, X, FileVideo } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const PhotoUploadItem = ({ item }) => {
  const { register, setValue, watch } = useFormContext();
  const fileValue = watch(item.id);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const simulateAIAnalysis = (label) => {
    setIsAnalyzing(true);
    setAiResult(null);

    // Simulated analysis time
    setTimeout(() => {
      let result = "Đã phân tích xong: Tình trạng đạt chuẩn.";
      
      const lowerLabel = label.toLowerCase();
      if (lowerLabel.includes('serial')) {
        result = `Nhận diện Serial: S/N ${Math.floor(Math.random() * 900000000) + 100000000}`;
      } else if (lowerLabel.includes('quét nhiệt') || lowerLabel.includes('nhiệt')) {
        const temp = Math.floor(Math.random() * 10) + 35;
        result = `Nhiệt độ nhận diện: ${temp}°C (Trong ngưỡng an toàn)`;
      } else if (lowerLabel.includes('pin') || lowerLabel.includes('panel')) {
        result = "Bề mặt pin: Sạch, không nứt vỡ, không bị che bóng.";
      } else if (lowerLabel.includes('mc4')) {
        result = "Kết nối MC4: Đã cắm chặt, không lỏng lẻo.";
      }

      setAiResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(item.id, file);
      // Create preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Start AI analysis
      simulateAIAnalysis(item.label);
    }
  };

  const removeFile = () => {
    setValue(item.id, null);
    setPreviewUrl(null);
    setAiResult(null);
    setIsAnalyzing(false);
  };

  const currentFile = fileValue && fileValue.length > 0 ? fileValue[0] : null;
  const isVideo = item.type === 'video' || (currentFile && currentFile.type && currentFile.type.startsWith('video/'));

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-800">
          {item.label}
          {item.optional && <span className="ml-2 text-xs text-gray-400 font-normal">(Tùy chọn)</span>}
        </label>
      </div>

      {!fileValue ? (
        <label
          htmlFor={`file-upload-${item.id}`}
          className="mt-2 flex items-center justify-center w-full sm:w-auto px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 cursor-pointer transition-colors"
        >
          {item.type === 'video' ? (
            <FileVideo className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary-500" aria-hidden="true" />
          ) : (
            <Camera className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary-500" aria-hidden="true" />
          )}
          <span>{item.type === 'video' ? 'Chọn Video' : 'Chọn Ảnh / Chụp Ảnh'}</span>
          <input
            id={`file-upload-${item.id}`}
            type="file"
            accept={item.type === 'video' ? "video/*" : "image/*"}
            className="sr-only"
            onChange={handleFileChange}
            {...register(item.id, { required: !item.optional })}
          />
        </label>
      ) : (
        <div className="mt-2 flex items-center justify-between p-2 rounded-lg border border-gray-200 bg-gray-50 shadow-sm relative group w-full">
           <div className="flex items-center space-x-3 overflow-hidden">
             <div className="h-14 w-20 flex-shrink-0 rounded overflow-hidden bg-gray-200 border border-gray-300">
               {isVideo ? (
                 <video src={previewUrl} className="h-full w-full object-cover" />
               ) : (
                 <img src={previewUrl} alt={item.label} className="h-full w-full object-cover" />
               )}
             </div>
             <div className="min-w-0 flex-1">
               <p className="text-sm font-medium text-gray-900 truncate" title={currentFile?.name || 'File đã chọn'}>
                 {currentFile?.name || 'File đã chọn'}
               </p>
               <p className="text-xs text-green-600 font-medium">
                 {currentFile?.size ? `Đã tải lên • ${formatFileSize(currentFile.size)}` : 'Đã tải lên'}
               </p>
             </div>
           </div>
           
           <button
             type="button"
             onClick={removeFile}
             className="ml-4 flex-shrink-0 bg-white border border-gray-200 text-red-500 rounded p-1.5 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors focus:outline-hidden"
             title="Xóa file"
           >
             <X size={16} strokeWidth={2} />
           </button>
        </div>
      )}
      
      {/* Error message slot if needed, managed by parent or rhf error object */}
      
      {isAnalyzing && (
        <div className="mt-3 flex items-center space-x-2 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 animate-pulse">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-blue-600">AI đang phân tích hình ảnh...</span>
        </div>
      )}

      {aiResult && !isAnalyzing && (
        <div className="mt-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100 shadow-inner overflow-hidden">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <div className="bg-indigo-600 h-2 w-2 rounded-full ring-4 ring-indigo-200"></div>
            </div>
            <div className="ml-3">
              <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-1">Kết quả AI</p>
              <p className="text-sm font-medium text-indigo-700 leading-relaxed">{aiResult}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadItem;
