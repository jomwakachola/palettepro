import React from 'react';
import { X, FileImage, FileText, FileDown } from 'lucide-react';
import type { ColorSwatch } from '../types';
import { exportAsPNG, exportAsPDF, exportAsTXT } from '../utils/exportUtils';

interface ExportModalProps {
  colors: ColorSwatch[];
  onClose: () => void;
}

export function ExportModal({ colors, onClose }: ExportModalProps) {
  const exportOptions = [
    {
      icon: FileImage,
      label: 'Download as PNG',
      description: 'Export your palette as an image file',
      onClick: () => exportAsPNG(colors)
    },
    {
      icon: FileDown,
      label: 'Download as PDF',
      description: 'Export your palette as a PDF document',
      onClick: () => exportAsPDF(colors)
    },
    {
      icon: FileText,
      label: 'Download as TXT',
      description: 'Export hex codes as a text file',
      onClick: () => exportAsTXT(colors)
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
         onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Export Palette
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {exportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  option.onClick();
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 rounded-lg
                          hover:bg-gray-100 dark:hover:bg-gray-700
                          transition-colors duration-200"
              >
                <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {option.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}