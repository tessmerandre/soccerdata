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

        <div v-if="seasonList.length" class="row q-px-xl justify-between">
          <div class="col-3"><strong>NOME</strong></div>
          <div class="col-3"><strong>PERÍODO</strong></div>
          <div class="col-3"><strong>ORGANIZADOR</strong></div>
          <div class="col-1"></div>
          <div class="col-1"></div>
          <div class="col-1"></div>
        </div>

        <q-list v-if="seasonList.length" separator>

          <q-card
          class="q-mb-lg"
          bordered
          v-for="(season, index) in this.seasonList"
          :key="season.nome">

            <q-card-section>
              <div class="row q-px-xl q-mt-sm justify-between" style="font-weight: bold">
                <div class="col-3 text-h6">
                  {{season.nome}}
                </div>

                <div class="col-3 text-h6">
                  {{season.inicio}} - {{season.fim}}
                </div>

                <div class="col-3 text-h6">
                  {{season.organizador}}
                </div>

                <div class="flex col-3 justify-between">
                  <div class="col-1">
                    <q-btn color="black" text-color="white" @click="openMatchs = !openMatchs" label="Partidas"/>
                  </div>

                  <div class="col-1">
                    <q-btn round color="green" icon="edit" @click="chamarModalEdit(index)"/>
                  </div>

                  <div class="col-1">
                    <q-btn round color="red" icon="delete" @click="chamaModalDelete(index)" />
                  </div>
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
                  <q-input outlined v-model="season.inicio" mask="date" label="Data de Início">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="season.inicio">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                </q-input>
                </div>

                <div>
                  <q-input outlined v-model="season.fim" mask="date" label="Data de Término">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="season.fim">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                </q-input>
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

        <q-dialog v-model="openEditModal" :position="'right'" full-height>
          <q-card style="width: 400px">
            <q-card-section>
              <div class="text-h6" style="font-weight: bolder">Adicionar Temporada</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                @submit="EditSeason()"
                @reset="onReset"
                class="q-gutter-md"
              >
                <div>
                    <q-input outlined v-model="season.nome" label="Nome do Compeonato" />
                </div>

                <div>
                  <q-input outlined v-model="season.inicio" mask="date" label="Data de Início">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="season.inicio">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                </q-input>
                </div>

                <div>
                  <q-input outlined v-model="season.fim" mask="date" label="Data de Fim">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="season.fim">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                </q-input>
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
      </q-card>

      <div
        v-if="!seasonList.length"
        class="absolute-center" align="center">
        <div class="text-h4 text-primary" align="center">
          Nenhuma Temporada Adicionada
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      openCreateModal: false,
      openEditModal: false,
      confirm: false,
      indexList: -1,
      openMatchs: false,
      options: [],
      season: {
        nome: '',
        inicio: '',
        fim: '',
        organizador: '',
        times: []
      },
      seasonList: [],
      teamList: ['Time 1', 'Time 2', 'Time 3', 'Time 4', 'Time 5', 'Time 6', 'Time 7', 'Time 8', 'Time 9', 'Time 10', 'Time 11', 'Time 12', 'Time 13', 'Time 14', 'Time 15', 'Time 16', 'Time 17', 'Time 18', 'Time 19', 'Time 20', 'Time 21', 'Time 22'],
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
          golsTime1: '2',
          golsTime2: '1'
        },
        {
          time1: 'palmeiras',
          time2: 'flamengo',
          golsTime1: '1',
          golsTime2: '3'
        }
      ]
    }
  },

  created () {
    this.seasonList.push({
      nome: 'Brasileirão',
      inicio: '2019/04/27',
      fim: '2019/12/08',
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

    chamarModalEdit (index) {
      this.indexList = index
      this.openEditModal = true
      this.season = this.seasonList[this.indexList]
    },

    EditSeason () {
      this.seasonList[this.indexList] = this.season
      this.onReset()
    },

    onReset () {
      this.openCreateModal = false
      this.openEditModal = false
      this.season = {
        nome: '',
        inicio: '',
        fim: '',
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
    }
  }
}
</script>

<style>
  .bg {
    background: #EBEBEB;
  }
</style>
