import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '~/page/SignIn'
import Main from "~/page/Main"
import AddProject from '~/page/AddProject'
import MockList from '~/page/MockList'
import MockDetail from "~/page/MockDetail"
import ResponseDetail from "~/page/ResponseDetail"
import Setting from "~/page/Setting"
import SmsList from "~/page/SmsList"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: "/SignIn",
      name: "SignIn",
      component: SignIn
    },
    {
      path: "/AddProject",
      name: "AddProject",
      component: AddProject
    },
    {
      path: "/MockList",
      name: "MockList",
      component: MockList
    },
    {
      path: "/MockDetail",
      name: "MockDetail",
      component: MockDetail
    },
    {
      path: "/ResponseDetail",
      name: "ResponseDetail",
      component: ResponseDetail
    },
    {
      path: "/Setting",
      name: "Setting",
      component: Setting
    },
    {
      path: "/SmsList",
      name: "SmsList",
      component: SmsList
    }
  ]
})
