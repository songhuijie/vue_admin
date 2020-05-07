<template>
  <div class="components-container">
    <aside>
      普通教师整体介绍
    </aside>
    <el-button type="primary" @click="edit()">编辑</el-button>
    <el-button type="primary" @click="push()">发布</el-button>
    <div>
      <tinymce v-show="status" v-model="contentFrom.content" :height="300" />
    </div>
    <div class="editor-content" v-html="contentFrom.content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { fetchInfo, updateContact } from '@/api/other/contact/contact'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      status: false,
      contentFrom: {
        content: ''
      }

    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      fetchInfo(this.listQuery).then(response => {
        this.$notify({
          code: 20000,
          data: {
            content: `<h1 style="text-align: center;">Welcome to the 普通教师整体介绍 demo!</h1>
          <ul>
          普通教师整体介绍      
          </ul>`
          }

        })
        this.contentFrom.content = response.data.content
      })
        .catch(response => {
          this.$notify({
            code: 20000,
            data: {
              content: `<h1 style="text-align: center;">Welcome to the 普通教师整体介绍 demo!</h1>
          <ul>
          普通教师整体介绍      
          </ul>`
            }

          })
          this.contentFrom.content = response.data.content
        })
    },
    edit() {
      console.log('变为true')
      this.status = true
    },
    push() {
      updateContact(this.contentFrom).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
        this.status = false
      })
        .catch(() => {
          this.status = false
        })
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
.none{
  display: none;
}
.block{
  display: block;
}
</style>
