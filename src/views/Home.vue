<template>
  <div>
    <ReportJualan/>
  </div>
</template>

<script>
import ReportJualan from "@/components/reports/Jualan";
import Axios from "axios";

export default {
  name: "home",
  components: {
    ReportJualan
  },
  mounted: function() {
    let response = this.$route.fullPath;
    let query = response.split("?")[1];
    let parsed = decodeURIComponent(query);
    let params = parsed.split("&");
    let obj = {};
    params.forEach(value => {
      let x = value.replace(/[[\]]/g, "");
      let v = x.split("=");
      obj[v[0]] = v[1];
    });
    sessionStorage.token = obj.t
    sessionStorage.tag = obj.s
  },
  methods: {}
};
</script>

