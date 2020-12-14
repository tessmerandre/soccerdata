<template>
  <q-page class="q-pa-xl">
    <div class="flex flex-center">
      <q-card class="q-pa-xl q-px-auto bg" style="width: 1600px">

        <q-list separator>
          <q-card class="q-mb-xl">
            <q-card-section>
              <div class="flex justify-between">
                <div>
                  <div class="text-h6">Estádios</div>
                  <div class="text-subtitle2">Visualize e gerencie todos os estádios</div>
                </div>
                <div>
                  <q-btn color="black q-mt-sm" text-color="white" label="Adicionar Estádio" @click="openCreateModal = true"/>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-list>

        <div v-if="estadiumList.length" class="row q-pl-xl justify-between">
          <div class="col-3"><strong>NOME</strong></div>
          <div class="col-3"><strong>CAPACIDADE</strong></div>
          <div class="col-3"><strong>LOCAL</strong></div>
          <div class="col-1"></div>
          <div class="col-1"></div>

        </div>

        <q-list v-if="estadiumList.length" separator>

          <q-card
          class="q-mb-lg"
          bordered
          v-for="(estadium, index) in this.estadiumList"
          :key="estadium.nome">

            <q-card-section>
              <div class="row q-pl-xl q-mt-sm justify-between" style="font-weight: bold">
                <div class="col-3 text-h6">
                  {{estadium.nome}}
                </div>

                <div class="col-3 text-h6">
                  {{estadium.capacidade}}
                </div>

                <div class="col-3 text-h6">
                  {{estadium.cidade}} - {{estadium.estado}}
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
              <div class="text-h6" style="font-weight: bolder">Adicionar Estádio</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <div>
                    <q-input outlined v-model="estadium.nome" label="Nome do Estádio" />
                </div>

                <div>
                  <q-input outlined v-model="estadium.capacidade" label="Capacidade máxima" />
                </div>

                <div>
                  <q-input outlined v-model="estadium.cidade" label="Cidade" />
                </div>

                <div>
                  <q-input outlined v-model="estadium.estado" label="Estado" />
                </div>

                <div>
                  <q-file outlined v-model="estadium.imagem" label="Foto do Estádio">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                    <template v-slot:append>
                      <q-icon name="close" @click="estadium.imagem = null" class="cursor-pointer" />
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
              <div class="text-h6" style="font-weight: bolder">Editar Estádio</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                @submit="EditStadium"
                @reset="onReset"
                class="q-gutter-md"
              >
                <div>
                    <q-input outlined v-model="estadium.nome" label="Nome do Estádio" />
                </div>

                <div>
                  <q-input outlined v-model="estadium.capacidade" label="Capacidade máxima" />
                </div>

                <div>
                  <q-input outlined v-model="estadium.cidade" label="Cidade" />
                </div>

                <div>
                  <q-input outlined v-model="estadium.estado" label="Estado" />
                </div>

                <div>
                  <q-file outlined v-model="estadium.imagem" label="Foto do Estádio">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                    <template v-slot:append>
                      <q-icon name="close" @click="estadium.imagem = null" class="cursor-pointer" />
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
              <span class="q-ml-sm">Tem certeza que deseja deletar esse estádio?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Deletar" color="primary" @click="deleteStadium"/>
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </q-card>

      <div
        v-if="!estadiumList.length"
        class="absolute-center" align="center">
        <div class="text-h4 text-primary" align="center">
          Nenhum Estádio Adicionado
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
      estadium: {
        nome: '',
        capacidade: null,
        cidade: '',
        estado: '',
        imagem: null
      },
      estadiumList: []
    }
  },

  created () {
    this.estadiumList.push({
      nome: 'Arena do Grêmio',
      capacidade: 60540,
      cidade: 'Porto Alegre',
      estado: 'RS',
      imagem: null
    })
  },

  methods: {
    onSubmit () {
      this.estadiumList.push(this.estadium)
      this.onReset()
      this.$q.notify({
        type: 'positive',
        message: 'Estádio adicionado com sucesso'
      })
    },

    chamarModalEdit (index) {
      this.indexList = index
      this.openEditModal = true
      this.estadium = this.estadiumList[this.indexList]
    },

    EditStadium () {
      this.estadiumList[this.indexList] = this.estadium
      this.onReset()
    },

    onReset () {
      this.openCreateModal = false
      this.openEditModal = false
      this.estadium = {
        nome: '',
        capacidade: null,
        cidade: '',
        estado: '',
        imagem: null
      }
    },

    chamaModalDelete (index) {
      this.confirm = true
      this.indexList = index
    },

    deleteStadium () {
      this.estadiumList.splice(this.indexList, 1)
      this.confirm = false
      this.$q.notify({
        type: 'positive',
        message: 'Estádio deletado com sucesso'
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
