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
    <div className={`mb-4 bg-white p-4 rounded-xl shadow-sm border transition-all duration-300 ${currentFiles.length > 0 ? 'border-primary-100 ring-4 ring-primary-50/30' : 'border-gray-100'}`}>
      <div className="flex justify-between items-start mb-4">
        <label className="text-sm font-bold text-gray-900 leading-tight tracking-tight flex items-center">
          {item.label}
          {item.optional && <span className="ml-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">(Tùy chọn)</span>}
        </label>
      </div>

      <div className="space-y-4">
        {/* Upload Button */}
        {(isMulti ? currentFiles.length < maxFiles : currentFiles.length === 0) && (
          <label
            htmlFor={`file-upload-${item.id}`}
            className="flex items-center justify-center w-full px-4 py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:bg-primary-50 hover:border-primary-300 transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex flex-col items-center">
              <Camera className="h-6 w-6 mb-1 text-gray-400 group-hover:text-primary-500 transform group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black text-gray-500 group-hover:text-primary-700 uppercase tracking-wider">
                {isMulti && currentFiles.length > 0 ? 'Thêm ảnh' : 'Chụp/Chọn Ảnh'}
              </span>
              {isMulti && <p className="text-[10px] text-gray-400 mt-1 mt-1 font-medium">Tối đa {maxFiles} ảnh</p>}
            </div>
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
          <div className="grid grid-cols-1 gap-2 animate-fade-in-up">
            {previews.map((preview, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden group">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="h-14 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                    <img src={preview.url} alt="Preview" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-gray-900 truncate">{preview.name}</p>
                    <p className="text-[10px] font-bold text-primary-500 bg-primary-50 inline-block px-1.5 py-0.5 rounded mt-1">{formatFileSize(preview.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Status Selection for photo_status items */}
        {hasStatus && (
          <div className="pt-2">
            <div className="flex space-x-3">
              {[ { l: "Đạt", v: "Đạt", c: "green" }, { l: "Không đạt", v: "Không đạt", c: "red" } ].map(opt => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => {
                    setValue(`${item.id}_status`, opt.v, { shouldValidate: true });
                    if (opt.v === "Đạt") setValue(`${item.id}_status_reason`, "");
                  }}
                  className={`flex-1 flex items-center justify-center py-3.5 rounded-2xl border-2 text-xs font-black transition-all transform active:scale-95 ${
                    statusValue === opt.v
                      ? opt.v === "Đạt" 
                        ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-100" 
                        : "bg-red-500 border-red-500 text-white shadow-lg shadow-red-100"
                      : "bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {opt.v === "Đạt" ? <Check size={16} className="mr-1.5" /> : <AlertCircle size={16} className="mr-1.5" />}
                  {opt.l.toUpperCase()}
                </button>
              ))}
            </div>

            {statusValue === "Không đạt" && (
              <div className="mt-3 animate-fade-in-up">
                <textarea
                  rows={2}
                  className={`block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors[`${item.id}_status_reason`] ? 'ring-red-500' : 'ring-gray-200 focus:ring-red-500'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm font-medium transition-all`}
                  placeholder="Vui lòng nhập lý do cụ thể..."
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
        <div className="mt-4 flex items-center space-x-3 bg-primary-50 p-3 rounded-xl border border-primary-100 animate-pulse">
          <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-black text-primary-700 uppercase tracking-wider">AI đang phân tích...</span>
        </div>
      )}

      {aiResult && !isAnalyzing && (
        <div className="mt-3 bg-indigo-50/30 p-4 rounded-xl border border-indigo-100/50 animate-fade-in-up">
          <div className="flex items-center mb-1">
            <div className="p-1 bg-indigo-100 rounded-md mr-2">
              <Sun size={12} className="text-indigo-600" />
            </div>
            <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">AI Insights</p>
          </div>
          <p className="text-[13px] font-bold text-indigo-700 leading-relaxed">{aiResult}</p>
        </div>
      )}
      
      <input type="hidden" {...register(item.id, { required: !item.optional })} />
    </div>
  );
};

export default PhotoUploadItem;
