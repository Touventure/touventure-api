const { db, auth } = require('./firebase');
const admin = require('firebase-admin');

const getTourism = async (request, h) => {
  // Name collection
  const collectionRef = db.collection('tourism');

  try {
    // Dapatkan semua dokumen dari koleksi
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      return 'Tidak ada dokumen.';
    }

    const data = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));

    const response = h.response({
      status: 'success',
      data,
    });

    return response;
  } catch (error) {
    console.error('Error mengambil dokumen:', error);
    return 'Terjadi kesalahan saat mengambil dokumen.';
  }
};

const getTourismById = async (request, h) => {
  // Name collection
  const { id } = request.params;

  // Name collection
  const collectionRef = db.collection('tourism');

  try {
    // Dapatkan dokumen berdasarkan ID
    const doc = await collectionRef.doc(id).get();

    if (!doc.exists) {
      return 'Dokumen tidak ditemukan.';
    }

    const data = { id: doc.id, data: doc.data() };
    const response = h.response({
      status: 'success',
      data,
    });

    return response;
  } catch (error) {
    console.error('Error mengambil dokumen:', error);
    return 'Terjadi kesalahan saat mengambil dokumen.';
  }
};

const login = async (request, h) => {
  const { email, password } = request.payload;

  try {
    // Authenticate a user with Firebase Authentication
    admin
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User is authenticated
        const user = userCredential.user;
        console.log(`User ${user.email} is authenticated`);
      })
      .catch((error) => {
        // Authentication failed
        console.error('Authentication failed:', error);
      });
  } catch (error) {
    return { error: error.message };
  }
};

const register = async (request, h) => {
  // Get email password
  const { email, password } = request.payload;

  try {
    // Register a new user with email and password
    const userCredential = await auth.createUser({
      email,
      password,
    });

    const user = userCredential.toJSON();
    console.log(user);

    // Store additional user information in Firestore
    await db.collection('users').doc(user.uid).set({
      email: user.email,
      // Add more fields as needed
    });

    const response = h.response({
      status: 'success',
      message: 'User registered successfully',
    });
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getTourism, getTourismById, register, login };
