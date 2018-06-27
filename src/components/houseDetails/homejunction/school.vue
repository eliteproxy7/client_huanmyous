<template>
    <section>
        <el-tabs value="elementary" type="border-card">
            <el-tab-pane
                v-for="(item, key, index) in Homejunction_school"
                :key="index"
                :label="key"
                :name="key"
                v-if="item">
                <el-table
                    :data="item"
                    stripe
                    border
                    highlight-current-row
                    style="width: 100%">
                    <el-table-column
                        property="name"
                        label="名称"
                        width="150"
                        :formatter="columnIsNull0">
                    </el-table-column>
                    <el-table-column
                        property="address"
                        label="地址"
                        width="150"
                        :formatter="columnIsNull0">
                    </el-table-column>
                    <el-table-column
                        property="admission"
                        label="类型/学区"
                        :formatter="columnIsNull0">
                    </el-table-column>
                    <el-table-column
                        property="grade"
                        label="年级"
                        :formatter="columnIsNull0">
                    </el-table-column>
                    <el-table-column label="家长评分" width="170">
                        <template slot-scope="scope">
                            <div v-if="scope.row.reviewRating >= 0 && scope.row.reviewRating != null">
                                <el-rate
                                    v-model="scope.row.reviewRating"
                                    disabled
                                    show-score
                                    :colors="['#f26b16', '#bdc01e', '#439326']">
                                    text-color="#ff9900"
                                    score-template="{value}">
                                </el-rate>
                            </div>
                            <div v-else>-</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系电话" width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.phone != null">+001 {{isNull0(scope.row.phone)}}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="140">
                        <template slot-scope="scope">
                            <el-button size="small" type="success" icon="iconfont icon-chakan"
                                       @click="lookSchoolDetails(scope.row.id)"> 查看详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <aside>
            <p>美国学校年级制度：小学分为1~5年级、初中分为6~8年级、高中分为9~12年级、大学普通学生要就读四年，部分优等生2、3年便可以完成课程，开始实习工作。</p>
            <p>以上学校和学区信息仅供参考，如需确认，请通过经纪人或者直接与学校联系。</p>
        </aside>
        <p v-show="false">{{getzipcode}}</p>

        <el-dialog
            title="学校详情信息"
            :visible.sync="schoolDetails_dialog"
            width="60%"
            center>
            <el-row :gutter="30" v-show="!chartNoDataShow">
                <el-col :span="24">
                    <div class="chart-div" id="studentsRace-chart" style="width: 100%; height: 300px;"></div>
                </el-col>
                <el-col :span="24">
                    <div class="chart-div" id="studentsGender-chart" style="width: 100%; height: 300px;"></div>
                </el-col>
                <el-col :span="24">
                    <div class="chart-div" id="enrollment-chart" style="width: 100%; height: 300px;"></div>
                </el-col>
                <el-col :span="24">
                    <aside>
                        <p>1、学校是否有预科(AP)课程：{{isTrueOrFalse(advancedPlacement)}}</p>
                        <p>2、是否是特许学校：{{isTrueOrFalse(charter)}}</p>
                        <p>3、是否有图书馆：{{isTrueOrFalse(library)}}</p>
                        <p>4、true if the school is a magnet school：{{magnet}}</p>
                        <p>5、学生与教师的比例：{{studentTeacherRatio}}</p>
                        <p>6、是否是一所名牌学校：{{isTrueOrFalse(titleI)}}</p>
                        <p>7、学校的学生总数：{{totalStudents}}人</p>
                        <p>8、学校的教师(全职)总数：{{totalTeachers}}人</p>
                    </aside>
                </el-col>
            </el-row>
            <h4 ref="schoolDetails_chart_NoData" v-show="chartNoDataShow"></h4>
        </el-dialog>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                houseId: this.$route.query.houseId,
                Homejunction_school: null,    //homejunction
                studentsRaceMyEcharts: '',//人口统计数据——饼图
                studentsGenderMyEcharts: '',//人口统计数据——饼图
                enrollmentMyEcharts: '',//各年级学生人数——柱状图
                advancedPlacement: '',//学校是否有预科(AP)课程
                charter: '',    //是否是特许学校
                library: '',    //是否有图书馆
                magnet: '',     //magnet学校数据
                studentTeacherRatio: '',//学生与教师的比例
                titleI: '',     //是否是一所名牌学校
                totalStudents: '',  //学校的学生总数
                totalTeachers: '',  //学校的教师(全职)总数


                schoolDetails_dialog: false,//学校详情信息的Dialog对话框

                chartNoDataShow: false, //判断是否有无数据


            }
        },
        computed: {
            getzipcode() {
                if(this.$store.getters.get_houseDetailsZipcode){
                    this.getHomejunctionSchoolData();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            //获取homejunction学校数据
            getHomejunctionSchoolData() {
                this.$get('/report/school/' + this.$store.getters.get_houseDetailsZipcode).then(res => {
                    if (res.status == 0) {
                        this.Homejunction_school = res.data;
                    } else {
                    }
                });
            },
            //格式化判断是否为空，0或null
            columnIsNull0(row, column, cellValue) {
                return this.isNull0(cellValue);
            },
            lookSchoolDetails(id){
                this.schoolDetails_dialog = true;
                this.$nextTick(() =>{
                    this.studentsRaceMyEcharts = this.$echarts.init(document.getElementById('studentsRace-chart'));
                    this.studentsRaceMyEcharts.showLoading();

                    this.studentsGenderMyEcharts = this.$echarts.init(document.getElementById('studentsGender-chart'));
                    this.studentsGenderMyEcharts.showLoading();

                    this.enrollmentMyEcharts = this.$echarts.init(document.getElementById('enrollment-chart'));
                    this.enrollmentMyEcharts.showLoading();

                    window.addEventListener('resize', () => {
                        this.studentsRaceMyEcharts.resize();
                        this.studentsGenderMyEcharts.resize();
                        this.enrollmentMyEcharts.resize();
                    });
                });

                this.$get('/report/school/detail/'+ id).then(res => {
                    if (res.data != null) {
                        this.chartNoDataShow = false;
                        this.studentsRace_charts(res.data.demographics);
                        this.studentsGender_charts(res.data.demographics);
                        this.enrollment_charts(res.data.enrollment);
                        this.advancedPlacement = res.data.advancedPlacement;
                        this.charter = res.data.charter;
                        this.library = res.data.library;
                        this.magnet = res.data.magnet;
                        this.studentTeacherRatio = res.data.studentTeacherRatio;
                        this.titleI = res.data.titleI;
                        this.totalStudents = res.data.totalStudents;
                        this.totalTeachers = res.data.totalTeachers;
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.schoolDetails_chart_NoData.innerText = '暂无数据！';
                    }
                });
            },
            //学校详情信息框展示——判断是与否
            isTrueOrFalse(data){
                let val = '';
                if(data){
                    val = '是';
                }else{
                    val = '否';
                }
                return val;
            },
            //学生种族比例——饼图
            studentsRace_charts(data){
                let other = 100 - data.asian - data.hispanic - data.natives - data.pacific - data.black - data.white;
                this.studentsRaceMyEcharts.hideLoading();
                this.studentsRaceMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '学生种族比例',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ["亚裔学生", "西班牙裔学生", "本地土著学生", "夏威夷或太平洋岛民后裔学生", "黑人学生", "白人学生"]
                        },
                        series : [{
                            name: '学生种族比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: data.asian,
                                    name: '亚裔学生',
                                },
                                {
                                    value: data.hispanic,
                                    name: '西班牙裔学生',
                                },
                                {
                                    value: data.natives,
                                    name: '本地土著学生',
                                },
                                {
                                    value: data.pacific,
                                    name: '夏威夷或太平洋岛民后裔学生',
                                },
                                {
                                    value: data.black,
                                    name: '黑人学生',
                                },
                                {
                                    value: data.white,
                                    name: '白人学生',
                                },
                                {
                                    value: this.$accounting.formatMoney(other, "", 2),
                                    name: '其他人种',
                                },
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label:{
                                normal:{
                                    formatter:'{b}：{c}%'
                                }
                            }
                        }]
                    },
                    media:[
                        {
                            query:{
                                maxWidth: 315,
                            },
                            option:{
                                legend: {
                                    top: '0',
                                },
                                series: [{
                                    center: ['47%', '50%'],//圆的X,Y轴平移
                                }]
                            }
                        }
                    ]
                });
            },
            //学生性别比例——饼图
            studentsGender_charts(data){
                this.studentsGenderMyEcharts.hideLoading();
                this.studentsGenderMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '学生性别比例',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ["男生", "女生"]
                        },
                        series : [{
                            name: '学生性别比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: data.male,
                                    name: '男生',
                                },
                                {
                                    value: data.female,
                                    name: '女生',
                                },
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label:{
                                normal:{
                                    formatter:'{b}：{c}%'
                                }
                            }
                        }]
                    },
                    media:[
                        {
                            query:{
                                maxWidth: 315,
                            },
                            option:{
                                legend: {
                                    top: '0',
                                },
                                series: [{
                                    center: ['47%', '50%'],//圆的X,Y轴平移
                                }]
                            }
                        }
                    ]
                });
            },
            //各年级学生人数——柱状图
            enrollment_charts(data) {
                this.enrollmentMyEcharts.hideLoading();
                this.enrollmentMyEcharts.setOption({
                    title: {
                        text: '各年级学生人数',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        axisLabel: {
                            textStyle: {//坐标轴文字颜色
                                color: '#000'
                            }
                        },
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        data: ["早教班", "幼儿园", "一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "七年级", "八年级", "九年级", "十年级", "十一年级", "十二年级"]
                    },
                    yAxis: {
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false},//是否显示刻度标签
                    },
                    series: [{
                        name: '学生人口统计数据',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,//柱子上边显示文字标签
                                position: 'top',
                                formatter: param => {
                                    return param.value +'人';
                                },
                                offset: [0, -5],
                                textStyle: {
                                    fontSize: 16,
                                    color: '#000',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data: [
                            {
                                value: data.pk,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.kg,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y1,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y2,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y3,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y4,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y5,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y6,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y7,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y8,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y9,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y10,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y11,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: data.y12,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                        ],
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    }],
                    animationEasing: 'elasticOut'
                });
            },


        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            aside{
                p {
                    margin: 10px 0;
                    font-size: 14px;
                    color: #858585;
                }
                p:first-of-type {
                    margin: 30px 0 0 0;
                }
            }
            h4 {
                font-size: 20px;
                color: #000;
                text-align: center;
            }
            aside {
                > p {
                    font-size: 14px;
                    color: #23bff0;
                    text-align: left;
                    margin: 5px 0;
                }
            }
        }
    }
</style>
