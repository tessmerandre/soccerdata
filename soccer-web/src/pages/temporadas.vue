<template>
  <q-page class="q-pa-xl">
    <div class="flex flex-center">
      <q-card class="q-pa-xl q-px-auto bg" style="width: 1600px">

        <q-list separator>
          <q-card class="q-mb-xl">
            <q-card-section>
              <div class="flex justify-between">
                <div>
                  <div class="text-h6">Temporadas</div>
                  <div class="text-subtitle2">Visualize e gerencie todas as temporadas</div>
                </div>
                <div>
                  <q-btn color="black q-mt-sm" text-color="white" label="Adicionar Temporada" @click="openCreateModal = true"/>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-list>

        <div class="row q-pl-xl justify-between">
          <div class="col-3"><strong>NOME</strong></div>
          <div class="col-3"><strong>PERÍODO</strong></div>
          <div class="col-3"><strong>ORGANIZADOR</strong></div>
          <div class="col-1"></div>
          <div class="col-1"></div>
        </div>

        <q-list separator>

          <q-card
          class="q-mb-lg"
          bordered
          v-for="(season, index) in this.seasonList"
          :key="season.nome">

            <q-card-section>
              <div class="row q-pl-xl q-mt-sm justify-between" style="font-weight: bold">
                <div class="col-3 text-h6">
                  {{season.nome}}
                </div>

                <div class="col-3 text-h6">
                  {{season.periodo}}
                </div>

                <div class="col-3 text-h6">
                  {{season.organizador}}
                </div>

                <div class="col-1">
                  <q-btn color="black" text-color="white" @click="openMatchs = !openMatchs" label="Partidas"/>
                </div>

                <div class="col-1">
                  <q-btn round color="green" icon="edit" @click="editar(index)"/>
                </div>

                <div class="col-1">
                  <q-btn round color="red" icon="delete" @click="chamaModalDelete(index)" />
                </div>
              </div>
            </q-card-section>
            <q-markup-table v-if="openMatchs" flat bordered separator="horizontal">
              <thead class="bg-red">
                <tr style="font-weight: bold">
                  <th class="text-left">Time1</th>
                  <th class="text-right">Gols</th>
                  <th class="text-left">Gols</th>
                  <th class="text-right">Time2</th>
                </tr>
              </thead>
              <tbody class="bg-grey-3">
                <tr
                v-for="match in matchs"
                :key="match.time1"
                style="font-weight: bold"
                >
                  <td class="text-left bolder">{{match.time1}}</td>
                  <td class="text-right">{{match.golsTime1}}</td>
                  <td class="text-left">{{match.golsTime2}}</td>
                  <td class="text-right fa-bold">{{match.time2}}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card>

        </q-list>

        <q-dialog v-model="openCreateModal" :position="'right'" full-height>
          <q-card style="width: 400px">
            <q-card-section>
              <div class="text-h6" style="font-weight: bolder">Adicionar Temporada</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <div>
                    <q-input outlined v-model="season.nome" label="Nome do Compeonato" />
                </div>

                <div>
                  <q-input outlined v-model="season.organizador" label="Organizador" />
                </div>

                <div>
                  <q-select outlined multiple use-chips v-model="season.times" :options="options" label="Times" />
                </div>

                <div>
                  <q-btn label="Salvar" type="submit" color="primary"/>
                  <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="delete" color="red" text-color="white" />
              <span class="q-ml-sm">Tem certeza que deseja deletar essa temporada?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Deletar" color="primary" @click="deleteSeason"/>
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <div
          v-if="!seasonList.length"
          class="absolute-center" align="center">
          <div class="text-h5 text-primary" align="center">
            Nenhuma Temporada Adicionada
          </div>
        </div>

      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      openCreateModal: false,
      confirm: false,
      indexList: -1,
      openMatchs: false,
      options: [],
      season: {
        nome: '',
        periodo: '',
        organizador: '',
        times: []
      },
      seasonList: [],
      teamList: ['sdfsdf', 'sdfdsf', 'dsfdf', 'sdfdfsasdf', 'dfdsfasdf', 'dsfdfsasdf', 'sdfdsfasdf', 'sdfasdf', 'asdfsdfsd', 'sadf', 'adfdssdf', 'dfdsfs', 'd', 'f', 'teste2', 'teste3', 'testea2', 'teste3d', 'teste2b', 'teste3a', 'teste2f', 'teste3g', 'teste2h', 'teste3pp0', 'ausdh', 'dfghdfjgh', 'jkscfhuidfhgsdf'],
      matchs: [
        {
          time1: 'Gremio',
          time2: 'Inter',
          golsTime1: '3',
          golsTime2: '0'
        },
        {
          time1: 'santos',
          time2: 'curintia',
          golsTime1: '3',
          golsTime2: '0'
        },
        {
          time1: 'palmeiras',
          time2: 'flamengo',
          golsTime1: '3',
          golsTime2: '0'
        }
      ]
    }
  },

  created () {
    this.$axios.get('http://localhost/')
      .then(respose => {
        console.log('palavra')
      })
      .catch(error => {
        console.log(error)
      })
    this.seasonList.push({
      nome: 'Brasileirão',
      periodo: '27 de abril de 2019 - 8 de dezembro de 2019',
      organizador: 'CBF'
    })
    this.options = this.teamList
  },

  methods: {
    onSubmit () {
      this.seasonList.push(this.season)
      this.onReset()
      this.$q.notify({
        type: 'positive',
        message: 'Temporada adicionada com sucesso'
      })
    },

    onReset () {
      this.openCreateModal = false
      this.season = {
        nome: '',
        periodo: '',
        organizador: ''
      }
    },

    chamaModalDelete (index) {
      this.confirm = true
      this.indexList = index
    },

    deleteSeason () {
      this.seasonList.splice(this.indexList, 1)
      this.confirm = false
      this.$q.notify({
        type: 'positive',
        message: 'Temporada deletada com sucesso'
      })
    },

    editar (index) {
      this.season = this.seasonList[index]
      this.openCreateModal = true
    }
  }
}
</script>

<style>
  .bg {
    background: #EBEBEB;
  }
</style>
