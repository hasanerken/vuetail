<template>
  <div
    class="w-11/12 md:w-1/3 bg-white absolute top-24 sm:mx-auto sm:my-auto rounded-3xl shadow-4xl border-4 border-indigo-50"
  >
    <div class="flex flex-row justify-between items-center">
      <div class="px-4 p-1 text-black-900 font-extrabold text-xl">GİRİŞ</div>
      <div class="flex justify-end cursor-pointer">
        <mdi-close
          class="text-gray-700 font-extrabold hover:text-gray-900 text-2xl m-4"
          @click="$emit('close')"
        />
      </div>
    </div>
    <div class="p-4">
      <label for="phone" class="text-gray-900 font-extrabold"
        >Telefon No:</label
      >
      <input
        v-model="phoneNumber"
        type="number"
        class="w-full text-2xl text-blue-800 font-extrabold p-2 bg-transparent focus:outline-none border-b focus:border-b-2 focus:border-indigo-200 border-indigo-50"
        name="phone"
      />
      <div class="text-gray-600 text-xs p-1">
        Başında Sıfır Olmadan Giriniz.
      </div>
    </div>
    <div class="flex items-center justify-around p-2">
      <div
        @click="sendOtp"
        class="m-1 text-center cursor-pointer bg-gray-200 inline-flex p-4 sm:px-10 text-sm rounded-md font-semibold hover:bg-gray-300 transition duration-300 ease-in-out"
      >
        SMS GÖNDER
      </div>
      <div
        @click="sendOtp"
        class="m-1 text-center cursor-pointer bg-gray-900 inline-flex p-4 sm:px-10 text-sm rounded-md font-semibold text-gray-200 hover:bg-gray-700 transition duration-300 ease-in-out"
      >
        KODU TEKRARLA
      </div>
    </div>
    <div id="recaptcha-container"></div>
    <div class="p-4">
      <label for="code" class="text-gray-900 font-extrabold">SMS Kodu:</label>
      <input
        v-model="otp"
        ref="code"
        type="number"
        class="w-full text-2xl text-blue-800 font-extrabold p-2 bg-transparent focus:outline-none border-b focus:border-b-2 focus:border-indigo-200 border-indigo-0"
        name="code"
      />
    </div>
    <div class="flex items-center text-center p-2 px-10 m-2">
      <div
        @click="verifyOtp"
        class="bg-pink-500 hover:bg-pink-600 cursor-pointer w-full text-center p-4 rounded-md font-semibold text-gray-50 transition duration-300 ease-in-out"
      >
        GİRİŞ
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db, firebase } from "../directives/firebase";
import Swal from "sweetalert2/dist/sweetalert2.js";
export default {
  emits: ["close"],
  data() {
    return {
      phoneNumber: "",
      appVerifier: "",
      otp: "",
      acceptTerms: false,
      showCodeSent: false,
      openLogin: false
    };
  },
  methods: {
    showAgreement() {
      /* this.$q
        .dialog({
          title: "Kullanıcı Sözleşmesi ve Rıza Bildirimi",
          message:
            "Bu sözleşmeyi kabul etmek suretiyle, kişisel verilerinizin (telefon numarası ve kullanıcı şifresi) işlenmesine ve Firebase Avrupa sunucularında tutulmasına izin vermiş olmaktasınız. Bu kuruluşun hizmet şartlarındaki değişiklikler hizmet sunumunu etkileyebileceği gibi ücret değişikliklerine ya da hizmet sunumunun iptaline de neden olabilecektir. Kullanıcı hesabınız menunuzburada.com tarafından hiçbir bildirim olmaksızın kapatılabilir. Kullanıcı bu durumu kabul ettiğini beyan etmektedir.",
          ok: {
            label: "KABUL EDİYORUM",
            color: "red-14"
          }
        })
        .onOk(() => (this.acceptTerms = true)); */
    },
    sendOtp() {
      if (this.phoneNumber.length != 10) {
        //alert("Invalid Phone Number Format !");
        console.log("Hatalı ya da eksik telefon girdiniz.");
        Swal.fire(
          {
            text: "Hatalı ya da eksik telefon numarası girdiniz.",
            showConfirmButton: false
          }
        );
      } else {
        //
        let countryCode = "+90"; //Turkey
        let phoneNumber = countryCode + this.phoneNumber;
        //
        let appVerifier = this.appVerifier;
        //
        auth
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            //
            console.log("Giriş kodu vermiş olduğunuz telefona gönderilmiştir.");
            Swal.fire({
              text: "Giriş kodu vermiş olduğunuz telefona gönderilmiştir.",
              showConfirmButton: false
            });
          })
          .catch(function (error) {
            // Error; SMS not sent
            // ...
            console.log(error);
            console.log("Doğrulama kodu gönderilememiştir.");
            Swal.fire({
              text: "Doğrulama kodu gönderilememiştir.",
              showConfirmButton: false
            });
          });
      }
    },
    //
    verifyOtp() {
      if (this.phoneNumber.length != 10 || this.otp.length != 6) {
        console.log("Geçersiz telefon numarası/SMS kodu girilmiştir.");
        Swal.fire({
          text: "Geçersiz telefon numarası/SMS kodu girilmiştir.",
          showConfirmButton: false
        });
      } else {
        //
        let vm = this;
        let code = this.otp;
        //
        window.confirmationResult
          .confirm(code)
          .then((result) => {
            console.log(result);
            this.$emit('close')

            //route to set password !
           


            vm.$router.push({ path: "/menus/" + auth.currentUser.uid });
          })
          .catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error);
          });
      }
    },
    initReCaptcha() {
      setTimeout(() => {
        // eslint-disable-next-line no-unused-vars
        let vm = this;
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function (response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
              console.log(response);
            },
            "expired-callback": function () {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    }
  },
  created() {
    this.initReCaptcha();
    auth.languageCode = "tr";
  }
};
</script>

<style lang="postcss" scoped></style>
