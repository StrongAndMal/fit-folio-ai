import React, { useEffect, useRef } from 'react';
import { BodyAnalysis } from '../services/aiAnalysis';
import './AIAnalysisViewer.css';

interface AIAnalysisViewerProps {
  imageUrl: string;
  analysis: BodyAnalysis;
}

const AIAnalysisViewer: React.FC<AIAnalysisViewerProps> = ({ imageUrl, analysis }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load the image
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      // Set canvas size to match image
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image
      ctx.drawImage(image, 0, 0);

      // Draw keypoints
      Object.entries(analysis.keyPoints).forEach(([name, point]) => {
        if (point.score > 0.3) { // Only draw points with good confidence
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = 'red';
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.font = '12px Arial';
          ctx.fillText(name, point.x + 10, point.y - 10);
        }
      });

      // Draw connections between keypoints
      const connections = [
        ['left_shoulder', 'left_elbow'],
        ['left_elbow', 'left_wrist'],
        ['right_shoulder', 'right_elbow'],
        ['right_elbow', 'right_wrist'],
        ['left_shoulder', 'right_shoulder'],
        ['left_hip', 'right_hip'],
        ['left_shoulder', 'left_hip'],
        ['right_shoulder', 'right_hip'],
      ];

      connections.forEach(([point1, point2]) => {
        const p1 = analysis.keyPoints[point1];
        const p2 = analysis.keyPoints[point2];
        if (p1 && p2 && p1.score > 0.3 && p2.score > 0.3) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'green';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw angles
      Object.entries(analysis.angles).forEach(([name, angle]) => {
        const point = analysis.keyPoints[name];
        if (point && point.score > 0.3) {
          ctx.fillStyle = 'blue';
          ctx.font = '14px Arial';
          ctx.fillText(`${angle.toFixed(1)}°`, point.x + 10, point.y + 20);
        }
      });
    };
  }, [imageUrl, analysis]);

  const getScoreClass = (score: number) => {
    if (score >= 80) return 'good';
    if (score >= 60) return 'warning';
    return 'poor';
  };

  return (
    <div className="ai-analysis-viewer">
      <div className="analysis-container">
        <canvas ref={canvasRef} className="pose-canvas" />
        <div className="analysis-feedback">
          <h3>Form Analysis</h3>
          <div className={`score ${getScoreClass(analysis.score)}`}>
            Score: {analysis.score}%
          </div>
          <div className="feedback-section">
            <h4>Feedback:</h4>
            <ul>
              {analysis.feedback.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="improvements-section">
            <h4>Improvements:</h4>
            <ul>
              {analysis.improvements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisViewer; 