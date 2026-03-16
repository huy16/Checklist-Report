import React, { useRef } from 'react';
import { CheckCircle, XCircle, Printer, RefreshCw, FileText } from 'lucide-react';
import './ReportView.css';

export default function ReportView({ items, onReset }) {
  const reportRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const totalItems = items.length;
  const passedItems = items.filter(i => i.status === 'pass').length;
  const failedItems = totalItems - passedItems;

  const scoreClass = passedItems === totalItems ? 'text-success' : 
                     failedItems > 3 ? 'text-error' : 'text-warning';

  return (
    <div className="report-container">
      <div className="report-actions hide-on-print">
        <button className="btn btn-outline" onClick={onReset}>
          <RefreshCw size={18} /> Mới / Chụp lại
        </button>
        <button className="btn btn-primary" onClick={handlePrint}>
          <Printer size={18} /> Xuất PDF
        </button>
      </div>

      <div className="report-doc" ref={reportRef}>
        <div className="report-header">
          <div className="report-title-row">
            <FileText size={32} color="var(--primary-color)" />
            <h1>Báo Cáo Kiểm Tra O&M</h1>
          </div>
          <p>Tự động trích xuất bởi AI Phân tích Hệ thống</p>
          <div className="report-meta">
            <span>Ngày quét: {new Date().toLocaleDateString('vi-VN')} {new Date().toLocaleTimeString('vi-VN')}</span>
            <span>Dự án: Điện Mặt Trời Mẫu</span>
          </div>
        </div>

        <div className="report-summary glass-panel">
          <div className="summary-stat">
            <div className="stat-value">{totalItems}</div>
            <div className="stat-label">Tổng mục</div>
          </div>
          <div className="summary-stat">
            <div className={`stat-value ${scoreClass}`}>{passedItems}</div>
            <div className="stat-label">Đạt (Pass)</div>
          </div>
          <div className="summary-stat">
            <div className="stat-value text-error">{failedItems}</div>
            <div className="stat-label">Lỗi (Fail)</div>
          </div>
        </div>

        <div className="report-body">
          {items.map((item, index) => (
            <div key={item.id} className={`report-item ${item.status === 'pass' ? 'item-pass' : 'item-fail'}`}>
              <div className="item-header-row">
                <h3>{index + 1}. {item.title}</h3>
                {item.status === 'pass' ? (
                  <span className="badge badge-success"><CheckCircle size={14} /> Pass</span>
                ) : (
                  <span className="badge badge-error"><XCircle size={14} /> Cảnh Báo</span>
                )}
              </div>
              
              <div className="item-content-row">
                <div className="item-thumbnail">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-details">
                  <p className="item-desc"><strong>Yêu cầu:</strong> {item.description}</p>
                  <div className="ai-feedback">
                    <strong>AI Đánh giá:</strong>
                    <p className={item.status === 'pass' ? 'text-success' : 'text-error'}>
                      {item.aiFeedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="report-footer">
          <p>Hệ thống đánh giá được thực hiện bởi Antigravity AI.</p>
          <p>Người tạo báo cáo: Kỹ thuật viên hiện trường</p>
        </div>
      </div>
    </div>
  );
}
