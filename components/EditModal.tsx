import React, { useState } from 'react';
import { Image } from '../types';
import { CloseIcon } from './icons';

interface EditModalProps {
  image: Image;
  onClose: () => void;
  onSave: (updatedImage: Image) => void;
}

const EditModal: React.FC<EditModalProps> = ({ image, onClose, onSave }) => {
  const [rotation, setRotation] = useState(image.rotation || 0);

  const handleSave = () => {
    onSave({ ...image, rotation });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">Editar Imagen</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        <div className="mb-6 flex justify-center">
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-96 object-contain"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Rotación: {rotation}°</label>
          <input
            type="range"
            min="0"
            max="360"
            step="90"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>0°</span>
            <span>90°</span>
            <span>180°</span>
            <span>270°</span>
            <span>360°</span>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
