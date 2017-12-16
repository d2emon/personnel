<template>
  <b-container>
    <main>
      <b-form @submit="saveModel" v-if="model">
        <b-button-toolbar class="form-toolbar">
          <b-button-group>
            <b-button type="submit" variant="primary">Сохранить</b-button>
            <b-button type="reset" variant="secondary" @click="closeEditor">Отмена</b-button>                        
          </b-button-group>
        </b-button-toolbar>
        <b-card no-body class="overtab position">
          <div class="main-tabs">
          <b-tabs small card ref="tabs" v-model="tabIndex">
            <b-tab title="Карточки">
              <b-card class="main-tab">
              <b-row>
                <b-col md="8">
                  <b-card>
                    <b-form-group horizontal label="Табельный номер:" label-for="tab_no">
                      <b-form-input id="tab_no" size="sm" type="number" v-model="model.position.tab_no"></b-form-input>
                    </b-form-group>
                    <div>
                      <b-form-group horizontal label="Фамилия:" label-for="last_name">
                        <b-form-input id="last_name" size="sm" plaintext v-model="model.last_name"></b-form-input>
                      </b-form-group>
                      <b-form-group horizontal label="Имя:" label-for="first_name">
                        <b-form-input id="first_name" size="sm" plaintext v-model="model.first_name"></b-form-input>
                      </b-form-group>
                      <b-form-group horizontal label="Отчество:" label-for="second_name">
                        <b-form-input id="second_name" size="sm" plaintext v-model="model.second_name"></b-form-input>
                      </b-form-group>                      
                    </div>
                  </b-card>
                  <br>
                  <b-card>
                    <b-form-group horizontal label="Отдел:" label-for="department" v-if="model.position.department">
                      <b-form-input id="department" size="sm" plaintext v-model="model.position.department.title"></b-form-input>
                    </b-form-group>
                    <b-form-group horizontal label="Должность:" label-for="job" v-if="model.position.job">
                      <b-form-input id="job" size="sm" plaintext v-model="model.position.job.title"></b-form-input>
                    </b-form-group>
                    <div v-if="model.position.job">
                      <b-form-group horizontal label="Категория:" label-for="job" v-if="model.position.job.category">
                        <b-form-input id="job" size="sm" plaintext v-model="model.position.job.category.title"></b-form-input>
                      </b-form-group>
                    </div>
                    <b-form-group horizontal label="Совместительство:" label-for="department" v-if="model.position.department">
                      <b-form-input id="department" size="sm" plaintext v-model="partnerships[model.position.partnership_id]"></b-form-input>
                    </b-form-group>
                  </b-card>
                  <br>
                  <b-card>
                    <b-form-group horizontal label="Приказ:" label-for="orderNo">
                      <b-form-input id="orderNo" plaintext type="text" v-model="model.position.order"></b-form-input>
                    </b-form-group>
                    <b-form-group horizontal label="Дата выхода на работу:" label-for="workFrom">
                      <b-form-input id="workFrom" size="sm" plaintext v-model="model.position.work_from_text"></b-form-input>
                    </b-form-group>
                  </b-card>
                </b-col>
                <b-col md="4">
                  <b-card class="photo-block">
                    <div ref="testRef">gg</div>
                    <div>ФОТО:"{{model.image_file}}"</div>
                    <b-btn @click="uploadImages">Reload</b-btn>
                    <vue-dropzone ref="fotoDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-file-added="uploadFoto"></vue-dropzone>
                  </b-card>
                </b-col>
              </b-row>
              <br>
              <b-form-group horizontal label="Комментарий:" label-for="comment">
                <b-form-input id="comment" type="text" v-model="model.comment"></b-form-input>
              </b-form-group>
              </b-card>
            </b-tab>
            <b-tab title="Работа">
              <position-job :model="model"></position-job>
            </b-tab>    
            <b-tab title="Паспорт">
              <position-pass :model="model"></position-pass>
            </b-tab> 
            <b-tab title="Образование" :disabled="true">
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>            
            <b-tab title="ВУ" :disabled="true">
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>            
            <b-tab title="Поощрения" :disabled="true">
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>            
            <b-tab title="Разное" :disabled="true">
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>            
            <b-tab title="Трудовые" :disabled="true">
              <b-card no-body>
                ввв
              </b-card>
            </b-tab> 
            <!--
            <b-tab title="Дополнительно" disabled>
              <b-card no-body>
                ввв
              </b-card>
            </b-tab>
            --> 

          </b-tabs>
          </div>
        </b-card>

      </b-form>
    </main>
  </b-container>
</template>

<script>
import PositionJob from './PositionJob'
import PositionPass from './PositionPass'

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'

var Db = require('../../db.js')
var moment = require('moment')

export default {
  name: 'vacancy',
  components: {
    PositionJob,
    PositionPass,
    vueDropzone: vue2Dropzone
  },
  data: function () {
    var model = null
    // this.departmentId = this.$route.params.id

    /*
    if (this.value) {
      model = this.value
    } else {
      model = new Db.EmploymentModel()
    }
    */

    // this.fetchData()

    return {
      isBusy: true,
      tabIndex: 0,
      tabIndexJob: 0,
      tabIndexPass: 0,

      model: model,

      partnerships: [
        'Постоянный',
        'Совместитель',
        'Договорник'
      ],

      departments: [],
      jobs: [],
      department: null,
      jobId: null,
      departmentId: null,

      order_from: moment().format('YYYY-MM-DD'),
      work_from: moment().format('YYYY-MM-DD'),

      dropzoneOptions: {
        // url: 'https://httpbin.org/post',
        url: '/',
        thumbnailWidth: 100,
        maxFilesize: 0.5,
        clickable: true,
        headers: { 'My-Awesome-Header': 'header value' }
      },

      moment: moment
    }
  },
  methods: {
    fetchData: function () {
      var doc = this
      this.isBusy = true

      console.log('Fetch positions')
      console.log({
        title: 'Params',
        params: this.$route.params
      })

      if (this.$route.params.id !== '0') {
        // Db.PersonModel.find({}).exec(function (err, model) {
        Db.PersonModel.findById(this.$route.params.id).exec(function (err, model) {
          console.log({
            title: 'Person found',
            id: doc.$route.params.id,
            person: model
          })
          doc.isBusy = false

          if (err) {
            alert(err)
            return
          }

          if (!model) {
            model = new Db.PersonModel()
          }

          doc.model = model
          console.log('Position')
          console.log(model)
          if (!model.address) {
            model.address = new Db.AddressModel()
          }
          if (!model.document) {
            model.document = new Db.DocumentModel()
          }
          if (!model.document.registration) {
            model.document.registration = new Db.RegistrationModel()
          }

          doc.order_from = moment(model.position.order_from).format('YYYY-MM-DD')
          doc.work_from = moment(model.position.work_from).format('YYYY-MM-DD')
          doc.position = model.position

          let job = model.job
          if (job) {
            doc.jobId = job.id
          }

          let department = model.department
          if (department) {
            doc.departmentId = department.id
          }

          doc.uploadImages()
        })
      } else {
        this.model = new Db.PersonModel()
      }

      if (this.$route.params.department !== '0') {
        Db.DepartmentModel.findById(this.$route.params.department, function (err, model) {
          if (err) {
            alert(err)
            return
          }

          doc.department = model
        })
      }

      this.departments = []
      Db.DepartmentModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        doc.departments = models
      })

      this.jobs = []
      Db.JobModel.find({}, function (err, models) {
        if (err) {
          alert(err)
          return
        }

        doc.jobs = models
      })
    },
    uploadImages: function () {
      let filename = 'images/' + this.model.id + '.jpg'
      console.log('Upload fotos')
      console.log(this.model)
      console.log(filename)
      console.log(this.$refs)
      if (this.$refs.fotoDropzone) {
        console.log('found')
        this.$refs.fotoDropzone.manuallyAddFile(filename, '', function () {
          console.log('Foto uploaded')
        })
      } else {
        console.log('not found')
      }
      console.log(this.$refs.tabs)
      /*  */
    },
    saveModel: function (e) {
      e.preventDefault()

      let doc = this
      Db.JobModel.findById(this.jobId, function (err, job) {
        if (err) {
          alert(err)
          return
        }

        doc.model.job = job

        Db.DepartmentModel.findById(doc.departmentId, function (err, department) {
          if (err) {
            alert(err)
            return
          }

          let positionId = doc.model.positions.length - 1
          let partnershipId = doc.model.position.partnership_id
          if (positionId < 0) {
            if (!doc.model.position) {
              doc.model.position = new Db.PositionModel()
            }
            doc.model.positions.push(doc.model.position)
          }
          doc.model.position = doc.model.positions[doc.model.positions.length - 1]
          doc.model.position.order_from = doc.order_from
          doc.model.position.work_from = doc.work_from
          doc.model.position.partnership_id = partnershipId

          doc.model.department = department
          doc.model.save()

          doc.$router.push('/positions')
          // doc.$router.go(-1)
        })
      })
    },
    uploadFoto: function (file) {
      alert(file.path)
      console.log(file)

      var fs = require('fs')
      var dest = 'images/' + this.model.id + '.jpg'

      var rd = fs.createReadStream(file.path)
      /*
      rd.on("error", function(err) {
        done(err)
      })
      */
      var wr = fs.createWriteStream(dest)
      /*
      wr.on("error", function(err) {
        done(err)
      })
      */
      /*
      wr.on("close", function(ex) {
        done()
      })
      */
      rd.pipe(wr)

      /*
      function done(err) {
        if (!cbCalled) {
          cb(err);
          cbCalled = true;
        }
      }
      */
    },
    closeEditor: function (e) {
      e.preventDefault()
      this.$router.go(-1)
    }
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>

<style>
.overtab {
  overflow: auto;
  font-size: 14px;
}
.overtab .col-form-legend {
  font-size: 14px;
}
.position {
  height: calc(100vh - 125px);  
}
.main-tabs {
  min-width: 800px;
}
.main-tab {
  overflow: auto;
  height: calc(100vh - 215px);
  /* width: 650px; */
  width: 100%;
  padding: 0px 20px;
  /* height: 100%; */
}
.pass-tab {
  height: calc(100vh - 250px);
}
.photo-block {
  height: 100%;
}
.form-toolbar {
  padding: 10px 0px;  
}
</style>
