import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  Sun,
  Zap,
  Layers,
  ClipboardList,
  Box,
  ShieldCheck,
  Wifi,
  Cpu,
  Home
} from 'lucide-react';
import PhotoUploadItem from './PhotoUploadItem';
import TextItem from './TextItem';
import StatusSelectItem from './StatusSelectItem';
import { useFormContext } from 'react-hook-form';

const iconMap = {
  Sun: Sun,
  Zap: Zap,
  Layers: Layers,
  ClipboardList: ClipboardList,
  Box: Box,
  ShieldCheck: ShieldCheck,
  Wifi: Wifi,
  Cpu: Cpu,
  Home: Home
};

const CategorySection = ({ category, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { watch } = useFormContext();

  const isCompleted = category.items.every((item) => {
    if (item.optional) return true;
    const value = watch(item.id);
    const status = watch(`${item.id}_status`);
    return value || status;
  });

  const IconComponent = category.icon ? iconMap[category.icon] : null;

  return (
    <div className={`mb-8 premium-glass floating-card rounded-[2.5rem] transition-all duration-500 ${isCompleted ? 'ring-4 ring-green-500/10' : ''} overflow-hidden group`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 sm:p-10 transition-all duration-500 ${isCompleted ? 'bg-green-500/5' : 'hover:bg-white/40'}`}
      >
        <div className="flex items-center space-x-6">
          <div className={`p-4 rounded-3xl transition-all duration-500 shadow-sm ${isCompleted ? 'bg-green-500 text-white shadow-green-200 glow-primary' : 'bg-primary-50 text-primary-600 group-hover:scale-110'}`}>
            {IconComponent && <IconComponent className="h-7 w-7" />}
          </div>
          <div className="text-left">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter group-hover:text-primary-600 transition-colors">{category.title}</h2>
            {isCompleted ? (
              <span className="flex items-center text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mt-2">
                <CheckCircle size={10} className="mr-2" /> Audit Status: Verified
              </span>
            ) : (
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Required Inspection Unit</span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-2xl bg-gray-100/50 text-gray-400 transition-all duration-500 ${isOpen ? 'rotate-180 bg-primary-50 text-primary-500' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      <div 
        className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-8 sm:p-12 border-t border-white/40 bg-white/30 space-y-8">
          {category.items.map((item) => {
            if (item.type === 'photo' || item.type === 'video' || item.type === 'multi_photo' || item.type === 'photo_status') {
              return <PhotoUploadItem key={item.id} item={item} />;
            }
            if (item.type === 'text') {
              return <TextItem key={item.id} item={item} />;
            }
            if (item.type === 'select') {
              return <StatusSelectItem key={item.id} item={item} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
