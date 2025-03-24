const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

console.log('MONGO_URI:', process.env.MONGO_URI ? 'Defined' : 'Not defined');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Defined' : 'Not defined');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);

// Ruta para el registro de usuarios
app.post('/api/register', async (req, res) => {
  try {
    console.log('Datos recibidos en registro:', req.body);
    const { name, email, password } = req.body;

    // Validar datos
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Usuario ya existe:', email);
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // Guardar usuario en la base de datos
    await newUser.save();

    // Generar token JWT
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Usuario registrado exitosamente:', email);
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para el login de usuarios
app.post('/api/login', async (req, res) => {
  try {
    console.log('Datos recibidos en login:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado:', email);
      return res.status(404).json({ message: 'El usuario no existe' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Contraseña incorrecta para:', email);
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login exitoso para:', email);
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});