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

  const IconComponent = category.icon ? iconMap[category.icon] : null;

  return (
    <div className="mb-6 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-primary-600" />}
          <h2 className="text-lg font-bold text-gray-800 text-left tracking-tight">{category.title}</h2>
        </div>
        <div className="text-gray-400">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50">
          <div className="space-y-2">
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
      )}
    </div>
  );
};

export default CategorySection;
