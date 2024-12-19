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
              <el-form-item label="开始时间">
                <el-date-picker
                    v-model="formData.startTime"
                    type="date"
                    placeholder="请选择开始日期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
              <el-form-item label="结束时间">
                <el-date-picker
                    v-model="formData.endTime"
                    type="date"
                    placeholder="请选择结束日期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 表格 -->
      <div class="table-buttons-box-index">
      </div>

      <el-card shadow="hover">
        <el-row>
          <el-col :span="8">
            <div>
              <el-statistic title="总成本">
                <template slot="prefix">
                  <i class="el-icon-star-on"></i>
                </template>
                <template slot="formatter">
                  <p>{{ endTotalBuyRate }}</p>
                </template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-statistic title="总销售额">
                <template slot="prefix">
                  <i class="el-icon-info" style="color: greenyellow;font-size: 18px;"></i>
                </template>

                <template slot="formatter">
                  <p>{{ endTotalSellRate }}</p>
                </template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-statistic title="总利润">
                <template slot="formatter">
                  <p style="color: red">{{ endTotalProfitRate }}</p>
                </template>
              </el-statistic>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <P class="title_box">账号</P>
      <el-table ref="table1" :data="tableData1" tooltip-effect="dark" style="width: 100%" :height="tableHeight"
                border :header-cell-style="{ background: '#FAFAFA', color: '#262626', textAlign: 'center' }"
                highlight-current-row :row-style="publicFunc.tableRowStyleHandle"
      >
        <el-table-column align="center" width="60" label="序号" type="index"></el-table-column>
        <el-table-column sortable align="center" prop="name" label="账号名"></el-table-column>
        <el-table-column sortable align="center" prop="platform" label="购买平台"
        ></el-table-column>
        <el-table-column sortable align="center" prop="totalBuyRate" label="购买金额"
        ></el-table-column>
        <el-table-column sortable align="center" prop="totalSellRate" label="销售金额"
        ></el-table-column>
        <el-table-column sortable align="center" prop="totalProfit" label="利润"
        ></el-table-column>
      </el-table>
      <P class="title_box">平台</P>
      <el-table ref="table2" :data="tableData2" tooltip-effect="dark" style="width: 100%" :height="tableHeight"
                border :header-cell-style="{ background: '#FAFAFA', color: '#262626', textAlign: 'center' }"
                highlight-current-row :row-style="publicFunc.tableRowStyleHandle"
      >
        <el-table-column align="center" width="60" label="序号" type="index"></el-table-column>
        <el-table-column sortable align="center" prop="platform" label="所属平台"
        ></el-table-column>
        <el-table-column sortable align="center" prop="endTotalBuyRate" label="购入总金额"></el-table-column>
        <el-table-column sortable align="center" prop="endTotalSellRate" label="总销售额"></el-table-column>
        <el-table-column sortable align="center" prop="endTotalProfitRate" label="总利润"></el-table-column>
      </el-table>
      <!--      <P class="title_box">总计</P>-->
      <!--      <el-table ref="table3" :data="tableData3" tooltip-effect="dark" style="width: 100%" :height="tableHeight"-->
      <!--                border :header-cell-style="{ background: '#FAFAFA', color: '#262626', textAlign: 'center' }"-->
      <!--                highlight-current-row-->
      <!--      >-->
      <!--        <el-table-column align="center" width="60" label="序号" type="index"></el-table-column>-->
      <!--        <el-table-column sortable align="center" prop="endTotalBuyRate" label="购入总金额"></el-table-column>-->
      <!--        <el-table-column sortable align="center" prop="endTotalSellRate" label="总销售额"></el-table-column>-->
      <!--        <el-table-column sortable align="center" prop="endTotalProfitRate" label="总利润"></el-table-column>-->
      <!--      </el-table>-->
      <!-- 分页 -->
    </div>

  </div>
</template>
<script>
import publicFunc from "@/utils/publicFunc";

let me;
import {
  count2
} from "@/api/shoesApi/shoesApis";

export default {
  components: {},
  data() {
    return {
      publicFunc: publicFunc,
      tableHeight: "74vh",
      tableData1: [],
      tableData2: [],
      endTotalBuyRate: "",
      endTotalSellRate: "",
      endTotalProfitRate: "",
      formData: {
        startTime: "",
        endTime: "",
      }
    };
  },
  mounted() {
    me = this;
    // me.loginHandle()
    me.refreshTableHeight();
    window.onresize = me.refreshTableHeight;
    me.queryItemsList();// 查询页面列表
  },
  beforeDestroy() {
    window.onresize = function () {
    };
  },

  methods: {
    /**
     * 设置表格高度
     */
    refreshTableHeight() {
      me.$nextTick(() => {
        let pageHeight = document.querySelector(".el-main");
        let formDom = document.querySelector(".form-parent-newbox");
        let tableButtonsDom = document.querySelector(".table-buttons-box-index");
        me.tableHeight = (pageHeight.offsetHeight - formDom.offsetHeight - tableButtonsDom.offsetHeight - 40) / 3 + "px";
      })
    },
    handleReset() {
      me.formData.startTime = ""
      me.formData.endTime = ""
    },
    handleQuery() {
      me.queryItemsList()
    },
    // 查询表格数据
    queryItemsList() {
      count2(me.formData).then(res => {
        if (res.code == 0) {
          me.tableData1 = res.data.list;
          me.tableData2 = res.data.shoesItemCount;
          // me.tableData3.push(res.data.shoesTotalCount)
          me.endTotalBuyRate = res.data.shoesTotalCount.endTotalBuyRate
          me.endTotalSellRate = res.data.shoesTotalCount.endTotalSellRate
          me.endTotalProfitRate = res.data.shoesTotalCount.endTotalProfitRate
        }
      })
          .catch(err => {
            if (err) {
              publicFunc.showModalTips("查询失败，请联系开发人员！！！");
            }
          })
    },
    // tableRowStyleHandle({row, rowIndex}) {
    //   if (rowIndex % 2 === 0) {
    //     return {'background-color': '#f0f9eb'}
    //   }
    // }
  },
};
</script>
<style lang="less" scoped>
.title_box {
  font-size: 24px;
}
/deep/ .el-statistic {
  .title {
    font-size: 14px;
    font-weight: bold;
  }

  .con {
    .prefix {
      font-size: 18px;
      color: blue;
    }

  }
}

</style>
