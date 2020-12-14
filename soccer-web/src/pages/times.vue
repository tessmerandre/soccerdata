<template>
  <q-page class="q-pa-xl">
    <div class="flex flex-center">
      <q-card class="q-pa-xl q-px-auto bg" style="width: 1600px">

        <q-list separator>
          <q-card class="q-mb-xl">
            <q-card-section>
              <div class="flex justify-between">
                <div>
                  <div class="text-h6">Times</div>
                  <div class="text-subtitle2">Visualize e gerencie todos os times</div>
                </div>
                <div>
                  <q-btn color="black q-mt-sm" text-color="white" label="Adicionar Time" @click="openCreateModal = true"/>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-list>

        <div v-if="teamList.length" class="row q-pl-xl justify-between">
          <div class="col-3"><strong>TIME</strong></div>
          <div class="col-3"><strong>TÉCNICO</strong></div>
          <div class="col-3"><strong>ESTADO</strong></div>
          <div class="col-1"></div>
          <div class="col-1"></div>
        </div>

        <q-list v-if="teamList.length" separator>

          <q-card
          class="q-mb-lg"
          bordered
          v-for="(team, index) in this.teamList"
          :key="team.nome">

          <q-card-section>
            <div class="row q-pl-xl q-mt-sm justify-between" style="font-weight: bold">
              <div class="col-3 text-h6">
                {{team.nome}}
              </div>

              <div class="col-3 text-h6">
                {{team.tecnico}}
              </div>

              <div class="col-3 text-h6">
                {{team.estado}}
              </div>

              <div class="col-1">
                <q-btn round color="green" icon="edit" @click="chamarModalEdit(index)"/>
              </div>

              <div class="col-1">
                <q-btn round color="red" icon="delete" @click="chamaModalDelete(index)" />
              </div>
            </div>
          </q-card-section>
          </q-card>
        </q-list>

        <q-dialog v-model="openCreateModal" :position="'right'" full-height>
          <q-card style="width: 400px">
            <q-card-section>
              <div class="text-h6" style="font-weight: bolder">Adicionar Time</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                @submit="onSubmit()"
                @reset="onReset()"
                class="q-gutter-md"
              >
                <div>
                    <q-input outlined v-model="team.nome" label="Nome do Time" />
                </div>

                <div>
                  <q-input outlined v-model="team.tecnico" label="Técnico" />
                </div>

                <div>
                  <q-input outlined v-model="team.criacao" mask="date" label="Data de Criação">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="team.criacao">
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
                  <q-input outlined v-model="team.estado" label="Estado" />
                </div>

                <div>
                  <q-file outlined v-model="team.imagem" label="Logo">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                    <template v-slot:append>
                      <q-icon name="close" @click="team.imagem = null" class="cursor-pointer" />
                    </template>
                  </q-file>
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
              <div class="text-h6" style="font-weight: bolder">Editar Time</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                @submit="editTeam()"
                @reset="onReset()"
                class="q-gutter-md"
              >
                <div>
                    <q-input outlined v-model="teamEdit.nome" label="Nome do Time" />
                </div>

                <div>
                  <q-input outlined v-model="teamEdit.tecnico" label="Técnico" />
                </div>

                <div>
                  <q-input outlined v-model="teamEdit.criacao" mask="date" label="Data de Criação">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="teamEdit.criacao">
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
                  <q-input outlined v-model="teamEdit.estado" label="Estado" />
                </div>

                <div>
                  <q-file outlined v-model="teamEdit.imagem" label="Logo">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                    <template v-slot:append>
                      <q-icon name="close" @click="teamEdit.imagem = null" class="cursor-pointer" />
                    </template>
                  </q-file>
                </div>

                <div>
                  <q-btn label="Editar" type="submit" color="primary"/>
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
              <span class="q-ml-sm">Tem certeza que deseja deletar esse time?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Deletar" color="primary" @click="deleteTeam"/>
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </q-card>

      <div
        v-if="!teamList.length"
        class="absolute-center" align="center">
        <div class="text-h4 text-primary" align="center">
          Nenhum Time Adicionado
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
      team: {
        nome: '',
        tecnico: '',
        criacao: '',
        estado: '',
        imagem: null
      },
      teamEdit: {
        nome: '',
        tecnico: '',
        criacao: '',
        estado: '',
        imagem: null
      },
      teamList: []
    }
  },

  created () {
    this.teamList.push({
      nome: 'Grêmio',
      tecnico: 'Renato',
      criacao: '1903/09/15',
      estado: 'RS',
      imagem: null
    })
  },

  methods: {
    createModal (modalState) {
      alert(modalState)
      this.createOrEdit = modalState
      this.openCreateModal = true
    },

    onSubmit () {
      this.teamList.push(this.team)
      this.onReset()
      this.$q.notify({
        type: 'positive',
        message: 'Time adicionado com sucesso'
      })
    },

    chamarModalEdit (index) {
      this.indexList = index
      this.openEditModal = true
      this.teamEdit = this.teamList[this.indexList]
    },

    editTeam () {
      this.teamList[this.indexList] = this.teamEdit
      this.onReset()
    },

    onReset () {
      this.openCreateModal = false
      this.openEditModal = false
      this.team = {
        nome: '',
        tecnico: '',
        criacao: '',
        estado: '',
        imagem: null
      }
      this.teamEdit = {
        nome: '',
        tecnico: '',
        criacao: '',
        estado: '',
        imagem: null
      }
    },

    chamaModalDelete (index) {
      this.confirm = true
      this.indexList = index
    },

    deleteTeam () {
      this.teamList.splice(this.indexList, 1)
      this.confirm = false
      this.$q.notify({
        type: 'positive',
        message: 'Time deletado com sucesso'
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
