<template>
    <div class="regis grid grid-cols-2 p-20 pl-24 h-1/3">
        <Header />
        <div class="img w-2/3 bg-white m-28 shadow-md">
            <img src="/src/assets/img/ResumeChecking2.jpg" class="" alt="" />
        </div>
        <div class="form my-28 mx-12 bg-white shadow-md p-12 w-2/3">
            <h2 class="text-3xl font-bold text-center mb-12">Đăng ký tài khoản</h2>

            <div class="mb-4">
                <input type="email" v-model="name" @blur="validateName" :class="`w-full px-3 py-2 border rounded-md focus:outline-none ${
            nameError
              ? 'border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }`" placeholder="Họ và tên" />
                <p v-if="nameError" class="text-red-500 text-sm p-1">
                    {{ nameError }}
                </p>
            </div>
            <div class="mb-4">
                <input type="text" v-model="phone" @blur="validatePhone" :class="`w-full px-3 py-2 border rounded-md focus:outline-none ${
            phoneError
              ? 'border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }`" placeholder="Điện thoại" />
                <p v-if="phoneError" class="text-red-500 text-sm p-1">
                    {{ phoneError }}
                </p>
            </div>
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
                <select name="role" id=""
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-500">
                    <option value="student" class="p-4">Ứng viên tìm việc</option>
                    <option value="teacher" class="p-4">Nhà tuyển dụng</option>
                </select>
            </div>

            <div class="mb-4">
                <input :type="showPassword ? 'text' : 'password'" v-model="password" @blur="validatePassword" :class="`w-full px-3 py-2 border rounded-md focus:outline-none ${
        passwordError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
      }`" placeholder="Mật khẩu" />
                <p v-if="passwordError" class="text-red-500 text-sm p-1">{{ passwordError }}</p>
                <button class="absolute right-4 top-4 focus:outline-none" @click="togglePasswordVisibility">
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 8a9 9 0 01-9-9m9 9a9 9 0 009-9m-9 9h9m-9-9a9 9 0 019-9m-9 9a9 9 0 00-9 9h9z" />
                    </svg>

                </button>
            </div>
            <button @click="validateForm"
                class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Đăng ký
            </button>
            <p class="mt-4 text-center">
                Đã có tài khoản?
                <a href="/login" class="text-blue-500 hover:text-blue-700">Đăng Nhập</a>
            </p>
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
            name: "",
            phone: "",
            email: "",
            password: "",
            nameError: "",
            phoneError: "",
            emailError: "",
            passwordError: "",
        };
    },
    methods: {
        validateForm() {
            this.validateEmail();
            this.validatePassword();
            this.validateName();
            this.validatePhone();
            if (
                this.emailError ||
                this.passwordError ||
                this.nameError ||
                this.phoneError
            ) {
                return;
            }
            this.submitForm();
        },
        validateName() {
            if (this.name === "") {
                this.nameError = "Vui lòng nhập họ và tên.";
            } else {
                this.nameError = "";
            }
        },
        validatePhone() {
            if (this.phone === "") {
                this.phoneError = "Vui lòng nhập số điện thoại.";
            } else if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(this.phone)) {
                this.phoneError = "Số điện thoại không hợp lệ.";
            } else {
                this.phoneError = "";
            }
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
