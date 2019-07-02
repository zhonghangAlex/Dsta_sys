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
            [33, '李博文'],
            [40, '李旻烜'],
            [46, '刘恩源'],
            [67, '刘胜'],
            [74, '饶永兴'],
            [83, '李钟航'],
            [89, '林予晗'],
            [95, '许浩']
          ]
        },
        grid: {
          left: '4%',
          right: '4%',
          top: '3%',
          containLabel: true
        },
        xAxis: { name: '正确率（%）' },
        yAxis: { type: 'category' },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 20,
          max: 100,
          text: ['高正确率（%）', '低正确率（%）'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#accdff', '#3e6ec7']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: '正确率（%）',
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
