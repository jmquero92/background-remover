# Usamos una imagen oficial de Python ligera
FROM python:3.11-slim

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Instalamos dependencias del sistema requeridas por OpenCV y rembg
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copiamos el archivo de requerimientos
COPY requirements.txt .

# Instalamos las dependencias de Python (Asegurando la versión CPU de rembg)
# Eliminamos cualquier referencia previa a la versión GPU o general, forzando la de CPU para evitar problemas en hostings serverless/básicos
RUN pip install --no-cache-dir fastapi uvicorn python-multipart "rembg[cpu]"

# Copiamos el código fuente de la aplicación
COPY main.py .

# Exponemos el puerto que usará FastAPI (8000 por defecto, pero se sobrescribirá si el entorno lo pide)
EXPOSE 8000

# Comando para ejecutar la aplicación (Render inyecta PORT dinámicamente)
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
