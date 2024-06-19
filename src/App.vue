<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { getUrl } from 'aws-amplify/storage';

import Todos from './components/Todos.vue';

const linkToStorageFile = await getUrl({
  path: 'UNILED_katalog_2024.pdf',
  options: {
    validateObjectExistence: false,
    expiresIn: 20,
    useAccelerateEndpoint: true,
  },
});
console.log('signed URL: ', linkToStorageFile.url);
console.log('URL expires at: ', linkToStorageFile.expiresAt);

</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hell {{ user?.signInDetails?.loId }}'s todos'</h1>
        <Todos />
        <button @click="signOut">Sign Out</button>
        <div>
          <a href={linkToStorageFile.url.toString()} target="_blank" rel="noreferrer">
            {filename}
          </a>
        </div>
      </template>
    </authenticator>
  </main>
</template>

