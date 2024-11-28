<template>
  <div class="pageLeftBox">
    <div class="closBox">
      <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse = !isCollapse"></i>
    </div>
    <div class="navbox">
      <el-menu :default-active="activeName" @select="handleOpen" class="el-menu-vertical-demo"
               :collapse="isCollapse">
        <el-menu-item v-for="item in routeList" :key="item.name" :index="item.path">
          <i :class="item.meta.iconClass"></i>
          <span slot="title">{{ item.meta.pageName }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeName: this.$route.path,
      routeList: [],
    }
  },
  mounted() {
    let parentRoute = [];
    parentRoute = this.$router.options.routes.filter(item => {
      if (item.children) {
        return item
      }
    })
    this.routeList = parentRoute[0].children
  },
  watch: {
    $route(to, from) {
      this.activeName = to.path
    }
  },

  methods: {
    handleOpen(path) {
      this.$router.push({
        path
      })
    },
  }
}
</script>
<style lang="less" scoped>
.pageLeftBox {
  height: 100%;

  .closBox {
    text-align: right;
    background: #ccc;

    p {
      font-size: 1.5em;
    }

    i {
      font-size: 25px;
      cursor: pointer;
    }

    i:hover {
      color: #FF3300FF;
    }
  }

  .navbox {
    height: calc(100% - 30px);

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 240px;
      //min-height: 400px;
    }

    .el-menu {
      height: 100%;
    }
  }
}

</style>
