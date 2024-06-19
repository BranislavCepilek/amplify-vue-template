<script setup lang="ts">
import '@/assets/main.css';
import { onMounted, ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { downloadKatalog } from '../../amplify/storage/resource';

const client = generateClient<Schema>();

// create a reactive reference to the array of todos
const todos = ref<Array<Schema['Todo']["type"]>>([]);

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      todos.value = items
     },
  }); 
}

function createTodo() {
  client.models.Todo.create({
    content: window.prompt("Todo content")
  }).then(() => {
    // After creating a new todo, update the list of todos
    listTodos();
  });
}
    
// fetch todos when the component is mounted
 onMounted(() => {
  listTodos();
});
  
function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

</script>

<template>
  <main>
    <h1>My todos</h1>
    <button @click="createTodo">+ new</button>
    <ul>
      <li 
        v-for="todo in todos" 
        :key="todo.id"
        @click="deleteTodo(todo.id)"
      >
        {{ todo.content }}
      </li>
    </ul>
    <div>
      🥳 App successfully hosted. Try creating a new todo.
      <br />
      <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
        Review next steps of this tutorial.
      </a>
      <a href="https://amplify-d3m7uyooyhwzua-ma-amplifyuniledstoragebuck-0bncelqsi9ag.s3.eu-central-1.amazonaws.com/UNILED_katalog_2024.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAV4MUG6FQESLTHAP5%2F20240619%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240619T150941Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJGMEQCICHX%2F88L3ct0uOIL3X%2Fheron76opqBQWX7NeC%2FV9dNgWAiAo4xmJjtFwqbWx3%2FNVAop9u5%2F8qawEoAd%2By4UBT%2B5P9SqNAwgwEAEaDDQwNDU3NDYzMDI0MCIM3OD87tz4oNtiWTN0KuoCQKFrNvdgeWy2Zv89JOByXfYGucxzJHgOs2b3Gam51XUpJ5K1tQm1fjWP18TVHdgWWzRBLk3zejeRbIcyWPu74ESr2BjIANeRTk2X35lWwSDoenGq%2FkbE9nk9okmXhDwdur%2FfO3ETrMt905wW2FiP%2BI%2B1RbfCN2Ek16DBmMPrxZn03%2FZw2NnjXPD2jfrw66ZE0SsbO3lnuaFWFNArf0bnNmADFNZqu7XJLM2wX4Pd6J0FTI%2B3Q3wyZSpVS3aW%2Fv%2B%2F0YjV7bOHclYVh3SCz%2FLWb9SiQvh73U1p2tnBhopRhAn2Rpgj7MyBx2q1vod%2FuAsb%2BYaGyhwfRk1lRfhS5gCgID9mmHDDJ0TmDdg5bOAYsmmzDY94gEa63ucdvHN5ihucPrIHEegkT5fqxxWnmPdoDp1X2CqeMIpbWsWAtremSqE%2F%2BqbZEiwB2GdWDF7csb%2BOOgZmuwC14nw3QXiqeycVqNrUmGnSgkVPbBUw%2BeTJswY6tALllIWVokUbSElQOnqqJsdyFPpbCasHum5u%2Fvvmp4XrPqi445Oxj5Mei67coWT6X9o70ZuTa9FrEe7CKo%2BQYSvz%2BZpncHnQ3M7RkVTrEVf3%2BQrbOwpc4hbLBl%2BYyjcuWhMD9SHmNbNNh06IiZ3vFc2CK1GyF4Lplq%2BIHcJ%2B52hW4pNMvkqKMVVAL%2BxaCajAap9ChXJnOnQWjAYVthru%2BhFh9XtIJrJh6jXMtdjGniAtACEA0qhoquabl24By7Ur49GaYQgWGL%2BTpz%2FSxPyd3LHeoVYiqyEFJHHRXgfzMS6FwYea99815Ra9Z4IoJdx9Q1IA5mCGPadRpmhUYVmzZ3fRJShTn1Vaw%2B30G12%2BieRM8tEUsRJX%2FOGybeIW7jfOnY3P%2BhSzjGYjBBzSwnxyelMPLxX7EQ%3D%3D&X-Amz-Signature=7c72b14990e333d80eb6ca1a2e95c864d38ded57edf64a10a3a166c0ddcf1b7b&X-Amz-SignedHeaders=host&x-id=GetObject">
        Download UNILED katalog pre rok 2024 priamo cez link
      </a>
      <div>
        <button v-on:click="downloadKatalog()">Download katalog with function downloadKatlog</button>
      </div>
    </div>
  </main>
</template>
