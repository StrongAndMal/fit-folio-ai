import { storage } from '../firebase/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

export interface BodyAnalysis {
  score: number;
  feedback: string[];
  improvements: string[];
  keyPoints: {
    [key: string]: {
      x: number;
      y: number;
      score: number;
    };
  };
  angles: {
    [key: string]: number;
  };
}

export class AIAnalyzer {
  private detector: poseDetection.PoseDetector | null = null;
  private modelLoaded = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // Load the MoveNet model
      const model = poseDetection.SupportedModels.MoveNet;
      this.detector = await poseDetection.createDetector(model, {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
      });
      this.modelLoaded = true;
    } catch (error) {
      console.error('Error loading pose detection model:', error);
      throw new Error('Failed to initialize AI analyzer');
    }
  }

  private calculateAngles(keyPoints: { [key: string]: { x: number; y: number; score: number } }): { [key: string]: number } {
    const angles: { [key: string]: number } = {};

    // Calculate angle between three points
    const calculateAngle = (a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }): number => {
      const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
      let angle = Math.abs(radians * 180.0 / Math.PI);
      if (angle > 180.0) {
        angle = 360.0 - angle;
      }
      return angle;
    };

    // Example: Calculate shoulder angle
    if (keyPoints['left_shoulder'] && keyPoints['left_elbow'] && keyPoints['left_wrist']) {
      angles['left_shoulder'] = calculateAngle(
        keyPoints['left_shoulder'],
        keyPoints['left_elbow'],
        keyPoints['left_wrist']
      );
    }

    // Add more angle calculations as needed
    return angles;
  }

  private analyzeForm(keyPoints: { [key: string]: { x: number; y: number; score: number } }, angles: { [key: string]: number }): {
    score: number;
    feedback: string[];
    improvements: string[];
  } {
    const feedback: string[] = [];
    const improvements: string[] = [];
    let score = 100;

    // Example form analysis
    if (angles['left_shoulder']) {
      if (angles['left_shoulder'] < 30) {
        feedback.push('Shoulder angle is too narrow');
        improvements.push('Try to keep your arms at a 90-degree angle');
        score -= 20;
      } else if (angles['left_shoulder'] > 150) {
        feedback.push('Shoulder angle is too wide');
        improvements.push('Keep your arms closer to your body');
        score -= 20;
      }
    }

    // Add more form analysis rules as needed

    return {
      score: Math.max(0, score),
      feedback,
      improvements,
    };
  }

  public async analyzeImage(imageUrl: string): Promise<BodyAnalysis> {
    if (!this.modelLoaded || !this.detector) {
      throw new Error('AI analyzer not initialized');
    }

    try {
      // Load the image
      const image = new Image();
      image.src = imageUrl;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      // Detect poses
      const poses = await this.detector.estimatePoses(image);
      if (poses.length === 0) {
        throw new Error('No poses detected in the image');
      }

      // Convert keypoints to a more usable format
      const keyPoints: { [key: string]: { x: number; y: number; score: number } } = {};
      poses[0].keypoints.forEach((keypoint) => {
        keyPoints[keypoint.name] = {
          x: keypoint.x,
          y: keypoint.y,
          score: keypoint.score,
        };
      });

      // Calculate angles
      const angles = this.calculateAngles(keyPoints);

      // Analyze form
      const { score, feedback, improvements } = this.analyzeForm(keyPoints, angles);

      return {
        score,
        feedback,
        improvements,
        keyPoints,
        angles,
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error('Failed to analyze image');
    }
  }
}

// Create a singleton instance
export const aiAnalyzer = new AIAnalyzer(); 