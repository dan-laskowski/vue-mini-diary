<template>
  <h1>Register</h1>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../supabase/index';
import { useRouter } from 'vue-router';
export default {
  name: 'Register',
  setup() {
    const router = useRouter();
    const formValues = {
      email: ref(null),
      password: ref(null),
      confirmPassword: ref(null),
    };
    const errorMessage = ref(null);

    //Extracting multiple properties by object deconstruction
    const { email, password, confirmPassword } = formValues;

    //Register user to app function
    const registerUser = async () => {
      if (email.value === confirmPassword.value) {
        try {
          //Register user in project's database
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });

          if (error) throw error;

          //Push user to Login page when credentials are correct
          router.push({ name: 'Login' });
        } catch (error) {
          errorMessage.value = error.message;

          //Reset error message after 5 seconds
          setTimeout(() => {
            errorMessage.value = null;
          }, 5000);
        }
        return;
      }
      //Set error message when passwords in the form do not match
      errorMessage.value = `Error: Passwords do not match`;

      //Reset error message after 5 seconds
      setTimeout(() => {
        errorMessage.value = null;
      }, 5000);
    };
    return { formValues, errorMessage, registerUser };
  },
};
</script>

<style></style>
