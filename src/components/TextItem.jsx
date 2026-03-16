import React from 'react';
import { useFormContext } from 'react-hook-form';

const TextItem = ({ item }) => {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label htmlFor={item.id} className="block text-sm font-medium text-gray-800 mb-2">
        {item.label}
        {item.optional && <span className="ml-2 text-xs text-gray-400 font-normal">(Tùy chọn)</span>}
      </label>
      <input
        type={item.inputType || "text"}
        id={item.id}
        className={`block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors[item.id] ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
        placeholder={`Nhập ${item.label.split(' / ')[0].split('. ').pop()}`}
        autoComplete="off"
        {...register(item.id, { required: !item.optional })}
      />
      {errors[item.id] && (
        <p className="mt-1 text-xs text-red-500">Trường này là bắt buộc</p>
      )}
    </div>
  );
};

export default TextItem;
