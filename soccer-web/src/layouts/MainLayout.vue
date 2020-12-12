<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">SoccerData</div>
        <div class="text-subtitle1">Pra resgistrar suas temporadas, times e estádios</div>
      </div>
      <q-img
      src="../assets/estadio.jpg"
      class="header-image absolute-top"/>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="350"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item class="teste" clickable v-ripple to="/temporadas">
              <q-item-section avatar>
                <q-icon name="emoji_events" />
              </q-item-section>

              <q-item-section>
                <h5>Temporadas</h5>
              </q-item-section>
            </q-item>

            <q-item class="teste" clickable v-ripple to="/times">
              <q-item-section avatar>
                <q-icon name="local_police" />
              </q-item-section>

              <q-item-section>
                <h5>Times</h5>
              </q-item-section>
            </q-item>

            <q-item class="teste" clickable v-ripple to="/estadios">
              <q-item-section avatar>
                <q-icon name="house" />
              </q-item-section>

              <q-item-section>
                <h5>Estádios</h5>
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="../assets/estadio.jpg" style="height: 192px">
          <div class="absolute-bottom bg-transparent">
            <!-- <q-avatar size="56px" class="q-mb-sm">
              <img src="../assets/logo-soccerdata.png">
            </q-avatar>
            <div class="text-weight-bold">Usuário teste</div>
            <div>@teste</div> -->
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>

    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
  .header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.5;
  }

  .teste {
    height: 70px;
  }

</style>
