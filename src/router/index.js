import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/views/Welcome'
import OrdIndex from '@/views/OrdIndex'
import SuperIndex from '@/views/SuperIndex'
import Introduce from '@/components/Introduce'
import HashLearn from '@/components/HashLearn'
import AcaLearn from '@/components/AcaLearn'
import DstaTrip from '@/components/DstaTrip'
import QuesLearn from '@/components/QuesLearn'
import QuesMag from '@/components/QuesMag'
import StuLearn from '@/components/StuLearn'
import StuMag from '@/components/StuMag'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '*',
      redirect: '/welcome'
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/ordindex',
      name: 'OrdIndex',
      redirect: '/introduce',
      component: OrdIndex,
      children:[{
        path: '/introduce',
        name: 'Introduce',
        component: Introduce
      },{
        path: '/hashlearn',
        name: 'HashLearn',
        component: HashLearn
      },{
        path: '/acalearn',
        name: 'AcaLearn',
        component: AcaLearn
      },{
        path: '/dstalearn',
        name: 'DstaLearn',
        component: DstaTrip
      },{
        path: '/queslearn',
        name: 'QuesLearn',
        component: QuesLearn
      }]
    },
    {
      path: '/superindex',
      name: 'SuperIndex',
      redirect: '/quesmag',
      component: SuperIndex,
      children: [{
        path: '/quesmag',
        name: 'QuesMag',
        component: QuesMag
      },{
        path: '/stulearn',
        name: 'StuLearn',
        component: StuLearn
      },{
        path: '/stumag',
        name: 'StuMag',
        component: StuMag
      }]
    },

  ]
})
