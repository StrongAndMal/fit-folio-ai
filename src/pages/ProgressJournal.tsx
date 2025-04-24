import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadProgressPhoto, getProgressPhotos, deleteProgressPhoto, updateProgressPhoto, ProgressPhoto } from '../services/photos';
import './ProgressJournal.css';

const ProgressJournal: React.FC = () => {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<ProgressPhoto | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState<'great' | 'good' | 'neutral' | 'bad'>('neutral');

  useEffect(() => {
    if (user) {
      loadPhotos();
    }
  }, [user]);

  const loadPhotos = async () => {
    try {
      const userPhotos = await getProgressPhotos(user.id);
      setPhotos(userPhotos);
    } catch (error) {
      alert('Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;

    try {
      const file = e.target.files[0];
      const newPhoto = await uploadProgressPhoto(user.id, file);
      setPhotos(prev => [newPhoto, ...prev]);
      alert('Photo uploaded successfully');
    } catch (error) {
      alert('Failed to upload photo');
    }
  };

  const handleDelete = async (photoId: string) => {
    if (!user) return;

    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await deleteProgressPhoto(user.id, photoId);
        setPhotos(prev => prev.filter(photo => photo.id !== photoId));
        alert('Photo deleted successfully');
      } catch (error) {
        alert('Failed to delete photo');
      }
    }
  };

  const handleEdit = async () => {
    if (!user || !selectedPhoto) return;

    try {
      const updatedPhoto = await updateProgressPhoto(user.id, selectedPhoto.id, {
        notes,
        mood,
      });
      setPhotos(prev => prev.map(photo => 
        photo.id === updatedPhoto.id ? updatedPhoto : photo
      ));
      setEditModalOpen(false);
      alert('Photo updated successfully');
    } catch (error) {
      alert('Failed to update photo');
    }
  };

  const openEditModal = (photo: ProgressPhoto) => {
    setSelectedPhoto(photo);
    setNotes(photo.notes || '');
    setMood(photo.mood || 'neutral');
    setEditModalOpen(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="progress-journal">
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="file-input"
        />
        <div className="upload-hint">
          Click to upload a progress photo
        </div>
      </div>

      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.url} alt="Progress photo" className="photo-image" />
            <div className="photo-details">
              <div className="photo-date">
                {new Date(photo.date).toLocaleDateString()}
              </div>
              <div className="photo-actions">
                <button onClick={() => openEditModal(photo)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(photo.id)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
            {photo.notes && <div className="photo-notes">{photo.notes}</div>}
            {photo.mood && (
              <div className="photo-mood">
                {photo.mood === 'great' && '😊'}
                {photo.mood === 'good' && '🙂'}
                {photo.mood === 'neutral' && '😐'}
                {photo.mood === 'bad' && '😞'}
              </div>
            )}
          </div>
        ))}
      </div>

      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Photo Details</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
              className="notes-textarea"
            />
            <div className="mood-selector">
              <span>Mood:</span>
              <button
                className={`mood-button ${mood === 'great' ? 'selected' : ''}`}
                onClick={() => setMood('great')}
              >
                😊
              </button>
              <button
                className={`mood-button ${mood === 'good' ? 'selected' : ''}`}
                onClick={() => setMood('good')}
              >
                🙂
              </button>
              <button
                className={`mood-button ${mood === 'neutral' ? 'selected' : ''}`}
                onClick={() => setMood('neutral')}
              >
                😐
              </button>
              <button
                className={`mood-button ${mood === 'bad' ? 'selected' : ''}`}
                onClick={() => setMood('bad')}
              >
                😞
              </button>
            </div>
            <div className="modal-actions">
              <button onClick={() => setEditModalOpen(false)} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleEdit} className="save-button">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressJournal; 