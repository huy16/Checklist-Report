import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import GeneralInfoForm from './GeneralInfoForm';
import CategorySection from './CategorySection';
import { checklistSchema } from '../data/checklistSchema';
import { omSchema } from '../data/omSchema';
import { Sun, Share2, FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import logoCas from '../assets/logo_cas.png';

const ChecklistApp = () => {
  const methods = useForm({
    mode: 'onBlur',
  });
  
  const [activeSchemaType, setActiveSchemaType] = useState('install');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentSchema = activeSchemaType === 'install' ? checklistSchema : omSchema;
  
  const onSubmit = async (data) => {
    console.log("Submitting form with data:", data);
    setIsSubmitting(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add Logo
      try {
        pdf.addImage(logoCas, 'PNG', 160, 10, 30, 12); 
      } catch (err) {
        console.warn("Could not add logo to PDF:", err);
      }

      pdf.setFontSize(22);
      pdf.text(activeSchemaType === 'install' ? 'BÁO CÁO LẮP ĐẶT' : 'BÁO CÁO O&M', 20, 20);
      
      pdf.setFontSize(12);
      pdf.text(`Dự án: ${data.projectName || data.om_projectName || 'N/A'}`, 20, 35);
      pdf.text(`Địa điểm: ${data.siteLocation || data.om_siteLocation || 'N/A'}`, 20, 42);
      pdf.text(`Thời gian: ${new Date().toLocaleDateString('vi-VN')}`, 20, 49);

      pdf.line(20, 55, 190, 55);
      
      let yPos = 65;
      pdf.setFontSize(14);
      pdf.text("CÁC HẠNG MỤC KIỂM TRA", 20, yPos);
      yPos += 10;
      
      pdf.setFontSize(10);
      currentSchema.categories.forEach(cat => {
        pdf.setFont("helvetica", "bold");
        pdf.text(cat.title, 20, yPos);
        yPos += 7;
        pdf.setFont("helvetica", "normal");
        
        cat.items.forEach(item => {
          if (yPos > 270) {
            pdf.addPage();
            yPos = 20;
          }
          const val = data[item.id] || data[`${item.id}_status`] || "N/A";
          pdf.text(`- ${item.label}: ${val}`, 25, yPos);
          yPos += 6;
        });
        yPos += 4;
      });
      
      const pdfFileName = `Bao_Cao_${activeSchemaType}_${Date.now()}.pdf`;
      
      // Better download method for mobile: Use Blob + URL.createObjectURL
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfFileName;
      
      // On some mobile devices, we need to append to body
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Optional: open in new tab for certain browsers where download is blocked
      // window.open(url, '_blank'); 

      setTimeout(() => URL.revokeObjectURL(url), 100);
      alert("Báo cáo đang được tải xuống. Vui lòng kiểm tra thư mục Tải về (Downloads) trên máy.");
      
    } catch (e) {
      console.error("PDF Error:", e);
      alert("Lỗi khi tạo PDF: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (errors) => {
    console.error("Validation Errors:", errors);
    alert("Vui lòng hoàn thành tất cả các mục bắt buộc trong các hạng mục checklist.");
  };
  
  const handleZaloShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Báo cáo Checklist ${activeSchemaType === 'install' ? 'Lắp Đặt' : 'O&M'} chuẩn bị hoàn thành.`);
    window.open(`https://zalo.me/share?url=${url}&text=${text}`, '_blank');
  };

  const getFormProgress = () => {
    // Basic approximation of progress based on non-empty fields
    const values = methods.getValues();
    const keys = Object.keys(values);
    let filled = 0;
    
    // Total fields roughly = general fields + required checklist items
    const totalRequired = currentSchema.generalInformation.fields.length + 
      currentSchema.categories.reduce((acc, cat) => acc + cat.items.filter(i => !i.optional).length, 0);
      
    keys.forEach(key => {
      if (values[key]) filled++;
    });
    
    const percentage = totalRequired === 0 ? 0 : Math.min(100, Math.round((filled / totalRequired) * 100));
    return percentage;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logoCas} alt="CAS Logo" className="h-16 w-auto object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Solar System O&M
            <span className="block text-primary-600 mt-2">Health Check & Measurement</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
            Tự động hóa doanh nghiệp & Giải phóng tâm trí bạn
          </p>
          <div className="mt-8 flex justify-center">
            <div className="bg-gray-200 p-1 rounded-lg inline-flex relative shadow-inner">
              <button
                type="button"
                onClick={() => { setActiveSchemaType('install'); methods.reset(); }}
                className={`relative px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 z-10 ${
                  activeSchemaType === 'install' 
                  ? 'text-primary-700 shadow-sm bg-white' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Mới Lắp đặt (Install)
              </button>
              <button
                type="button"
                onClick={() => { setActiveSchemaType('om'); methods.reset(); }}
                className={`relative px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 z-10 ${
                  activeSchemaType === 'om' 
                  ? 'text-primary-700 shadow-sm bg-white' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Đo kiểm Bảo trì (O&M)
              </button>
            </div>
          </div>
          
          <div className="mt-8 w-full max-w-sm mx-auto bg-gray-200 rounded-full h-2.5">
            <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${getFormProgress()}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-medium">Hoàn thành {getFormProgress()}%</p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
            <GeneralInfoForm schema={currentSchema.generalInformation} />
            
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Hình ảnh Đo kiểm & Khảo sát</h2>
              {currentSchema.categories.map((category, index) => (
                <CategorySection 
                  key={category.id} 
                  category={category} 
                  defaultOpen={index === 0} 
                />
              ))}
            </div>

            <div className="pt-6 pb-20 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm leading-6 font-bold text-white transition-all transform hover:scale-[1.01] active:scale-[0.99]
                  ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý Báo cáo...
                  </span>
                ) : (
                  <>
                    <FileDown className="mr-2 h-5 w-5" />
                    Xuất File Báo Cáo (PDF)
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleZaloShare}
                className="flex-1 flex justify-center items-center py-4 px-4 border border-gray-300 rounded-xl shadow-sm leading-6 font-bold text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all transform hover:scale-[1.01] active:scale-[0.99] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Gửi vào Zalo
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ChecklistApp;
