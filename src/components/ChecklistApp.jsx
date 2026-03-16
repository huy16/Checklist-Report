import React, { useState, useEffect, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import GeneralInfoForm from './GeneralInfoForm';
import CategorySection from './CategorySection';
import { checklistSchema } from '../data/checklistSchema';
import { omSchema } from '../data/omSchema';
import { Sun, Share2, FileDown, ChevronUp, Map, ArrowRight } from 'lucide-react';
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
  


  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showQuickNav, setShowQuickNav] = useState(false);
  const categoriesRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    setShowQuickNav(false);
  };

  const getFormProgress = () => {
    const values = methods.getValues();
    const keys = Object.keys(values);
    let filled = 0;
    
    const requiredItems = currentSchema.categories.flatMap(cat => cat.items.filter(i => !i.optional));
    const totalRequired = currentSchema.generalInformation.fields.length + requiredItems.length;
      
    // Count filled general info
    currentSchema.generalInformation.fields.forEach(field => {
      if (values[field.id]) filled++;
    });

    // Count filled required checklist items
    requiredItems.forEach(item => {
      const hasValue = values[item.id] || values[`${item.id}_status`];
      if (hasValue) filled++;
    });
    
    const percentage = totalRequired === 0 ? 0 : Math.min(100, Math.round((filled / totalRequired) * 100));
    return percentage;
  };

  const progress = getFormProgress();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans selection:bg-primary-100 selection:text-primary-900">
      {/* Sticky Progress Header */}
      <div className="sticky top-0 z-40 glass-card border-b border-gray-200/50 px-4 py-3 sm:px-6 lg:px-8 mb-6 animate-fade-in-up">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoCas} alt="CAS" className="h-8 w-auto object-contain" />
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tiến độ</p>
              <p className="text-sm font-bold text-gray-900 leading-none">{progress}% Hoàn thành</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xs">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-700 ease-out ${progress === 100 ? 'bg-green-500' : 'bg-primary-600'}`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <button 
            onClick={() => setShowQuickNav(!showQuickNav)}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm active:scale-95"
          >
            <Map size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mt-4">
            Solar System O&M
            <span className="block text-primary-600 mt-2">Health Check & Measurement</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-500 mx-auto font-medium">
            Tự động hóa doanh nghiệp & Giải phóng tâm trí bạn
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="bg-gray-200/50 p-1 rounded-xl inline-flex relative shadow-inner">
              <button
                type="button"
                onClick={() => { setActiveSchemaType('install'); methods.reset(); }}
                className={`relative px-6 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 z-10 ${
                  activeSchemaType === 'install' 
                  ? 'text-primary-700 shadow-md bg-white' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Lắp đặt (Install)
              </button>
              <button
                type="button"
                onClick={() => { setActiveSchemaType('om'); methods.reset(); }}
                className={`relative px-6 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 z-10 ${
                  activeSchemaType === 'om' 
                  ? 'text-primary-700 shadow-md bg-white' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Bảo trì (O&M)
              </button>
            </div>
          </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <GeneralInfoForm schema={currentSchema.generalInformation} />
            </div>
            
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-3">
                <h2 className="text-2xl font-bold text-gray-900">Chi tiết Kiểm tra</h2>
                <span className="px-3 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-primary-100">
                  {currentSchema.categories.length} Hạng mục
                </span>
              </div>
              
              <div className="space-y-6">
                {currentSchema.categories.map((category, index) => (
                  <div key={category.id} id={`section-${category.id}`}>
                    <CategorySection 
                      category={category} 
                      defaultOpen={index === 0} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 mb-20">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group w-full flex justify-center items-center py-5 px-6 border border-transparent rounded-2xl shadow-xl leading-6 font-black text-lg text-white transition-all transform btn-hover-effect
                  ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 focus:outline-hidden focus:ring-4 focus:ring-primary-100'}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang tạo File PDF...
                  </span>
                ) : (
                  <>
                    <FileDown className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                    XUẤT BÁO CÁO NGAY
                  </>
                )}
              </button>
              <p className="text-center text-gray-400 text-xs mt-4 font-medium italic">
                Báo cáo sẽ được tổng hợp đầy đủ hình ảnh và kết quả đo kiểm
              </p>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-4 bg-white shadow-2xl rounded-2xl border border-gray-100 text-primary-600 hover:bg-primary-50 transition-all animate-fade-in-up active:scale-90"
          >
            <ChevronUp size={24} />
          </button>
        )}
      </div>

      {/* Quick Nav Drawer Overlay */}
      {showQuickNav && (
        <>
          <div 
            className="fixed inset-0 bg-gray-900/40 backdrop-filter blur-xs z-50 transition-opacity"
            onClick={() => setShowQuickNav(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl animate-fade-in-right p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900">Danh mục</h3>
              <button onClick={() => setShowQuickNav(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <ChevronUp className="rotate-90" size={24} />
              </button>
            </div>
            
            <div className="space-y-2">
              {currentSchema.categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all group text-left"
                >
                  <span className="text-sm font-bold text-gray-700 group-hover:text-primary-700">{cat.title}</span>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-primary-400 transform group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChecklistApp;
