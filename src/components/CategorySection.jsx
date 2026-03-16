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

  // Check if all items in this category are filled
  const itemsValues = watch(category.items.map(i => i.id));
  const statusValues = watch(category.items.map(i => `${i.id}_status`));
  
  const isCompleted = category.items.every((item, idx) => {
    if (item.optional) return true;
    const value = watch(item.id);
    const status = watch(`${item.id}_status`);
    return value || status;
  });

  const IconComponent = category.icon ? iconMap[category.icon] : null;

  return (
    <div className={`mb-6 bg-white rounded-2xl shadow-sm border transition-all duration-300 ${isCompleted ? 'border-green-200 ring-4 ring-green-50/50' : 'border-gray-200'} overflow-hidden`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 sm:p-6 transition-all ${isCompleted ? 'bg-green-50/30' : 'bg-white hover:bg-gray-50'}`}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-xl transition-colors ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-primary-50 text-primary-600'}`}>
            {IconComponent && <IconComponent className="h-6 w-6" />}
          </div>
          <div className="text-left">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">{category.title}</h2>
            {isCompleted && (
              <span className="flex items-center text-[10px] font-bold text-green-600 uppercase tracking-widest mt-0.5">
                <CheckCircle size={10} className="mr-1" /> Đã hoàn thành
              </span>
            )}
          </div>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-gray-400`}>
          <ChevronDown size={24} />
        </div>
      </button>

      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="p-4 sm:p-6 bg-gray-50/30 space-y-4">
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
