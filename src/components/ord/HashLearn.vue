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
              <span class="hash_title">哈希碰撞——概率描述</span>
              <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>

              <el-popover placement="top" width="260" v-model="hash_extra2">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;防止哈希碰撞的最有效方法，就是扩大哈希值的取值空间。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16个二进制位的哈希值，产生碰撞的可能性是 65536
                  分之一。也就是说，如果有65537个用户，就一定会产生碰撞。哈希值的长度扩大到32个二进制位，碰撞的可能性就会下降到 4,294,967,296 分之一。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更长的哈希值意味着更大的存储空间、更多的计算，将影响性能和成本。开发者必须做出抉择，在安全与成本之间找到平衡。</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="text" size="mini" @click="hash_extra2 = false">了解完毕</el-button>
                </div>
                <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
              </el-popover>
            </div>
            <div class="hash_text">
              <el-col class="lr_con l_con" :span="12">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过前面的学习，我们已经了解到发生哈希碰撞的概率要比我们想象中高很多，那么哈希碰撞概率的决定因素是什么呢？</p>
                <p>
                  <el-tag class="text_tag">1.取值空间的大小（即哈希值的长度）</el-tag>
                </p>
                <p>
                  <el-tag class="text_tag">2.整个生命周期中，哈希值的计算次数</el-tag>
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以生日问题为例，我们不难计算出，当哈希值的取值空间为<span
                  style='color: #FBC638; font-weight: 800'>365</span>时，只要计算<span
                  style='color: #FBC638; font-weight: 800'>23</span>个哈希值，即有<span
                  style='color: #FBC638; font-weight: 800'>23</span>名学生，就有<span
                  style='color: #FBC638; font-weight: 800'>50%</span>的可能产生碰撞。</p>
              </el-col>
              <el-col class="lr_con r_con" :span="11">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下面公式可以大致算出，<span
                  style='color: #FBC638; font-weight: 800'>50%</span>的哈希碰撞概率所需要的计算次数，<span
                  style='color: #f56c6c; font-weight: 800'>N</span> 表示哈希的取值空间。因此，哈希碰撞所需耗费的计算次数，跟取值空间的平方根是一个数量级。</p>
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

        <el-col class="col_con" :span="12">
          <el-card class="box-card hash_card">
            <div slot="header" class="clearfix">
              <span class="hash_title">哈希碰撞——应用计算</span>
              <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>

              <el-popover placement="top" width="260" v-model="hash_extra3">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一般来说，哈希值由大小写字母和阿拉伯数字构成，一共62个字符（10 + 26 + 26）。如果哈希值只有三个字符的长度（比如abc），取值空间就是 62 ^ 3 = 238,328，那么10000次计算导致的哈希碰撞概率是100%。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在例题中，22个字符的哈希值，就能保证300万亿次计算里面，只有1000亿分之一的概率发生碰撞。常用的 SHA256 哈希函数产生的是64个字符的哈希值，每个字符的取值范围是0~9和a~f，发生碰撞的概率还要低得多。</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="text" size="mini" @click="hash_extra3 = false">了解完毕</el-button>
                </div>
                <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
              </el-popover>
            </div>
            <div class="hash_text">
              <el-col class="lr_con l_con" :span="12">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经过严格的数学推理论证，我们得出了具体的哈希碰撞公式，其中<span style='color: #f56c6c; font-weight: 800'>d</span>为取值空间，<span style='color: #f56c6c; font-weight: 800'>n</span>为尝试次数：</p>
                <p><img class="inline_img" src="../../assets/images/calc_p.png" alt="hash"/></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在下面的输入框中输入哈希取值空间<span style='color: #f56c6c; font-weight: 800'>d</span>以及尝试次数<span style='color: #f56c6c; font-weight: 800'>n</span>，即可得到相应的哈希碰撞概率：</p>
                <p>
                  <el-input @change="get_hashp_result" class="hash_d" v-model="hash_d" placeholder="请输入哈希取值空间"></el-input>
                </p>
                <p>
                  <el-input @change="get_hashp_result" class="hash_n" v-model="hash_n" placeholder="请输入尝试次数"></el-input>
                </p>
              </el-col>
              <el-col class="lr_con r_con" :span="11">
                <p><el-button style="float: left;" type="primary" size="mini">小试身手</el-button></p><br>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现在有一家公司，它的 API 每秒会收到<span
                  style='color: #FBC638; font-weight: 800'>100万</span>个请求，每个请求都会生成一个哈希值，假定这个 API 会使用<span
                  style='color: #FBC638; font-weight: 800'>10年</span>。那么，大约一共会计算<span
                  style='color: #FBC638; font-weight: 800'>300万亿次</span>哈希。能够接受的哈希碰撞概率是<span
                  style='color: #FBC638; font-weight: 800'>1000亿分之一</span>（即每天发生一次哈希碰撞），请问哈希字符串最少需要多少个字符？
                </p><br>
                <p>
                  <el-input type="number" placeholder="请输入题目的正确答案" v-model="hash_api" class="half_hash_input">
                    <el-button slot="append" icon="el-icon-search" @click.native="get_hashapi_result"></el-button>
                  </el-input>
                </p>
              </el-col>
            </div>
          </el-card>
        </el-col>

        <el-col class="col_con" :span="12">
          <el-card class="box-card hash_card">
            <div slot="header" class="clearfix">
              <span class="hash_title">哈希函数——常见的哈希函数</span>
              <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>

              <el-popover placement="top" width="260" v-model="hash_extra4">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无论哈希函数设计有多么精细，都会产生冲突现象，也就是2个关键字处理函数的结果映射在了同一位置上，因此，有一些方法可以避免冲突。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;拉链法:拉出一个动态链表代替静态顺序存储结构，可以避免哈希函数的冲突，不过缺点就是链表的设计过于麻烦，增加了编程复杂度。此法可以完全避免哈希函数的冲突。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多哈希法:设计二种甚至多种哈希函数，可以避免冲突，但是冲突几率还是有的，函数设计的越好或越多都可以将几率降到最低（除非人品太差，否则几乎不可能冲突）。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开放地址法:开放地址法有一个公式：Hi=(H(key)+di) MOD m i=1,2,...,k(k<=m-1）其中，m为哈希表的表长。di 是产生冲突的时候的增量序列。如果di值可能为1,2,3,...m-1，称线性探测再散列。 如果di取1，则每次冲突之后，向后移动1个位置.如果di取值可能为1,-1,4,-4,9,-9,16,-16,...k*k,-k*k(k<=m/2） 称二次探测再散列。如果di取值可能为伪随机数列。称伪随机探测再散列。</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="text" size="mini" @click="hash_extra4 = false">了解完毕</el-button>
                </div>
                <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
              </el-popover>

              <el-button style="float: right; margin-right: 10px;" type="primary" size="small" @click="hash_clear">清空运算</el-button>

              <el-popover placement="top" width="750" v-model="hash_dataset">
                <div class="dataset_con">
                  <el-transfer
                    style="text-align: left; display: inline-block"
                    v-model="hash_data_use"
                    filterable
                    :left-default-checked="['直接定址法1', '直接定址法2']"
                    :right-default-checked="['直接定址法1', '直接定址法2', '直接定址法3', '直接定址法4', '直接定址法5', '直接定址法6', '直接定址法7', '直接定址法8']"
                    :titles="['数据源', '选定测试数据']"
                    :button-texts="['退格数据', '选定数据']"
                    :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}'
                      }"
                    @change="data_source_change"
                    :data="data">
                    <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
                    <el-button class="transfer-footer" slot="left-footer" size="small">新增自定义数据</el-button>
                    <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
                  </el-transfer>
                </div>
                <div style="text-align: right; margin: 0">
                  <el-button type="text" size="mini" @click="hash_dataset = false">设置完毕</el-button>
                </div>
                <el-button slot="reference" style="float: right; margin-right: 10px;" type="primary" size="small">数据设定</el-button>
              </el-popover>
            </div>
            <div class="hash_text">
              <el-tabs tab-position="left" class="func_con" @tab-click="change_hash_method">
                <el-tab-pane label="直接定址法">
                  <div class="func_content_con">
                    <div class="hash_func_desc">
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;直接定址法是指取关键字或关键字的某个线性函数值为散列地址。</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;即<span style='color: #f56c6c; font-weight: 800'>H(key) = a*key + b</span>，其中<span style='color: #f56c6c; font-weight: 800'>a</span>和<span style='color: #f56c6c; font-weight: 800'>b</span>为常数。</p>
                      <p style="font-size: 12px;">
                        H(key) =
                        <el-popover placement="top" width="200" v-model="hash_one_a_inp">
                          <el-input size="small" class="mini_input" v-model="hash_one_a" placeholder="请输入a的取值"></el-input>
                          <div style="text-align: right; margin: 0">
                            <el-button type="text" size="mini" @click="hash_one_a_inp = false">设置完毕</el-button>
                          </div>
                          <el-button slot="reference" size="mini" class="mini_btn">a</el-button>
                        </el-popover>

                        *key +
                        <el-popover placement="top" width="200" v-model="hash_one_b_inp">
                          <el-input size="small" class="mini_input" v-model="hash_one_b" placeholder="请输入b的取值"></el-input>
                          <div style="text-align: right; margin: 0">
                            <el-button type="text" size="mini" @click="hash_one_b_inp = false">设置完毕</el-button>
                          </div>
                          <el-button slot="reference" size="mini" class="mini_btn">b</el-button>
                        </el-popover>
                      </p><br>
                      <p><el-button class="hashcalc_start" type="primary" size="mini" @click="start_hash">开始哈希运算</el-button></p>
                    </div>
                    <el-table
                      max-height="280"
                      :stripe= true
                      size="mini"
                      :data="tableData"
                      :cell-style="ele_table_style"
                      border
                      style="width: 70%; float: right;">
                      <el-table-column
                        align="center"
                        prop="no_num"
                        label="学号"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_calc"
                        label="哈希运算"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="name"
                        label="姓名"
                        width="70">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_val"
                        label="哈希值"
                        max-width="80">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="除留取余法">
                  <div class="func_content_con">
                    <div class="hash_func_desc">
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;取关键字被某个不大于散列表表长m的数p除后所得的余数为散列地址。</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;即<span style='color: #f56c6c; font-weight: 800'>H(key) = key MOD p</span>，其中<span style='color: #f56c6c; font-weight: 800'>p<=m</span></p>
                      <p style="font-size: 12px; text-align: center;">
                        H(key) = key %
                        <el-popover placement="top" width="200" v-model="hash_two_p_inp">
                          <el-input size="small" class="mini_input" v-model="hash_two_p" placeholder="请输入p的取值"></el-input>
                          <div style="text-align: right; margin: 0">
                            <el-button type="text" size="mini" @click="hash_two_p_inp = false">设置完毕</el-button>
                          </div>
                          <el-button slot="reference" size="mini" class="mini_btn">p</el-button>
                        </el-popover>
                      </p><br>
                      <p><el-button class="hashcalc_start" type="primary" size="mini" @click="start_hash">开始哈希运算</el-button></p>
                    </div>
                    <el-table
                      max-height="280"
                      :stripe= true
                      size="mini"
                      :data="tableData"
                      :cell-style="ele_table_style"
                      border
                      style="width: 70%; float: right;">
                      <el-table-column
                        align="center"
                        prop="no_num"
                        label="学号"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_calc"
                        label="哈希运算"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="name"
                        label="姓名"
                        width="70">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_val"
                        label="哈希值"
                        max-width="80">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="数字分析法">
                  <div class="func_content_con">
                    <div class="hash_func_desc">
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当关键字的位数大于地址的位数，对关键字的各位分布进行分析，选出分布均匀的任意几位作为散列地址</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;即<span style='color: #f56c6c; font-weight: 800'>H(key) = key MOD p</span>，其中<span style='color: #f56c6c; font-weight: 800'>p<=m</span></p>
                      <p style="font-size: 12px; text-align: center;">
                        H(key) = key %
                        <el-popover placement="top" width="200" v-model="hash_two_p_inp">
                          <el-input size="small" class="mini_input" v-model="hash_two_p" placeholder="请输入p的取值"></el-input>
                          <div style="text-align: right; margin: 0">
                            <el-button type="text" size="mini" @click="hash_two_p_inp = false">设置完毕</el-button>
                          </div>
                          <el-button slot="reference" size="mini" class="mini_btn">p</el-button>
                        </el-popover>
                      </p><br>
                      <p><el-button class="hashcalc_start" type="primary" size="mini" @click="start_hash">开始哈希运算</el-button></p>
                    </div>
                    <el-table
                      max-height="280"
                      :stripe= true
                      size="mini"
                      :data="tableData"
                      :cell-style="ele_table_style"
                      border
                      style="width: 70%; float: right;">
                      <el-table-column
                        align="center"
                        prop="no_num"
                        label="学号"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_calc"
                        label="哈希运算"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="name"
                        label="姓名"
                        width="70">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_val"
                        label="哈希值"
                        max-width="80">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="平方取中法">
                  <div class="func_content_con">
                    <div class="hash_func_desc">
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;取关键字被某个不大于散列表表长m的数p除后所得的余数为散列地址。</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;即<span style='color: #f56c6c; font-weight: 800'>H(key) = key MOD p</span>，其中<span style='color: #f56c6c; font-weight: 800'>p<=m</span></p>
                      <p style="font-size: 12px; text-align: center;">
                        H(key) = key %
                        <el-popover placement="top" width="200" v-model="hash_two_p_inp">
                          <el-input size="small" class="mini_input" v-model="hash_two_p" placeholder="请输入p的取值"></el-input>
                          <div style="text-align: right; margin: 0">
                            <el-button type="text" size="mini" @click="hash_two_p_inp = false">设置完毕</el-button>
                          </div>
                          <el-button slot="reference" size="mini" class="mini_btn">p</el-button>
                        </el-popover>
                      </p><br>
                      <p><el-button class="hashcalc_start" type="primary" size="mini" @click="start_hash">开始哈希运算</el-button></p>
                    </div>
                    <el-table
                      max-height="280"
                      :stripe= true
                      size="mini"
                      :data="tableData"
                      :cell-style="ele_table_style"
                      border
                      style="width: 70%; float: right;">
                      <el-table-column
                        align="center"
                        prop="no_num"
                        label="学号"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_calc"
                        label="哈希运算"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="name"
                        label="姓名"
                        width="70">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_val"
                        label="哈希值"
                        max-width="80">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="位移叠加法">
                  <div class="func_content_con">
                    <div class="hash_func_desc">
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;取关键字被某个不大于散列表表长m的数p除后所得的余数为散列地址。</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;即<span style='color: #f56c6c; font-weight: 800'>H(key) = key MOD p</span>，其中<span style='color: #f56c6c; font-weight: 800'>p<=m</span></p>
                      <p style="font-size: 12px; text-align: center;">
                        H(key) = key %
                        <el-popover placement="top" width="200" v-model="hash_two_p_inp">
                          <el-input size="small" class="mini_input" v-model="hash_two_p" placeholder="请输入p的取值"></el-input>
                          <div style="text-align: right; margin: 0">
                            <el-button type="text" size="mini" @click="hash_two_p_inp = false">设置完毕</el-button>
                          </div>
                          <el-button slot="reference" size="mini" class="mini_btn">p</el-button>
                        </el-popover>
                      </p><br>
                      <p><el-button class="hashcalc_start" type="primary" size="mini" @click="start_hash">开始哈希运算</el-button></p>
                    </div>
                    <el-table
                      max-height="280"
                      :stripe= true
                      size="mini"
                      :data="tableData"
                      :cell-style="ele_table_style"
                      border
                      style="width: 70%; float: right;">
                      <el-table-column
                        align="center"
                        prop="no_num"
                        label="学号"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_calc"
                        label="哈希运算"
                        min-width="130">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="name"
                        label="姓名"
                        width="70">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="hash_val"
                        label="哈希值"
                        max-width="80">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
              </el-tabs>
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
      // 数据源
      const generateData = _ => {
        const data = []
        const hash_methods = ["直接定址法", "除留取余法", "数字分析法", "平方取中法", "位移叠加法"]
        for (let i = 0; i < 5; i++) {
          for (let j = 1; j <= 8; j++) {
            data.push({
              key: hash_methods[i] + j,
              label: `012160349011${ i * 8 + j }`,
              disabled: false
            });
          }
        }
        return data;
      };
      return {
        // 左边line型文本内容
        line_text: [
          {
            line_title: "生日碰撞问题",
            line_text: "在上一章的学习中，我们提到了生日碰撞的问题，可以看到相对来讲较小的集体数，其生日重合的概率也是非常大的，那么这个问题和我们这一章要研究的“哈希函数”有什么联系呢？"
          },
          {line_title: "什么是哈希函数？", line_text: "哈希函数和我们数学上所说的函数相似，是指基于某一种映射关系，将给定的任意长度的字符串转换为一个有限长度的新字符串，而且这个过程是单向不可逆的"},
          {
            line_title: "举个小栗子",
            line_text: "123—>H—>abc，12abc34—>H—>efg，即使给定一个更长的字符串，哈希函数也能转换为3位的字符串。因此哈希函数具有两个特点，1.转换单向不可逆;2.转换后位数固定"
          },
          {line_title: "哈希碰撞", line_text: "那么基于哈希函数的两个特点，两个字符串在经过哈希转换后，有一定概率形成一段相同的字符串，那么我们就需要尽量避免这种情况的发生，以满足数字签名的要求"}
        ],
        // hash卡片通用（显示控制及数据结果）
        hash_extra1: false,
        hash_extra2: false,
        hash_extra3: false,
        hash_extra4: false,
        hash_dataset: false,
        hash_one_a_inp:false,
        hash_one_b_inp:false,
        hash_two_p_inp: false,
        hash_range: '',
        hashhalf_result: '',
        hash_d: '',
        hash_n: '',
        hashp_result: '',
        hash_api:'',
        // hash函数方法相关
        // hash函数方法——数据源设置
        data: generateData(),
        hash_data_use: ['直接定址法1', '直接定址法2', '直接定址法3', '直接定址法4', '直接定址法5', '直接定址法6', '直接定址法7', '直接定址法8'],
        hash_data_all: [
          ['直接定址法1', '直接定址法2', '直接定址法3', '直接定址法4', '直接定址法5', '直接定址法6', '直接定址法7', '直接定址法8'],
          ['除留取余法1', '除留取余法2', '除留取余法3', '除留取余法4', '除留取余法5', '除留取余法6', '除留取余法7', '除留取余法8'],
          ['数字分析法1', '数字分析法2', '数字分析法3', '数字分析法4', '数字分析法5', '数字分析法6', '数字分析法7', '数字分析法8'],
          ['平方取中法1', '平方取中法2', '平方取中法3', '平方取中法4', '平方取中法5', '平方取中法6', '平方取中法7', '平方取中法8'],
          ['位移叠加法1', '位移叠加法2', '位移叠加法3', '位移叠加法4', '位移叠加法5', '位移叠加法6', '位移叠加法7', '位移叠加法8']
        ],
        // 用户位置
        index: '0',
        // hash函数方法——直接定址法数据
        random_name: ['李钟航', '石雨昂', '郑明明', '刘胜', '林予晗', '刘宇星', '王思聪', '张大仙', '铁拐李'],
        tableData: [],
        cur_table_row: 0,
        // 参数
        hash_one_a: '1',
        hash_one_b: '-121603490110',

        // hash函数方法——除留取余法
        hash_two_p: '5'
      }
    },
    mounted() {
      this.init_hash_table()
    },
    methods: {
      // 写死的知识卡片函数 2-1
      get_hashhalf_result: function () {
        let _this = this
        if (_this.hash_range) {
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
      // 写死的知识卡片函数 3-1
      get_hashp_result: function () {
        let _this = this
        if (_this.hash_d && _this.hash_n) {
          let temp_result = Math.E ** (-_this.hash_n * (_this.hash_n - 1) / (2 * _this.hash_d))
          _this.hashp_result = (100 - 100 * temp_result).toFixed(2)
          _this.$notify({
            title: '完成计算',
            message: '如果哈希值的取值空间是' + _this.hash_d + '，且进行' + _this.hash_n + '次尝试，则发生哈希碰撞的概率为：' + _this.hashp_result + '%',
            type: 'success'
          });
        } else {
          _this.$notify({
            title: '没有输入值',
            message: '请输入相应的哈希空间值或者尝试次数',
            type: 'error'
          });
        }
      },
      // 写死的知识卡片函数 3-2
      get_hashapi_result:function () {
        let _this = this
        if (_this.hash_api === '22'){
          _this.$notify({
            title: '回答正确',
            message: '你输入的结果是正确的，根据公式倒推即可，哈希值的最短长度是22个字符（比如BwQ1W6soXkA1PU120r0yMA）',
            type: 'success'
          });
        }else {
          _this.$notify({
            title: '回答错误',
            message: '你输入的结果是错误的，请重新按照公式倒推计算',
            type: 'error'
          });
        }
      },

      // 初始化运算表格
      init_hash_table:function () {
        let _this = this
        for (let i = 0; i < _this.hash_data_use.length; i++) {
          for (let j = 0; j < _this.data.length; j++) {
            if (_this.data[j].key === _this.hash_data_use[i] ) {
              _this.tableData[i] = {
                no_num: _this.data[j].label,
                hash_calc: '',
                name: _this.random_name[i],
                hash_val: ''
              }
            }
          }
        }
      },
      // 表格样式
      ele_table_style:function ({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 1 || columnIndex === 3)
        return 'color: #f56c6c; font-weight: 800'
      },

      // 哈希运算主函数
      start_hash:function () {
        let _this = this
        console.log(_this.index);
        if (_this.cur_table_row >= _this.hash_data_use.length) {
          _this.$notify({
            title: '操作警告',
            message: '所有数据已经计算完毕！',
            type: 'warning'
          });
        } else {
          switch (_this.index) {
            case '0':
              _this.hash_one_main()
              break;
            case '1':
              _this.hash_two_main()
              break;
            case '2':
              _this.hash_three_main()
              break;
            case '3':
              _this.hash_four_main()
              break;
            case '4':
              _this.hash_five_main()
              break;
          }

          _this.$notify({
            title: '完成一项计算',
            message: '第' + (_this.cur_table_row + 1) + '项数据计算完毕！',
            type: 'success'
          });
          _this.cur_table_row += 1
        }
      },

      // 哈希运算——直接定址法
      hash_one_main:function() {
        let _this = this
        let count = _this.cur_table_row
        let tableData_temp = []
        let row = _this.tableData[count]
        // 方案1
        // for (let i = 0; i < _this.hash_data_use.length; i++) {
        //   for (let j = 0; j < _this.data.length; j++) {
        //     if (_this.data[j].key === _this.hash_data_use[i] ) {
        //       tableData_temp[i] = {
        //         no_num: _this.data[j].label,
        //         hash_calc: (i <= count) ? _this.hash_one_a + '*' +_this.data[j].label + '+' + '(' + _this.hash_one_b +')' : '',
        //         name: _this.random_name[i],
        //         hash_val: (i <= count) ? parseInt(_this.hash_one_a) * parseInt(_this.data[j].label) +  parseInt(_this.hash_one_b) : ''
        //       }
        //     }
        //   }
        // }a
        // _this.tableData = []
        // _this.$nextTick(()=>{
        //   _this.tableData = tableData_temp
        // })

        // 方案2 精简版本
        let hash_calc_fn = _this.hash_one_a + '*' +_this.data[count].label + '+' + '(' + _this.hash_one_b +')'
        let hash_val_fn = parseInt(_this.hash_one_a) * parseInt(_this.data[count].label) +  parseInt(_this.hash_one_b)
        row.hash_calc = hash_calc_fn
        row.hash_val = hash_val_fn
        _this.$set(_this.tableData, count, row)
      },

      // 哈希运算——除留取与法
      hash_two_main:function() {
        let _this = this
        let count = _this.cur_table_row
        let tableData_temp = []
        let row = _this.tableData[count]

        let hash_calc_fn = _this.data[count].label + ' % ' + _this.hash_two_p
        let hash_val_fn =  parseInt(_this.data[count].label) %  parseInt(_this.hash_two_p)
        row.hash_calc = hash_calc_fn
        row.hash_val = hash_val_fn
        _this.$set(_this.tableData, count, row)
      },

      // 哈希运算——数字分析法
      hash_three_main:function() {
        return
      },

      // 哈希运算——平方取中法
      hash_four_main:function() {
        return
      },

      // 哈希运算——位移叠加法
      hash_five_main:function() {
        return
      },

      // 数据源设定时右边的数据改变
      data_source_change:function(value, direction, movedKeys) {
        // console.log(value, direction, movedKeys);
        // console.log(this.hash_data_use);
        this.tableData = []
        this.cur_table_row = 0
        this.init_hash_table()
      },

      // 哈希函数选项卡切换事件
      change_hash_method:function(tab, event) {
        let _this = this
        _this.index = tab.index
        _this.tableData = []
        _this.cur_table_row = 0
        _this.hash_data_use = _this.hash_data_all[tab.index]
        _this.init_hash_table()
      },

      // 清空面板的运算数据
      hash_clear:function () {
        this.tableData = []
        this.cur_table_row = 0
        this.init_hash_table()
        this.$notify({
          title: '操作提醒',
          message: '你已清空Hash表格所有的运算数据',
          type: 'warning'
        });
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
