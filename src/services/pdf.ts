import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  category: string;
  exercises: Exercise[];
}

export const generateWorkoutPDF = async (workout: Workout, qrCodeUrl: string) => {
  const doc = new jsPDF();
  const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);

  // Add title
  doc.setFontSize(20);
  doc.text(workout.name, 20, 20);

  // Add workout details
  doc.setFontSize(12);
  doc.text(`Category: ${workout.category}`, 20, 35);
  doc.text(`Difficulty: ${workout.difficulty}`, 20, 45);
  doc.text(`Duration: ${workout.duration} minutes`, 20, 55);
  
  // Add description
  doc.text('Description:', 20, 70);
  const descriptionLines = doc.splitTextToSize(workout.description, 170);
  doc.text(descriptionLines, 20, 80);

  // Add exercises
  let yPos = 100;
  doc.setFontSize(14);
  doc.text('Exercises:', 20, yPos);
  yPos += 10;
  doc.setFontSize(12);

  workout.exercises.forEach((exercise, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.text(`${index + 1}. ${exercise.name}`, 20, yPos);
    yPos += 7;
    doc.text(`   Sets: ${exercise.sets}, Reps: ${exercise.reps}${exercise.weight ? `, Weight: ${exercise.weight}kg` : ''}`, 20, yPos);
    if (exercise.notes) {
      yPos += 7;
      doc.text(`   Notes: ${exercise.notes}`, 20, yPos);
    }
    yPos += 10;
  });

  // Add QR code
  doc.addImage(qrCodeDataUrl, 'PNG', 160, 15, 30, 30);

  // Save the PDF
  doc.save(`${workout.name.toLowerCase().replace(/\s+/g, '-')}-workout.pdf`);
}; 