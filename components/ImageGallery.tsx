import React from 'react';
import { Category, Image } from '../types';
import { PlusIcon, TrashIcon, EditIcon } from './icons';

interface ImageGalleryProps {
  category: Category;
  onAddImages: () => void;
  onImageClick: (image: Image, gallery: Image[]) => void;
  onDeleteImage: (categoryId: string, imageId: string) => void;
  onEditImage: (category: Category, image: Image) => void;
  isEditMode: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  category,
  onAddImages,
  onImageClick,
  onDeleteImage,
  onEditImage,
  isEditMode,
}) => {
  const getImageStyle = (image: Image) => {
    const rotation = image.rotation || 0;
    const crop = image.crop;

    if (crop) {
      return {
        transform: `rotate(${rotation}deg)`,
        objectFit: 'cover' as const,
        objectPosition: `${-crop.x}px ${-crop.y}px`,
        width: `${crop.width}px`,
        height: `${crop.height}px`,
      };
    }

    return {
      transform: `rotate(${rotation}deg)`,
    };
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-purple-400">{category.title}</h2>
        {isEditMode && (
          <button
            onClick={onAddImages}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlusIcon /> Agregar Imágenes
          </button>
        )}
      </div>

      <div className="relative perspective-scroll">
        <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4">
          {category.images.map((image) => (
            <div
              key={image.id}
              className="gallery-image-item relative flex-shrink-0 w-64 h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 cursor-pointer bg-gray-800"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={getImageStyle(image)}
                onClick={() => onImageClick(image, category.images)}
              />
              {isEditMode && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditImage(category, image);
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-colors"
                    title="Editar"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteImage(category.id, image.id);
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
                    title="Eliminar"
                  >
                    <TrashIcon />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
