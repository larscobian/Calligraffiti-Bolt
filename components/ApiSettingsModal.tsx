import React, { useState } from 'react';
import { CloseIcon } from './icons';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: { apiKey: string; clientId: string }) => void;
}

const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [clientId, setClientId] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!apiKey.trim() || !clientId.trim()) {
      alert('Por favor completa ambos campos');
      return;
    }
    onSave({ apiKey: apiKey.trim(), clientId: clientId.trim() });
    setApiKey('');
    setClientId('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">Configuración de API</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        <p className="text-gray-400 mb-4">
          Para conectar con Google Drive, necesitas proporcionar tu API Key y Client ID desde la consola de Google Cloud.
        </p>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">API Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
            placeholder="Tu API Key de Google Cloud"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Client ID</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
            placeholder="Tu Client ID de Google Cloud"
          />
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

export default ApiSettingsModal;
