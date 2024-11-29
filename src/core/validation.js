
// Validate Email Format
export const validateEmail = (email: string): string | null => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return 'Email is required.';
    if (!regex.test(email)) return 'Please enter a valid email address.';
    return null;
  };
  
  // Validate Password (Minimum length, contains letters, numbers, and special characters)
  export const validatePassword = (password: string): string | null => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/;
    if (!password.trim()) return 'Password is required.';
    if (!regex.test(password)) return 'Password must be 6-20 characters long, include at least one letter, one number, and one special character.';
    return null;
  };
  
  // Validate Username (Ensure it's not empty)
  export const validateUsername = (username: string): string | null => {
    if (!username.trim()) return 'Username is required.';
    return null;
  };