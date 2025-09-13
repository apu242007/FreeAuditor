import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { FormData } from '../../types/form';
import { Download, FileText, Settings } from 'lucide-react';

interface PDFGeneratorProps {
  formData: FormData;
}

interface PDFSettings {
  includeTitle: boolean;
  includeDescription: boolean;
  includeFieldLabels: boolean;
  includeSubmissionData: boolean;
  includeSignatures: boolean;
  includePhotos: boolean;
  pageFormat: 'A4' | 'Letter';
  orientation: 'portrait' | 'landscape';
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ formData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState<PDFSettings>({
    includeTitle: true,
    includeDescription: true,
    includeFieldLabels: true,
    includeSubmissionData: true,
    includeSignatures: true,
    includePhotos: true,
    pageFormat: 'A4',
    orientation: 'portrait',
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: settings.orientation,
        unit: 'mm',
        format: settings.pageFormat.toLowerCase() as 'a4' | 'letter',
      });

      const imgWidth = settings.pageFormat === 'A4' ? 210 : 216;
      const pageHeight = settings.pageFormat === 'A4' ? 297 : 279;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${formData.title.replace(/\s+/g, '_')}_form.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFormOnlyPDF = () => {
    const pdf = new jsPDF({
      orientation: settings.orientation,
      unit: 'mm',
      format: settings.pageFormat.toLowerCase() as 'a4' | 'letter',
    });

    let yPosition = 20;
    const lineHeight = 10;
    const pageWidth = settings.pageFormat === 'A4' ? 210 : 216;
    const margin = 20;

    // Title
    if (settings.includeTitle) {
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(formData.title, margin, yPosition);
      yPosition += lineHeight * 2;
    }

    // Description
    if (settings.includeDescription && formData.description) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const splitDescription = pdf.splitTextToSize(formData.description, pageWidth - 2 * margin);
      pdf.text(splitDescription, margin, yPosition);
      yPosition += splitDescription.length * lineHeight + 10;
    }

    // Fields
    formData.fields.forEach((field) => {
      if (yPosition > 250) { // Add new page if needed
        pdf.addPage();
        yPosition = 20;
      }

      if (settings.includeFieldLabels) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${field.label}${field.required ? ' *' : ''}`, margin, yPosition);
        yPosition += lineHeight;
      }

      // Add space for answers based on field type
      pdf.setFont('helvetica', 'normal');
      switch (field.type) {
        case 'textarea':
          // Add lines for textarea
          for (let i = 0; i < 3; i++) {
            pdf.line(margin, yPosition + 5, pageWidth - margin, yPosition + 5);
            yPosition += lineHeight;
          }
          break;
        case 'signature':
          if (settings.includeSignatures) {
            pdf.rect(margin, yPosition, pageWidth - 2 * margin, 30);
            pdf.text('Signature:', margin + 5, yPosition + 20);
            yPosition += 35;
          }
          break;
        case 'photo':
          if (settings.includePhotos) {
            pdf.rect(margin, yPosition, 50, 30);
            pdf.text('Photo:', margin + 5, yPosition + 20);
            yPosition += 35;
          }
          break;
        case 'select':
        case 'radio':
          field.options?.forEach((option) => {
            pdf.text(`☐ ${option}`, margin + 5, yPosition);
            yPosition += lineHeight;
          });
          break;
        case 'checkbox':
          field.options?.forEach((option) => {
            pdf.text(`☐ ${option}`, margin + 5, yPosition);
            yPosition += lineHeight;
          });
          break;
        default:
          // Single line for text inputs
          pdf.line(margin, yPosition + 5, pageWidth - margin, yPosition + 5);
          yPosition += lineHeight;
          break;
      }

      yPosition += 5; // Add space between fields
    });

    pdf.save(`${formData.title.replace(/\s+/g, '_')}_blank_form.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            PDF Settings
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Page Format</label>
              <select
                value={settings.pageFormat}
                onChange={(e) => setSettings(prev => ({ ...prev, pageFormat: e.target.value as 'A4' | 'Letter' }))}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Orientation</label>
              <select
                value={settings.orientation}
                onChange={(e) => setSettings(prev => ({ ...prev, orientation: e.target.value as 'portrait' | 'landscape' }))}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Include in PDF</label>
              
              {Object.entries({
                includeTitle: 'Form Title',
                includeDescription: 'Form Description',
                includeFieldLabels: 'Field Labels',
                includeSignatures: 'Signature Fields',
                includePhotos: 'Photo Fields',
              }).map(([key, label]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings[key as keyof PDFSettings] as boolean}
                    onChange={(e) => setSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={generateFormOnlyPDF}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-50"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download Blank Form
            </button>

            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium disabled:opacity-50"
            >
              <FileText className="w-4 h-4 inline mr-2" />
              {isGenerating ? 'Generating...' : 'Download Preview PDF'}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">PDF Preview</h3>
            
            <div 
              ref={previewRef}
              className="border border-gray-200 rounded-lg p-8 bg-white"
              style={{ 
                minHeight: settings.pageFormat === 'A4' ? '297mm' : '279mm',
                width: '100%',
                maxWidth: settings.pageFormat === 'A4' ? '210mm' : '216mm',
                margin: '0 auto',
              }}
            >
              {settings.includeTitle && (
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {formData.title}
                </h1>
              )}

              {settings.includeDescription && formData.description && (
                <p className="text-gray-600 mb-6">{formData.description}</p>
              )}

              <div className="space-y-6">
                {formData.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    {settings.includeFieldLabels && (
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    )}

                    <div className="border-b border-gray-300 pb-2">
                      {field.type === 'signature' && settings.includeSignatures && (
                        <div className="h-24 border border-gray-300 rounded bg-gray-50 flex items-center justify-center text-gray-500">
                          Signature Area
                        </div>
                      )}
                      {field.type === 'photo' && settings.includePhotos && (
                        <div className="h-24 w-24 border border-gray-300 rounded bg-gray-50 flex items-center justify-center text-gray-500 text-xs">
                          Photo
                        </div>
                      )}
                      {field.type === 'textarea' && (
                        <div className="space-y-2">
                          <div className="border-b border-gray-300 h-4"></div>
                          <div className="border-b border-gray-300 h-4"></div>
                          <div className="border-b border-gray-300 h-4"></div>
                        </div>
                      )}
                      {['text', 'email', 'number'].includes(field.type) && (
                        <div className="border-b border-gray-300 h-6"></div>
                      )}
                      {field.type === 'select' && field.options && (
                        <div className="space-y-1">
                          {field.options.map((option, idx) => (
                            <div key={idx} className="flex items-center">
                              <span className="text-sm">☐ {option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {['checkbox', 'radio'].includes(field.type) && field.options && (
                        <div className="space-y-1">
                          {field.options.map((option, idx) => (
                            <div key={idx} className="flex items-center">
                              <span className="text-sm">☐ {option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator;