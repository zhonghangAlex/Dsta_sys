<template>
  <div ref="dom"></div>
</template>

<script>
  import echarts from 'echarts'
  import { on, off } from '@/utils/tools'
  export default {
    name: 'trashCompRate',
    data () {
      return {
        dom: null,
        option: null
      }
    },
    methods: {
      resize () {
        this.dom.resize()
      }
    },
    mounted () {
      const option = {
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [345, '刘恩源'],
            [435, '许浩'],
            [457, '李博文'],
            [643, '饶永兴'],
            [700, '刘胜'],
            [822, '李钟航'],
            [834, '李旻烜'],
            [909, '林予晗']
          ]
        },
        grid: {
          left: '4%',
          right: '4%',
          top: '3%',
          containLabel: true
        },
        xAxis: { name: '学习时间（min）' },
        yAxis: { type: 'category' },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 0,
          max: 1000,
          text: ['高学习时间（min）', '低学习时间（min）'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#D7DA8B', '#E15457']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: '学习时间（min）',
              // Map the "product" column to Y axis
              y: '学生名称'
            }
          }
        ]
      }
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom)
        this.dom.setOption(option, true)
      })
      on(window, 'resize', this.resize)
    },
    beforeDestroy () {
      off(window, 'resize', this.resize)
    }
  }
</script>

<style scoped>

</style>
