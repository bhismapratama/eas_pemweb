<template>
    <div class="flex justify-center items-center mt-20">
      <div class="p-4 w-1/2">
        <h2 class="text-2xl font-bold text-gray-700 mb-4 flex items-center">
          <div @click="$router.go(-1)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                class="cursor-pointer"
              />
            </svg>
          </div>
          Edit TODO List
        </h2>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <label class="text-gray-700 font-semibold">Category</label>
            <select
              v-model="inputNewCategory"
              class="border-2 py-1 border-gray-400 rounded-md"
            >
              <option
                v-for="category in todoStore.categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 font-semibold">Title</label>
            <input
              v-model="inputNewTitle"
              class="border rounded-md px-3 py-2 border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 font-semibold">Date</label>
            <input
              v-model="inputNewDate"
              class="border rounded-md px-3 py-2 border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button
          @click="updateTodo(this.id)"
          class="px-4 py-2 mt-4 bg-gray-700 text-gray-100 font-bold text-sm rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { todoStore } from "../store/crud.js";
  export default {
    data() {
      return {
        todoStore,
        id: this.$route.params.id,
        inputNewCategory: "",
        inputNewTitle: "",
        inputNewDate: "",
      };
    },
    methods: {
      getTodoById() {
        const todo = this.todoStore.todos.find(
          (todo) => todo.id === parseInt(this.id) || todo.id === this.id
        );
        if (todo) {
          this.inputNewCategory = todo.category;
          this.inputNewTitle = todo.title;
          this.inputNewDate = todo.date;
        }
      },
      updateTodo(index) {
        const updatedTodo = {
          id: index,
          category: this.inputNewCategory,
          title: this.inputNewTitle,
          date: this.inputNewDate,
        };
        todoStore.editTodo(updatedTodo);
        this.$router.push("/");
      },
    },
    mounted() {
      this.getTodoById();
    },
  };
  </script>
  