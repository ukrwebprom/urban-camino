import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth"; // Import necessary Firebase Auth functions
import { auth } from '../firebase'; // Your initialized Firebase auth instance

// Note: You must get your Google Client ID from the Firebase Console (Authentication -> Sign-in method -> Google)
// It will look like: YOUR_WEB_CLIENT_ID.apps.googleusercontent.com
const GOOGLE_CLIENT_ID = "761376237323-1niju3o9ctm1so9j96p5tda44i81jrcd.apps.googleusercontent.com";

function AuthForm() {
  // ... (existing email/password state and functions, or remove them if not needed) ...
  const [error, setError] = useState('');

  // This useEffect will run once when the component mounts to set up Google Sign-In
  useEffect(() => {
    // Check if the Google API script has loaded
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse, // This is the function that handles the sign-in result
      });

      // Render the Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById("google-sign-in-button"), // The HTML element to render the button into
        { theme: "outline", size: "large", type: "standard", text: "signin_with", shape: "rectangular" } // Customization options
      );

      // This is for One Tap/auto-select (optional)
      // window.google.accounts.id.prompt();
    } else {
      console.warn("Google Identity Services script not loaded yet.");
    }
  }, []); // Run once on component mount

  // Callback function for Google Sign-In result
  const handleGoogleCredentialResponse = async (response) => {
    setError('');
    // response.credential contains the ID token
    const idToken = response.credential;

    try {
      // 1. Create a Firebase credential using the Google ID token
      const credential = GoogleAuthProvider.credential(idToken);

      // 2. Sign in to Firebase with this credential
      const userCredential = await signInWithCredential(auth, credential);
      console.log('Successfully signed in to Firebase with Google!', userCredential.user);
      // The onAuthStateChanged listener in App.js will now pick up the user.
      // You can redirect or update UI as needed.

    } catch (err) {
      console.error("Error signing in to Firebase with Google credential:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign In Options</h2>

      {/* Your Email/Password form if still needed */}
      {/* ... */}

      <hr style={{ margin: '20px 0' }} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* This is where the Google Sign-In button will be rendered */}
      <div id="google-sign-in-button"></div>

    </div>
  );
}

export default AuthForm;