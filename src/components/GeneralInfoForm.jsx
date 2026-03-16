import React from 'react';
import { useFormContext } from 'react-hook-form';

const GeneralInfoForm = ({ schema }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-8 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-100/20">
      <div className="p-6 sm:p-8 bg-gradient-to-br from-primary-50/50 via-white to-white border-b border-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">{schema.title}</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Thông tin cơ bản</p>
        </div>
        <div className="hidden sm:block p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
          <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
          {schema.fields.map((field) => (
            <div key={field.id} className="sm:col-span-1 group">
              <label htmlFor={field.id} className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-primary-600 transition-colors">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                  id={field.id}
                  placeholder={`Nhập ${field.label.toLowerCase()}...`}
                  autoComplete="off"
                  className={`block w-full rounded-2xl border-0 py-3.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ${errors[field.id] 
                      ? 'ring-red-200 bg-red-50/10 focus:ring-red-500' 
                      : 'ring-gray-100 bg-gray-50/20 focus:ring-primary-600 focus:bg-white focus:shadow-lg focus:shadow-primary-100/50'} 
                    placeholder:text-gray-300 focus:ring-2 focus:ring-inset sm:text-sm font-bold transition-all duration-300 outline-hidden`}
                  {...register(field.id, { required: "Vui lòng nhập thông tin này" })}
                />
                {errors[field.id] && (
                  <div className="flex items-center mt-2 text-red-500 animate-fade-in-up">
                    <span className="text-[10px] font-black uppercase tracking-wider">{errors[field.id].message}</span>
                  </div>
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
