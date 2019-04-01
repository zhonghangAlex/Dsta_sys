<template>
    <div class="main_con">
      <div class="pad_con">

        <el-row class="hash_con">
          <el-col class="col_con" :span="12">
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
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;冲突：在哈希表中，不同的关键字值对应到同一个存储位置的现象。即关键字K1≠K2，但H（K1）=
                    H（K2）。均匀的哈希函数可以减少冲突，但不能避免冲突。发生冲突后，必须解决；也即必须寻找下一个可用地址。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="hash_extra1 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text">
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在上一章的学习中，我们提到了生日碰撞的问题，可以看到相对较小的集体数，其生日重合的概率也是非常大的，那么这个问题和我们这一章要研究的<span
                  style='color: #f56c6c; font-weight: 800'>“哈希函数”</span>有什么联系呢？</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;哈希函数和我们数学上所说的函数相似，是指基于某一种映射关系，将给定的任意长度的字符串转换为一个有限长度的新字符串，而且这个过程是单向不可逆的，例如：</p>
                <p class="tag_con">
                  <el-tag class="text_tag">12345—>H(哈希函数)—>abc</el-tag>
                  <el-tag>12345abcde5678—>H(哈希函数)—>efg</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对于例子中的哈希函数，即使给定一个更长的字符串，该函数也能将其转换为<span
                  style='color: #FBC638; font-weight: 800'>3位</span>的字符串。因此哈希函数具有两个特点：</p>
                <p class="tag_con">
                  <el-tag class="text_tag">1.转换单向不可逆</el-tag>
                  <el-tag>2.转换后位数固定</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;那么基于哈希函数的两个特点，两个字符串在经过哈希转换后，有一定概率形成一段相同的字符串，例如：</p>
                <p class="tag_con">
                  <el-tag class="text_tag">12345abcde5678—>H(哈希函数)—>efg</el-tag>
                  <el-tag>abcde12345fgh—>H(哈希函数)—>efg</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因此我们就需要尽量避免这种情况的发生，以满足数字签名的要求，这就涉及到了发生哈希碰撞的概率，请继续学习进行了解！</p>
              </div>
            </el-card>
          </el-col>
          <el-col class="col_con" :span="12">
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
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;冲突：在哈希表中，不同的关键字值对应到同一个存储位置的现象。即关键字K1≠K2，但H（K1）=
                    H（K2）。均匀的哈希函数可以减少冲突，但不能避免冲突。发生冲突后，必须解决；也即必须寻找下一个可用地址。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="hash_extra1 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text">
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在上一章的学习中，我们提到了生日碰撞的问题，可以看到相对较小的集体数，其生日重合的概率也是非常大的，那么这个问题和我们这一章要研究的<span
                  style='color: #f56c6c; font-weight: 800'>“哈希函数”</span>有什么联系呢？</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;哈希函数和我们数学上所说的函数相似，是指基于某一种映射关系，将给定的任意长度的字符串转换为一个有限长度的新字符串，而且这个过程是单向不可逆的，例如：</p>
                <p class="tag_con">
                  <el-tag class="text_tag">12345—>H(哈希函数)—>abc</el-tag>
                  <el-tag>12345abcde5678—>H(哈希函数)—>efg</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对于例子中的哈希函数，即使给定一个更长的字符串，该函数也能将其转换为<span
                  style='color: #FBC638; font-weight: 800'>3位</span>的字符串。因此哈希函数具有两个特点：</p>
                <p class="tag_con">
                  <el-tag class="text_tag">1.转换单向不可逆</el-tag>
                  <el-tag>2.转换后位数固定</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;那么基于哈希函数的两个特点，两个字符串在经过哈希转换后，有一定概率形成一段相同的字符串，例如：</p>
                <p class="tag_con">
                  <el-tag class="text_tag">12345abcde5678—>H(哈希函数)—>efg</el-tag>
                  <el-tag>abcde12345fgh—>H(哈希函数)—>efg</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因此我们就需要尽量避免这种情况的发生，以满足数字签名的要求，这就涉及到了发生哈希碰撞的概率，请继续学习进行了解！</p>
              </div>
            </el-card>
          </el-col>
          <el-col class="col_con" :span="24">
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
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;冲突：在哈希表中，不同的关键字值对应到同一个存储位置的现象。即关键字K1≠K2，但H（K1）=
                    H（K2）。均匀的哈希函数可以减少冲突，但不能避免冲突。发生冲突后，必须解决；也即必须寻找下一个可用地址。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="hash_extra1 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text">
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在上一章的学习中，我们提到了生日碰撞的问题，可以看到相对较小的集体数，其生日重合的概率也是非常大的，那么这个问题和我们这一章要研究的<span
                  style='color: #f56c6c; font-weight: 800'>“哈希函数”</span>有什么联系呢？</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;哈希函数和我们数学上所说的函数相似，是指基于某一种映射关系，将给定的任意长度的字符串转换为一个有限长度的新字符串，而且这个过程是单向不可逆的，例如：</p>
                <p class="tag_con">
                  <el-tag class="text_tag">12345—>H(哈希函数)—>abc</el-tag>
                  <el-tag>12345abcde5678—>H(哈希函数)—>efg</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对于例子中的哈希函数，即使给定一个更长的字符串，该函数也能将其转换为<span
                  style='color: #FBC638; font-weight: 800'>3位</span>的字符串。因此哈希函数具有两个特点：</p>
                <p class="tag_con">
                  <el-tag class="text_tag">1.转换单向不可逆</el-tag>
                  <el-tag>2.转换后位数固定</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;那么基于哈希函数的两个特点，两个字符串在经过哈希转换后，有一定概率形成一段相同的字符串，例如：</p>
                <p class="tag_con">
                  <el-tag class="text_tag">12345abcde5678—>H(哈希函数)—>efg</el-tag>
                  <el-tag>abcde12345fgh—>H(哈希函数)—>efg</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因此我们就需要尽量避免这种情况的发生，以满足数字签名的要求，这就涉及到了发生哈希碰撞的概率，请继续学习进行了解！</p>
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

      }
    },

    mounted() {

    },

    methods: {

    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
