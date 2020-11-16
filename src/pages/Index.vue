<template>
  <q-page>
    <main class="page">
      <section class="header">
        <h1 class="title">
          <div class="title-original">
            Hire me!
          </div>
          <div class="title-half title-upper">
            Hire me!
          </div>
          <div class="title-half title-lower">
            Hire me!
          </div>
        </h1>
        <h2 class="subtitle">I know how to code.</h2>
        <nav class="carousel">
          <button v-for="slide in slides" v-on:click="showThisSlide" :key="slide.id" :class="slide.selected" :value="slide.text" >{{slide.id+1}}</button>
        </nav>
        <div class="flex justify-center">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md q-pt-lg"
            style="width: 400px; p"
            action="/api"
            method="post"
            ref="form"
          >
            <q-input
              filled
              v-model="name"
              label="Your name *"
              hint="Name or nickname"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              v-model="message"
              label="Your message *"
              hint="Say something to me"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-toggle v-model="accept" label="I accept" />

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>

        </div>
      </section>
      <section class="socials">
        <a href="https://github.com/HappyViki/" class="github">GitHub</a>
        <div class="line"></div>
        <a href="https://www.linkedin.com/in/veronica-eulenberg/" class="linkedin">LinkedIn</a>
      </section>
      <p class="credit">Inspired by <a href="https://www.franshalsmuseum.nl/en/">Frans Hals Museum</a>'s website.</p>
    </main>
  </q-page>
</template>

<script>

// use axios to fetch from backend https://quasar.dev/quasar-cli/ajax-requests

export default {
  name: 'PageIndex',
  data: () => ({
    slides: [
      { id: 0, text: 'I know how to code.', selected: 'selected' },
      { id: 1, text: 'CSS is my jam.', selected: '' },
      { id: 2, text: 'JavaScript is my peanut butter.', selected: '' },
      { id: 3, text: 'HTML is my sourdough bread.', selected: '' },
      { id: 4, text: 'Building blocks for your road.', selected: '' }
    ],
    name: null,
    message: null,
    accept: false
  }),
  mounted: function () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.$axios.get('/')
        .then((response) => {
          console.log('response.data', response.data)
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
    },
    showThisSlide: function (e) {
      document.querySelector('.subtitle').innerText = e.target.value
      document.querySelector('.selected').classList.remove('selected')
      e.target.classList.add('selected')
    },
    onSubmit: function (e) {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Please accept the acceptance.'
        })
      } else {
        this.$axios.get('/add_message', {
          params: { name: this.name, message: this.message }
        })
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset: function () {
      this.name = null
      this.message = null
      this.accept = false
    }
  }
}
</script>

<style>
/* Inspo: https://www.franshalsmuseum.nl/en/ */
/* TODO: use font plugin https://stackoverflow.com/questions/51516084/how-do-i-add-a-google-font-to-a-vuejs-component */

@import url('https://fonts.googleapis.com/css2?family=Wendy+One&display=swap');

body {
  margin: 0;
  background: #ffc0cb;
  /* pink */
  font-family: sans-serif;
}

h1 {
  margin: 0;
}

.credit {
  text-align: center;
}

.hide {
  display: none;
}

.header {
  text-align: center;
  padding: 32px 0;
}

.title {
  position: relative;
}

.title div {
  font-family: 'Wendy One', sans-serif;
  font-size: 128px;
}

.title-original {
  visibility: hidden;
}

.title-half {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.title-upper {
  animation-delay: 0.5s;
  animation-duration: 2s;
  animation-name: slideintop;
}

.title-lower {
  animation-delay: 0.5s;
  animation-duration: 2s;
  animation-name: slideinbottom;
}

.carousel button {
  background: black;
  border: none;
  border-radius: 40%;
  font-size: 32px;
  color: white;
  padding: 5px 10px;
}

.carousel button.selected {
  background: white;
  color: black;
}

.carousel button:hover {
  cursor: pointer;
}

.socials {
  background: white;
  text-align: center;
  margin-bottom: 32px;
}

.socials a {
  color: white;
  display: inline-block;
  background: black;
  border: solid 8px black;
  padding: 32px 64px;
  font-size: 32px;
  box-sizing: content-box;
  text-decoration: none;
  transition: 0.3s;
}

.socials a.github {
  margin-top: 18px;
  border-bottom: none;
  border-top-left-radius: 100px;
  border-bottom-right-radius: 100px;
}

.socials a.linkedin {
  margin-bottom: 18px;
  border-top: none;
  margin-right: 128px;
  border-bottom-left-radius: 100px;
  border-top-right-radius: 100px;
}

.socials a:hover {
  background: #ffc0cb;
  /* pink */
  color: black;
}

.line {
  border-bottom: solid 1px black;
}

@keyframes slideintop {
  0% {
    top: 0;
  }
  50% {
    top: -7px;
    color: #ffc0cb;
    /* pink */
  }
  100% {
    top: 0;
  }
}

@keyframes slideinbottom {
  0% {
    top: 0;
  }
  50% {
    top: 3px;
    font-size: 160px;
    opacity: 0.7;
  }
  100% {
    top: 0;
  }
}

@media only screen and (max-width: 600px) {
  .title div {
    font-size: 64px;
  }
  @keyframes slideintop {
    0% {
      top: 0;
    }
    50% {
      top: -7px;
      color: #ffc0cb;
      /* pink */
    }
    100% {
      top: 0;
    }
  }
  @keyframes slideinbottom {
    0% {
      top: 0;
    }
    50% {
      top: 3px;
      font-size: 80px;
      opacity: 0.7;
    }
    100% {
      top: 0;
    }
  }
}

.page {
  -webkit-animation: fadein 2s;
  /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s;
  /* Firefox < 16 */
  -ms-animation: fadein 2s;
  /* Internet Explorer */
  -o-animation: fadein 2s;
  /* Opera < 12.1 */
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */

@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */

@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */

@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Opera < 12.1 */

@-o-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
