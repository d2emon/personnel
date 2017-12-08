<template>
              <b-card no-body>
                <b-tabs small card ref="tabs" v-model="tabIndexPass">
                  <b-tab title="Личность">
                    <div class="main-tab pass-tab">
                      <b-card v-if="model">
                        <b-row>
                          <b-col>
                            <b-form-group horizontal label="Фамилия:" label-for="last_name">
                              <b-form-input id="last_name" v-model="model.last_name"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Имя:" label-for="first_name">
                              <b-form-input id="first_name" v-model="model.first_name"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Отчество:" label-for="second_name">
                              <b-form-input id="second_name" v-model="model.second_name"></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col>
                            <b-form-group horizontal label="Фамилия:" label-for="last_name">
                              <b-form-input id="last_name" v-model="model.last_name"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Имя:" label-for="first_name">
                              <b-form-input id="first_name" v-model="model.first_name"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Отчество:" label-for="second_name">
                              <b-form-input id="second_name" v-model="model.second_name"></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-card>
                      <br>
                      <b-row>
                        <b-col>
                          <b-card title="Место" v-if="model.address">
                            <b-form-group horizontal label="Город:" label-for="city">
                              <b-form-input id="city" v-model="model.address.city"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Район:" label-for="district">
                              <b-form-input id="district" v-model="model.address.district"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Область:" label-for="region">
                              <b-form-input id="region" v-model="model.address.region"></b-form-input>
                            </b-form-group>
                            <b-form-group horizontal label="Страна:" label-for="country">
                              <b-form-input id="country" v-model="model.address.country"></b-form-input>
                            </b-form-group>
                            <hr>                         
                            <b-form-group horizontal label="Проживает:" label-for="fact">
                              <b-form-input id="fact" v-model="model.address.fact"></b-form-input>
                            </b-form-group>
                          </b-card>
                        </b-col>
                        <b-col>
                          <b-card>
                            <b-form-group horizontal label="Пол:" label-for="sex">
                              <b-form-select id="sex" v-model="model.sex_id">
                                <option value="0">М</option>
                                <option value="1">Ж</option>
                              </b-form-select>
                            </b-form-group>                              
                            <hr>                         
                            <b-form-group horizontal label="Дата рождения:" label-for="birthday">
                              <b-form-input id="birthday" type="date" v-model="model.birthday"></b-form-input>
                            </b-form-group>                              
                            <div v-if="model.birthday">
                              <!-- b-table striped hover :items="model" :fields="fields">
                              </b-table -->
                            </div>                              
                          </b-card>
                        </b-col>
                      </b-row>                          
                    </div>
                  </b-tab>

                  <b-tab title="Документ" :disabled="!model.document">
                    <div class="main-tab pass-tab" v-if="model.document">
                      <b-card>
                        <b-form-group horizontal label="Серия:" label-for="series">
                          <b-form-input id="series" v-model="model.document.series"></b-form-input>
                        </b-form-group>
                        <b-form-group horizontal label="Номер:" label-for="document_no">
                          <b-form-input id="document_no" v-model="model.document.document_no"></b-form-input>
                        </b-form-group>
                        <b-form-group horizontal label="Кем выдан:" label-for="given_by">
                          <b-form-input id="given_by" v-model="model.document.given_by"></b-form-input>
                        </b-form-group>
                        <b-form-group horizontal label="Дата выдачи:" label-for="given_at">
                          <b-form-input id="given_at" type="date" v-model="model.document.given_at"></b-form-input>
                        </b-form-group>                                                      
                      </b-card>
                      <b-card title="Регистрация">
                        <b-form-group horizontal label="Адрес:" label-for="address">
                          <b-form-input id="address" v-model="model.document.registration.address"></b-form-input>
                        </b-form-group>
                        <b-form-group horizontal label="Дата с:" label-for="date_from">
                          <b-form-input id="date_from" type="date" v-model="model.document.registration.date_from"></b-form-input>
                        </b-form-group>                                                      
                        <b-form-group horizontal label="Дата по:" label-for="date_to">
                          <b-form-input id="date_to" type="date" v-model="model.document.registration.date_to"></b-form-input>
                        </b-form-group>                                                      
                        <b-form-group horizontal label="Телефон:" label-for="phone">
                          <b-form-input id="phone" v-model="model.phone"></b-form-input>
                        </b-form-group>
                     </b-card>
                    </div>
                  </b-tab>
                  <b-tab title="Семейное положение" disabled="true">
                    <div class="main-tab pass-tab">
                      <b-form-group horizontal label="Семейное положение:" label-for="family">
                        <!-- b-form-select id="family" v-model="model.sex_id">
                          <option value="0">М</option>
                          <option value="1">Ж</option>
                        </b-form-select -->
                      </b-form-group>                              
                      <div v-if="model.vacations">
                        <b-table striped hover :items="model.vacations" :fields="fields">
                        </b-table>
                      </div>
                      <div v-else>
                        <h5>Родственники отсутствуют</h5>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Страховое" disabled="true">
                    <div class="main-tab pass-tab">
                      <b-form-group horizontal label="№ страхового свидетельства:" label-for="phone">
                        <b-form-input id="phone" v-model="model.phone"></b-form-input>
                      </b-form-group>
                      <b-form-group horizontal label="ИНН:" label-for="phone">
                        <b-form-input id="phone" v-model="model.phone"></b-form-input>
                      </b-form-group>
                    </div>
                  </b-tab>                  
                </b-tabs>

              </b-card>
</template>

<script>
// var Db = require('../../db.js')

export default {
  name: 'position-pass',
  props: [
    'model'
  ],
  data: function () {
    return {
      isBusy: true,
      tabIndex: 0,
      tabIndexJob: 0,
      tabIndexPass: 0,
      departments: [],
      jobs: [],
      department: null,
      jobId: null,
      departmentId: null
    }
  }
}
</script>

<style>
.overtab {
  overflow: auto;
  height: calc(100vh - 70px);
  font-size: 14px;
}
.overtab .col-form-legend {
  font-size: 14px;
}
.main-tabs {
  min-width: 800px;
}
.main-tab {
  overflow: auto;
  height: calc(100vh - 180px);
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
