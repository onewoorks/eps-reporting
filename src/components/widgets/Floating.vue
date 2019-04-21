<template>
  <div class="myposition">
    
    <div class="card">
      
      <div class="card-body float-menu">
        <div class="text-right">
          <transition
            name="bounce"
            enter-active-class="bounceInRight"
            leave-active-class="bounceOutRight"
          >
            <div
              class="btn btn-outline-secondary btn-sm d-none"
              @click="showTarikh = !showTarikh"
              v-show="!buttons"
            >
              <i class="far fa-calendar-alt"></i> Pilih Tarikh
            </div>
          </transition>

          <transition
            name="bounce"
            enter-active-class="bounceInRight"
            leave-active-class="bounceOutRight"
          >
            <div class="btn btn-outline-secondary btn-sm" @click="cetak" v-show="!buttons">
              <i class="fas fa-print"></i>
            </div>
          </transition>

          <transition
            name="bounce"
            enter-active-class="bounceInRight"
            leave-active-class="bounceOutRight"
          >
            <a :href="sistem_url" class="btn btn-outline-secondary btn-sm" v-show="!buttons">Kembali Ke Sistem</a>
          </transition>
          <div class="btn btn-default btn-sm" @click="buttons = !buttons">
            <i v-if="buttons" class="fas fa-angle-left"></i>
            <i v-if="!buttons" class="fas fa-angle-right"></i>
          </div>
        </div>

        <transition name="fade" enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
          
          <div class="text-center mt-2" v-show="!showTarikh && !buttons" style="animation-duration: 0.6s">
            <div class="row">
              <div class="col-5">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Dari</span>
                  </div>
                  <DatePicker
                    class="text-center"
                    v-model="tarikh.mula"
                    :config="options.tarikh_sah"
                    required
                  ></DatePicker>
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="far fa-calendar-alt"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-5">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Hingga</span>
                  </div>
                  <DatePicker
                    class="text-center"
                    v-model="tarikh.akhir"
                    :config="options.tarikh_sah"
                    required
                  ></DatePicker>
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="far fa-calendar-alt"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-2 text-right">
                <div class="btn btn-block btn-sm btn-primary" @click="cari">Cari</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import moment from "moment";
import DatePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";

export default {
  nama: "floating",
  components: {
    DatePicker
  },
  props: {
    sistem_url: String
  },
  data: function() {
    return {
      buttons: true,
      showTarikh: false,
      tarikh: {
        mula: moment(new Date(), "YYYY-MM-DD").format("D MMMM YYYY"),
        akhir: moment(new Date(), "YYYY-MM-DD").format("D MMMM YYYY")
      },
      options: {
        tarikh_sah: {
          format: "D MMMM YYYY",
          maxDate: new Date()
        }
      }
    };
  },
  methods: {
    hideButton: function() {
      buttons: false;
    },
    cetak: function() {
      window.print();
    },
    pilihTarikh: function() {
      showTarikh: false;
    },
    cari: function() {
      let tarikh_std = {
        mula: moment(this.tarikh.mula, "D MMMM YYYY").format("YYYY-MM-DD"),
        akhir: moment(this.tarikh.akhir, "D MMMM YYYY").format("YYYY-MM-DD"),
        clean: this.tarikh
      };
      this.$emit("clicked", tarikh_std);
    }
  }
};
</script>

<style>
.myposition > .card {
  position: fixed;
  right: 15px;
  top: 15px;
  -webkit-box-shadow: 0 10px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 10px 10px 2px rgba(0, 0, 0, 0.3);
  z-index: 100; 
}
.card-body.float-menu {
  padding:8px;
  margin:0px;
}
</style>
