
<template>
  <div>
    <FloatMenu @clicked="cariReport" :sistem_url="info.sistem_url"/>
    <div @click="hideFloat">
      <div class="card">
        <div class="card-body">
          <div class="header">
            <AppHeader :kedai_nama="info.kedai_nama" :kedai_alamat="info.kedai_alamat"/>
            <hr>
            <div class="mb-4">
              <h2>SENARAI JUALAN</h2>
              <h4>Tarikh Laporan dari {{ tarikh.mula }} sehingga {{ tarikh.akhir }}</h4>
            </div>
          </div>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th>NO RESIT</th>
                <th>TARIKH JUALAN</th>
                <th>NAMA STOK</th>
                <th>BERAT</th>
                <th>UPAH STOK</th>
                <th>JUMLAH JUALAN</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="items == null">
                <td colspan="6">{{ text.tiada_data }}</td>
              </tr>
              <tr v-for="(item,key) in items" v-bind:key="key">
                <td>{{ item.invoice_no }}</td>
                <td>{{ item.invoice_date }}</td>
                <td class="text-left text-uppercase">{{ item.product_name }}</td>
                <td class="text-right">{{ item.berat}} g</td>
                <td class="text-right">RM {{ item.upah }}</td>
                <td class="text-right">RM {{ item.total_amount}}</td>
              </tr>
            </tbody>
          </table>

          <div class="summary">
            <table class="table table-bordered">
              <tr>
                <th class="text-right">
                  <strong>Bilangan Barang Jualan</strong>
                </th>
                <td class="text-right">{{ ringkasan.bilangan }}</td>
              </tr>
              <tr>
                <th class="text-right">
                  <strong>Jumlah Berat Jualan</strong>
                </th>
                <td class="text-right">{{ ringkasan.berat }} g</td>
              </tr>
              <tr>
                <th class="text-right">
                  <strong>Bilangan Harga Upah</strong>
                </th>
                <td class="text-right">RM {{ ringkasan.upah }}</td>
              </tr>
              <tr>
                <th class="text-right">
                  <strong>Jumlah Harga Barang Jualan Keseluruhan</strong>
                </th>
                <td class="text-right">RM {{ ringkasan.jumlah_jualan }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import Axios from "axios";
import FloatMenu from "@/components/widgets/floating";
import DatePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

export default {
  name: "reportjualan",
  components: {
    AppHeader,
    DatePicker,
    FloatMenu
  },
  data: function() {
    return {
      text: {
        tiada_data: "Sila buat pilihan tarikh"
      },
      info: {},
      items: null,
      tarikh: {
        mula: " - ",
        akhir: " - "
      },
      ringkasan: {
        berat: "0.00",
        bilangan: "0.00",
        upah: "0.00",
        jumlah_jualan: "0.00"
      }
    };
  },
  mounted: function() {
      console.log(sessionStorage)
    this.loadLatest();
  },
  methods: {
    hideFloat: function() {},
    cariReport: function(value) {
      let tarikh = value;
      this.tarikh = value.clean;
      Axios.get(
        process.env.SPE_API +
          "jualan/jualan?dari=" +
          tarikh.mula +
          "&hingga=" +
          tarikh.akhir,
        {
          headers: {
            token: sessionStorage.token
          }
        }
      ).then(response => {
        let resp = response.data.response;
        this.items = resp.data.items.length > 0 ? resp.data.items : null;
        this.ringkasan = resp.data.ringkasan;
        this.info = resp.information;
        this.text = {
          tiada_data: "Tiada rekod dari tarikh yang dipilih"
        };
      });
    },
    loadLatest: function() {
      Axios.get(process.env.SPE_API + "info/", {
        headers: {
          token: sessionStorage.token
        }
      }).then(response => {
        let resp = response.data.response;
        this.items = null;
        this.info = resp.information;
      });
    }
  }
};
</script>

<style>
@page {
  margin-bottom: 15mm;
  margin-top: 15mm;
}
@page:first {
  margin-top: 0mm;
  /* .header { 
      margin-top: 0mm;
      display:block;
    }  */
}
@media print {
  h1 {
    margin: 0;
    padding: 0;
  }
  .summary {
    margin-top: 4mm;
    page-break-before: always;
  }
  .myposition {
    display: none;
  }
  .card {
    border: none;
  }
}
</style>
