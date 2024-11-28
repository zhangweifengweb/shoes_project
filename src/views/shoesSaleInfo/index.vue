<template>
  <div>
    <div class="showsList_main">
      <!-- 检索条件 -->
      <div class="form-parent-newbox">
        <div class="form-title-area">
          <div class="form-title-area-left">
            <span>查询条件</span>
          </div>
          <div class="form-title-area-right">
            <el-button size="mini" icon="el-icon-search" type="primary" @click="handleQuery">查询</el-button>
            <el-button size="mini" icon="el-icon-refresh" type="primary" @click="handleReset">重置</el-button>
          </div>
        </div>
        <el-form size="mini" class="form-area-box" :inline="true" :model="formData" label-position="left">
          <el-row>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="品名">
                <el-input v-model="formData.name" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="货号">
                <el-input v-model="formData.number" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="尺码">
                <el-input v-model="formData.size" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="创建人">
                <el-input v-model="formData.createBy" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 表格 -->
      <div class="table-buttons-box-index">
      </div>
      <el-table ref="pcTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :height="tableHeight"
                border :header-cell-style="{ background: '#FAFAFA', color: '#262626', textAlign: 'center' }"
                highlight-current-row :row-style="publicFunc.tableRowStyleHandle"
      >
        <el-table-column align="center" width="60" label="序号" type="index" :index="indexMethod"></el-table-column>
        <el-table-column sortable align="center" prop="name" label="名称"></el-table-column>
        <el-table-column sortable align="center" prop="number" label="货号"></el-table-column>
        <el-table-column sortable align="center" prop="size" label="尺码"
        ></el-table-column>
        <el-table-column sortable align="center" prop="count" label="数量"
        ></el-table-column>
        <el-table-column sortable align="center" prop="createBy" label="创建人"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
                  :totalCount="totalCount" :currentPage="pageNum" :pageSizeList="pageSizeList" :pageSize="pageSize"
                  class="pagination-area-box-index"></Pagination>
    </div>

  </div>
</template>
<script>
import publicFunc from "@/utils/publicFunc";

let me;
import Pagination from "@/components/pagination";
import {
  count1
} from "@/api/shoesApi/shoesApis";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      publicFunc: publicFunc,
      tableHeight: "74vh",
      tableData: [],
      totalCount: 0,
      pageNum: 1,
      pageSizeList: [50, 100, 200],
      pageSize: 50,
      formData: {},
    };
  },
  mounted() {
    me = this;
    me.refreshTableHeight();
    window.onresize = me.refreshTableHeight;
    me.queryItemsList();// 查询页面列表
  },
  beforeDestroy() {
    window.onresize = function () {
    };
  },

  methods: {
    //   序号获取
    indexMethod(index) {
      var total = me.pageSize * (me.pageNum - 1);
      return total + index + 1;
    },
    /**
     * 设置表格高度
     */
    refreshTableHeight() {
      me.$nextTick(() => {
        let pageHeight = document.querySelector(".el-main");
        let formDom = document.querySelector(".form-parent-newbox");
        let tableButtonsDom = document.querySelector(".table-buttons-box-index");
        let paginationDom = document.querySelector(".pagination-area-box-index");
        me.tableHeight = (pageHeight.offsetHeight - formDom.offsetHeight - tableButtonsDom.offsetHeight - paginationDom.offsetHeight - 25) + "px";
      })
    },
    // 查询
    handleQuery() {
      me.currentPage = 1;
      me.queryItemsList();
    },
    // 重置
    handleReset() {
      me.formData.number = "";
      me.formData.name = "";
      me.formData.size = "";
      me.formData.createBy = "";
      me.pageNum = 1;
      me.queryItemsList();
    },


    // 查询表格数据
    queryItemsList() {
      let param = me.formData
      param.pageSize = me.pageSize
      param.pageNum = me.pageNum
      count1(param).then(res => {
        if (res.code == 0) {
          me.tableData = res.data;
          me.totalCount = res.page.totalCount;
        }
      })
          .catch(err => {
            // if (err && err.response && err.response.status) {
            //   publicFunc.showModalTips(err.msg || `导出失败，请稍后重试~\n错误码：${err.code}`);
            // } else {
            //   publicFunc.showModalTips(err.msg || `导出失败，请稍后重试~\n错误码：${err.code}`);
            // }
          })
    },
    // 每页展示数量变化时
    handleSizeChange(e) {
      me.pageSize = e;
      me.pageNum = 1;
      me.queryItemsList();
    },
    // 当前页码变化时
    handleCurrentChange(e) {
      me.pageNum = e;
      me.queryItemsList();
    },

  },
};
</script>
<style lang="less" scoped>
/deep/ .el-dialog__header {
  background: #409eff9c;
}

/deep/ .el-dialog__body {
  .el-form {
    .el-row {
      .el-col {
        .el-form-item {
          width: 100%;

          .el-form-item__label {
            width: 90px;
          }

          .el-form-item__content {
            width: calc(100% - 100px);

            .el-select {
              width: 100%;
            }
          }
        }
      }
    }

  }
}

.el-cascader {
  /deep/ .el-cascader__tags {
    height: 24px;
    white-space: nowrap;
    overflow: hidden;
    flex-wrap: nowrap;
  }
}

.el-select {
  /deep/ .el-select__tags {
    height: 24px;
    white-space: nowrap;
    overflow: hidden;
    flex-wrap: nowrap;
  }
}
</style>
