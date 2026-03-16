import React, { useState, useEffect } from 'react';
import { Camera, Upload, X, FileVideo, Check, AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const PhotoUploadItem = ({ item }) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [previews, setPreviews] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const fileValueResult = watch(item.id);
  const statusValue = watch(`${item.id}_status`);
  
  const isMulti = item.type === 'multi_photo';
  const hasStatus = item.type === 'photo_status' || item.type === 'multi_photo';
  const maxFiles = item.max || 1;

  // Normalize files to an array
  const currentFiles = React.useMemo(() => {
    if (!fileValueResult) return [];
    if (fileValueResult instanceof FileList) return Array.from(fileValueResult);
    if (fileValueResult instanceof File) return [fileValueResult];
    if (Array.isArray(fileValueResult)) return fileValueResult;
    return [];
  }, [fileValueResult]);

  useEffect(() => {
    const newPreviews = currentFiles.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    setPreviews(newPreviews);
    
    return () => {
      newPreviews.forEach(p => URL.revokeObjectURL(p.url));
    };
  }, [currentFiles]);

  const simulateAIAnalysis = (label) => {
    setIsAnalyzing(true);
    setAiResult(null);

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
      }
      
      setAiResult(result);
      if (hasStatus && !statusValue) {
        setValue(`${item.id}_status`, "Đạt", { shouldValidate: true });
      }
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length > 0) {
      if (isMulti) {
        const combined = [...currentFiles, ...newFiles].slice(0, maxFiles);
        setValue(item.id, combined, { shouldValidate: true });
      } else {
        setValue(item.id, newFiles[0], { shouldValidate: true });
      }
      simulateAIAnalysis(item.label);
    }
  };

  const removeFile = (index) => {
    if (isMulti) {
      const updated = currentFiles.filter((_, i) => i !== index);
      setValue(item.id, updated.length > 0 ? updated : null, { shouldValidate: true });
    } else {
      setValue(item.id, null, { shouldValidate: true });
      setAiResult(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <label className="text-sm font-semibold text-gray-800 leading-tight">
          {item.label}
          {isMulti && <span className="text-xs font-normal text-gray-500 ml-1">(Tối đa {maxFiles} ảnh)</span>}
        </label>
      </div>

      <div className="space-y-3">
        {/* Upload Button - Hidden if max files reached */}
        {(isMulti ? currentFiles.length < maxFiles : currentFiles.length === 0) && (
          <label
            htmlFor={`file-upload-${item.id}`}
            className="flex items-center justify-center w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 hover:border-primary-400 transition-all cursor-pointer group"
          >
            <Camera className="h-5 w-5 mr-2 text-gray-400 group-hover:text-primary-500" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-primary-700">
              {isMulti && currentFiles.length > 0 ? 'Thêm ảnh khác' : 'Chọn Ảnh / Chụp Ảnh'}
            </span>
            <input
              id={`file-upload-${item.id}`}
              type="file"
              multiple={isMulti}
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        )}

        {/* Previews List */}
        {previews.length > 0 && (
          <div className="grid grid-cols-1 gap-2">
            {previews.map((preview, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-gray-200 bg-white shadow-xs">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="h-12 w-16 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={preview.url} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-900 truncate">{preview.name}</p>
                    <p className="text-[10px] text-gray-500">{formatFileSize(preview.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Status Selection for photo_status items */}
        {hasStatus && (
          <div className="pt-1">
            <div className="flex space-x-2">
              {["Đạt", "Không đạt"].map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setValue(`${item.id}_status`, opt, { shouldValidate: true });
                    if (opt === "Đạt") setValue(`${item.id}_status_reason`, "");
                  }}
                  className={`flex-1 flex items-center justify-center py-2 rounded-lg border text-xs font-bold transition-all ${
                    statusValue === opt
                      ? opt === "Đạt" ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {opt === "Đạt" ? <Check size={14} className="mr-1" /> : <AlertCircle size={14} className="mr-1" />}
                  {opt}
                </button>
              ))}
            </div>

            {statusValue === "Không đạt" && (
              <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                <textarea
                  rows={2}
                  className={`block w-full rounded-lg border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors[`${item.id}_status_reason`] ? 'ring-red-500' : 'ring-gray-300 focus:ring-red-500'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-xs font-medium`}
                  placeholder="Nhập lý do không đạt..."
                  {...register(`${item.id}_status_reason`, { required: statusValue === "Không đạt" })}
                />
              </div>
            )}
            <input type="hidden" {...register(`${item.id}_status_reason`)} />
            <input type="hidden" {...register(`${item.id}_status`, { required: !item.optional })} />
          </div>
        )}
      </div>

      {isAnalyzing && (
        <div className="mt-3 flex items-center space-x-2 bg-blue-50 p-2 rounded-lg border border-blue-100 animate-pulse">
          <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[11px] font-bold text-blue-600">AI đang xử lý...</span>
        </div>
      )}

      {aiResult && !isAnalyzing && (
        <div className="mt-2 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100">
          <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-tighter mb-0.5">AI Insights</p>
          <p className="text-xs font-medium text-indigo-700">{aiResult}</p>
        </div>
      )}
      
      <input type="hidden" {...register(item.id, { required: !item.optional })} />
    </div>
  );
};

export default PhotoUploadItem;
