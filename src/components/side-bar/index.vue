<template>
  <el-menu
    :collapse-transition="true"
    :collapse="$store.state.app.collapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo sideBar"
    background-color="#304156"
    text-color="#bfcbd9"
    :router="true"
    active-text-color="#409eff"
  >
        <template v-for="item in menu">
        <el-menu-item :index="item.redirect" v-if="item.children.length==1">
          <i class="iconfont" :class="item.children[0].meta.icon"></i>
          <span slot="title">{{ item.children[0].meta.title }}</span>
        </el-menu-item>
        <el-submenu :index="item.path"  v-if="item.children.length>1">
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </template>
          <el-menu-item v-for="(i,index) in item.children" :key="index" :index="item.path+'/'+i.path">{{ i.meta.title }}</el-menu-item>
        </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      menu: null,
    };
  },
  mounted() {
    this.menu = this.$router.options.routes.filter(item=>!item.hidden)
    console.log(this.menu)
  },
  methods: {
    clickItem(v) {
      console.log(v);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  width: 210px;
  height: 100%;
  overflow-y: scroll;
}

.sideBar {
  .iconfont {
    margin-right: 15px;
  }
}

.sideBar::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.sideBar::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
  background: white;
}

.sideBar::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
  background: white;
}
</style>
