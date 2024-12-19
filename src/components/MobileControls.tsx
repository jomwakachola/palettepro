import React from 'react';
import { Download, Image as ImageIcon } from 'lucide-react';
import { ControlButton } from './ControlButton';

interface MobileControlsProps {
  onExport: () => void;
  onImageUpload: () => void;
}

export function MobileControls({ onExport, onImageUpload }: MobileControlsProps) {
  return (
    <div className="flex justify-center gap-2">
      <ControlButton
        icon={Download}
        label="Export"
        onClick={onExport}
      />
      
      <ControlButton
        icon={ImageIcon}
        label="Import from Image"
        onClick={onImageUpload}
        tooltip="Create your color palette from an image"
      />
    </div>
  );
}