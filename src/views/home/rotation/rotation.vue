<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="编号标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.enable" placeholder="Enable" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in EnableOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in TypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="reset">
        重置
      </el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
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
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" min-width="90">
        <template slot-scope="{row}">
          <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.type }}</span> -->
          <span>{{ row.type | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面图" align="center" width="200">
        <template slot-scope="{row}">
          <img :src="row.cover" alt="图片">
        </template>
      </el-table-column>
      <el-table-column label="是否启用" align="center" width="200">
        <template slot-scope="{row}">

          <el-tag :type="row.enable | enableFilter">
            {{ row.enable |enableFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="关联时间" prop="created_at" sortable="custom" align="center" width="180" :class-name="getSortClass('created_at')">
        <template slot-scope="{row}">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑时间" prop="updated_at" sortable="custom" align="center" width="180" :class-name="getSortClass('updated_at')">
        <template slot-scope="{row}">
          <span>{{ row.updated_at }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.enable === 0" type="primary" size="mini" @click="handleModifyStatus(row,'enable')">
            启用
          </el-button>
          <el-button v-if="row.enable === 1" type="default" size="mini" @click="handleModifyStatus(row,'unenable')">
            取消启用
          </el-button>
          <el-button v-if="row.enable === 0" type="danger" size="mini" @click="handleDelete(row,$index)">
            移除
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in TypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
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
import { fetchList, updateRotation, deleteRotation } from '@/api/home/rotation/rotation'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const TypeOptions = [
  { key: '', display_name: '全部' },
  { key: 1, display_name: '简报' },
  { key: 2, display_name: '科研' },
  { key: 3, display_name: '主题教育' },
  { key: 4, display_name: '高原沙棘精神' },
  { key: 5, display_name: '视频' },
  { key: 6, display_name: '校园风采' },
  { key: 7, display_name: '馆藏' },
  { key: 8, display_name: '无主题' }
]
const EnableOptions = [
  { key: '', display_name: '全部' },
  { key: 0, display_name: '不启用' },
  { key: 1, display_name: '启用' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const TypeKeyValue = TypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const EnableKeyValue = EnableOptions.reduce((acc, cur) => {
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
    },
    enableFilter(type) {
      return EnableKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      enable_count: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        enable: undefined,
        type: undefined,
        title: undefined,
        sort: ''
      },
      importanceOptions: [1, 2, 3],
      TypeOptions,
      EnableOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined
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
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
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
            data: [
              { 'id': 1, 'number': 'YW_abc12345678', 'type': 1, 'enable': 1, 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'title': '标题', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png' },
              { 'id': 2, 'number': 'YW_abc12345678', 'type': 2, 'enable': 0, 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'title': '标题2', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png' },
              { 'id': 3, 'number': 'YW_abc12345678', 'type': 3, 'enable': 1, 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'title': '标题3', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png' },
              { 'id': 4, 'number': 'YW_abc12345678', 'type': 4, 'enable': 1, 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'title': '标题4', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png' },
              { 'id': 5, 'number': 'YW_abc12345678', 'type': 5, 'enable': 1, 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'title': '标题4', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png' }
            ]
          },
          extra: {
            enable_count: 4
          }

        })
        console.log(response.extra.enable_count)
        this.list = response.data.data
        this.total = response.data.total
        this.enable_count = response.extra.enable_count
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    reset() {
      this.listQuery.enable = undefined
      this.listQuery.type = undefined
      this.listQuery.title = undefined
      this.getList()
    },
    handleModifyStatus(row, status) {
      if (this.enable_count >= 4 && status === 'enable') {
        this.$message({
          message: '启用超最大限制',
          type: 'success'
        })
      } else {
        this.$message({
          message: 'update success',
          type: 'success'
        })
        if (status === 'enable') {
          row.enable = 1
          this.enable_count++
        } else {
          row.enable = 0
          this.enable_count--
        }
        updateRotation(row, row.id).then(() => {
          const index = this.list.findIndex(v => v.id === this.temp.id)
          this.list.splice(index, 1, this.temp)
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
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

    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {

    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
      deleteRotation(row.id).then(() => {
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    sortChange(data) {
      const { prop } = data
      this.sortByID(prop)
    },
    sortByID(order) {
      this.listQuery.sort = order
      this.handleFilter()
    },
    getSortClass: function(key) {
      this.listQuery.sort = key
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-button--mini{
    width: auto;
  }
</style>
