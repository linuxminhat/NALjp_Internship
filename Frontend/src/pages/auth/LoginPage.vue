<template>
    <div class="w-screen">
        <Header class="fixed z-50 bg-white" />
        <h1 class="mt-24 mx-24 text-4xl font-bold">Đăng nhập để bắt đầu</h1>
        <div class="grid grid-cols-2 gap-4 m-10 mt-20 ml-24 h-full w-full">
            <div class="img w-2/3 ml-24 rounded-md shadow-lg">
                <img src="/src/assets/img/ResumeChecking.jpg" alt="" />
            </div>

            <div class="p-6 bg-white rounded shadow-md w-1/2">
                <h2 class="text-3xl font-bold text-center my-16">Đăng nhập</h2>

                <div class="mb-4">
                    <input type="email" v-model="email" @blur="validateEmail" :class="`w-full px-3 py-2 border rounded-md focus:outline-none ${
              emailError
                ? 'border-red-500'
                : 'border-gray-300 focus:border-blue-500'
            }`" placeholder="Email" />
                    <p v-if="emailError" class="text-red-500 text-sm p-1">
                        {{ emailError }}
                    </p>
                </div>
                <div class="mb-4">
                    <input type="password" v-model="password" @blur="validatePassword" :class="`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500focus:outline-none ${
              passwordError
                ? 'border-red-500'
                : 'border-gray-300 focus:border-blue-500'
            }`" placeholder="Mật khẩu" />
                    <p v-if="passwordError" class="text-red-500 text-sm p-1">
                        {{ passwordError }}
                    </p>
                    <button class="absolute right-4 top-4 focus:outline-none" @click="togglePasswordVisibility">
                        <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 8a9 9 0 01-9-9m9 9a9 9 0 009-9m-9 9h9m-9-9a9 9 0 019-9m-9 9a9 9 0 00-9 9h9z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 8a9 9 0 01-9-9m9 9a9 9 0 009-9m-9 9h9m-9-9a9 9 0 019-9m-9 9a9 9 0 00-9 9h9z" />
                        </svg>
                    </button>
                </div>
                <p class="text-right text-blue-500 hover:text-blue-700 cursor-pointer pb-2">
                    Quên mật khẩu?
                </p>
                <button @click="validateForm"
                    class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Đăng nhập
                </button>
                <p class="mt-4 text-center">
                    Bạn chưa có tài khoản?
                    <a href="/register" class="text-blue-500 hover:text-blue-700">Đăng ký</a>
                </p>
            </div>
        </div>
    </div>
    <router-view />
</template>

<script>
import Header from "../../components/header/Header.vue";
export default {
    components: { Header },
    data() {
        return {
            email: "",
            password: "",
            emailError: "",
            passwordError: "",
        };
    },
    methods: {


        validateForm() {
            this.validateEmail();
            this.validatePassword();
            if (this.emailError || this.passwordError) {
                return;
            }
            this.submitForm();
            this.$router.push('/student/schedule');

        },
        validateEmail() {
            if (this.email === "") {
                this.emailError = "Vui lòng nhập email.";
            } else if (!/\S+@\S+\.\S+/.test(this.email)) {
                this.emailError = "Định dạng email không hợp lệ.";
            } else {
                this.emailError = "";
            }
        },
        validatePassword() {
            if (this.password === "") {
                this.passwordError = "Vui lòng nhập mật khẩu.";
            } else if (this.password.length < 6) {
                this.passwordError = "Mật khẩu phải có ít nhất 6 ký tự.";
            } else {
                this.passwordError = "";
            }
        },
        submitForm() { },
    },
};
</script>

<style>
.w-screen {
  overflow-x: hidden;
}
</style>
