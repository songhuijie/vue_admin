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
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button> -->
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
      @sort-change="sortChange"
    >
      <!-- <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')"> -->
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号" min-width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顶部图" width="200" align="center">
        <template slot-scope="{row}">
          <img :src="row.cover" alt="图片">
        </template>
      </el-table-column>
      <el-table-column label="编辑时间" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.updated_at }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 70%; margin-left:50px;">

        <el-form-item label="上传顶部图" prop="cover">
          <el-upload ref="upload" label="上传图片" action="" :auto-upload="false" :on-change="changeUpload" accept="image/jpeg,image/gif,image/png,image/bmp">
            <div size="small" class="upload_btn"><div style="height:40px" /><i class="iconfont icon-jiahao" /><p style="line-height:0">上传图片</p></div>
          </el-upload>
          <el-input v-model="temp.cover" type="hidden" class="hiddens" />
        </el-form-item>

        <el-form-item label="预览图" prop="">
          <img :src="temp.cover">
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          完成
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, updateFacultyCover } from '@/api/top_navigation/faculty/faculty'
import { uploadImage } from '@/api/upload/upload'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const TypeOptions = [
  { key: 1, display_name: '校园简史' },
  { key: 2, display_name: '校训校风' },
  { key: 3, display_name: '历史沿革' },
  { key: 4, display_name: '现任领导' }

]

// arr to obj, such as { CN : "China", US : "USA" }
const TypeKeyValue = TypeOptions.reduce((acc, cur) => {
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
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return TypeKeyValue[type]
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
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      TypeOptions,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
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
        cover: [{ required: true, message: 'cover is required', trigger: 'blur' }]
      },
      downloadLoading: false
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
              { 'id': 1, 'number': 'YW_abc12345678', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png', 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11' }
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
      })
        .catch(response => {
          this.temp.cover = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'

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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
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
      // 添加逻辑
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
          updateFacultyCover(tempData, tempData.id).then(() => {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.dialogFormVisible = false
          })
            .catch(() => {
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.dialogFormVisible = false
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
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
