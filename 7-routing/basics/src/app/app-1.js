import Vue from "vue";
const EventBus = new Vue();

window.addEventListener("popstate", () => {
  EventBus.$emit("navigate");
});

const DunkirkBlurb = {
  name: "DunkirkBlurb",
  template: `<div>
  <h2>Dunkirk</h2>
  <p class="movies__description">Miraculous evacuation of Allied soldiers from
    Belgium, Britain, Canada, and France, who were cut off and surrounded by
    the German army from the beaches and harbor of Dunkirk, France, during the
    Battle of France in World War II.</p>
</div>`,
};

const InterstellarBlurb = {
  name: "InterstellarBlurb",
  template: `<div>
  <h2>Interstellar</h2>
  <p class="movies__description">Interstellar chronicles the adventures of a
    group of explorers who make use of a newly discovered wormhole to surpass
    the limitations on human space travel and conquer the vast distances
    involved in an interstellar voyage.</p>
</div>`,
};

const TheDarkKnightRisesBlurb = {
  name: "TheDarkKnightRisesBlurb",
  template: `<div>
  <h2>The Dark Knight Rises</h2>
  <p class="movies__description">Batman encounters the mysterious Selina Kyle
    and the villainous Bane, a new terrorist leader who overwhelms Gotham's
    finest. The Dark Knight resurfaces to protect a city that has branded him
    an enemy.</p>
</div>`,
};

const routes = [
  {
    path: "/",
    component: {
      name: "index-blurb",
      template: "<h2>Pick a Christopher movie</h2>",
    },
  },
  { path: "/dunkirk", component: DunkirkBlurb },
  { path: "/interstellar", component: InterstellarBlurb },
  { path: "/the-dark-knight-rises", component: TheDarkKnightRisesBlurb },
];

const view = {
  name: "router-view",
  template: `<component :is="currentView"></component>`,
  data() {
    return {
      currentView: {},
    };
  },
  created() {
    if (this.getRouteObject() === undefined) {
      this.currentView = {
        template: "<h2>Not Found :( Pick a movie from the list!</h2>",
      };
    } else {
      this.currentView = this.getRouteObject().component;
    }
    EventBus.$on("navigate", () => {
      this.currentView = this.getRouteObject().component;
    });
  },
  methods: {
    getRouteObject() {
      return routes.find((route) => route.path === window.location.pathname);
    },
  },
};

const Link = {
  name: "router-link",
  template: '<a @click="navigate" :href="to" >{{ to }}</a>',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    navigate(evt) {
      evt.preventDefault();
      window.history.pushState(null, null, this.to);
      EventBus.$emit("navigate");
    },
  },
};

const App = {
  name: "App",
  template: `<div id="app">
    <div class="movies">
      <h2>Which movie?</h2>
      <router-link to="/dunkirk"></router-link>
      <router-link to="/interstellar"></router-link>
      <router-link to="/the-dark-knight-rises"></router-link>
    </div>
    <router-view/>
  </div>`,
  components: {
    "router-view": view,
    "router-link": Link,
  },
};

export default App;
