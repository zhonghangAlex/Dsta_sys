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
            [32, '李旻烜'],
            [40, '林予晗'],
            [64, '刘恩源'],
            [77, '刘胜'],
            [79, '饶永兴'],
            [85, '陈树钊'],
            [86, '许浩'],
            [88, '李博文'],
            [93, '李钟航']
          ]
        },
        grid: {
          left: '4%',
          right: '4%',
          top: '3%',
          containLabel: true
        },
        xAxis: { name: '答题次数' },
        yAxis: { type: 'category' },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 0,
          max: 100,
          text: ['高频答题（次数）', '低频答题（次数）'],
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
              x: '答题次数',
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
