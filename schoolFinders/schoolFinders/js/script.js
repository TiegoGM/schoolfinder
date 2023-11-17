
const firebaseConfig = {
  apiKey: "AIzaSyDtmGF4ZAIjlD4TGnUgyt8rOSQcjFVMFpI",
  authDomain: "schoolfinders-2f285.firebaseapp.com",
  projectId: "schoolfinders-2f285",
  storageBucket: "schoolfinders-2f285.appspot.com",
  messagingSenderId: "522336434901",
  appId: "1:522336434901:web:1c8218b3217414671c405c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

// form login
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User authenticated successfully
      window.location.href = '/Students/dashboard.html';
      alert('Login successful');
    })
    .catch((error) => {
      alert('Check your email and password and try again');
      console.log('Authentication error:', error);
    });
});

// form register
document.getElementById("register-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const id = document.getElementById("id").value; // Fixed the id element
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (name === "" || surname === "" || id === "" || phoneNumber === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Please fill in all fields.");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Save the user data to Firestore
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid); // Assume you have a "users" collection
      setDoc(userRef, {
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        email: email,
        password: password
      })
        .then(() => {
          alert("Registration successful!");
          window.location.href = "/Students/login.html"; // Fixed the redirect URL
        })
        .catch((error) => {
          alert("Error saving user data: " + error.message);
        });
    })
    .catch((error) => {
      alert("Error creating user account: " + error.message);
    });
});
