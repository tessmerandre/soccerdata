<template>
  <q-layout view="hHh Lpr fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo-soccerdata.png">
          </q-avatar>
          Soccer Data
        </q-toolbar-title>

        <q-btn color="white" text-color="black" label="Logout" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above behavior="desktop" bordered>
      <q-list bordered padding class="rounded-borders text-primary">

          <q-item to="/temporadas" exact>
            <q-item-section avatar>
              <img src="../assets/trophy.png">
            </q-item-section>

            <q-item-section>Temporadas</q-item-section>

          </q-item>

          <q-item to="/times" exact>
            <q-item-section avatar>
              <img src="../assets/football-club.png">
            </q-item-section>

            <q-item-section>Times</q-item-section>

          </q-item>

          <q-item to="/estadios" exact>
            <q-item-section avatar>
              <img src="../assets/stadium 1.png">
            </q-item-section>

            <q-item-section>Estádios</q-item-section>

          </q-item>

        </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
