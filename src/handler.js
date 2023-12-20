const db = require('./firebase');

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

module.exports = { getTourism, getTourismById };
