<template>
    <div>
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            style="width: 100%"
            v-loading="shareGroupListLoading"
            element-loading-text="拼命加载中...">
            <!--@sort-change="sortChange"-->
            <!--:default-sort="{prop: 'ctime', order: 'descending'}">-->
            <el-table-column
                property="name"
                label="分享组名"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="ctime"
                label="创建时间"
                :formatter="columnDate">
            </el-table-column>
            <el-table-column
                property="hits"
                label="客户查看次数"
                :formatter="columnIsNull0"
                sortable="custom">
            </el-table-column>
            <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="success"
                        icon="iconfont icon-chakan"
                        @click="goShareGroupDetails(scope.row.shareId)"> 查看详情
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        icon="iconfont icon-fenxiang"
                        @click="shareThisGroup(scope.row.shareId)"> 分享
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        icon="iconfont icon-whole_delete"
                        @click="deleteThisGroup(scope.row.shareId)"> 删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: left; margin-top: 10px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNumber"
                :page-sizes="[10, 50, 100, 200, 300]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog
            title="使用微信扫描二维码预览并分享"
            :visible.sync="shareGroupQRcode_dialog"
            width="30%"
            center>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="23">
                    <qrcode-vue :value="shareGroupQRcode_value" size="250" level="H"
                                class="shareGroupQRcode-img"></qrcode-vue>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center" style="margin: 15px 0 0 0">
                <el-col :span="23">
                    <el-input placeholder="复制分享链接" id="share-link" v-model="shareGroupQRcode_value">
                        <el-button slot="append" icon="el-icon-document" data-clipboard-target="#share-link"
                                   id="share-link-btn"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
    // 生成二维码插件
    import QrcodeVue from 'qrcode.vue';
    //复制粘贴功能插件
    import Clipboard from 'clipboard';

    export default {
        data() {
            return {
                tableData: [],
                pageNumber: 1,  //默认显示第一页
                pageSize: 10,   //默认每页显示10条
                total: null,    //总条数
                keyword: '',    //搜索关键字
                filed: '',      //排序字段
                direction: '',  //排序方向——ASC 升序，DESC 降序
                shareGroupListLoading: true,    //分享组列表table的加载loading
                shareGroupQRcode_dialog: false,//分享组的二维码的Dialog对话框
                shareGroupQRcode_value: '',//分享组的二维码的链接
                companyUUID: '',//公司的uuid
            }
        },
        mounted() {
            this.getShareGroupData();
            this.getCompanyUUID();
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getShareGroupData();
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getShareGroupData();
            },
            //获取分享组列表
            getShareGroupData() {
                this.$get('/sharegroup/list', {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    keyword: this.keyword,
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.tableData = data.rows;
                        this.total = data.total;
                        this.shareGroupListLoading = false;
                    }
                });
            },
            //获取顾问所在公司的uuid
            getCompanyUUID() {
                this.$get('/counselor/company/uuid').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.companyUUID = data.data;
                    }
                });
            },
            columnIsNull0(row, column, cellValue) {//格式化判断是否为空，0或null
                return this.isNull0(cellValue);
            },
            columnDate(row, column, cellValue, index) {//格式化时间戳
                return this.momentFormat(cellValue, 'YYYY-MM-DD');
            },
            //排序的回调
            // sortChange(column, prop, order) {
            //     // console.log(column, prop, order)
            //     this.filed = column.prop;//排序字段
            //     //判断要排序的字段是否是年龄
            //     this.direction = column.order == 'ascending' ? 'asc' : 'desc';//排序方向——ASC 升序，DESC 降序
            //     this.getClientData();
            // },
            goShareGroupDetails(shareId) {//查看详情
                this.$router.push({path: '/consultant_shareGroupDetails', query: {shareId: shareId}});
            },
            shareThisGroup(shareId) {//分享
                this.shareGroupQRcode_dialog = true;
                this.shareGroupQRcode_value = 'http://' + window.location.host + '/clientShareHouse?shareId=' + shareId + '&companyUuid=' + this.companyUUID + '&level=0';
                let clipboard = new Clipboard('#share-link-btn');
                clipboard.on('success', e => {
                    this.$message.success('复制成功！');
                    clipboard.destroy();// 释放内存
                });
                clipboard.on('error', e => {
                    this.$message.error('该浏览器不支持自动复制。');
                    clipboard.destroy();
                });
            },
            //删除分享组
            deleteThisGroup(shareGroupId) {
                this.$confirm('是否要删除此分享组？', '删除分享组').then(() => {
                    this.$delete('/sharegroup/delete?shareGroupId=' + shareGroupId).then(res => {
                        const data = res;
                        if (data.status == 0) {
                            this.$message.success('删除成功！');
                            this.getShareGroupData();
                        } else {
                            this.$message.error(data.msg)
                        }
                    });
                }).catch(() => {
                    this.$message.info('已取消操作.');
                });
            },


        },
        computed: {},
        components: {
            QrcodeVue
        }
    }
</script>
<style scoped lang="less" type="text/less">
    body {
        .shareGroupQRcode-img {
            text-align: center;
        }
    }
</style>
