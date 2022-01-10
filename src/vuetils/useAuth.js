import { ref } from 'vue';
import { supabase } from '../supabase/index';
import { useRouter } from 'vue-router';

const authRouter = useRouter();
const errorMessage = ref(null);
const statusMessage = ref(null);

// eslint-disable-next-line no-unused-vars
const clearMessage = (msg) => {
  setTimeout(() => {
    msg.value = null;
  }, 5000);
};

const handleLogin = async (email, password, isMagicForm) => {
  try {
    console.log(email);
    console.log(password);
    const { error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (error) throw error;
    isMagicForm.value
      ? (window.location.href = '/')
      : (statusMessage.value = `Magic link send! Check out your inbox.`);
    clearMessage(statusMessage);
  } catch (error) {
    errorMessage.value = `Error: ${error.message}`;
    clearMessage(errorMessage.value);
  }
};

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    authRouter.push({ name: 'Home' });
  } catch (error) {
    errorMessage.value = `Error: ${error.message}`;
    clearMessage(errorMessage.value);
  }
};

const handleSignup = async (name, email, password, confirmPassword) => {
  try {
    if (password === confirmPassword) {
      const { error } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        {
          data: {
            name,
          },
        }
      );

      if (error) throw error;
      // authRouter.push({ name: 'Login' });
      window.location.href = '/';
    }
    errorMessage.value = `Error: Passwords do not match`;
  } catch (error) {
    errorMessage.value = error.message;
    clearMessage(errorMessage.value);
  }
};

const handlePasswordReset = async (email) => {
  try {
    const { error } = await supabase.auth.api.resetPasswordForEmail({ email });
    if (error) throw error;
    statusMessage.value = 'We send you password reset link. Check your inbox.';
    clearMessage(statusMessage);
  } catch (error) {
    errorMessage.value = `Error: ${error.message}`;
    clearMessage(errorMessage);
  }
};

const handleUserUpdate = async (credentials) => {
  try {
    const { error } = await supabase.auth.update(credentials);
    if (error) throw error;
    statusMessage.value = `Your profile has been changed successfully.`;
    clearMessage(statusMessage);
  } catch (error) {
    errorMessage.value = error.message;
    clearMessage(errorMessage);
  }
};

const handlePasswordChange = async (password, confirmPassword) => {
  if (password === confirmPassword && password && confirmPassword) {
    try {
      const { error } = await supabase.auth.update({
        password,
      });
      if (error) throw error;
      password = null;
      confirmPassword = null;

      statusMessage.value = `Your password has been changed successfully.`;
      clearMessage(statusMessage);
    } catch (error) {
      errorMessage.value = error.message;
      clearMessage(errorMessage);
    }
  } else {
    errorMessage.value = `Error: Passwords do not match`;
    clearMessage(errorMessage);
  }
};

export {
  handleLogin,
  handleLogout,
  handleSignup,
  handlePasswordReset,
  handlePasswordChange,
  handleUserUpdate,
  statusMessage,
  errorMessage,
  authRouter,
};
