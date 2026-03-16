import React from 'react';
import { useFormContext } from 'react-hook-form';

const GeneralInfoForm = ({ schema }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-6 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">{schema.title}</h2>
        <p className="text-sm text-gray-500 mt-1">Vui lòng điền thông tin chung của dự án</p>
      </div>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
          {schema.fields.map((field) => (
            <div key={field.id} className="sm:col-span-1">
              <label htmlFor={field.id} className="block text-sm font-medium leading-6 text-gray-900">
                {field.label}
              </label>
              <div className="mt-2 text-left">
                <input
                  type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                  id={field.id}
                  placeholder={`Nhập ${field.label}`}
                  autoComplete="off"
                  className={`block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors[field.id] ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-primary-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                  {...register(field.id, { required: "Trường này là bắt buộc" })}
                />
                {errors[field.id] && (
                  <p className="mt-1 text-xs text-red-500">{errors[field.id].message}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoForm;
