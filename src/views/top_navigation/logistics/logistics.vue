<template>
  <div class="components-container">
    <aside>
      后勤中心管理
    </aside>
    <el-button type="primary" @click="edit()">编辑</el-button>
    <el-button type="primary" @click="push()">发布</el-button>
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handlePicUpdate">
      上传顶部图片
    </el-button>
    <div>
      <tinymce v-show="status" v-model="contentFrom.content" :height="300" />
    </div>
    <div class="editor-content" v-html="contentFrom.content" />

    <el-dialog :title="textMapPic[dialogPicStatus]" :visible.sync="dialogPicFormVisible">
      <el-form ref="dataFormPic" :rules="rules" :model="tempPic" label-position="left" label-width="70px" style="width: 80%; margin-left:50px;">

        <el-form-item label="上传顶部图片" prop="top_pic">
          <el-upload ref="upload" label="上传图片" action="" :auto-upload="false" :on-change="changeUpload" accept="image/jpeg,image/gif,image/png,image/bmp">
            <div size="small" class="upload_btn"><div style="height:40px" /><i class="iconfont icon-jiahao" /><p style="line-height:0">上传图片</p></div>
            <img :src="defaultImageUrl" alt="图片">
          </el-upload>
          <el-input v-model="tempPic.top_pic" type="hidden" class="hiddens" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPicFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogPicStatus==='create'?createData():updatePicData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import Tinymce from '@/components/Tinymce'
import { fetchInfo, updateLogistics, updatePic } from '@/api/top_navigation/logistics/logistics'
import { uploadImage } from '@/api/upload/upload'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      status: false,
      contentFrom: {
        content: ''
      },
      tempPic: {
        id: undefined,
        top_pic: ''
      },
      dialogPicFormVisible: false,
      dialogPicStatus: '',
      textMapPic: {
        update: '上传图片',
        create: 'Create'
      },
      rules: {
        top_pic: [{ required: true, message: 'top_pic is required', trigger: 'blur' }]
      },
      defaultImageUrl: 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'

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
            content: `<h1 style="text-align: center;">Welcome to the 后勤中心管理 demo!</h1>
          <ul>
          后勤中心管理      
          </ul>`
          }
        })
        this.contentFrom.content = response.data.content
      })
        .catch(response => {
          this.$notify({
            code: 20000,
            data: {
              content: `<h1 style="text-align: center;">Welcome to the 后勤中心管理 demo!</h1>
          <ul>
          后勤中心管理      
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
      updateLogistics(this.contentFrom).then(() => {
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
    },
    changeUpload(file) {
      // 上传图片
      console.log('上传逻辑')
      console.log(file)
      uploadImage(file).then(response => {
        // response = this.$notify({
        //   title: 'Success',
        //   message: '更新成功',
        //   type: 'success',
        //   data: {
        //     'url':'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png',
        //     'path':'/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png',
        //   }
        // })

        // console.log(2);
        // console.log(response.data.url);
        this.tempPic.top_pic = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
        this.temp.cover = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
      })
        .catch(response => {
          this.temp.cover = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
          this.tempPic.top_pic = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'

          // response = this.$notify({
          //   title: 'Success',
          //   message: 'Update Successfully',
          //   type: 'success',
          //   data: {
          //     'url':'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png',
          //     'path':'/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png',
          //   }
          // })
          // console.log(1);
          // console.log(response.data.url);
          // this.temp.cover = response.data.path;
          // this.defaultImageUrl = response.data.url;
        })
    },
    handlePicUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogPicStatus = 'update'
      this.dialogPicFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataFormPic'].clearValidate()
      })
    },
    updatePicData() {
      console.log(1)
      this.$refs['dataFormPic'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.tempPic)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updatePic(tempData).then(() => {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
            .catch(() => {
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            })
        }
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
