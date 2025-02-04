const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../models/userModel");

// Controlador para registrar un nuevo usuario
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log("Datos recibidos en /register:", req.body); // Log de depuración

    // Verifica si ya hay un usuario con este email
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Si no se envía 'role', puedes asignar uno por defecto:
    const userRole = role || "CONTRATISTA"; // Por ejemplo

    // Crea usuario con su rol
    await createUser(name, email, hashedPassword, userRole);

    console.log("Usuario registrado con éxito:", email, "Rol:", userRole);
    return res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

// Controlador para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    console.log("Intentando login con email:", email); // Log de depuración

    // Verifica si existe un usuario con este email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Compara la contraseña encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Genera el token, incluyendo el rol
    // Asegúrate de tener process.env.JWT_SECRET definido
    const token = jwt.sign(
      { userId: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    console.log("Login exitoso para:", email, "Rol:", user.role);
    return res.json({ message: "Login exitoso", token, role: user.role });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { register, login };
