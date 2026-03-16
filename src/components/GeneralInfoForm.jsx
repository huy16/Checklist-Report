import React from 'react';
import { useFormContext } from 'react-hook-form';

const GeneralInfoForm = ({ schema }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-12 premium-glass floating-card rounded-[2.5rem] overflow-hidden group">
      <div className="p-8 sm:p-10 border-b border-white/40 bg-gradient-to-br from-primary-50/30 to-transparent flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter">{schema.title}</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Core Audit Metadata</p>
        </div>
        <div className="bg-white/80 p-4 rounded-3xl shadow-sm border border-white/50 animate-float">
          <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
      <div className="p-8 sm:p-10">
        <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2">
          {schema.fields.map((field) => (
            <div key={field.id} className="sm:col-span-1 group/field">
              <label htmlFor={field.id} className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 group-focus-within/field:text-primary-600 transition-colors">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                  id={field.id}
                  placeholder={`Specify ${field.label.toLowerCase()}...`}
                  autoComplete="off"
                  className={`block w-full rounded-2xl border-0 py-4 px-6 text-gray-900 shadow-sm ring-1 ring-inset 
                    ${errors[field.id] 
                      ? 'ring-red-200 bg-red-50/10 focus:ring-red-500' 
                      : 'ring-gray-100 bg-white/50 focus:ring-primary-600 focus:bg-white focus:shadow-2xl focus:shadow-primary-600/10'} 
                    placeholder:text-gray-300 focus:ring-2 focus:ring-inset text-sm font-black transition-all duration-300 outline-hidden`}
                  {...register(field.id, { required: "Action required: Field is mandatory" })}
                />
                <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-primary-500/0 to-transparent group-focus-within/field:via-primary-500/50 transition-all duration-500"></div>
                {errors[field.id] && (
                  <div className="flex items-center mt-3 text-red-500 animate-fade-in-up">
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
