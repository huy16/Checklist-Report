import React from 'react';
import { Camera, Image as ImageIcon, CheckCircle } from 'lucide-react';
import './Checklist.css';

export default function Checklist({ items, onUpload }) {
  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onUpload(id, imageUrl);
    }
  };

  return (
    <div className="checklist-container">
      {items.map((item, index) => (
        <div key={item.id} className={`checklist-card glass-panel ${item.image ? 'completed' : ''}`}>
          <div className="card-header">
            <div className="item-number">{index + 1}</div>
            <div className="item-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            {item.image && (
              <div className="status-icon success">
                <CheckCircle size={24} color="var(--success)" />
              </div>
            )}
          </div>
          
          <div className="card-body">
            {item.image ? (
              <div className="image-preview">
                <img src={item.image} alt={item.title} />
                <label className="reupload-btn">
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment"
                    onChange={(e) => handleFileChange(e, item.id)} 
                    style={{display: 'none'}} 
                  />
                  <span>Chụp lại</span>
                </label>
              </div>
            ) : (
              <label className="upload-placeholder">
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  onChange={(e) => handleFileChange(e, item.id)} 
                  style={{display: 'none'}} 
                />
                <div className="upload-content">
                  <div className="icon-pulse">
                    <Camera size={32} color="var(--primary-color)" />
                  </div>
                  <span>Nhấn để chụp / tải ảnh lên</span>
                </div>
              </label>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
