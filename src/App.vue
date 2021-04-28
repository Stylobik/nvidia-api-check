<template>
  <div>
    <div id="app" class="wrap">
      <div id="title">
        <h1>{{ title }}</h1>
      </div>
      <div id="timer">
        <h2>{{ timer }}</h2>
      </div>

      <div id="list">
        <NvidiaCom
          :status="NvidiaCom.status"
          :list="NvidiaCom.list" 
          :url="NvidiaCom.url"
        />
      </div>
    </div>
    <div id="logs">
      <p>Historique :</p>
      <div v-for="item in logs" :key="item.id">
        {{ item.date }}
        {{ item.gpu }}
        {{ item.price }}
      </div>
    </div>
  </div>
</template>

<script>
import NvidiaCom from "./components/NvidiaCom.vue";

export default {
  name: "App",
  data() {
    return {
      title: "GPU orders alert",
      timer: 60,
      logs: [],
      NvidiaCom: {
        loading: true,
        url:
          "https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=fr-fr&gpu=RTX%203080,RTX%203090,RTX%203070,RTX%203060%20Ti&manufacturer=NVIDIA&gpu_filter=RTX%203090~1,RTX%203080~1,RTX%203070~1,RTX%203060%20Ti~0,RTX%203060~0,RTX%202080%20SUPER~0,RTX%202080~0,RTX%202070%20SUPER~0,RTX%202070~0,RTX%202060%20SUPER~0,RTX%202060~0,GTX%201660%20Ti~0,GTX%201660%20SUPER~0,GTX%201660~0,GTX%201650%20Ti~0,GTX%201650%20SUPER~0,GTX%201650~0",
        status: false,
        list: [],
      },
    };
  },
  components: {
    NvidiaCom,
  },
  computed: {},
  created() {
    //this.NvidiaCom.list = [];
    clearInterval(this.askNvidiaCom());
    setInterval(() => {
      this.NvidiaCom.list = [];
      this.askNvidiaCom();
    }, 60 * 1000);

    setTimeout(this.countdown, 1);
  },
  watch: {
    "NvidiaCom.status": function (newVal, oldVal) {
      if (newVal === true) {
        let date = new Date(Date.now());

        date = `${("0" + date.getDate()).slice(-2)}/${(
          "0" +
          date.getMonth() +
          1
        ).slice(
          -2
        )}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()},  `;

        this.NvidiaCom.status = true;
        this.notify();
        for (let i = 0; i < this.NvidiaCom.list.length; i++) {
          if (this.NvidiaCom.list[i].offer === true) {
            this.logs.push({
              date: date,
              gpu: this.NvidiaCom.list[i].gpu,
              offer: this.NvidiaCom.list[i].offer,
              price: this.NvidiaCom.list[i].price,
            });
          } else {
          }
        }
      } else {
        this.isActive = false;
      }
    },
    logs: function (newVal, oldVal) {
      console.log(oldVal, newVal);
    },
  },
  methods: {
    toggleClass: function (event) {
      this.isActive = !this.isActive;
    },
    notify() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#Parameters
      this.$notification.show(
        "ALERT",
        {
          body: `CARDS AVAILABLE`,
        },
        {}
      );
    },
    askNvidiaCom() {
      this.axios
        .get(this.NvidiaCom.url)
        .then((response) => {
          var c = response.data.searchedProducts.productDetails;
          this.NvidiaCom.list.push({
            gpu: response.data.searchedProducts.featuredProduct.gpu,
            price: response.data.searchedProducts.featuredProduct.productPrice,
            offer: response.data.searchedProducts.featuredProduct.isOffer,
          });
          for (let i = 0; i < c.length; i++) {
            this.NvidiaCom.list.push({
              gpu: c[i].gpu,
              price: c[i].productPrice,
              offer: c[i].isOffer,
            });
          }

          for (let i = 0; i < this.NvidiaCom.list.length; i++) {
            if (this.NvidiaCom.list[i].offer === false) {
              this.NvidiaCom.status = false;
            } else {
              this.NvidiaCom.status = true;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.NvidiaCom.loading = false));
    },
    countdown() {
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer -= 1;
          this.countdown();
        }, 1000);
      } else {
        this.timer = 60;
        this.countdown();
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: monospace, sans-serif;
  text-shadow: 0px 0px 3px black;
  color: #1e4d49;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 500px;
  margin: auto;
  border: 1px solid #333944;
  margin-top: 5vh;
  border-radius: 5px;
  background-color: #3339442b;
  box-shadow: 0px 0px 8px #0f0f0f;
}
#app > div {
  display: flex;
  flex-basis: 100%;
  align-items: baseline;
  padding: 10px;
}
body {
  background-color: rgb(25, 26, 27);
}
#list {
  justify-content: space-around;
}
#logs {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: auto;
  margin: 20px auto;
  color: #3f444a;
  font-family: monospace, sans-serif;
  text-shadow: 0px 0px 3px black;
}
#logs p:first-child {
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.wrap {
  border: 1px solid #19dcea;
  animation: color-change-2x 5s linear infinite alternate both;
}
#timer {
  padding: 31px;
  justify-content: space-around;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: #7151b7;
}
#title {
  padding: 31px;
  justify-content: space-around;
  text-transform: uppercase;
  color: #ffffff52;
}

@keyframes color-change-2x {
  0% {
    border-color: #19dcea;
  }
  100% {
    border-color: #b22cff;
  }
}
</style>
