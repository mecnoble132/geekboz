import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAW4NdmM55xTnWEo3OlvdUDneAi2LybyS8",
    authDomain: "geekboz.firebaseapp.com",
    projectId: "geekboz",
    storageBucket: "geekboz.firebasestorage.app",
    messagingSenderId: "959115850463",
    appId: "1:959115850463:web:7155b25bc024afb8b8ef6a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch all products
export async function getAllProducts() {
    try {
        const q = query(collection(db, "products"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch {
        // fallback without orderBy if index not set
        const snap = await getDocs(collection(db, "products"));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
}

// Fetch only featured products (for homepage teaser)
export async function getFeaturedProducts() {
    try {
        const q = query(collection(db, "products"), where("featured", "==", true), orderBy("order", "asc"));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch {
        const q = query(collection(db, "products"), where("featured", "==", true));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
}

// Fetch a single product by productId field
export async function getProductById(productId) {
    const docRef = doc(db, "products", productId);
    const snap = await getDoc(docRef);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
    return null;
}

export { db };



