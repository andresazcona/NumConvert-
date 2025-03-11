import React, { useEffect, useState } from 'react';
import ConvertForm from './components/ConvertForm';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

interface UnsplashData {
  imageUrl: string;
  imageLink: string;
  photoTitle: string;
  authorName: string;
}

// Se obtiene la API key desde la variable de entorno
const unsplashApiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

const App: React.FC = () => {
  const [unsplashImage, setUnsplashImage] = useState<string>('');
  const [unsplashData, setUnsplashData] = useState<UnsplashData | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const fetchUnsplashImage = async () => {
    setImageLoading(true);
    setError(null);
    try {
      const unsplashResponse = await fetch(
        `https://api.unsplash.com/photos/random?query=nature,landscape&client_id=${unsplashApiKey}`
      );
      const data = await unsplashResponse.json();
      setUnsplashImage(data.urls.full);
      setUnsplashData({
        imageUrl: data.urls.full,
        imageLink: data.links.html,
        photoTitle: data.description || data.alt_description || 'Sin título',
        authorName: data.user.name,
      });
    } catch (err) {
      setError({ message: 'No se pudo cargar la imagen' });
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    fetchUnsplashImage();
  }, []);

  if (imageLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${unsplashImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {error && (
        <Box
          sx={{
            p: 2,
            backgroundColor: '#f8d7da',
            color: '#721c24',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">{error.message}</Typography>
        </Box>
      )}

      {/* Footer Superior con información de la imagen */}
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          top: 0,
          textAlign: 'center',
          padding: '10px 0',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: '#fff',
          zIndex: 1000,
        }}
      >
        {unsplashData && (
          <Typography variant="body2">
            Fotografía{' '}
            <a
              href={unsplashData.imageLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              {unsplashData.photoTitle}
            </a>{' '}
            - Por {unsplashData.authorName}
          </Typography>
        )}
      </Box>

      <Container
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '60px', // Para evitar que el footer tape el contenido
        }}
      >
        <ConvertForm />
      </Container>

      {/* Footer Inferior */}
      <Box
        sx={{
          width: '100vw',
          py: 1,
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: '#ffffff',
        }}
      >
        <Typography variant="body2">
          Made by <strong>Andres Azcona</strong> |{' '}
          <a
            href="https://github.com/andresazcona"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            GitHub: https://github.com/andresazcona
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
