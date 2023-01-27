<script setup lang="ts">
import type { Quill } from '@vueup/vue-quill'
import { QuillEditor } from '@vueup/vue-quill'
const quill = ref<Quill>()
const editorRef = ref<typeof QuillEditor>()
const editorContent = ref('')

const route = useRoute()
watch(route, (val) => {
  console.log(val.meta)
  console.log(val.params)
}, { immediate: true })

function handleReady(q: Quill) {
  quill.value = q
}
</script>

<template>
  <div>
    <p>
      {{ route.meta }}
    </p>
    <QuillEditor
      ref="editorRef" v-model:content="editorContent" theme="snow"
      content-type="html"
      placeholder="请输入内容..."
      @ready="handleReady"
    />
  </div>
</template>

<style scoped>

</style>
