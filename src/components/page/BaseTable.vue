<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          雨水管理 {{userName}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="success" @click="doTest">Vuex Test</el-button>
        <el-button type="success" @click="doCheck">Vuex Get</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="areaName" label="Name" sortable width="150"></el-table-column>
        <el-table-column prop="areaCode" label="Code" width="120"></el-table-column>
        <el-table-column prop="paravalue" label="Value"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="form" label-width="50px">
        <el-form-item label="Name" prop="areaName">
          <el-input v-model="form.areaName"></el-input>
        </el-form-item>
        <el-form-item label="Code">
          <el-input v-model="form.areaCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="Value" prop="paravalue">
          <el-input v-model="form.paravalue" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as rainApi from "./../../api/rainApi";
export default {
  name: "basetable",
  data() {
    return {
      // url: './static/vuetable.json',
    
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      pageNumber: 1,
      total: 0,
      form: {
        areaName: "",
        areaCode: "",
        paravalue: ""
      },
      idx: -1,
      rules: {
        areaName: [
          { required: true, message: "name is required", trigger: "change" }
        ],
        paravalue: [
          {
            required: true,
            message: "paravalue is required",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      // return this.tableData.filter((d) => {
      //     let is_del = false;
      //     for (let i = 0; i < this.del_list.length; i++) {
      //         if (d.name === this.del_list[i].name) {
      //             is_del = true;
      //             break;
      //         }
      //     }
      //     if (!is_del) {
      //         if (d.address.indexOf(this.select_cate) > -1 &&
      //             (d.name.indexOf(this.select_word) > -1 ||
      //                 d.address.indexOf(this.select_word) > -1)
      //         ) {
      //             return d;
      //         }
      //     }
      // })
    },
    userName() {
      return this.$store.state.user.userName;
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      console.log(val);
      this.pageNumber = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      let params = {
        stcd: "",
        fromTime: "2017-06-10",
        toTime: "2019-06-18",
        customerId: "1",
        pageNumber: this.pageNumber,
        pageSize: 10
      };
      console.log(params);
      rainApi
        .getAllRain(params)
        .then(result => {
          if (result.data.result.isSuccess) {
            this.tableData = result.data.result.data;
            this.total = result.data.result.total;
          }
        })
        .catch(err => {});
    },
    search() {
      this.is_search = true;
    },
    // formatter(row, column) {
    //     return row.address;
    // },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        areaName: item.areaName,
        areaCode: item.areaCode,
        paravalue: item.paravalue
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(valid);
        } else {
          console.log(2222);
        }
      });
      //   this.$set(this.tableData, this.idx, this.form);
      //   this.editVisible = false;
      //   this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    },
    doTest() {
      this.$store.dispatch("getUserName", { id: 1 });
      
    },
    doCheck() {
      console.log(32);
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
