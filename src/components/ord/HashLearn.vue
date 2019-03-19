<template>
    <div class="main_con">
      <div class="pad_con">

        <!-- <div class="line_con">
          <el-timeline>
            <el-timeline-item v-for="(item, index) in line_text" :key="index" :timestamp="item.line_title" placement="top">
              <el-card>
                <p class="line_p">{{ item.line_text }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div> -->

        <el-row class="hash_con">
          <el-col class="col_con"  :span="12">
            <el-card class="box-card hash_card">
              <div slot="header" class="clearfix">
                <span class="hash_title">哈希函数——基础概念解读</span>
                <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>
                
                <el-popover placement="top" width="260" v-model="hash_extra1">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;哈希表中元素是由哈希函数确定的。将数据元素的关键字K作为自变量，通过一定的函数关系（称为哈希函数），计算出的值，即为该元素的存储地址。表示为：</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Addr = H（key）</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为此在建立一个哈希表之前需要解决两个主要问题：</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⑴构造一个合适的哈希函数</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;均匀性 H（key）的值均匀分布在哈希表中；</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简单　以提高地址计算的速度</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⑵冲突的处理</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;冲突：在哈希表中，不同的关键字值对应到同一个存储位置的现象。即关键字K1≠K2，但H（K1）= H（K2）。均匀的哈希函数可以减少冲突，但不能避免冲突。发生冲突后，必须解决；也即必须寻找下一个可用地址。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="hash_extra1 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text" >
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在上一章的学习中，我们提到了生日碰撞的问题，可以看到相对较小的集体数，其生日重合的概率也是非常大的，那么这个问题和我们这一章要研究的<span style='color: #f56c6c; font-weight: 800'>“哈希函数”</span>有什么联系呢？</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;哈希函数和我们数学上所说的函数相似，是指基于某一种映射关系，将给定的任意长度的字符串转换为一个有限长度的新字符串，而且这个过程是单向不可逆的，例如：</p>
                <p class="tag_con"><el-tag class="text_tag">12345—>H(哈希函数)—>abc</el-tag><el-tag>12345abcde5678—>H(哈希函数)—>efg</el-tag></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对于例子中的哈希函数，即使给定一个更长的字符串，该函数也能将其转换为<span style='color: #FBC638; font-weight: 800'>3位</span>的字符串。因此哈希函数具有两个特点：</p>
                <p class="tag_con"><el-tag class="text_tag">1.转换单向不可逆</el-tag><el-tag>2.转换后位数固定</el-tag></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;那么基于哈希函数的两个特点，两个字符串在经过哈希转换后，有一定概率形成一段相同的字符串，例如：</p>
                <p class="tag_con"><el-tag class="text_tag">12345abcde5678—>H(哈希函数)—>efg</el-tag><el-tag>abcde12345fgh—>H(哈希函数)—>efg</el-tag></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因此我们就需要尽量避免这种情况的发生，以满足数字签名的要求，这就涉及到了发生哈希碰撞的概率，请继续学习进行了解！</p>
              </div>
            </el-card>
          </el-col>

          <el-col class="col_con"  :span="12">
            <el-card class="box-card hash_card">
              <div slot="header" class="clearfix">
                <span class="hash_title">哈希碰撞——概率描述</span>
                <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>
                
                <el-popover placement="top" width="260" v-model="hash_extra2">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;防止哈希碰撞的最有效方法，就是扩大哈希值的取值空间。</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16个二进制位的哈希值，产生碰撞的可能性是 65536 分之一。也就是说，如果有65537个用户，就一定会产生碰撞。哈希值的长度扩大到32个二进制位，碰撞的可能性就会下降到 4,294,967,296 分之一。</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更长的哈希值意味着更大的存储空间、更多的计算，将影响性能和成本。开发者必须做出抉择，在安全与成本之间找到平衡。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="hash_extra1 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text" >
                <el-col class="lr_con l_con"  :span="12">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过前面的学习，我们已经了解到发生哈希碰撞的概率要比我们想象中高很多，那么哈希碰撞概率的决定因素是什么呢？</p>
                  <p><el-tag class="text_tag">1.取值空间的大小（即哈希值的长度）</el-tag></p>
                  <p><el-tag class="text_tag">2.整个生命周期中，哈希值的计算次数</el-tag></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以生日问题为例，我们不难计算出，当哈希值的取值空间为<span style='color: #FBC638; font-weight: 800'>365</span>时，只要计算<span style='color: #FBC638; font-weight: 800'>23</span>个哈希值，即有<span style='color: #FBC638; font-weight: 800'>23</span>名学生，就有<span style='color: #FBC638; font-weight: 800'>50%</span>的可能产生碰撞。</p>
                </el-col>
                <el-col class="lr_con r_con"  :span="11">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上面公式可以算出，<span style='color: #FBC638; font-weight: 800'>50%</span>的哈希碰撞概率所需要的计算次数，<span style='color: #f56c6c; font-weight: 800'>N</span> 表示哈希的取值空间。因此，哈希碰撞所需耗费的计算次数，跟取值空间的平方根是一个数量级。</p>
                  <p><img class="inline_img" src="../../assets/images/calc_hash.png" alt="hash"/></p>
                  <p>
                    <el-input type="number" placeholder="请输入哈希取值空间" v-model="hash_range" class="half_hash_input">
                      <el-button slot="append" icon="el-icon-search" @click.native="get_hashhalf_result"></el-button>
                    </el-input>
                  </p>
                </el-col>
              </div>
            </el-card>
          </el-col>

          <el-col class="col_con"  :span="12">
            <el-card class="box-card hash_card">
              <div slot="header" class="clearfix">
                <span class="hash_title">哈希碰撞——应用计算</span>
                <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>
                
                <el-popover placement="top" width="260" v-model="hash_extra3">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;防止哈希碰撞的最有效方法，就是扩大哈希值的取值空间。</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16个二进制位的哈希值，产生碰撞的可能性是 65536 分之一。也就是说，如果有65537个用户，就一定会产生碰撞。哈希值的长度扩大到32个二进制位，碰撞的可能性就会下降到 4,294,967,296 分之一。</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更长的哈希值意味着更大的存储空间、更多的计算，将影响性能和成本。开发者必须做出抉择，在安全与成本之间找到平衡。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="hash_extra1 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text" >
                <el-col class="lr_con l_con"  :span="12">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过前面的学习，我们已经了解到发生哈希碰撞的概率要比我们想象中高很多，那么哈希碰撞概率的决定因素是什么呢？</p>
                  <p><el-tag class="text_tag">1.取值空间的大小（即哈希值的长度）</el-tag></p>
                  <p><el-tag class="text_tag">2.整个生命周期中，哈希值的计算次数</el-tag></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以生日问题为例，我们不难计算出，当哈希值的取值空间为<span style='color: #FBC638; font-weight: 800'>365</span>时，只要计算<span style='color: #FBC638; font-weight: 800'>23</span>个哈希值，即有<span style='color: #FBC638; font-weight: 800'>23</span>名学生，就有<span style='color: #FBC638; font-weight: 800'>50%</span>的可能产生碰撞。</p>
                </el-col>
                <el-col class="lr_con r_con"  :span="11">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上面公式可以算出，<span style='color: #FBC638; font-weight: 800'>50%</span>的哈希碰撞概率所需要的计算次数，<span style='color: #f56c6c; font-weight: 800'>N</span> 表示哈希的取值空间。因此，哈希碰撞所需耗费的计算次数，跟取值空间的平方根是一个数量级。</p>
                  <p><img class="inline_img" src="../../assets/images/calc_hash.png" alt="hash"/></p>
                  <p>
                    <el-input type="number" placeholder="请输入哈希取值空间" v-model="hash_range" class="half_hash_input">
                      <el-button slot="append" icon="el-icon-search" @click.native="get_hashhalf_result"></el-button>
                    </el-input>
                  </p>
                </el-col>
              </div>
            </el-card>
          </el-col>

          <el-col class="col_con"  :span="12">
            <el-card class="box-card hash_card">
              <div slot="header" class="clearfix">
                <span class="hash_title">哈希函数——取余法运算</span>
                <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>
                
                <el-popover placement="top" width="260" v-model="hash_extra4">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;防止哈希碰撞的最有效方法，就是扩大哈希值的取值空间。</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16个二进制位的哈希值，产生碰撞的可能性是 65536 分之一。也就是说，如果有65537个用户，就一定会产生碰撞。哈希值的长度扩大到32个二进制位，碰撞的可能性就会下降到 4,294,967,296 分之一。</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更长的哈希值意味着更大的存储空间、更多的计算，将影响性能和成本。开发者必须做出抉择，在安全与成本之间找到平衡。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="hash_extra1 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text" >
                <el-col class="lr_con l_con"  :span="12">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过前面的学习，我们已经了解到发生哈希碰撞的概率要比我们想象中高很多，那么哈希碰撞概率的决定因素是什么呢？</p>
                  <p><el-tag class="text_tag">1.取值空间的大小（即哈希值的长度）</el-tag></p>
                  <p><el-tag class="text_tag">2.整个生命周期中，哈希值的计算次数</el-tag></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以生日问题为例，我们不难计算出，当哈希值的取值空间为<span style='color: #FBC638; font-weight: 800'>365</span>时，只要计算<span style='color: #FBC638; font-weight: 800'>23</span>个哈希值，即有<span style='color: #FBC638; font-weight: 800'>23</span>名学生，就有<span style='color: #FBC638; font-weight: 800'>50%</span>的可能产生碰撞。</p>
                </el-col>
                <el-col class="lr_con r_con"  :span="11">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上面公式可以算出，<span style='color: #FBC638; font-weight: 800'>50%</span>的哈希碰撞概率所需要的计算次数，<span style='color: #f56c6c; font-weight: 800'>N</span> 表示哈希的取值空间。因此，哈希碰撞所需耗费的计算次数，跟取值空间的平方根是一个数量级。</p>
                  <p><img class="inline_img" src="../../assets/images/calc_hash.png" alt="hash"/></p>
                  <p>
                    <el-input type="number" placeholder="请输入哈希取值空间" v-model="hash_range" class="half_hash_input">
                      <el-button slot="append" icon="el-icon-search" @click.native="get_hashhalf_result"></el-button>
                    </el-input>
                  </p>
                </el-col>
              </div>
            </el-card>
          </el-col>

        </el-row>

      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        // 左边line型文本内容
        line_text: [
          {line_title: "生日碰撞问题", line_text: "在上一章的学习中，我们提到了生日碰撞的问题，可以看到相对来讲较小的集体数，其生日重合的概率也是非常大的，那么这个问题和我们这一章要研究的“哈希函数”有什么联系呢？"},
          {line_title: "什么是哈希函数？", line_text: "哈希函数和我们数学上所说的函数相似，是指基于某一种映射关系，将给定的任意长度的字符串转换为一个有限长度的新字符串，而且这个过程是单向不可逆的"},
          {line_title: "举个小栗子", line_text: "123—>H—>abc，12abc34—>H—>efg，即使给定一个更长的字符串，哈希函数也能转换为3位的字符串。因此哈希函数具有两个特点，1.转换单向不可逆;2.转换后位数固定"},
          {line_title: "哈希碰撞", line_text: "那么基于哈希函数的两个特点，两个字符串在经过哈希转换后，有一定概率形成一段相同的字符串，那么我们就需要尽量避免这种情况的发生，以满足数字签名的要求"}
        ],
        // hash卡片通用
        hash_extra1: false,
        hash_extra2: false,
        hash_extra3: false,
        hash_extra4: false,
        hash_range: '',
        hashhalf_result: ''
      }
    },
    methods: {
      get_hashhalf_result:function () {
        let _this = this
        if(_this.hash_range) {
          let temp_result = Math.sqrt(Math.PI / 2 * _this.hash_range).toFixed(2)
          _this.hashhalf_result = temp_result
          _this.$notify({
            title: '完成计算',
            message: '如果哈希值的取值空间是' + _this.hash_range + ',只要计算' + _this.hashhalf_result + '个哈希值，就有50%的可能产生碰撞',
            type: 'success'
          });
        } else {
          _this.$notify({
            title: '没有输入值',
            message: '请输入哈希取值空间',
            type: 'error'
          });
        }
        
      },
    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
