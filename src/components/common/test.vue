<template>
  <button @click="test">welcomed</button>
  <!-- <div style="background:red">
    我是一个子组件，我在红色的海洋里！
  </div>-->
</template>
<script>
import bus from "../common/bus";
export default {
  inheritAttrs: false,
  inject: ["provideTest"],
  data() {
    return {
      name: "wo "
    };
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate: function() {
    console.log("beforeUpdate");
    console.log(this.$el);
  },
  updated: function() {
    console.log("updated");
    console.log(this.$el);
  },
  methods: {
    test() {
      this.name = "fuck ";
      console.log("test");
      console.log(this.provideTest);
      this.$emit("aa", "what fuck");
      // this.$emit("update:isShow",false);
    }

    //  this.$emit("update:isShow",false);
  }
};
</script>
