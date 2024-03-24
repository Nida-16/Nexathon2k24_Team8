import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAMd6Tw1a0k6F1CG4al43Vk6CRLCFlpy_4",
    authDomain: "trial-b8c5a.firebaseapp.com",
    projectId: "trial-b8c5a",
    storageBucket: "trial-b8c5a.appspot.com",
    messagingSenderId: "287460725639",
    appId: "1:287460725639:web:b55cd1b4ca7b08babdf922",
    measurementId: "G-YH3Y5QKY95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set, child, update, remove, onValue }
    from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js'

const db = getDatabase();
const usersRef = ref(db, 'users');
const property_list = [];

function getPropertyDetails() {
    return new Promise((resolve, reject) => {
        const property_list = []; // Initialize property_list
        onValue(usersRef, (snapshot) => {
            snapshot.forEach((snap) => {
                const user = snap.val();
                Object.entries(user).forEach(([key, value]) => {
                    if (key === user.username) { // Check if the key matches the username
                        Object.entries(value).forEach(([itemId, item]) => {
                            // Access individual properties
                            const { area_in_sqft, bathrooms, bedrooms, developer_name, location, project_name, project_status, property_type } = item;
                            // Append key-value pairs to property_list
                            property_list.push({ area_in_sqft, bathrooms, bedrooms, developer_name, location, project_name, project_status, property_type });
                        });
                    }
                });
            });
            resolve(property_list); // Resolve the promise with property_list
        }, (error) => {
            reject(error); // Reject the promise if there is an error
        });
    });
}

// console.log(property_list)