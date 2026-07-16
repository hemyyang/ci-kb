window.KB_DATA = [
 {
  "title": "如果在1302的vad disable时，偏置会有供电输出吗",
  "html": "<p>有的，只要我们芯片有电，MICBIAS(偏置)电压就有。</p>",
  "source": "CI-FAQ.md",
  "text": "有的，只要我们芯片有电，MICBIAS(偏置)电压就有。"
 },
 {
  "title": "3代与3.5代,HPOUT输出 DAC是多少位的",
  "html": "<p>hpout默认输出是16bit，最高可以输出24bit</p>",
  "source": "CI-FAQ.md",
  "text": "hpout默认输出是16bit，最高可以输出24bit"
 },
 {
  "title": "3代与3.5代,MIC（麦克风）输入 ADC采样是多少位的",
  "html": "<p>MIC输入的ADC口 默认是16bit，，最高可以输出24bit</p>",
  "source": "CI-FAQ.md",
  "text": "MIC输入的ADC口 默认是16bit，，最高可以输出24bit"
 },
 {
  "title": "MIC电路如何一个麦克风接到两路输入",
  "html": "<p>可以作为并联输入</p>\n<p>连接思路：用一个偏置电压，然后分别串100NF电容连接到两个IC的输入，此电路只是理论上可以，具体效果需要打板后验证。</p>\n<p><img src=\"assets/img-5fbf47d24d19.png\" alt=\"\" /></p>",
  "source": "CI-FAQ.md",
  "text": "可以作为并联输入 连接思路：用一个偏置电压，然后分别串100NF电容连接到两个IC的输入，此电路只是理论上可以，具体效果需要打板后验证。"
 },
 {
  "title": "3代PDM麦克风怎么接",
  "html": "<p><img src=\"assets/img-582b86e2ec07.png\" alt=\"\" /></p>",
  "source": "CI-FAQ.md",
  "text": ""
 },
 {
  "title": "**模拟MEMS麦克风** 选用",
  "html": "<p>模拟硅mic也是推荐选用-32dB±3dB，SNR≥65dB的，也可以选用-38dB±3dB，SNR≥65dB.</p>\n<p>推荐或在我司平台上查看：<a href=\"https://document.chipintelli.com/%E7%A1%AC%E4%BB%B6%E5%BC%80%E5%8F%91/%E5%A4%96%E5%9B%B4%E5%99%A8%E4%BB%B6%E5%85%BC%E5%AE%B9%E5%88%97%E8%A1%A8/\" target=\"_blank\" rel=\"noopener\">https://document.chipintelli.com/%E7%A1%AC%E4%BB%B6%E5%BC%80%E5%8F%91/%E5%A4%96%E5%9B%B4%E5%99%A8%E4%BB%B6%E5%85%BC%E5%AE%B9%E5%88%97%E8%A1%A8/</a></p>\n<p>参考电路，软件注意把麦克风改为单端输入。</p>\n<p><img src=\"assets/img-03f7a7209d5d.png\" alt=\"\" /></p>",
  "source": "CI-FAQ.md",
  "text": "模拟硅mic也是推荐选用-32dB±3dB，SNR≥65dB的，也可以选用-38dB±3dB，SNR≥65dB. 推荐或在我司平台上查看：https://document.chipintelli.com/%E7%A1%AC%E4%BB%B6%E5%BC%80%E5%8F%91/%E5%A4%96%E5%9B%B4%E5%99%A8%E4%BB%B6%E5%85%BC%E5%AE%B9%E5%88%97%E8%A1%A8/ 参考电路，软件注意把麦克风改为单端输入。"
 },
 {
  "title": "HPOUT能做成差分输出吗？",
  "html": "<p>目前不支持，可以设计为假差分连接，可将功放输入N端通过电阻与电容后，接至语音芯片的模拟地（AGND）</p>",
  "source": "CI-FAQ.md",
  "text": "目前不支持，可以设计为假差分连接，可将功放输入N端通过电阻与电容后，接至语音芯片的模拟地（AGND）"
 },
 {
  "title": "3代 ，3.5代 HPOUT 驱动能力",
  "html": "<p>Hpout 最大支持 60mW16Ω load, Output Resistance（<strong>输出电阻）</strong> 1Ω ，输出需要电容隔直</p>",
  "source": "CI-FAQ.md",
  "text": "Hpout 最大支持 60mW16Ω load, Output Resistance（ 输出电阻） 1Ω ，输出需要电容隔直"
 },
 {
  "title": "4代C105  HPOUT 驱动能力",
  "html": "<p>Hpout 为PWMDAC信号， 后端需要接功放。不能直接驱动接耳机 。</p>",
  "source": "CI-FAQ.md",
  "text": "Hpout 为PWMDAC信号， 后端需要接功放。不能直接驱动接耳机 。"
 },
 {
  "title": "HPOUT输出可以接两路功放输入吗？",
  "html": "<p>理论上芯片HPOUT脚后端可以接多个功放输入端。但有以下问题发生，且目前无法处理，请根据提供电路进行搭建后测试确认是否使用。</p>\n<ol><li>音质受损：连接多个输入端后，可能引起<strong>音量降低、音质劣化</strong>或<strong>引入噪声</strong>等问题。</li><li>AEC打断率变低：连接多个功放后，AEC回路需要从每一个功放端连接反馈信号，电路复杂。与MIC识别到的声音有区别。造成AEC效果变差。</li></ol>\n<p>参考电路如下</p>\n<p><img src=\"assets/img-5c46ba71d455.png\" alt=\"\" /></p>",
  "source": "CI-FAQ.md",
  "text": "理论上芯片HPOUT脚后端可以接多个功放输入端。但有以下问题发生，且目前无法处理，请根据提供电路进行搭建后测试确认是否使用。 1. 音质受损：连接多个输入端后，可能引起 音量降低、音质劣化 或 引入噪声 等问题。 2. AEC打断率变低：连接多个功放后，AEC回路需要从每一个功放端连接反馈信号，电路复杂。与MIC识别到的声音有区别。造成AEC效果变差。 参考电路如下"
 },
 {
  "title": "3代，3.5代  MIC Bias 驱动能力",
  "html": "<p>Bias Current <strong>（偏置电流）</strong> 最大支持 3mA</p>",
  "source": "CI-FAQ.md",
  "text": "Bias Current （偏置电流） 最大支持 3mA"
 },
 {
  "title": "3代或者3.5代不用分地吗",
  "html": "<p>我们模块板可能没分地，因为没有其它电路，不会干扰到模拟部分，所以没有分地。如果与MCU，WIFI等其它电路都设计在同一PCB上，需要参考DEMO设计资料进行分地。</p>",
  "source": "CI-FAQ.md",
  "text": "我们模块板可能没分地，因为没有其它电路，不会干扰到模拟部分，所以没有分地。如果与MCU，WIFI等其它电路都设计在同一PCB上，需要参考DEMO设计资料进行分地。"
 },
 {
  "title": "3代、3.5代-ADC、DAC的VFS分别是多少",
  "html": "<p>--->3V，codec为3.3V供电，需要留余量。</p>",
  "source": "CI-FAQ.md",
  "text": "--- 3V，codec为3.3V供电，需要留余量。"
 },
 {
  "title": "双MIC推荐",
  "html": "<p>双MIC灵敏度要求在±1dB内指的是两个MIC的灵敏度差值，不是单个麦克风的灵敏度。</p>\n<p><img src=\"assets/img-f5574f34a01f.png\" alt=\"\" /></p>\n<p>物料可找我们供应提供。我们官网有推荐的麦克风型号，可根据麦克风型号，要求麦克风厂做双MIC，两个灵敏度差值要求在±1dB</p>\n<p><a href=\"https://document.chipintelli.com/%E7%A1%AC%E4%BB%B6%E5%BC%80%E5%8F%91/%E5%A4%96%E5%9B%B4%E5%99%A8%E4%BB%B6%E5%85%BC%E5%AE%B9%E5%88%97%E8%A1%A8/\" target=\"_blank\" rel=\"noopener\">https://document.chipintelli.com/%E7%A1%AC%E4%BB%B6%E5%BC%80%E5%8F%91/%E5%A4%96%E5%9B%B4%E5%99%A8%E4%BB%B6%E5%85%BC%E5%AE%B9%E5%88%97%E8%A1%A8/</a></p>\n<p><img src=\"assets/img-5fbf1600fc59.png\" alt=\"\" /></p>",
  "source": "CI-FAQ.md",
  "text": "双MIC灵敏度要求在±1dB内指的是两个MIC的灵敏度差值，不是单个麦克风的灵敏度。 物料可找我们供应提供。我们官网有推荐的麦克风型号，可根据麦克风型号，要求麦克风厂做双MIC，两个灵敏度差值要求在±1dB https://document.chipintelli.com/%E7%A1%AC%E4%BB%B6%E5%BC%80%E5%8F%91/%E5%A4%96%E5%9B%B4%E5%99%A8%E4%BB%B6%E5%85%BC%E5%AE%B9%E5%88%97%E8%A1%A8/"
 },
 {
  "title": "录音有底噪声",
  "html": "<ol><li>确认是HPOUT还是I2S/UART采音都有吗，如果只有HPOUT有，可能是DAC原因，如果I2S/UART采音也有，应该是ADC与电源原因。</li><li>拔掉麦克风，看是否还有，排除麦克风与周边环境原因。</li><li>拔掉麦克风还是有，确认AVDD供电纹波是否小于50mv，麦克风输入线周边是否有PWM信号，可以把其它电路都断开，只保留语音电路。</li></ol>",
  "source": "CI-FAQ.md",
  "text": "1. 确认是HPOUT还是I2S/UART采音都有吗，如果只有HPOUT有，可能是DAC原因，如果I2S/UART采音也有，应该是ADC与电源原因。 2. 拔掉麦克风，看是否还有，排除麦克风与周边环境原因。 3. 拔掉麦克风还是有，确认AVDD供电纹波是否小于50mv，麦克风输入线周边是否有PWM信号，可以把其它电路都断开，只保留语音电路。"
 },
 {
  "title": "CI103X-安静下HPOUT输出100-200khz，150mV（Vp-p）左右的锯齿波原因回复",
  "html": "<p><img src=\"assets/img-6b1698a3d765.png\" alt=\"\" /></p>\n<ul><li>原因为语音 IC 在完成播放操作后，软件未执行关闭芯片内部 Codec 中 DAC部分，导致 DAC 在空闲状态下仍处于工作状态，引入了一些噪声。</li><li>解决方案为软件播放完后关闭codec，这可能每次播放的时候，喇叭会有很轻微的pop的一声，不细声听不出来，或者HPOUT输出加一个RC滤波，电阻1K，对地电容10nF</li></ul>",
  "source": "CI-FAQ.md",
  "text": "- 原因为语音 IC 在完成播放操作后，软件未执行关闭芯片内部 Codec 中 DAC部分，导致 DAC 在空闲状态下仍处于工作状态，引入了一些噪声。 - 解决方案为软件播放完后关闭codec，这可能每次播放的时候，喇叭会有很轻微的pop的一声，不细声听不出来，或者HPOUT输出加一个RC滤波，电阻1K，对地电容10nF"
 },
 {
  "title": "上电播放完语音过程中偏执和VCM电压，语音播放停止后无电压",
  "html": "<ol><li>确认语音芯片电路与DEMO电路的区别，尤其是VCM，MICBIAS，MIC，HPOUT接口电路</li><li>HPOUT输出需要先串电容再接其它电路，不能直接加对地电阻。</li></ol>",
  "source": "CI-FAQ.md",
  "text": "1. 确认语音芯片电路与DEMO电路的区别，尤其是VCM，MICBIAS，MIC，HPOUT接口电路 2. HPOUT输出需要先串电容再接其它电路，不能直接加对地电阻。"
 },
 {
  "title": "概述",
  "html": "<p>1、主要参考提供的参考设计中《8-认证说明》这个文件</p>\n<p>2、相关认证需要的指标</p>",
  "source": "CI23242-认证相关说明.md",
  "text": "1、主要参考提供的参考设计中《8-认证说明》这个文件 2、相关认证需要的指标"
 },
 {
  "title": "1. 基础射频指标",
  "html": "<table class=\"kb-table\">\n<tr><th>技术体制</th><th>调制方式（全支持）</th><th>频率范围</th><th>占用带宽</th><th>最大输出功率（EIRP）</th></tr>\n<tr><td>BT</td><td>GFSK</td><td>2400 – 2483.5 MHz</td><td>≤ 2 MHz</td><td>≤ 20 dBm（EIRP）。- <strong>传导最大能力</strong>：实际可达 <strong>+4 dBm 以上</strong>（模块硬件支持）。<br>- <strong>推荐默认发射功率</strong>：<strong>0 dBm</strong>（传导）。<br>- <strong>原因</strong>：较低功率有助于<strong>简化射频认证（如 FCC/CE）</strong>，减少谐波/杂散风险，同时满足大多数短距离应用需求。</td></tr>\n</table>",
  "source": "CI23242-认证相关说明.md",
  "text": "技术体制 调制方式（全支持） 频率范围 占用带宽 最大输出功率（EIRP） ---- --------- ----------------- ------- ---------------------------------------------------------------------------------------------------------------------------------------------------------- BT GFSK 2400 – 2483.5 MHz ≤ 2 MHz ≤ 20 dBm（EIRP）。- 传导最大能力 ：实际可达 +4 dBm 以上 （模块硬件支持）。<br - 推荐默认发射功率 ： 0 dBm （传导）。<br - 原因 ：较低功率有助于 简化射频认证（如 FCC/CE） ，减少谐波/杂散风险，同时满足大多数短距离应用需求。"
 },
 {
  "title": "2. 射频关键元器件",
  "html": "<table class=\"kb-table\">\n<tr><th>序号</th><th>关键件名称</th><th>型号</th><th>规格</th><th>图片</th><th>备注</th></tr>\n<tr><td>2</td><td>天线</td><td>板载天线</td><td>1. 尺寸：01J上规格 <br>2. 增益：（典型值 -0.5 dBi）  <br>3. 阻抗：50 Ω</td><td><img src=\"assets/Pasted-image-20260715175029.png\" width=\"169\" /></td><td></td></tr>\n</table>",
  "source": "CI23242-认证相关说明.md",
  "text": "序号 关键件名称 型号 规格 图片 备注 --- ----- ---- ----------------------------------------------------- ----------------------------------------- --- 2 天线 板载天线 1. 尺寸：01J上规格 <br 2. 增益：（典型值 -0.5 dBi） <br 3. 阻抗：50 Ω"
 },
 {
  "title": "3.1 支持制式与数据速率",
  "html": "<table class=\"kb-table\">\n<tr><th>制式</th><th>数据速率</th></tr>\n<tr><td>LE（低功耗蓝牙）</td><td>1 Mbps</td></tr>\n</table>",
  "source": "CI23242-认证相关说明.md",
  "text": "制式 数据速率 --------- ------ LE（低功耗蓝牙） 1 Mbps"
 },
 {
  "title": "3.2 信道数量",
  "html": "<table class=\"kb-table\">\n<tr><th>类型</th><th>信道数</th></tr>\n<tr><td>BLE</td><td>40</td></tr>\n</table>",
  "source": "CI23242-认证相关说明.md",
  "text": "类型 信道数 ------ --- BLE 40"
 },
 {
  "title": "3.4 自适应与共存机制",
  "html": "<p>模块内置以下避让与共存策略，适用于 Wi-Fi 等 2.4 GHz 干扰环境：</p>\n<ul><li>基于等效占用率机制</li></ul>\n<p>---</p>",
  "source": "CI23242-认证相关说明.md",
  "text": "模块内置以下避让与共存策略，适用于 Wi-Fi 等 2.4 GHz 干扰环境： - 基于等效占用率机制 ---"
 }
];