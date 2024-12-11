import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/init";

const CACHE_KEY = "guestsCache";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

async function fetchGuests() {
	const cachedGuests = loadFromLocalStorage(CACHE_KEY, CACHE_DURATION);
	if (cachedGuests) {
		console.log("Using cached data");
		return cachedGuests;
	}

	console.log("Fetching data from Firestore");
	const q = query(collection(db, "guests"), where("rsvp", "==", false));
	const querySnapshot = await getDocs(q);
	const guests = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	saveToLocalStorage(guests);
	return guests;
}
function saveToLocalStorage(data) {
	const timestamp = Date.now(); // Current time in milliseconds
	localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp }));
}
function loadFromLocalStorage(key, maxAge) {
	const cached = localStorage.getItem(key);
	if (!cached) return null;

	const { data, timestamp } = JSON.parse(cached);
	const age = Date.now() - timestamp;

	// Check if the cache is still valid
	if (age > maxAge) {
		localStorage.removeItem(key); // Remove expired cache
		return null;
	}

	return data;
}

export { fetchGuests, saveToLocalStorage, loadFromLocalStorage };
