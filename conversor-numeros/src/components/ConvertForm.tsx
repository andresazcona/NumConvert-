import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Grid, CircularProgress } from '@mui/material';

type ConversionResult = {
  decimal: number;
  binario: string;
  hexadecimal: string;
};

const ConvertForm: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [base, setBase] = useState<string>('binario');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Función para validar la entrada según la base seleccionada
  const isValidInput = (input: string, base: string): boolean => {
    let regex;
    switch (base) {
      case 'binario':
        regex = /^[01]+$/;
        break;
      case 'decimal':
        regex = /^\d+$/;
        break;
      case 'hexadecimal':
        regex = /^[0-9a-fA-F]+$/;
        break;
      default:
        return false;
    }
    return regex.test(input);
  };

  const handleConvert = async () => {
    setError('');
    setResult(null);
    setLoading(true);

    if (!value || !base) {
      setError('Por favor ingresa el valor y selecciona la base.');
      setLoading(false);
      return;
    }

    if (!isValidInput(value, base)) {
      setError(`El valor ingresado no es válido para la base ${base}.`);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://conversor-de-numeros-ivory.vercel.app/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, base }),
      });

      if (!response.ok) {
        throw new Error('Error al convertir el número.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error.');
    } finally {
      setLoading(false);
    }
  };

  // Función para definir el estilo condicional según la base seleccionada
  const getStyleForBase = (currentBase: string) =>
    base === currentBase ? { color: '#1976d2', fontWeight: 'bold' } : {};

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2, marginTop: 20 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Conversor de Números
      </Typography>

      {/* Mini paso a paso */}
      <Typography variant="body2" align="center" gutterBottom sx={{ marginBottom: 3 }}>
        <strong>Pasos para usar el conversor:</strong>
        <br />
        1. Ingresa el número en el campo "Valor".
        <br />
        2. Selecciona la base correspondiente en el menú desplegable.
        <br />
        3. Haz clic en "Convertir" para ver el resultado en las tres bases.
      </Typography>

      <TextField
        label="Valor"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Base</InputLabel>
        <Select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          label="Base"
        >
          <MenuItem value="binario">Binario</MenuItem>
          <MenuItem value="decimal">Decimal</MenuItem>
          <MenuItem value="hexadecimal">Hexadecimal</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        onClick={handleConvert}
        disabled={loading}
        sx={{
          marginBottom: 2,
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Convertir'}
      </Button>

      {error && (
        <Typography color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      {result && (
        <Card sx={{ marginTop: 4 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body1" align="center">
                  <strong>Decimal:</strong> <br />
                  <span style={getStyleForBase('decimal')}>{result.decimal}</span>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" align="center">
                  <strong>Binario:</strong> <br />
                  <span style={getStyleForBase('binario')}>{result.binario}</span>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" align="center">
                  <strong>Hexadecimal:</strong> <br />
                  <span style={getStyleForBase('hexadecimal')}>{result.hexadecimal}</span>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ConvertForm;
