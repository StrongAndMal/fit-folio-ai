import React from 'react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
  completed?: boolean;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  exercises: Exercise[];
}

const getWorkoutTips = (category: string) => {
  const tips = {
    Strength: [
      "Focus on proper form over heavy weights",
      "Rest 60-90 seconds between sets",
      "Progressive overload: gradually increase weight or reps",
      "Keep a workout log to track progress",
      "Warm up properly before lifting heavy"
    ],
    Cardio: [
      "Maintain consistent breathing throughout",
      "Start slow and gradually increase intensity",
      "Stay hydrated during the workout",
      "Monitor your heart rate",
      "Include proper warm-up and cool-down"
    ],
    HIIT: [
      "Give maximum effort during work intervals",
      "Use proper form even when fatigued",
      "Stay hydrated throughout the workout",
      "Listen to your body and adjust intensity as needed",
      "Include proper warm-up and cool-down"
    ]
  };

  return tips[category as keyof typeof tips] || tips.Strength;
};

export const generateWorkoutPDF = async (workout: Workout, qrCodeUrl: string) => {
  try {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Set initial position
    let y = 20;
    
    // Add header with gradient background
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 210, 30, 'F');
    
    // Add logo or app name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('FitFolio AI', 20, 20);
    
    // Reset text color for content
    doc.setTextColor(0, 0, 0);
    
    // Add title with accent color
    doc.setFontSize(24);
    doc.setTextColor(41, 128, 185);
    doc.text(workout.name, 20, y + 30);
    y += 40;
    
    // Add description
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    doc.text(workout.description, 20, y);
    y += 10;
    
    // Add workout details in a grid
    const details = [
      { label: 'Duration', value: workout.duration },
      { label: 'Difficulty', value: workout.difficulty },
      { label: 'Category', value: workout.category }
    ];
    
    details.forEach((detail, index) => {
      const x = 20 + (index * 60);
      doc.setFontSize(10);
      doc.setTextColor(102, 102, 102);
      doc.text(detail.label, x, y);
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text(detail.value, x, y + 5);
    });
    y += 20;
    
    // Add workout tips
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185);
    doc.text('Workout Tips', 20, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(51, 51, 51);
    getWorkoutTips(workout.category).forEach((tip, index) => {
      doc.text(`• ${tip}`, 25, y + (index * 5));
    });
    y += 30;
    
    // Add exercises section
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185);
    doc.text('Exercises', 20, y);
    y += 10;
    
    // Add each exercise with styling
    workout.exercises.forEach((exercise, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      
      // Exercise header with accent color
      doc.setFontSize(14);
      doc.setTextColor(41, 128, 185);
      doc.text(`${index + 1}. ${exercise.name}`, 20, y);
      y += 7;
      
      // Exercise details
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      
      // Create a light background for exercise details
      doc.setFillColor(245, 245, 245);
      doc.rect(20, y - 2, 170, 30, 'F');
      
      doc.text(`Sets: ${exercise.sets}`, 25, y + 5);
      doc.text(`Reps: ${exercise.reps}`, 25, y + 12);
      
      if (exercise.weight) {
        doc.text(`Weight: ${exercise.weight} kg`, 25, y + 19);
      }
      
      if (exercise.notes) {
        doc.text(`Notes: ${exercise.notes}`, 25, y + 26);
      }
      
      y += 35;
    });
    
    // Add footer with QR code
    doc.addPage();
    y = 20;
    
    // Add footer title
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185);
    doc.text('Access Your Workout Anywhere', 20, y);
    y += 10;
    
    // Add QR code description
    doc.setFontSize(10);
    doc.setTextColor(51, 51, 51);
    doc.text('Scan this QR code to access your workout on your mobile device:', 20, y);
    y += 10;
    
    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl, {
      width: 100,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    
    // Add QR code to PDF
    doc.addImage(qrCodeDataUrl, 'PNG', 55, y, 100, 100);
    
    // Add QR code text
    doc.setFontSize(10);
    doc.text('Scan to view on mobile', 80, y + 110);
    
    // Add footer note
    doc.setFontSize(8);
    doc.setTextColor(102, 102, 102);
    doc.text('Generated by FitFolio AI', 20, 280);
    doc.text(new Date().toLocaleDateString(), 170, 280);
    
    // Save the PDF
    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, `${workout.name.replace(/\s+/g, '_')}_workout.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}; 