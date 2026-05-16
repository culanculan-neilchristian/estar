"use client";

import React, { useState } from 'react';
import { Printer, Loader2 } from 'lucide-react';
import { exportToPdf } from '@/utils/pdf-export';

const PrintButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      // Small delay to ensure any UI states (like loading) are rendered
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await exportToPdf();
    } catch (error) {
      console.error('Failed to export PDF:', error);
      // You could add a toast notification here
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handlePrint}
      disabled={isGenerating}
      className={`
        relative flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full 
        transition-all duration-300 group
        ${isGenerating 
          ? 'bg-white/10 text-white/40 cursor-not-allowed' 
          : 'bg-white text-black hover:bg-white/90 active:scale-95'
        }
      `}
      title="Export page to PDF"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
            Generating...
          </span>
        </>
      ) : (
        <>
          <Printer className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
            Print PDF
          </span>
        </>
      )}
      
      <span className="sr-only">Download page as PDF</span>
    </button>
  );
};

export default PrintButton;
