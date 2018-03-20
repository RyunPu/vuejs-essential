<template>
  <div class="navbar-right">
    <ul v-if="auth" class="nav navbar-nav github-login">
      <li>
        <a v-dropdown href="javascript:;">
          <i class="fa fa-user-circle avatar-topnav"></i>
          <span v-if="user && user.name">{{ user.name }}</span>
          <span v-else>佚名</span>
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li><a href="javascript:;" @click="confirmLogout"><i class="fa fa-sign-out text-md"></i>退出</a></li>
        </ul>
      </li>
    </ul>
    <div v-else class="nav navbar-nav github-login">
      <a href="#" class="btn btn-default login-btn">
        <i class="fa fa-user"></i> 登 录
      </a>
      <router-link to="/auth/register" class="btn btn-default login-btn">
        <i class="fa fa-user-plus"></i> 注 册
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Auth',
  computed: mapState([
    'auth',
    'user'
  ]),
  methods: {
    confirmLogout() {
      this.logout()
    },
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<style scoped>
.fa-user-circle { font-size: 30px; vertical-align: middle;}
</style>
