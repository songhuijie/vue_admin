<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button> -->
      <el-input v-model="listQuery.title" placeholder="编号标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.is_relation_home" placeholder="关联首页" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in RelationHomeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.is_relation_rotation" placeholder="关联轮播图" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in RelationRotationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.is_relation_memorabilia" placeholder="关联大事记" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in RelationMemorabiliaOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="reset">
        重置
      </el-button>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')"> -->
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="110px">
        <template slot-scope="{row}">
          <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.type }}</span> -->
          <!-- <el-tag>{{ row.title }}</el-tag> -->
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面图" width="150px" align="center">
        <template slot-scope="{row}">
          <img :src="row.cover" class="pan-img">
        </template>
      </el-table-column>
      <el-table-column label="是否关联到首页" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.is_relation_home | statusFilter">
            {{ row.is_relation_home | relationFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否关联到轮播图" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.is_relation_rotation | statusFilter">
            {{ row.is_relation_rotation | relationFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否关联到大事记" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.is_relation_memorabilia | statusFilter">
            {{ row.is_relation_memorabilia | relationFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="编辑时间" align="center" width="95">

        <template slot-scope="{row}">
          <span>{{ row.updated_at }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.is_relation_home == 0 " type="primary" size="mini" @click="handleChangeStatus(row,1,1)">
            关联首页
          </el-button>
          <el-button v-if="row.is_relation_home == 1" size="mini">
            关联首页
          </el-button>
          <el-button v-if="row.is_relation_rotation == 0 " type="primary" size="mini" @click="handleChangeStatus(row,1,2)">
            关联轮播图
          </el-button>
          <el-button v-if="row.is_relation_rotation == 1" size="mini">
            关联轮播图
          </el-button>
          <el-button v-if="row.is_relation_memorabilia == 0 " type="primary" size="mini" @click="handleChangeStatus(row,1,3)">
            关联大事记
          </el-button>
          <el-button v-if="row.is_relation_memorabilia == 1 " size="mini">
            关联大事记
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">

        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input v-model="temp.content" />
        </el-form-item>

        <el-form-item label="上传图片" prop="cover">
          <el-upload ref="upload" label="上传图片" action="" :auto-upload="false" :on-change="changeUpload" accept="image/jpeg,image/gif,image/png,image/bmp">
            <div size="small" class="upload_btn"><div style="height:40px" /><i class="iconfont icon-jiahao" /><p style="line-height:0">上传图片</p></div>
            <img :src="defaultImageUrl" alt="图片">
          </el-upload>
          <el-input v-model="temp.cover" type="hidden" class="hiddens" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createResearch, updateResearch, deleteResearch } from '@/api/home/research/research'
import { uploadImage } from '@/api/upload/upload'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const TypeOptions = [
  { key: 1, display_name: '护理系' },
  { key: 2, display_name: '临床医学系' },
  { key: 3, display_name: '医学技术系' },
  { key: 4, display_name: '药学系' },
  { key: 5, display_name: '计算机中心' },
  { key: 6, display_name: '实训中心' }
]

const RelationHomeOptions = [
  { key: '', display_name: '全部' },
  { key: 1, display_name: '关联' },
  { key: 0, display_name: '不关联' }
]

const RelationRotationOptions = [
  { key: '', display_name: '全部' },
  { key: 1, display_name: '关联' },
  { key: 0, display_name: '不关联' }
]

const RelationMemorabiliaOptions = [
  { key: '', display_name: '全部' },
  { key: 1, display_name: '关联' },
  { key: 0, display_name: '不关联' }
]
// 1  is_relation_home  2 is_relation_rotation   3 is_relation_memorabilia   4 is_relation_list
// arr to obj, such as { CN : "China", US : "USA" }
const TypeKeyValue = TypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const RelationKeyValue = RelationHomeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return TypeKeyValue[type]
    },
    relationFilter(type) {
      return RelationKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        is_relation_home: undefined,
        is_relation_rotation: undefined,
        is_relation_memorabilia: undefined
      },
      TypeOptions,
      RelationHomeOptions,
      RelationRotationOptions,
      RelationMemorabiliaOptions,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        title: '',
        content: '',
        cover: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        title: [{ required: true, message: 'title is required', trigger: 'blur' }],
        content: [{ required: true, message: 'content is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      defaultImageUrl: 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        response = this.$notify({
          code: 20000,
          data: {
            total: 3,
            items: [
              { 'id': 1, 'number': 'YW_abc12345678', 'title': '科研管理1', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png', 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'is_relation_home': 0, 'is_relation_rotation': 0, 'is_relation_memorabilia': 0, 'content': '内容' },
              { 'id': 2, 'number': 'YW_abc12345678', 'title': '科研管理2', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png', 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'is_relation_home': 1, 'is_relation_rotation': 1, 'is_relation_memorabilia': 1, 'content': '内容' },
              { 'id': 3, 'number': 'YW_abc12345678', 'title': '科研管理3', 'cover': '', 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'is_relation_home': 0, 'is_relation_rotation': 1, 'is_relation_memorabilia': 1, 'content': '内容' }
            ]

          }

        })
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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

        this.temp.cover = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
        this.defaultImageUrl = 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
      })
        .catch(response => {
          this.temp.cover = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
          this.defaultImageUrl = 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'

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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleChangeStatus(row, status, key) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      switch (key) {
        case 1:
          row.is_relation_home = status
          break
        case 2:
          row.is_relation_rotation = status
          break
        case 3:
          row.is_relation_memorabilia = status
          break
        case 4:
          row.is_relation_list = status
          break
        default:
          break
      }
      updateResearch(row, row.id).then(() => {
        this.$notify({
          title: 'Success',
          message: '更新成功',
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
      console.log(name)
    },
    handleModifyStatus(row, status) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteResearch(row.id)
          this.rolesList.splice(status, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },

    reset() {
      this.listQuery.is_relation_home = undefined
      this.listQuery.is_relation_rotation = undefined
      this.listQuery.is_relation_memorabilia = undefined
      this.listQuery.title = undefined
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
        //   this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
        //   this.temp.author = 'vue-element-admin'

          createResearch(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateResearch(tempData, tempData.id).then(() => {
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
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      console.log(row, index)
      this.list.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-button--mini{
    width: auto;
  }
</style>
