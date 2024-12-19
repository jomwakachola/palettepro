import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { extractColorsFromImage } from '../utils/colorExtractor';
import type { ColorSwatch } from '../types';

interface ImageUploadProps {
  onColorsExtracted: (colors: ColorSwatch[]) => void;
  onClose: () => void;
}

export function ImageUpload({ onColorsExtracted, onClose }: ImageUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    try {
      const colors = await extractColorsFromImage(acceptedFiles[0]);
      onColorsExtracted(colors);
      onClose();
    } catch (error) {
      console.error('Failed to extract colors:', error);
    }
  }, [onColorsExtracted, onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
         onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
      >
        <div {...getRootProps()} className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive 
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400'
          }
        `}>
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {isDragActive
              ? 'Drop your image here...'
              : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Supports PNG, JPG, JPEG, WebP
          </p>
        </div>
      </div>
    </div>
  );
}