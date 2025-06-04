<script setup>
import { reactive, computed, ref } from 'vue';
import FormGroup from './ui/FormGroup.vue';
import TextareaField from './ui/TextareaField.vue';
import BasicButton from './ui/BasicButton.vue';
import CheckboxGroup from './ui/CheckboxGroup.vue';
import Toast from './ui/Toast.vue';

const toastRef = ref()


const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    message: '',
    agreeTerms: false
});

const errors = reactive({
    firstName: false,
    lastName: false,
    email: false
});

const validateField = (field) => {
    if (field === 'email') {
        errors.email = !isValidEmail(form.email);
    } else {
        errors[field] = !form[field].trim();
    }
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const isFormValid = () => {
    let valid = true;

    // Validate required fields
    if (!form.firstName.trim()) {
        errors.firstName = true;
        valid = false;
    }

    if (!form.lastName.trim()) {
        errors.lastName = true;
        valid = false;
    }

    if (!form.email.trim() || !isValidEmail(form.email)) {
        errors.email = true;
        valid = false;
    }

    if (!form.agreeTerms) {
        errors.agreeTerms = true;
        valid = false;
    }

    return valid;
};

const emailErrorMessage = computed(() => {
    if (!form.email.trim()) return 'Email is required';
    if (!isValidEmail(form.email)) return 'Please enter a valid email';
    return '';
});

const notifyUser = (message) => {
    toastRef.value?.showToast(message);
}

const handleSubmit = () => {
    if (isFormValid()) {
        // Simulate form submission
        console.log('Form submitted:', form);
        notifyUser('Form submitted successfully!');

        // Reset form
        Object.keys(form).forEach(key => {
            form[key] = key === 'agreeTerms' ? false : '';
            errors[key] = false;
        });
    } else {
        notifyUser('Please fill in all required fields correctly.');
    }
};
</script>

<template>
    <Toast ref="toastRef" />
    <form @submit.prevent="handleSubmit">
        <div class="name-group">

            <FormGroup id="firstName" label="First Name *" v-model="form.firstName" :error="errors.firstName"
                error-message="First name is required" @blur="validateField('firstName')" />

            <FormGroup id="lastName" label="Last Name *" v-model="form.lastName" :error="errors.lastName"
                error-message="Last name is required" @blur="validateField('lastName')" />
        </div>

        <FormGroup id="email" label="Email *" v-model="form.email" type="email" :error="errors.email"
            :error-message="emailErrorMessage" @blur="validateField('email')" />

        <FormGroup id="telephone" label="Telephone" v-model="form.telephone" type="tel" />



        <TextareaField id="message" label="Message" v-model="form.message" rows="4" wrapper-class="form-group"
            :error="errors.agreeTerms" />

        <p class="required-note">* required fields</p>


        <CheckboxGroup id="terms" v-model="form.agreeTerms" wrapper-class="checkbox-group">

            I agree to the <a href="#" class="terms-link" style="color: #fff;">Terms & Conditions</a>

        </CheckboxGroup>

        <div class="form-actions">
            <BasicButton type="submit" :disabled="false" class="submit-button"
                style="padding: 0.8rem 6rem; font-size: 1rem; float: right; text-transform: uppercase; font-weight: 500;">
                Submit
            </BasicButton />
        </div>


    </form>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

form {
    width: 100%;

    .name-group {
        display: flex;
        gap: 1rem;

        .form-group {
            flex: 1;
        }
    }

    .required-note {
        margin-top: 0rem;
        font-weight: 500;
        font-size: 1.2rem;
        color: $font-gray;
    }

    .form-actions {
        @media screen and (max-width: 900px) {
            display: flex;
            flex-direction: column;
            align-items: center;

        }
    }
}
</style>