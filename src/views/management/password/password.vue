<template>
  <div class="password-container">
    <el-form ref="ChangePasswordForm" :model="ChangePasswordForm" :rules="ChangePasswordRules" class="login-form" autocomplete="on" label-position="left">

      <el-form-item prop="old_password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="old_password"
          v-model="ChangePasswordForm.old_password"
          placeholder="输入旧密码"
          name="old_password"
          type="password"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="new_password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="new_password"
          v-model="ChangePasswordForm.new_password"
          placeholder="输入新密码"
          name="new_password"
          type="password"
          abindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="re_password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="re_password"
          v-model="ChangePasswordForm.re_password"
          placeholder="输入新密码"
          name="re_password"
          type="password"
          abindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-button :loading="loading" type="success" style="" @click="changePassword">提交</el-button>
      <el-button type="default" style="">取消</el-button>
    </el-form>

  </div>
</template>

<script>
import { updatePassword } from '@/api/management/password/password'
// import { validUsername } from '@/utils/validate'

export default {
  name: 'ComplexTable',
  data() {
    return {
      ChangePasswordForm: {
        old_password: '',
        new_password: '',
        re_password: ''
      },
      ChangePasswordRules: {
        old_password: [{ required: true, min: 6, trigger: 'blur' }],
        new_password: [{ required: true, min: 6, trigger: 'blur' }],
        re_password: [{ required: true, min: 6, trigger: 'blur' }]
      },
      loading: false
    }
  },

  methods: {
    changePassword() {
      this.$refs.ChangePasswordForm.validate(valid => {
        if (valid) {
          this.loading = true
          updatePassword(this.ChangePasswordForm).then(() => {
            this.$notify({
              title: 'Success',
              message: '密码更新成功',
              type: 'success',
              duration: 2000
            })
            this.loading = false
          })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .main-container{
        .password-container{
            width: 20%;
            margin-left: 5%;
        }
    }

</style>
