'use client';
import { useState, useCallback } from 'react';

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      processFile(droppedFile);
    }
  }, []);

  const processFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setLoading(true);
    setResultImage(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Llamada al backend local
      const response = await fetch('http://localhost:8000/api/remove-bg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Error processing image');

      const blob = await response.blob();
      setResultImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert('Error eliminando el fondo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col md:flex-row my-8">
      {/* Placeholder AdSense Izquierdo */}
      <div className="hidden md:flex w-48 h-96 bg-slate-50 items-center justify-center border border-slate-200 rounded-xl">
        <span className="text-slate-400 text-sm text-center px-4">Espacio para Google AdSense</span>
      </div>
      
      <div className="flex-1 px-4 md:px-8">
        {!file ? (
          <div 
            onDragOver={(e) => e.preventDefault()} 
            onDrop={handleDrop}
            className="border-4 border-dashed border-slate-300 rounded-3xl p-16 md:p-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-slate-50 transition duration-300 ease-in-out shadow-sm"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-700 text-center">Arrastra tu imagen aquí</p>
            <p className="text-slate-500 mt-2 text-center text-lg">o haz clic para explorar tus archivos</p>
            <p className="text-slate-400 text-sm mt-4">JPG, PNG hasta 10MB</p>
            <input 
              type="file" id="fileInput" className="hidden" accept="image/*"
              onChange={(e) => e.target.files && processFile(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10">
            {loading ? (
              <div className="animate-pulse flex flex-col items-center w-full">
                <div className="h-64 w-full md:w-3/4 bg-slate-200 rounded-xl flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xl text-slate-600 font-medium">✨ Procesando magia... ✨</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full flex flex-col items-center">
                <div className="flex flex-col md:flex-row gap-8 w-full justify-center mb-10">
                  <div className="text-center w-full md:w-1/2">
                    <p className="text-sm font-semibold mb-3 text-slate-500 uppercase tracking-wider">Original</p>
                    <div className="bg-slate-100 rounded-xl p-2 border border-slate-200">
                      <img src={preview!} alt="Original" className="h-64 md:h-80 w-full object-contain rounded-lg" />
                    </div>
                  </div>
                  <div className="text-center w-full md:w-1/2">
                    <p className="text-sm font-semibold mb-3 text-slate-500 uppercase tracking-wider">Sin Fondo</p>
                    <div className="bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-200 rounded-xl p-2 border border-slate-200 relative">
                      {resultImage && <img src={resultImage} alt="Sin fondo" className="h-64 md:h-80 w-full object-contain rounded-lg" />}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl justify-center mt-4">
                  <a 
                    href={resultImage!} download="sin-fondo.png"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 px-8 rounded-xl text-lg shadow-sm text-center transition flex-1 border border-slate-300"
                  >
                    Descargar Gratis (Web)
                  </a>
                  <button 
                    onClick={() => setShowPremiumModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-md text-center transition flex-1"
                  >
                    Descargar HD (Premium)
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    setFile(null);
                    setResultImage(null);
                  }}
                  className="mt-8 text-slate-500 hover:text-slate-800 underline transition"
                >
                  Subir otra imagen
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Placeholder AdSense Derecho */}
      <div className="hidden md:flex w-48 h-96 bg-slate-50 items-center justify-center border border-slate-200 rounded-xl">
        <span className="text-slate-400 text-sm text-center px-4">Espacio para Google AdSense</span>
      </div>

      {/* Modal Premium */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <h2 className="text-3xl font-extrabold mb-2 mt-4 text-slate-800">Hazte Premium 🚀</h2>
            <p className="text-slate-600 mb-8 text-lg">Obtén descargas ilimitadas en máxima calidad (HD) y procesamiento prioritario.</p>
            
            <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
              <div className="text-4xl font-black text-slate-800 mb-2">5€<span className="text-lg font-medium text-slate-500">/mes</span></div>
              <ul className="text-left text-sm text-slate-600 space-y-2 mt-4">
                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Imágenes ilimitadas</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Calidad HD garantizada</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Sin anuncios</li>
              </ul>
            </div>

            <button className="bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl w-full mb-4 transition shadow-lg">
              Pagar con Stripe
            </button>
            <button onClick={() => setShowPremiumModal(false)} className="text-slate-500 hover:text-slate-800 underline transition">
              Volver atrás
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
