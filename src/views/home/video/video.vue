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
      <el-select v-model="listQuery.type" placeholder="视频分类" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in TypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.department_tpye" placeholder="院系分类" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in DepartmentTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.is_relation_home" placeholder="关联首页" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in RelationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.is_relation_list" placeholder="关联列表页" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in RelationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.is_relation_rotation" placeholder="关联轮播图" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in RelationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.is_relation_memorabilia" placeholder="关联大事记" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in RelationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
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

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handlePicUpdate">
        编辑图片
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
      @sort-change="sortChange"
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
      <el-table-column label="视频分类" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.type | statusFilter">
            {{ row.type | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="院系分类" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.department_tpye != 0" :type="row.department_tpye | statusFilter">
            {{ row.department_tpye | departmenttypeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="专业" min-width="110px">
        <template slot-scope="{row}">
          <span>{{ row.major }}</span>
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
      <el-table-column label="是否关联到列表页" width="110px" align="center">
        <template slot-scope="{row}">

          <el-tag :type="row.is_relation_list | statusFilter">
            {{ row.is_relation_list | relationFilter }}
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
          <el-button v-if="row.is_relation_list == 0 " type="primary" size="mini" @click="handleChangeStatus(row,1,4)">
            关联列表页
          </el-button>
          <el-button v-if="row.is_relation_list == 1" size="mini">
            关联列表页
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 80%; margin-left:50px;">

        <el-form-item label="视频类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in TypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item label="院系" prop="department_tpye">
          <el-select v-model="temp.department_tpye" class="filter-item" placeholder="Please select">
            <el-option v-for="item in DepartmentTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item label="专业" prop="major">
          <el-input v-model="temp.major" />
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <div>
            <tinymce v-model="temp.content" :height="300" />
          </div>
        </el-form-item>

        <el-form-item label="上传图片" prop="cover">
          <el-upload ref="upload" label="上传图片" action="" :auto-upload="false" :on-change="changeUpload" accept="image/jpeg,image/gif,image/png,image/bmp">
            <div size="small" class="upload_btn"><div style="height:40px" /><i class="iconfont icon-jiahao" /><p style="line-height:0">上传图片</p></div>
            <img :src="defaultImageUrl" alt="图片">
          </el-upload>
          <el-input v-model="temp.cover" type="hidden" class="hiddens" />
        </el-form-item>

        <el-form-item label="上传视频" prop="video">
          <el-upload ref="upload" label="上传视频" action="" :auto-upload="false" :on-change="changeUpload" accept="image/jpeg,image/gif,image/png,image/bmp">
            <div size="small" class="upload_btn"><div style="height:40px" /><i class="iconfont icon-jiahao" /><p style="line-height:0">上传视频</p></div>
            <img :src="defaultImageUrl" alt="视频">
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

    <el-dialog :title="textMapPic[dialogPicStatus]" :visible.sync="dialogPicFormVisible">
      <el-form ref="dataFormPic" :rules="rules" :model="tempPic" label-position="left" label-width="70px" style="width: 80%; margin-left:50px;">

        <el-form-item label="上传顶部图片" prop="top_pic">
          <el-upload ref="upload" label="上传图片" action="" :auto-upload="false" :on-change="changeUpload" accept="image/jpeg,image/gif,image/png,image/bmp">
            <div size="small" class="upload_btn"><div style="height:40px" /><i class="iconfont icon-jiahao" /><p style="line-height:0">上传图片</p></div>
            <img :src="defaultImageUrl" alt="图片">
          </el-upload>
          <el-input v-model="tempPic.top_pic" type="hidden" class="hiddens" />
        </el-form-item>

        <el-form-item label="上传底部图片" prop="bottom_pic">
          <el-upload ref="upload" label="上传图片" action="" :auto-upload="false" :on-change="changeUpload" accept="image/jpeg,image/gif,image/png,image/bmp">
            <div size="small" class="upload_btn"><div style="height:40px" /><i class="iconfont icon-jiahao" /><p style="line-height:0">上传图片</p></div>
            <img :src="defaultImageUrl" alt="图片">
          </el-upload>
          <el-input v-model="tempPic.bottom_pic" type="hidden" class="hiddens" />
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
import Tinymce from '@/components/Tinymce'
import { fetchList, createVideo, updateVideo, deleteVideo } from '@/api/home/video/video'
import { uploadImage } from '@/api/upload/upload'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const TypeOptions = [
  { key: 1, display_name: '视频资讯' },
  { key: 2, display_name: '精品课堂' },
  { key: 3, display_name: '衛視' }
]
const DepartmentTypeOptions = [
  { key: 1, display_name: '护理系' },
  { key: 2, display_name: '临床医学系' },
  { key: 3, display_name: '医学技术系' },
  { key: 4, display_name: '药学系' },
  { key: 5, display_name: '计算机中心' },
  { key: 6, display_name: '实训中心' }
]

const RelationOptions = [
  { key: '', display_name: '全部' },
  { key: 1, display_name: '关联' },
  { key: 0, display_name: '未关联' }
]

// 1  is_relation_home  2 is_relation_rotation   3 is_relation_memorabilia   4 is_relation_list
// arr to obj, such as { CN : "China", US : "USA" }
const TypeKeyValue = TypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const DepartmentTypeKeyValue = DepartmentTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const RelationKeyValue = RelationOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination, Tinymce },
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
    departmenttypeFilter(type) {
      return DepartmentTypeKeyValue[type]
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
        is_relation_list: undefined,
        is_relation_rotation: undefined,
        is_relation_memorabilia: undefined
      },
      TypeOptions,
      DepartmentTypeOptions,
      RelationOptions,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,

      temp: {
        id: undefined,
        title: '',
        type: '',
        department_tpye: '',
        major: '',
        content: '',
        cover: '',
        video: ''
      },

      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },

      tempPic: {
        id: undefined,
        top_pic: '',
        bottom_pic: ''
      },
      dialogPicFormVisible: false,
      dialogPicStatus: '',
      textMapPic: {
        update: '上传图片',
        create: 'Create'
      },

      dialogPvVisible: false,
      pvData: [],
      rules: {
        title: [{ required: true, message: 'title is required', trigger: 'blur' }],
        content: [{ required: true, message: 'content is required', trigger: 'blur' }],
        type: [{ required: true, message: 'type is required', trigger: 'blur' }],
        top_pic: [{ required: true, message: 'top_pic is required', trigger: 'blur' }],
        bottom_pic: [{ required: true, message: 'bottom_pic is required', trigger: 'blur' }]
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
              { 'id': 1, 'number': 'YW_abc12345678', 'title': '视频管理1', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png', 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'is_relation_home': 0, 'is_relation_list': 0, 'is_relation_rotation': 0, 'is_relation_memorabilia': 0, 'content': '内容', 'video': '/2.mp4', 'type': 1, 'department_tpye': 0, 'major': '' },
              { 'id': 2, 'number': 'YW_abc12345678', 'title': '视频管理2', 'cover': 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png', 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'is_relation_home': 1, 'is_relation_list': 1, 'is_relation_rotation': 1, 'is_relation_memorabilia': 1, 'content': '内容', 'video': '/2.mp4', 'type': 2, 'department_tpye': 1, 'major': '护理专业1' },
              { 'id': 3, 'number': 'YW_abc12345678', 'title': '视频管理3', 'cover': '', 'created_at': '2020-04-30 11:11:11', 'updated_at': '2020-04-30 11:11:11', 'is_relation_home': 0, 'is_relation_list': 1, 'is_relation_rotation': 1, 'is_relation_memorabilia': 1, 'content': '内容', 'video': '/2.mp4', 'type': 3, 'department_tpye': 0, 'major': '' }
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
        this.tempPic.top_pic = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
        this.tempPic.bottom_pic = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
        this.defaultImageUrl = 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
      })
        .catch(response => {
          this.temp.cover = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
          this.tempPic.top_pic = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
          this.tempPic.bottom_pic = '/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
          this.defaultImageUrl = 'https://axure-file.lanhuapp.com/75bb826c-df35-4a34-b9a5-86b4cff4543c__28e3bf0b1943ba0890f45e053338de22.png'
          console.log(this.tempPic.bottom_pic)
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
      updateVideo(row, row.id).then(() => {
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
          await deleteVideo(row.id)
          this.rolesList.splice(status, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
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
    reset() {
      this.listQuery.is_relation_home = undefined
      this.listQuery.is_relation_list = undefined
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

          createVideo(this.temp).then(() => {
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
          updateVideo(tempData, tempData.id).then(() => {
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
    handleUpdate(row) {
      this.tempPic = Object.assign({}, row) // copy obj
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
          updateVideo(tempData, tempData.id).then(() => {
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

<style lang="scss" scoped>

  .el-button--mini{
    width: auto;
    margin-bottom:2%;
  }

</style>
