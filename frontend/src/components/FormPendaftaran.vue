<template>
  <div>
    <main class="font-poppins">
      <div class="flex items-center justify-between mb-8">
        <div class="flex justify-between items-center">
          <h1 class="font-bold text-slate-800 text-4xl py-2">
            Form Pendaftaran
          </h1>
        </div>
      </div>

      <section class="w-full flex justify-center">
        <form @submit.prevent="addData" class="w-[80%]">
          <div class="modal bg-white w-full p-6 rounded-xl shadow-lg">
            <h3 class="text-2xl font-semibold mb-3">Pendaftaran</h3>
            <div class="flex flex-col gap-2 mb-2">
              <div class="w-full">
                <h1 class="text-[24px] mb-4">Nama</h1>
                <input
                  type="text"
                  placeholder="Nama"
                  v-model="input_nama"
                  class="input-field px-5 py-3 w-full bg-slate-300 text-black rounded-lg"
                />
              </div>
              <div class="w-full">
                <h1 class="text-[24px] mb-4">Email</h1>
                <input
                  type="text"
                  placeholder="Email"
                  v-model="input_email"
                  class="input-field px-5 py-3 w-full bg-slate-300 text-black rounded-lg"
                />
              </div>
              <div class="w-full">
                <h1 class="text-[24px] mb-4">Alamat</h1>
                <input
                  type="text"
                  placeholder="Alamat"
                  v-model="input_alamat"
                  class="input-field px-5 py-3 w-full bg-slate-300 text-black rounded-lg"
                />
              </div>
              <div class="w-full">
                <h1 class="text-[24px] mb-4">Status</h1>
                <select
                  v-model="status"
                  class="input-field px-5 py-3 w-full bg-purple-500 text-white rounded-lg"
                >
                  <option value="waiting">waiting</option>
                  <option value="rejected">rejected</option>
                  <option value="accept">accept</option>
                </select>
              </div>
              <div class="flex gap-3">
                <button
                  @click="addData"
                  class="button-primary w-1/2 input-field p-3 bg-blue-500 text-white rounded-lg"
                >
                  Submit
                </button>
                <button
                  @click="showModal = false"
                  class="button-secondary w-1/2 input-field p-3 bg-red-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import api from "../api/api";

export default {
  data() {
    return {
      showModal: false,
      name: "",
      date: "",
      time: "",
      week: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Frid", "Sat"],
      input_nama: "",
      input_email: "",
      input_alamat: "",
      status: "waiting",
      form: [],
    };
  },
  computed: {
    filteredUnfinishedform() {
      return this.form.filter((form) => form.status !== "accept");
    },
    acceptform() {
      return this.form.filter((form) => form.status === "accept");
    },
  },
  methods: {
    async fetchDataFromBackend() {
      try {
        const formList = await api.GetStatus();
        this.form = formList;
      } catch (error) {
        console.error("Failed to fetch form list:", error);
      }
    },

    async addData() {
      if (this.input_nama.trim() === "") {
        return;
      }

      const newFormData = {
        nama: this.input_nama,
        email: this.input_email,
        alamat: this.input_alamat,
        status: this.status,
      };

      try {
        const response = await api.AddForm(newFormData);
        await api.createForm(newFormData);
        if (response) {
          const current_date = new Date();
          const timestamp_date = current_date.toDateString();

          const timestamp_time =
            this.zeroPadding(current_date.getHours(), 2) +
            ":" +
            this.zeroPadding(current_date.getMinutes(), 2) +
            ":" +
            this.zeroPadding(current_date.getSeconds(), 2);

          const newForm = {
            nama: this.input_nama,
            email: this.input_email,
            alamat: this.input_alamat,
            status: this.status,
            timestamp_date: timestamp_date,
            timestamp_time: timestamp_time,
          };

          this.form.push(newForm);

          if (this.status === "waiting" || this.status === "rejected") {
            this.filteredUnfinishedform.push(newForm);
          }

          this.input_nama = "";
          this.input_email = "";
          this.input_alamat = "";
          alert('sukses aja yaa huhu')
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to add Data:", error);
      }
    },

    updateTime() {
      const current_date = new Date();
      this.date =
        this.week[current_date.getDay()] +
        ", " +
        this.zeroPadding(current_date.getDate(), 2) +
        " - " +
        this.zeroPadding(current_date.getMonth() + 1, 2) +
        " - " +
        this.zeroPadding(current_date.getFullYear(), 4);

      this.time =
        this.zeroPadding(current_date.getHours(), 2) +
        ":" +
        this.zeroPadding(current_date.getMinutes(), 2) +
        ":" +
        this.zeroPadding(current_date.getSeconds(), 2);
    },
    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
  mounted() {
    this.updateTime();
    this.fetchDataFromBackend();
  },
};
</script>
