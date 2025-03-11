const express = require('express');
const cors = require('cors'); // Importa el middleware CORS
const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas

app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Función para convertir decimal a binario, hexadecimal y viceversa
function convertNumber(value, base) {
  let decimal;
  if (base === 'binario') {
    decimal = parseInt(value, 2);
  } else if (base === 'hexadecimal') {
    decimal = parseInt(value, 16);
  } else if (base === 'decimal') {
    decimal = parseInt(value, 10);
  } else {
    return { error: 'Base no válida' };
  }

  return {
    decimal: decimal,
    binario: decimal.toString(2),
    hexadecimal: decimal.toString(16)
  };
}

// Ruta principal
app.post('/convert', (req, res) => {
  const { value, base } = req.body;

  if (!value || !base) {
    return res.status(400).send({ error: 'Faltan parámetros. Envíe "value" y "base"' });
  }

  const validBases = ['binario', 'hexadecimal', 'decimal'];
  if (!validBases.includes(base)) {
    return res.status(400).send({ error: 'Base inválida. Las bases válidas son: binario, hexadecimal, decimal.' });
  }

  // Realizar la conversión
  const result = convertNumber(value, base);

  if (result.error) {
    return res.status(400).send(result);
  }

  res.status(200).send(result);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
