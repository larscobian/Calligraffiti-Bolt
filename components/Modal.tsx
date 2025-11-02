import React, { useEffect } from 'react';
import { Image } from '../types';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

interface ModalProps {
  image: Image;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Modal: React.FC<ModalProps> = ({ image, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  const getImageStyle = () => {
    const rotation = image.rotation || 0;
    return {
      transform: `rotate(${rotation}deg)`,
      maxWidth: '90vw',
      maxHeight: '90vh',
    };
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        title="Cerrar"
      >
        <CloseIcon size={32} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 text-white hover:text-gray-300 transition-colors"
        title="Anterior"
      >
        <ChevronLeftIcon size={48} />
      </button>

      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.src}
          alt={image.alt}
          className="object-contain"
          style={getImageStyle()}
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 text-white hover:text-gray-300 transition-colors"
        title="Siguiente"
      >
        <ChevronRightIcon size={48} />
      </button>
    </div>
  );
};

export default Modal;
