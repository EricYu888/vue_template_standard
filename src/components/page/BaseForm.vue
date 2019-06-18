<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>基本表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <v-test @aa="sayHi"></v-test>
            <div id="ddd" v-if="isShow">我是被用来测试显示与否的</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="father">
            <h3>this is father</h3>
            <test-slot>
              <div class="template">
                <ul>
                  <li>我是匿名插槽的内容</li>
                </ul>
              </div>
            </test-slot>
          </div>
        </el-col>
      </el-row>

      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="表单名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="选择器">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option key="bbk" label="步步高" value="bbk"></el-option>
              <el-option key="xtc" label="小天才" value="xtc"></el-option>
              <el-option key="imoo" label="imoo" value="imoo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="城市级联">
            <el-cascader :options="options" v-model="form.options"></el-cascader>
          </el-form-item>
          <el-form-item label="选择开关">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="多选框">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="步步高" name="type"></el-checkbox>
              <el-checkbox label="小天才" name="type"></el-checkbox>
              <el-checkbox label="imoo" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="单选框">
            <el-radio-group v-model="form.resource">
              <el-radio label="步步高"></el-radio>
              <el-radio label="小天才"></el-radio>
              <el-radio label="imoo"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文本框">
            <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button plain @click="open3">成功</el-button>
            <el-button>取消</el-button>
            <el-button type="primary" @click="myOpenFunc">模态窗口</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import vTest from "./../common/test.vue";
import TestSlot from "./../common/TestSlot.vue";
export default {
  name: "baseform",
  provide: {
    provideTest: "test11111"
  },
  data: function() {
    return {
      foo: "11111",
      isShow: true,
      options: [
        {
          value: "guangdong",
          label: "广东省",
          children: [
            {
              value: "guangzhou",
              label: "广州市",
              children: [
                {
                  value: "tianhe",
                  label: "天河区"
                },
                {
                  value: "haizhu",
                  label: "海珠区"
                }
              ]
            },
            {
              value: "dongguan",
              label: "东莞市",
              children: [
                {
                  value: "changan",
                  label: "长安镇"
                },
                {
                  value: "humen",
                  label: "虎门镇"
                }
              ]
            }
          ]
        },
        {
          value: "hunan",
          label: "湖南省",
          children: [
            {
              value: "changsha",
              label: "长沙市",
              children: [
                {
                  value: "yuelu",
                  label: "岳麓区"
                }
              ]
            }
          ]
        }
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: true,
        type: ["步步高"],
        resource: "小天才",
        desc: "",
        options: []
      }
    };
  },
  components: {
    vTest,
    TestSlot
  },
  methods: {
    onSubmit() {
      this.$message.success("提交成功！");
    },
    Test() {
      alert("test!!!~");
    },
    open3() {
      this.$notify({
        title: "成功",
        message: "这是一条成功的提示消息",
        type: "success"
      });
    },
    sayHi(item) {
      console.log("sayHi");
      this.isShow = false;
      alert(item);
    },

    myOpenFunc() {
      this.provideTest = "asdfasfdasfd";
      console.log(this.$el.getBoundingClientRect());
    }
  },
  created: function() {},
  mounted() {
    alert($("#ddd").html());
  }
};
</script>
<style>
.el-row {
  user-select: none;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 100;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>