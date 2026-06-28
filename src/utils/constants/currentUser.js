/**
 * Mock authenticated user. In a real build this would come from the auth
 * provider / Firebase. Used to auto-fill the booking client form when logged in.
 */
// Fake logged-in user profile for development and demos
export const currentUser = {
  isLoggedIn: true, // Pretend the user is signed in
  firstName: "Sophie", // Given name shown in the UI
  lastName: "Martin", // Family name shown in the UI
  email: "sophie.martin@email.com", // Contact email for booking
  phone: "+41 79 123 45 67", // Phone number in Swiss format
  avatar: "https://i.pravatar.cc/240?img=47", // Profile picture URL
  memberSince: "2024-03-01", // When the account was created
  preferences: {
    emailReminders: true, // Send appointment reminders by email
    smsReminders: true, // Send appointment reminders by text
    promotions: false, // Opt out of marketing messages
  },
};
