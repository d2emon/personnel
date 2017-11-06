<template>
  <div>

    <div id="wrapper">
      <main>
        <b-container fluid>
          <b-row>
            <b-col md="3" class="well">
              <b-card>
                <b-nav vertical>
                  <b-nav-item @click="selectedDepartment='Все'" active="selectedDepartment == 'Все'">Все</b-nav-item> 
                  <b-nav-item v-for="department in departments" @click="selectedDepartment=department">{{ department }}</b-nav-item> 
                </b-nav>
              </b-card>
            </b-col>
            <b-col md="9">
              <b-card>
                <h2>{{ selectedDepartment }}</h2>
                <b-card no-body>
                  <b-tabs small card ref="tabs" v-model="tabIndex">
                    <b-tab title="General">
                      <b-navbar type="dark" variant="primary" toggleable>
                        <b-nav-toggle target="nav_dropdown_collapse"></b-nav-toggle>
                        <b-collapse is-nav id="nav_dropdown_collapse">
                          <b-nav is-nav-bar>
                            <b-nav-item href="#">Home</b-nav-item>
                            <b-nav-item href="#">Link</b-nav-item>
                            <!-- Navbar dropdowns -->
                            <b-nav-item-dropdown text="Lang" right>
                              <b-dropdown-item href="#">EN</b-dropdown-item>
                              <b-dropdown-item href="#">ES</b-dropdown-item>
                              <b-dropdown-item href="#">RU</b-dropdown-item>
                              <b-dropdown-item href="#">FA</b-dropdown-item>
                            </b-nav-item-dropdown>
                            <b-nav-item-dropdown text="User" right>
                              <b-dropdown-item href="#">Account</b-dropdown-item>
                              <b-dropdown-item href="#">Settings</b-dropdown-item>
                            </b-nav-item-dropdown>
                          </b-nav>
                        </b-collapse>
                      </b-navbar>
                      <b-table striped hover :items="items" :fields="fields"></b-table>
                    </b-tab>
                    <b-tab title="Edit profile">
                      I'm the second tab
                      <b-card>I'm the card in tab</b-card>
                      <b-table striped hover :items="items" :fields="fields"></b-table>
                    </b-tab>
                    <b-tab title="Info">
                      <b-navbar type="dark" variant="primary" toggleable>
                        <b-nav-toggle target="nav_dropdown_collapse"></b-nav-toggle>
                        <b-collapse is-nav id="nav_dropdown_collapse">
                          <b-nav is-nav-bar>
                            <b-nav-item href="#">Home</b-nav-item>
                            <b-nav-item href="#">Link</b-nav-item>
                            <!-- Navbar dropdowns -->
                            <b-nav-item-dropdown text="Lang" right>
                              <b-dropdown-item href="#">EN</b-dropdown-item>
                              <b-dropdown-item href="#">ES</b-dropdown-item>
                              <b-dropdown-item href="#">RU</b-dropdown-item>
                              <b-dropdown-item href="#">FA</b-dropdown-item>
                            </b-nav-item-dropdown>
                            <b-nav-item-dropdown text="User" right>
                              <b-dropdown-item href="#">Account</b-dropdown-item>
                              <b-dropdown-item href="#">Settings</b-dropdown-item>
                            </b-nav-item-dropdown>
                          </b-nav>
                        </b-collapse>
                      </b-navbar>
                      <b-table striped hover :items="items" :fields="fields"></b-table>
                  </b-tab>
                </b-tabs>
                </b-card>
              </b-card>
            </b-col>
          </b-row> 
        </b-container>
      </main>
    </div>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    // name: 'HelloWorld',
    components: { SystemInformation },
    data () {
      return {
        msg: 'Departments list',
        departments: [
          'Отдел кадров',
          'Отдел снабжения',
          'Бухгалтерия',
          'Руководство'
        ],
        selectedDepartment: 'Все',
        tabIndex: 0,
        fields: [
          {
            key: 'first_name',
            label: 'Имя',
            sortable: true
          },
          {
            key: 'last_name',
            label: 'Фамилия',
            sortable: true
          },
          {
            key: 'age',
            label: 'Возраст',
            sortable: true,
            variant: 'success'
          }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'McDonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson', _rowVariant: 'danger' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
</style>
