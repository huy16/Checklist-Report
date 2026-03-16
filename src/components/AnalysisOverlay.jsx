import React, { useEffect, useState } from 'react';
import { BrainCircuit, ScanLine } from 'lucide-react';
import { analyzeImagesMock } from '../utils/mockAI';
import './AnalysisOverlay.css';

export default function AnalysisOverlay({ items, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('Đang khởi tạo AI Model...');

  useEffect(() => {
    let isMounted = true;
    
    const startAnalysis = async () => {
      const result = await analyzeImagesMock(items, (prog, text) => {
        if (isMounted) {
          setProgress(prog);
          setCurrentFile(`Đang phân tích: ${text}`);
        }
      });
      
      if (isMounted) {
        onComplete(result);
      }
    };

    startAnalysis();

    return () => {
      isMounted = false;
    };
  }, [items, onComplete]);

  return (
    <div className="overlay-container">
      <div className="analysis-box glass-panel">
        <div className="ai-icon-container">
          <BrainCircuit size={48} className="ai-icon pulsing" />
          <ScanLine size={48} className="scan-line" />
        </div>
        
        <h2>AI Đang Xử Lý Dữ Liệu</h2>
        <p className="current-task">{currentFile}</p>
        
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="percent-text">{Math.round(progress)}% Hoàn thành</div>
      </div>
    </div>
  );
}
