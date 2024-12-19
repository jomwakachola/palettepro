import type { ColorSwatch } from '../types';

export async function exportAsPNG(colors: ColorSwatch[]): Promise<void> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas size
  canvas.width = 800;
  canvas.height = 400;

  // Draw background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw color blocks
  const blockWidth = canvas.width / colors.length;
  colors.forEach((color, index) => {
    ctx.fillStyle = color.hex;
    ctx.fillRect(index * blockWidth, 0, blockWidth, canvas.height - 60);
    
    // Draw hex values
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(color.hex.toUpperCase(), 
      index * blockWidth + blockWidth / 2, 
      canvas.height - 25
    );
  });

  // Create download link
  const link = document.createElement('a');
  link.download = 'palette.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function exportAsPDF(colors: ColorSwatch[]): Promise<void> {
  // Create a hidden iframe for PDF generation
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  // Create PDF-like HTML content
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 40px; font-family: Arial, sans-serif; }
          .color-block {
            width: 100%;
            height: 80px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          }
        </style>
      </head>
      <body>
        <h1>Color Palette</h1>
        ${colors.map(color => `
          <div class="color-block" style="background-color: ${color.hex}">
            ${color.hex.toUpperCase()}
          </div>
        `).join('')}
      </body>
    </html>
  `);
  doc.close();

  // Print to PDF
  iframe.contentWindow?.print();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000);
}

export async function exportAsTXT(colors: ColorSwatch[]): Promise<void> {
  const content = colors.map(color => color.hex.toUpperCase()).join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.download = 'palette.txt';
  link.href = url;
  link.click();
  
  URL.revokeObjectURL(url);
}