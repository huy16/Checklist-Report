import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Check, X } from 'lucide-react';

const StatusSelectItem = ({ item }) => {
  const { setValue, watch, register, formState: { errors } } = useFormContext();
  const currentValue = watch(item.id);
  const failureReason = watch(`${item.id}_reason`);
  const options = item.options || ["Đạt", "Không đạt"];

  const handleSelect = (option) => {
    setValue(item.id, option, { shouldValidate: true });
    // Reset reason if switched back to "Đạt"
    if (option === "Đạt") {
      setValue(`${item.id}_reason`, "");
    }
  };

  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all">
      <label className="block text-sm font-semibold text-gray-800 mb-3">
        {item.label}
      </label>
      
      <div className="flex space-x-3 mb-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg border text-sm font-bold transition-all ${
              currentValue === option
                ? option === "Đạt" 
                  ? "bg-green-50 border-green-500 text-green-700 shadow-sm"
                  : "bg-red-50 border-red-500 text-red-700 shadow-sm"
                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {option === "Đạt" ? (
              <Check className={`h-4 w-4 mr-2 ${currentValue === option ? "text-green-600" : "text-gray-400"}`} />
            ) : option === "Không đạt" ? (
              <X className={`h-4 w-4 mr-2 ${currentValue === option ? "text-red-600" : "text-gray-400"}`} />
            ) : null}
            {option}
          </button>
        ))}
      </div>
      
      {currentValue === "Không đạt" && (
        <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <label htmlFor={`${item.id}_reason`} className="block text-xs font-bold text-red-600 mb-1.5 uppercase tracking-wider">
            Lý do không đạt
          </label>
          <textarea
            id={`${item.id}_reason`}
            rows={2}
            className={`block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors[`${item.id}_reason`] ? 'ring-red-500' : 'ring-gray-300 focus:ring-red-500'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm`}
            placeholder="Mô tả chi tiết lý do hoặc tình trạng không đạt..."
            {...register(`${item.id}_reason`, { required: currentValue === "Không đạt" })}
          />
        </div>
      )}
      
      {/* Hidden input for RHF registration of main status */}
      <input 
        type="hidden" 
        {...register(item.id, { required: !item.optional })} 
      />
    </div>
  );
};

export default StatusSelectItem;
