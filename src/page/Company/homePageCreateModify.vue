<template>
    <section>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" status-icon label-position="top">
            <el-form-item label="选择模板" prop="homePageTemplateId">
                <article class="check-bg-box clearfix">
                    <el-radio-group
                        v-for="(item, index) in homePageTemplateItem"
                        :key="index"
                        v-model="ruleForm.homePageTemplateId">
                        <aside class="img-box">
                            <img v-lazy="item.src"/>
                            <div class="font">
                                <el-tooltip class="item" effect="dark" content="预览" placement="top">
                                    <i class="iconfont icon-chakan"
                                       @click="previewHomePageTemplate('/static/img/company-homePage1.jpg')"></i>
                                </el-tooltip>
                            </div>
                        </aside>
                        <el-radio :label="item.value">{{item.name}}</el-radio>
                    </el-radio-group>
                </article>
            </el-form-item>
            <el-form-item label="模板名称" prop="homePageTemplateName">
                <el-input v-model="ruleForm.homePageTemplateName"></el-input>
            </el-form-item>
            <el-form-item label="配置模块内容" prop="configModuleContent">
                <table cellspacing="0" cellpadding="0" border="0"
                       class="table el-table el-table--fit el-table--striped el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table__header">
                    <thead>
                    <tr>
                        <th>
                            <div class="cell">模块名</div>
                        </th>
                        <th>
                            <div class="cell">选择模块</div>
                        </th>
                        <th>
                            <div class="cell">操作</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>模块一</td>
                        <td>
                            固定展示页面头部
                        </td>
                        <td>
                            <el-button
                                v-ripple
                                size="small"
                                type="primary"
                                icon="iconfont icon-shezhi"
                                @click="setHeaderTitle_dialog = true"
                                style="margin: 0 15px"> 配置内容
                            </el-button>
                            <el-button
                                v-ripple
                                size="small"
                                type="success"
                                icon="iconfont icon-yanjing2"
                                @click="setHeaderTitle_dialog = true"
                                style="margin: 0 15px"> 查看内容
                            </el-button>
                        </td>
                    </tr>
                    <tr>
                        <td>模块二</td>
                        <td>
                            <el-select v-model="module2content" clearable filterable placeholder="请选择模块二的内容"
                                       @change="selectModuleContentChange"
                                       @clear="selectModuleContentClear">
                                <el-option
                                    v-for="item in modulecontentItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-button
                                v-ripple
                                size="small"
                                type="primary"
                                icon="iconfont icon-shezhi"
                                @click="configModule2Content"
                                style="margin: 0 15px"> 配置内容
                            </el-button>
                            <el-button
                                v-ripple
                                size="small"
                                type="success"
                                icon="iconfont icon-yanjing2"
                                @click="lookConfiguredModule2Content"
                                style="margin: 0 15px"> 查看内容
                            </el-button>
                        </td>
                    </tr>
                    <tr>
                        <td>模块三</td>
                        <td>
                            <el-select v-model="module3content" clearable filterable placeholder="请选择模块三的内容"
                                       @change="selectModuleContentChange"
                                       @clear="selectModuleContentClear">
                                <el-option
                                    v-for="item in modulecontentItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-button
                                v-ripple
                                size="small"
                                type="primary"
                                icon="iconfont icon-shezhi"
                                @click="configModule3Content"
                                style="margin: 0 15px"> 配置内容
                            </el-button>
                            <el-button
                                v-ripple
                                size="small"
                                type="success"
                                icon="iconfont icon-yanjing2"
                                @click="lookConfiguredModule3Content"
                                style="margin: 0 15px"> 查看内容
                            </el-button>
                        </td>
                    </tr>
                    <tr>
                        <td>模块四</td>
                        <td>
                            <el-select v-model="module4content" clearable filterable placeholder="请选择模块四的内容"
                                       @change="selectModuleContentChange"
                                       @clear="selectModuleContentClear">
                                <el-option
                                    v-for="item in modulecontentItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-button
                                v-ripple
                                size="small"
                                type="primary"
                                icon="iconfont icon-shezhi"
                                @click="configModule4Content"
                                style="margin: 0 15px"> 配置内容
                            </el-button>
                            <el-button
                                v-ripple
                                size="small"
                                type="success"
                                icon="iconfont icon-yanjing2"
                                @click="lookConfiguredModule4Content"
                                style="margin: 0 15px"> 查看内容
                            </el-button>
                        </td>
                    </tr>
                    <tr>
                        <td>模块五</td>
                        <td>
                            <el-select v-model="module5content" clearable filterable placeholder="请选择模块五的内容"
                                       @change="selectModuleContentChange"
                                       @clear="selectModuleContentClear">
                                <el-option
                                    v-for="item in modulecontentItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-button
                                v-ripple
                                size="small"
                                type="primary"
                                icon="iconfont icon-shezhi"
                                @click="configModule5Content"
                                style="margin: 0 15px"> 配置内容
                            </el-button>
                            <el-button
                                v-ripple
                                size="small"
                                type="success"
                                icon="iconfont icon-yanjing2"
                                @click="lookConfiguredModule5Content"
                                style="margin: 0 15px"> 查看内容
                            </el-button>
                        </td>
                    </tr>
                    <tr>
                        <td>模块六</td>
                        <td>
                            <el-select v-model="module6content" clearable filterable placeholder="请选择模块六的内容"
                                       @change="selectModuleContentChange"
                                       @clear="selectModuleContentClear">
                                <el-option
                                    v-for="item in modulecontentItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-button
                                v-ripple
                                size="small"
                                type="primary"
                                icon="iconfont icon-shezhi"
                                @click="configModule6Content"
                                style="margin: 0 15px"> 配置内容
                            </el-button>
                            <el-button
                                v-ripple
                                size="small"
                                type="success"
                                icon="iconfont icon-yanjing2"
                                @click="lookConfiguredModule6Content"
                                style="margin: 0 15px"> 查看内容
                            </el-button>
                        </td>
                    </tr>
                    <tr>
                        <td>模块七</td>
                        <td>
                            固定展示页面底部
                        </td>
                        <td>
                            <el-button
                                v-ripple
                                size="small"
                                type="primary"
                                icon="iconfont icon-shezhi"
                                @click="setFooterAboutUS_dialog = true"
                                style="margin: 0 15px"> 配置内容
                            </el-button>
                            <el-button
                                v-ripple
                                size="small"
                                type="success"
                                icon="iconfont icon-yanjing2"
                                @click="setFooterAboutUS_dialog = true"
                                style="margin: 0 15px"> 查看内容
                            </el-button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <!--<el-table-->
                <!--:data="configModuleContentTableData"-->
                <!--stripe-->
                <!--border-->
                <!--highlight-current-row-->
                <!--v-loading="configModuleContentListLoading"-->
                <!--element-loading-text="拼命加载中..."-->
                <!--style="width: 100%">-->
                <!--<el-table-column-->
                <!--property="name"-->
                <!--label="模块名">-->
                <!--</el-table-column>-->
                <!--<el-table-column label="配置模块内容">-->
                <!--<template slot-scope="scope">-->
                <!--<el-select v-model="selectModulecontent" clearable filterable placeholder="请选择模块六的内容"-->
                <!--@change="selectModuleContentChange">-->
                <!--<el-option-->
                <!--v-for="item in scope.row.modulecontentItem"-->
                <!--:key="item.value"-->
                <!--:label="item.name"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="操作">-->
                <!--<template slot-scope="scope">-->

                <!--<el-button-->
                <!--v-ripple-->
                <!--size="small"-->
                <!--type="success"-->
                <!--icon="iconfont icon-chakan"-->
                <!--@click="lookDetailsClient(scope.row.clientId)"> 预览内容-->
                <!--</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--</el-table>-->
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button type="warning" @click="resetAll" icon="iconfont icon-zhongzhi" style="margin: 0 30px">
                    全部重置
                </el-button>
                <el-button type="primary" @click="submitHomePage" :disabled="isModifyBtnDisabled"
                           icon="iconfont icon-submit" style="margin: 0 30px">
                    提交保存
                </el-button>
            </el-form-item>
        </el-form>

        <el-dialog
            title="预览模板大图"
            :visible.sync="previewHomePageTemplateBigPhoto_dialog"
            width="50%"
            center>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col class="previewHomePageTemplateBigPhoto-box">
                    <img v-lazy="previewHomePageTemplateBigPhoto"/>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small"
                           @click="previewHomePageTemplateBigPhoto_dialog = false">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="设置页面头部"
            :visible.sync="setHeaderTitle_dialog"
            width="50%"
            center>
            <el-form :model="ruleFormSetHeader" :rules="rulesSetHeader" ref="ruleFormSetHeader" label-width="100px"
                     status-icon label-position="left">
                <el-form-item label="头部标题" prop="setHeaderTitle">
                    <el-input v-model="ruleFormSetHeader.setHeaderTitle"></el-input>
                </el-form-item>
                <p style="font-size: 14px; color: #858585;">
                    Tips：二级主页的公司Logo、公司地址、公众号二维码、联系电话、联系邮箱和公司地址使用的是公司注册信息，如您需要修改相应信息，请前往公司信息板块修改。页面头部里的房产预测数据由优房数据免费提供。</p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" icon="iconfont icon-yemei"
                           @click="submitSetHeaderTitle"> 保存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="设置页面底部"
            :visible.sync="setFooterAboutUS_dialog"
            width="50%"
            center>
            <el-form :model="ruleFormSetFooterAboutUS" :rules="rulesSetFooterAboutUS" ref="ruleFormSetFooterAboutUS"
                     label-width="100px" status-icon label-position="left">
                <el-form-item label="关于我们" prop="setFooterAboutUS">
                    <el-input v-model="ruleFormSetFooterAboutUS.setFooterAboutUS"></el-input>
                </el-form-item>
                <p style="font-size: 14px; color: #858585;">
                    Tips：二级主页的公司Logo、公司地址、公众号二维码、联系电话、联系邮箱和公司地址使用的是公司注册信息，如您需要修改相应信息，请前往公司信息板块修改。页面头部里的房产预测数据由优房数据免费提供。
                </p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" icon="iconfont icon-yejiao"
                           @click="submitSetFooterAboutUS"> 保存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="设置金牌顾问模块的内容"
            :visible.sync="setGoldConsultant_dialog"
            width="50%"
            center>
            <el-form :model="ruleFormSetGoldConsultant" :rules="rulesSetGoldConsultant" ref="ruleFormSetGoldConsultant"
                     label-width="150px" status-icon label-position="left">
                <el-form-item label="展示金牌顾问数量" prop="setGoldConsultant">
                    <el-input v-model="ruleFormSetGoldConsultant.setGoldConsultant"></el-input>
                </el-form-item>
                <aside>
                    <span>{{goldConsultantNumber}}</span>
                    <el-button type="primary" @click="goConsultantList" icon="iconfont icon-qianwang1" size="mini">
                        前往顾问列表
                    </el-button>
                </aside>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" icon="iconfont icon-guwenguanli"
                           @click="submitSetGoldConsultant"> 保存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="设置公司推荐房源模块的内容"
            :visible.sync="setCompanyRecommendHouse_dialog"
            width="50%"
            center>
            <el-form :model="ruleFormSetCompanyRecommendHouse" :rules="rulesSetCompanyRecommendHouse"
                     ref="ruleFormSetCompanyRecommendHouse" label-width="170px" status-icon label-position="left">
                <el-form-item label="展示公司推荐房源数量" prop="setCompanyRecommendHouse">
                    <el-input v-model="ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse"></el-input>
                </el-form-item>
                <aside>
                    <span>{{recommendHouseNumber}}</span>
                    <el-button type="primary" @click="goRecommendHouseList" icon="iconfont icon-qianwang1" size="mini">
                        前往房源列表
                    </el-button>
                </aside>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" icon="iconfont icon-fangyuanliebiao"
                           @click="submitSetCompanyRecommendHouse"> 保存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="设置顾问推荐房源模块的内容"
            :visible.sync="setConsultantRecommendHouse_dialog"
            width="50%"
            center
            class="el-dialog__wrapper_absolute"
            :append-to-body="true">
            <el-form :model="ruleFormSetConsultantRecommendHouse" :rules="rulesSetConsultantRecommendHouse"
                     ref="ruleFormSetConsultantRecommendHouse" status-icon label-position="left">
                <el-form-item label="" prop="selectConsultant" style="display: inline-block">
                    <el-select v-model="ruleFormSetConsultantRecommendHouse.selectConsultant" clearable filterable
                               placeholder="请选择顾问"
                               @change="selectConsultantChange">
                        <el-option
                            v-for="item in consultantListItem"
                            :key="item.counselorId"
                            :label="item.name"
                            :value="item.counselorId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="selectShareGroup" style="display: inline-block; margin: 0 0 0 30px;">
                    <el-select v-model="ruleFormSetConsultantRecommendHouse.selectShareGroup" clearable filterable
                               placeholder="请选择房源分享组"
                               @change="selectShareGroupChange" @clear="selectShareGroupClear">
                        <el-option
                            v-for="item in shareGroupListItem"
                            :key="item.shareId"
                            :label="item.name"
                            :value="item.shareId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" size="small" icon="iconfont icon-chakan" :disabled="lookShareGroupBtnDisabled"
                           @click="lookConfiguredConsultantRecommendHouse('预览顾问推荐房源分享组')" style="margin: 0 15px"> 预览分享组</el-button>
                <el-button type="primary" size="small" icon="iconfont icon-fangyuanliebiao"
                           @click="submitSetConsultantRecommendHouse" style="margin: 0 15px"> 保存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="设置为什么选择我们模块的内容"
            :visible.sync="setWhyChoiceWe_dialog"
            width="70%"
            center
            class="el-dialog__wrapper_absolute"
            :append-to-body="true">
            <el-form :model="ruleFormWhyChoiceWe" :rules="rulesWhyChoiceWe" ref="ruleFormWhyChoiceWe" status-icon>
                <ul class="setWhyChoiceWe-box clearfix">
                    <li>
                        <h4>第一列</h4>
                        <el-form-item prop="FirstColumnPhoto">
                            <el-select v-model="ruleFormWhyChoiceWe.FirstColumnPhoto" clearable filterable placeholder="选择图片一"
                                       @change="selectWhyChoiceWePhotoChange"
                                       @clear="selectWhyChoiceWePhotoClear">
                                <el-option
                                    v-for="item in whyChoiceWePhotoItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.photo"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <img v-lazy="'/static/img/'+ ruleFormWhyChoiceWe.FirstColumnPhoto">
                        <el-form-item prop="FirstColumnTitle">
                            <el-input v-model="ruleFormWhyChoiceWe.FirstColumnTitle" placeholder="标题"></el-input>
                        </el-form-item>
                        <el-form-item prop="FirstColumnIntroduction">
                            <el-input v-model="ruleFormWhyChoiceWe.FirstColumnIntroduction"
                                      placeholder="简略语"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <h4>第二列</h4>
                        <el-form-item prop="SecondColumnPhoto">
                            <el-select v-model="ruleFormWhyChoiceWe.SecondColumnPhoto" clearable filterable placeholder="选择图片二"
                                       @change="selectWhyChoiceWePhotoChange"
                                       @clear="selectWhyChoiceWePhotoClear">
                                <el-option
                                    v-for="item in whyChoiceWePhotoItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.photo"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <img v-lazy="'/static/img/'+ ruleFormWhyChoiceWe.SecondColumnPhoto">
                        <el-form-item prop="SecondColumnTitle">
                            <el-input v-model="ruleFormWhyChoiceWe.SecondColumnTitle" placeholder="标题"></el-input>
                        </el-form-item>
                        <el-form-item prop="SecondColumnIntroduction">
                            <el-input v-model="ruleFormWhyChoiceWe.SecondColumnIntroduction" placeholder="简略语"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <h4>第三列</h4>
                        <el-form-item prop="ThirdColumnPhoto">
                            <el-select v-model="ruleFormWhyChoiceWe.ThirdColumnPhoto" clearable filterable placeholder="选择图片三"
                                       @change="selectWhyChoiceWePhotoChange"
                                       @clear="selectWhyChoiceWePhotoClear">
                                <el-option
                                    v-for="item in whyChoiceWePhotoItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.photo"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <img v-lazy="'/static/img/'+ ruleFormWhyChoiceWe.ThirdColumnPhoto">
                        <el-form-item prop="ThirdColumnTitle">
                            <el-input v-model="ruleFormWhyChoiceWe.ThirdColumnTitle" placeholder="标题"></el-input>
                        </el-form-item>
                        <el-form-item prop="ThirdColumnIntroduction">
                            <el-input v-model="ruleFormWhyChoiceWe.ThirdColumnIntroduction" placeholder="简略语"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <h4>第四列</h4>
                        <el-form-item prop="FourthColumnPhoto">
                            <el-select v-model="ruleFormWhyChoiceWe.FourthColumnPhoto" clearable filterable placeholder="选择图片四"
                                       @change="selectWhyChoiceWePhotoChange"
                                       @clear="selectWhyChoiceWePhotoClear">
                                <el-option
                                    v-for="item in whyChoiceWePhotoItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.photo"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <img v-lazy="'/static/img/'+ ruleFormWhyChoiceWe.FourthColumnPhoto">
                        <el-form-item prop="FourthColumnTitle">
                            <el-input v-model="ruleFormWhyChoiceWe.FourthColumnTitle" placeholder="标题"></el-input>
                        </el-form-item>
                        <el-form-item prop="FourthColumnIntroduction">
                            <el-input v-model="ruleFormWhyChoiceWe.FourthColumnIntroduction" placeholder="简略语"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <h4>第五列</h4>
                        <el-form-item prop="FifthColumnPhoto">
                            <el-select v-model="ruleFormWhyChoiceWe.FifthColumnPhoto" clearable filterable placeholder="选择图片五"
                                       @change="selectWhyChoiceWePhotoChange"
                                       @clear="selectWhyChoiceWePhotoClear">
                                <el-option
                                    v-for="item in whyChoiceWePhotoItem"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.photo"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <img v-lazy="'/static/img/'+ ruleFormWhyChoiceWe.FifthColumnPhoto">
                        <el-form-item prop="FifthColumnTitle">
                            <el-input v-model="ruleFormWhyChoiceWe.FifthColumnTitle" placeholder="标题"></el-input>
                        </el-form-item>
                        <el-form-item prop="FifthColumnIntroduction">
                            <el-input v-model="ruleFormWhyChoiceWe.FifthColumnIntroduction" placeholder="简略语"></el-input>
                        </el-form-item>
                    </li>
                </ul>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" icon="iconfont icon-youshiduibi" @click="submitSetWhyChoiceWe"> 保存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="设置宣传视频"
            :visible.sync="setVideoIframe_dialog"
            width="50%"
            center>
            <el-form :model="ruleFormSetVideoIframe" :rules="rulesSetVideoIframe"
                     ref="ruleFormSetVideoIframe" label-width="130px" status-icon label-position="left">
                <el-form-item label="iframe通用代码" prop="iframeCode">
                    <el-input type="textarea" v-model="ruleFormSetVideoIframe.iframeCode" placeholder="请填写iframe通用代码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" icon="iconfont icon-xuanchuanshipin" @click="submitSetVideoIframe"> 保存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="查看已配置金牌顾问"
            :visible.sync="lookConfiguredGoldConsultant_dialog"
            width="40%"
            center>
            <el-carousel height="460px" :interval="5000" :autoplay="false" indicator-position="outside" type="card"
                         trigger="click">
                <el-carousel-item v-for="(item, index) in ConfiguredGoldConsultantItem" :key="index"
                                  class="lookConfiguredGoldConsultant-dialog clearfix">
                    <div class="inside">
                        <!--<img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item.photo">-->
                        <img v-lazy="item.photo">
                        <p>{{item.responsiblePlace}}</p>
                        <aside>{{item.name}}</aside>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>

        <el-dialog
            title="查看已配置公司推荐房源"
            :visible.sync="lookConfiguredCompanyRecommendHouse_dialog"
            width="60%"
            center>
            <el-carousel height="460px" :interval="5000" :autoplay="false" indicator-position="outside" type="card"
                         trigger="click">
                <el-carousel-item v-for="(item, index) in configuredCompanyRecommendHouseItem" :key="index"
                                  class="lookConfiguredCompanyRecommendHouse-dialog clearfix">
                    <div class="inside" @click="goHouseDetails(item.houseId)">
                        <div class="left">
                            <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item.heroImage">
                            <p>
                                <span>{{isNull0_USD(item.listPrice)}}</span>
                                <span>{{isNull0_RMB(item.listPrice)}}</span>
                            </p>
                        </div>
                        <div class="right">
                            <h2><i></i> {{houseName(item)}}</h2>
                            <div class="info">
                                <div class="address">
                                    <i class="iconfont icon-dingwei"></i>{{item.address}}
                                </div>
                                <p>占地：{{isNull0_sqft(item.livingArea) + '（' + isNull0_sqmt(item.livingArea) +'）'}}</p>
                                <p>
                                    <span class="left">卧室：{{isNull0(item.bedroomCount)}}间</span>
                                    <span class="right">卫浴：{{isNull0(item.bathroomCount)}}间</span>
                                </p>
                                <p>
                                    <span class="left">年份：{{isNull0(item.yearBuilt)}}</span>
                                    <span class="right">状态：<span
                                        v-html="house_status(item.listingStatus)"></span></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>

        <el-dialog
            :visible.sync="lookConfiguredConsultantRecommendHouse_dialog"
            width="60%"
            center>
            <el-carousel height="460px" :interval="5000" :autoplay="false" indicator-position="outside" type="card"
                         trigger="click">
                <el-carousel-item v-for="(item, index) in configuredConsultantRecommendHouseItem" :key="index"
                                  class="lookConfiguredConsultantRecommendHouse-dialog clearfix">
                    <div class="inside" @click="goHouseDetails(item.houseId)">
                        <div class="left">
                            <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item.heroImage">
                            <p>
                                <span>{{isNull0_USD(item.listPrice)}}</span>
                                <span>{{isNull0_RMB(item.listPrice)}}</span>
                            </p>
                        </div>
                        <div class="right">
                            <h2><i></i> {{houseName(item)}}</h2>
                            <div class="info">
                                <div class="address">
                                    <i class="iconfont icon-dingwei"></i>{{item.address}}
                                </div>
                                <p>占地：{{isNull0_sqft(item.livingArea) + '（' + isNull0_sqmt(item.livingArea) +'）'}}</p>
                                <p>
                                    <span class="left">卧室：{{isNull0(item.bedroomCount)}}间</span>
                                    <span class="right">卫浴：{{isNull0(item.bathroomCount)}}间</span>
                                </p>
                                <p>
                                    <span class="left">年份：{{isNull0(item.yearBuilt)}}</span>
                                    <span class="right">状态：<span
                                        v-html="house_status(item.listingStatus)"></span></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <slot slot="title">
                <span class="el-dialog__title">{{lookConfiguredConsultantRecommendHouse_dialog_title}}</span>
            </slot>
        </el-dialog>

        <el-dialog
            title="查看已配置为什么选择我们"
            :visible.sync="lookConfiguredWhyChoiceWe_dialog"
            width="60%"
            center>
            <ul class="lookConfiguredWhyChoiceWe-dialog clearfix">
                <li v-for="(item, index) in configuredWhyChoiceWeItem" :key="index">
                    <img v-lazy="'/static/img/'+ item.photo">
                    <h5>{{item.title}}</h5>
                    <p>{{item.introduction}}</p>
                </li>
            </ul>
        </el-dialog>


        <el-dialog
            title="查看已配置宣传视频"
            :visible.sync="lookConfiguredVideoIframe_dialog"
            width="60%"
            center>
            <article class="lookConfiguredVideoIframe-dialog" v-html="ruleFormSetVideoIframe.iframeCode"></article>
        </el-dialog>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                //二级主页模板图片
                homePageTemplateItem: [
                    {
                        src: '/static/img/company-homePage1.jpg',
                        value: '1',
                        name: '模板一'
                    },
                ],
                ruleForm: {
                    homePageTemplateId: '',//选择的模板
                    homePageTemplateName: '',//模板名称
                    firstModuleContent: '',//模块一内容——固定头部
                    secondModuleContent: '',//模块二内容
                    thirdModuleContent: '',//模块三内容
                    fourthModuleContent: '',//模块四内容
                    fifthModuleContent: '',//模块五内容
                    sixthModuleContent: '',//模块六内容
                    seventhModuleContent: '',//模块七内容——固定底部

                },
                rules: {//表单验证规则
                    homePageTemplateId: [
                        {required: true, message: "请选择二级主页模板！", trigger: 'change'}
                    ],
                    homePageTemplateName: [
                        {required: true, message: "请填写模板名称！", trigger: 'blur'}
                    ],
                    configModuleContent: [
                        {required: true, validator: this.configModuleContent_validation,}
                    ],
                },

                previewHomePageTemplateBigPhoto_dialog: false,//预览模板大图的Dialog对话框
                previewHomePageTemplateBigPhoto: '',//预览模板大图
                //配置模块内容的数据
                // configModuleContentTableData: [
                //     {
                //         name: '模板一',
                //         modulecontentItem: [
                //             {
                //                 value: 'header',
                //                 name: '固定展示页面头部'
                //             }
                //         ]
                //     },
                //     {
                //         name: '模板二',
                //         modulecontentItem: [
                //             {
                //                 value: 'GoldConsultant',
                //                 name: '金牌顾问'
                //             },
                //             {
                //                 value: 'companyRecommendHouse',
                //                 name: '公司推荐房源'
                //             },
                //             {
                //                 value: 'consultantRecommendHouse',
                //                 name: '顾问推荐房源'
                //             },
                //             {
                //                 value: 'whyChoiceWe',
                //                 name: '为什么选择我们'
                //             },
                //             {
                //                 value: 'video',
                //                 name: '宣传视频'
                //             },
                //         ],
                //     },
                // ],
                // configModuleContentListLoading: '',//配置模块内容列表的加载动画

                //可选择配置的模块列表
                modulecontentItem: [
                    {
                        value: 'GoldConsultant',
                        name: '金牌顾问',
                        disabled: false
                    },
                    {
                        value: 'companyRecommendHouse',
                        name: '公司推荐房源',
                        disabled: false
                    },
                    {
                        value: 'consultantRecommendHouse',
                        name: '顾问推荐房源',
                        disabled: false
                    },
                    {
                        value: 'whyChoiceWe',
                        name: '为什么选择我们',
                        disabled: false
                    },
                    {
                        value: 'video',
                        name: '宣传视频',
                        disabled: false
                    },
                ],
                module1content: 'header',//选择配置的模块一——固定展示头部
                module2content: '',//选择配置的模块二
                module3content: '',//选择配置的模块三
                module4content: '',//选择配置的模块四
                module5content: '',//选择配置的模块五
                module6content: '',//选择配置的模块六
                module7content: 'footer',//选择配置的模块七——固定展示底部

                //设置页面头部的Dialog对话框
                setHeaderTitle_dialog: false,
                ruleFormSetHeader: {
                    setHeaderTitle: '',//配置的头部的标题
                },
                rulesSetHeader: {
                    setHeaderTitle: [
                        {required: true, message: "请填写头部标题！", trigger: 'blur'}
                    ],
                },

                //设置页面底部关于我们的Dialog对话框
                setFooterAboutUS_dialog: false,
                ruleFormSetFooterAboutUS: {
                    setFooterAboutUS: '',//配置的底部的关于我们
                },
                rulesSetFooterAboutUS: {
                    setFooterAboutUS: [
                        {required: true, message: "请填写关于我们简介！", trigger: 'blur'}
                    ],
                },

                //设置金牌顾问模块的内容的Dialog对话框
                setGoldConsultant_dialog: false,
                ruleFormSetGoldConsultant: {
                    setGoldConsultant: '',//配置的金牌顾问的数量
                },
                rulesSetGoldConsultant: {
                    setGoldConsultant: [
                        {required: true, message: "请设置展示的金牌顾问的数量！", trigger: 'blur'}
                    ],
                },
                goldConsultantNumber: '',   //已设置过的的本公司金牌顾问数量

                //设置公司推荐房源模块的内容的Dialog对话框
                setCompanyRecommendHouse_dialog: false,
                ruleFormSetCompanyRecommendHouse: {
                    setCompanyRecommendHouse: '',//配置的公司推荐房源的数量
                },
                rulesSetCompanyRecommendHouse: {
                    setCompanyRecommendHouse: [
                        {required: true, message: "请设置展示的公司推荐房源的数量！", trigger: 'blur'}
                    ],
                },
                recommendHouseNumber: '',   //已设置过的本公司推荐房源数量

                //设置顾问推荐房源模块的内容的Dialog对话框
                setConsultantRecommendHouse_dialog: false,
                ruleFormSetConsultantRecommendHouse: {
                    selectConsultant: '',//配置的顾问
                    selectShareGroup: '',//配置的房源分享组
                },
                rulesSetConsultantRecommendHouse: {
                    selectConsultant: [
                        {required: true, message: "请选择顾问！", trigger: 'change'}
                    ],
                    selectShareGroup: [
                        {required: true, message: "请选择房源分享组！", trigger: 'change'}
                    ],
                },
                consultantListItem: [],//顾问列表数据
                shareGroupListItem: [],//选择的顾问的房源分享组列表数据
                lookShareGroupBtnDisabled: true,//查看分享组按钮的状态

                //设置为什么选择我们模块的内容的Dialog对话框
                setWhyChoiceWe_dialog: false,
                whyChoiceWePhotoItem:[//为什么选择我们的5张图片数组
                    {
                        photo: 'whyChoiceWe1.png',
                        name: '图片1',
                        disabled: false
                    },
                    {
                        photo: 'whyChoiceWe2.png',
                        name: '图片2',
                        disabled: false
                    },
                    {
                        photo: 'whyChoiceWe3.png',
                        name: '图片3',
                        disabled: false
                    },
                    {
                        photo: 'whyChoiceWe4.png',
                        name: '图片4',
                        disabled: false
                    },
                    {
                        photo: 'whyChoiceWe5.png',
                        name: '图片5',
                        disabled: false
                    }
                ],
                ruleFormWhyChoiceWe: {
                    FirstColumnPhoto: '',//第一列——选择图片一
                    FirstColumnTitle: '',//第一列——标题
                    FirstColumnIntroduction: '',//第一列——简略语
                    SecondColumnPhoto: '',//第二列——选择图片二
                    SecondColumnTitle: '',//第二列——标题
                    SecondColumnIntroduction: '',//第二列——简略语
                    ThirdColumnPhoto: '',//第三列——选择图片三
                    ThirdColumnTitle: '',//第三列——标题
                    ThirdColumnIntroduction: '',//第三列——简略语
                    FourthColumnPhoto: '',//第四列——选择图片四
                    FourthColumnTitle: '',//第四列——标题
                    FourthColumnIntroduction: '',//第四列——简略语
                    FifthColumnPhoto: '',//第五列——选择图片五
                    FifthColumnTitle: '',//第五列——标题
                    FifthColumnIntroduction: '',//第五列——简略语
                },
                rulesWhyChoiceWe: {
                    FirstColumnPhoto: [
                        {required: true, message: "请选择图片一！", trigger: 'change'}
                    ],
                    FirstColumnTitle: [
                        {required: true, message: "请填写标题！", trigger: 'blur'}
                    ],
                    FirstColumnIntroduction: [
                        {required: true, message: "请填写简略语！", trigger: 'blur'}
                    ],
                    SecondColumnPhoto: [
                        {required: true, message: "请选择图片二！", trigger: 'change'}
                    ],
                    SecondColumnTitle: [
                        {required: true, message: "请填写标题！", trigger: 'blur'}
                    ],
                    SecondColumnIntroduction: [
                        {required: true, message: "请填写简略语！", trigger: 'blur'}
                    ],
                    ThirdColumnPhoto: [
                        {required: true, message: "请选择图片三！", trigger: 'change'}
                    ],
                    ThirdColumnTitle: [
                        {required: true, message: "请填写标题！", trigger: 'blur'}
                    ],
                    ThirdColumnIntroduction: [
                        {required: true, message: "请填写简略语！", trigger: 'blur'}
                    ],
                    FourthColumnPhoto: [
                        {required: true, message: "请选择图片四！", trigger: 'change'}
                    ],
                    FourthColumnTitle: [
                        {required: true, message: "请填写标题！", trigger: 'blur'}
                    ],
                    FourthColumnIntroduction: [
                        {required: true, message: "请填写简略语！", trigger: 'blur'}
                    ],
                    FifthColumnPhoto: [
                        {required: true, message: "请选择图片五！", trigger: 'change'}
                    ],
                    FifthColumnTitle: [
                        {required: true, message: "请填写标题！", trigger: 'blur'}
                    ],
                    FifthColumnIntroduction: [
                        {required: true, message: "请填写简略语！", trigger: 'blur'}
                    ],
                },

                //设置宣传视频模块的内容的Dialog对话框
                setVideoIframe_dialog: false,
                ruleFormSetVideoIframe: {
                    iframeCode: '',//配置的宣传视频iframe通用代码
                },
                rulesSetVideoIframe: {
                    iframeCode: [
                        {required: true, message: "请填写iframe通用代码！", trigger: 'blur'}
                    ],
                },

                //查看已配置金牌顾问的Dialog对话框
                lookConfiguredGoldConsultant_dialog: false,
                ConfiguredGoldConsultantItem: [],//查看已配置金牌顾问的数据

                //查看已配置公司推荐房源的Dialog对话框
                lookConfiguredCompanyRecommendHouse_dialog: false,
                configuredCompanyRecommendHouseItem: [],//查看已配置公司推荐房源的数据

                //查看已配置顾问推荐房源的Dialog对话框
                lookConfiguredConsultantRecommendHouse_dialog: false,
                lookConfiguredConsultantRecommendHouse_dialog_title: '',//查看已配置顾问推荐房源的Dialog对话框的标题
                configuredConsultantRecommendHouseItem: [],//查看已配置顾问推荐房源的数据

                //查看已配置为什么选择我们的Dialog对话框
                lookConfiguredWhyChoiceWe_dialog: false,
                configuredWhyChoiceWeItem: [],//查看已配置为什么选择我们的数据

                //查看已配置宣传视频的Dialog对话框
                lookConfiguredVideoIframe_dialog: false,

                homePageId: this.$route.query.homePageId,//已配置过的二级主页的id
                backend_params: {},//最终要发给后台的参数

                isModifyBtnDisabled: false,//提交修改按钮的状态


            }
        },
        computed: {},
        mounted() {
            this.getSetGoldConsultant();//设置金牌顾问模块的内容-获取已设置的本公司金牌顾问数量
            this.getSetRecommendHouse();//设置公司推荐房源模块的内容-获取已设置的本公司推荐房源数量
            this.getConsultantList();//获取顾问列表数据
            //判断是否是修改还是新建
            if(this.homePageId){
                this.getConfiguredHomePageContent();
            }
        },
        methods: {
            //修改二级主页时——获取已设置的二级主页的配置内容
            getConfiguredHomePageContent() {
                this.$get('/template/html/data/preview?id=' + this.homePageId).then(res => {
                    if (res.status == 0) {
                        this.ruleForm.homePageTemplateId = res.data.tempId.toString();//选择的模板
                        this.ruleForm.homePageTemplateName = res.data.templateCustomName;//模板名称

                        //判断模块2~6放什么内容
                        res.data['modules'].forEach((i) => {
                            switch (i.moduleName) {
                                case 'module1/header':
                                    this.ruleFormSetHeader.setHeaderTitle = i.moduleValue;//已设置的头部的标题
                                    break;
                                case 'module7/footer':
                                    this.ruleFormSetFooterAboutUS.setFooterAboutUS = i.moduleValue;//已设置的底部的关于我们
                                    break;
                                case 'module2/GoldConsultant':
                                    this.module2content = 'GoldConsultant';
                                    this.ruleFormSetGoldConsultant.setGoldConsultant = i.moduleValue;//已设置的金牌顾问的数量
                                    break;
                                case 'module2/companyRecommendHouse':
                                    this.module2content = 'companyRecommendHouse';
                                    this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse = i.moduleValue;//已设置的公司推荐房源的数量
                                    break;
                                case 'module2/consultantRecommendHouse':
                                    this.module2content = 'consultantRecommendHouse';
                                    this.ruleFormSetConsultantRecommendHouse.selectConsultant = i.moduleValue.split('/')[0];//已设置的顾问
                                    this.ruleFormSetConsultantRecommendHouse.selectShareGroup = i.moduleValue.split('/')[1];//已设置的房源分享组
                                    break;
                                case 'module2/whyChoiceWe':
                                    this.module2content = 'whyChoiceWe';
                                    this.configuredWhyChoiceWeItem = JSON.parse(i.moduleValue);//已设置的为什么选择我们的数据
                                    this.ruleFormWhyChoiceWe.FirstColumnPhoto = this.configuredWhyChoiceWeItem[0].photo;//已设置的为什么选择我们——第一列图片
                                    this.ruleFormWhyChoiceWe.FirstColumnTitle = this.configuredWhyChoiceWeItem[0].title;//已设置的为什么选择我们——第一列标题
                                    this.ruleFormWhyChoiceWe.FirstColumnIntroduction = this.configuredWhyChoiceWeItem[0].introduction;//已设置的为什么选择我们——第一列简略语

                                    this.ruleFormWhyChoiceWe.SecondColumnPhoto = this.configuredWhyChoiceWeItem[1].photo;//已设置的为什么选择我们——第二列图片
                                    this.ruleFormWhyChoiceWe.SecondColumnTitle = this.configuredWhyChoiceWeItem[1].title;//已设置的为什么选择我们——第二列标题
                                    this.ruleFormWhyChoiceWe.SecondColumnIntroduction = this.configuredWhyChoiceWeItem[1].introduction;//已设置的为什么选择我们——第二列简略语

                                    this.ruleFormWhyChoiceWe.ThirdColumnPhoto = this.configuredWhyChoiceWeItem[2].photo;//已设置的为什么选择我们——第三列图片
                                    this.ruleFormWhyChoiceWe.ThirdColumnTitle = this.configuredWhyChoiceWeItem[2].title;//已设置的为什么选择我们——第三列标题
                                    this.ruleFormWhyChoiceWe.ThirdColumnIntroduction = this.configuredWhyChoiceWeItem[2].introduction;//已设置的为什么选择我们——第三列简略语

                                    this.ruleFormWhyChoiceWe.FourthColumnPhoto = this.configuredWhyChoiceWeItem[3].photo;//已设置的为什么选择我们——第四列图片
                                    this.ruleFormWhyChoiceWe.FourthColumnTitle = this.configuredWhyChoiceWeItem[3].title;//已设置的为什么选择我们——第四列标题
                                    this.ruleFormWhyChoiceWe.FourthColumnIntroduction = this.configuredWhyChoiceWeItem[3].introduction;//已设置的为什么选择我们——第四列简略语

                                    this.ruleFormWhyChoiceWe.FifthColumnPhoto = this.configuredWhyChoiceWeItem[4].photo;//已设置的为什么选择我们——第五列图片
                                    this.ruleFormWhyChoiceWe.FifthColumnTitle = this.configuredWhyChoiceWeItem[4].title;//已设置的为什么选择我们——第五列标题
                                    this.ruleFormWhyChoiceWe.FifthColumnIntroduction = this.configuredWhyChoiceWeItem[4].introduction;//已设置的为什么选择我们——第五列简略语
                                    break;
                                case 'module2/video':
                                    this.module2content = 'video';
                                    this.ruleFormSetVideoIframe.iframeCode = i.moduleValue;//已设置的宣传视频iframe通用代码
                                    break;

                                case 'module3/GoldConsultant':
                                    this.module3content = 'GoldConsultant';
                                    this.ruleFormSetGoldConsultant.setGoldConsultant = i.moduleValue;//已设置的金牌顾问的数量
                                    break;
                                case 'module3/companyRecommendHouse':
                                    this.module3content = 'companyRecommendHouse';
                                    this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse = i.moduleValue;//已设置的公司推荐房源的数量
                                    break;
                                case 'module3/consultantRecommendHouse':
                                    this.module3content = 'consultantRecommendHouse';
                                    setTimeout(() => {
                                        this.ruleFormSetConsultantRecommendHouse.selectConsultant = i.moduleValue.split('/')[0];//已设置的顾问
                                        this.ruleFormSetConsultantRecommendHouse.selectShareGroup = i.moduleValue.split('/')[1];//已设置的房源分享组
                                    },1000)
                                    break;
                                case 'module3/whyChoiceWe':
                                    this.module3content = 'whyChoiceWe';
                                    this.configuredWhyChoiceWeItem = JSON.parse(i.moduleValue);//已设置的为什么选择我们的数据
                                    this.ruleFormWhyChoiceWe.FirstColumnPhoto = this.configuredWhyChoiceWeItem[0].photo;//已设置的为什么选择我们——第一列图片
                                    this.ruleFormWhyChoiceWe.FirstColumnTitle = this.configuredWhyChoiceWeItem[0].title;//已设置的为什么选择我们——第一列标题
                                    this.ruleFormWhyChoiceWe.FirstColumnIntroduction = this.configuredWhyChoiceWeItem[0].introduction;//已设置的为什么选择我们——第一列简略语

                                    this.ruleFormWhyChoiceWe.SecondColumnPhoto = this.configuredWhyChoiceWeItem[1].photo;//已设置的为什么选择我们——第二列图片
                                    this.ruleFormWhyChoiceWe.SecondColumnTitle = this.configuredWhyChoiceWeItem[1].title;//已设置的为什么选择我们——第二列标题
                                    this.ruleFormWhyChoiceWe.SecondColumnIntroduction = this.configuredWhyChoiceWeItem[1].introduction;//已设置的为什么选择我们——第二列简略语

                                    this.ruleFormWhyChoiceWe.ThirdColumnPhoto = this.configuredWhyChoiceWeItem[2].photo;//已设置的为什么选择我们——第三列图片
                                    this.ruleFormWhyChoiceWe.ThirdColumnTitle = this.configuredWhyChoiceWeItem[2].title;//已设置的为什么选择我们——第三列标题
                                    this.ruleFormWhyChoiceWe.ThirdColumnIntroduction = this.configuredWhyChoiceWeItem[2].introduction;//已设置的为什么选择我们——第三列简略语

                                    this.ruleFormWhyChoiceWe.FourthColumnPhoto = this.configuredWhyChoiceWeItem[3].photo;//已设置的为什么选择我们——第四列图片
                                    this.ruleFormWhyChoiceWe.FourthColumnTitle = this.configuredWhyChoiceWeItem[3].title;//已设置的为什么选择我们——第四列标题
                                    this.ruleFormWhyChoiceWe.FourthColumnIntroduction = this.configuredWhyChoiceWeItem[3].introduction;//已设置的为什么选择我们——第四列简略语

                                    this.ruleFormWhyChoiceWe.FifthColumnPhoto = this.configuredWhyChoiceWeItem[4].photo;//已设置的为什么选择我们——第五列图片
                                    this.ruleFormWhyChoiceWe.FifthColumnTitle = this.configuredWhyChoiceWeItem[4].title;//已设置的为什么选择我们——第五列标题
                                    this.ruleFormWhyChoiceWe.FifthColumnIntroduction = this.configuredWhyChoiceWeItem[4].introduction;//已设置的为什么选择我们——第五列简略语
                                    break;
                                case 'module3/video':
                                    this.module3content = 'video';
                                    this.ruleFormSetVideoIframe.iframeCode = i.moduleValue;//已设置的宣传视频iframe通用代码
                                    break;

                                case 'module4/GoldConsultant':
                                    this.module4content = 'GoldConsultant';
                                    this.ruleFormSetGoldConsultant.setGoldConsultant = i.moduleValue;//已设置的金牌顾问的数量
                                    break;
                                case 'module4/companyRecommendHouse':
                                    this.module4content = 'companyRecommendHouse';
                                    this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse = i.moduleValue;//已设置的公司推荐房源的数量
                                    break;
                                case 'module4/consultantRecommendHouse':
                                    this.module4content = 'consultantRecommendHouse';
                                    this.ruleFormSetConsultantRecommendHouse.selectConsultant = i.moduleValue.split('/')[0];//已设置的顾问
                                    this.ruleFormSetConsultantRecommendHouse.selectShareGroup = i.moduleValue.split('/')[1];//已设置的房源分享组
                                    break;
                                case 'module4/whyChoiceWe':
                                    this.module4content = 'whyChoiceWe';
                                    this.configuredWhyChoiceWeItem = JSON.parse(i.moduleValue);//已设置的为什么选择我们的数据
                                    this.ruleFormWhyChoiceWe.FirstColumnPhoto = this.configuredWhyChoiceWeItem[0].photo;//已设置的为什么选择我们——第一列图片
                                    this.ruleFormWhyChoiceWe.FirstColumnTitle = this.configuredWhyChoiceWeItem[0].title;//已设置的为什么选择我们——第一列标题
                                    this.ruleFormWhyChoiceWe.FirstColumnIntroduction = this.configuredWhyChoiceWeItem[0].introduction;//已设置的为什么选择我们——第一列简略语

                                    this.ruleFormWhyChoiceWe.SecondColumnPhoto = this.configuredWhyChoiceWeItem[1].photo;//已设置的为什么选择我们——第二列图片
                                    this.ruleFormWhyChoiceWe.SecondColumnTitle = this.configuredWhyChoiceWeItem[1].title;//已设置的为什么选择我们——第二列标题
                                    this.ruleFormWhyChoiceWe.SecondColumnIntroduction = this.configuredWhyChoiceWeItem[1].introduction;//已设置的为什么选择我们——第二列简略语

                                    this.ruleFormWhyChoiceWe.ThirdColumnPhoto = this.configuredWhyChoiceWeItem[2].photo;//已设置的为什么选择我们——第三列图片
                                    this.ruleFormWhyChoiceWe.ThirdColumnTitle = this.configuredWhyChoiceWeItem[2].title;//已设置的为什么选择我们——第三列标题
                                    this.ruleFormWhyChoiceWe.ThirdColumnIntroduction = this.configuredWhyChoiceWeItem[2].introduction;//已设置的为什么选择我们——第三列简略语

                                    this.ruleFormWhyChoiceWe.FourthColumnPhoto = this.configuredWhyChoiceWeItem[3].photo;//已设置的为什么选择我们——第四列图片
                                    this.ruleFormWhyChoiceWe.FourthColumnTitle = this.configuredWhyChoiceWeItem[3].title;//已设置的为什么选择我们——第四列标题
                                    this.ruleFormWhyChoiceWe.FourthColumnIntroduction = this.configuredWhyChoiceWeItem[3].introduction;//已设置的为什么选择我们——第四列简略语

                                    this.ruleFormWhyChoiceWe.FifthColumnPhoto = this.configuredWhyChoiceWeItem[4].photo;//已设置的为什么选择我们——第五列图片
                                    this.ruleFormWhyChoiceWe.FifthColumnTitle = this.configuredWhyChoiceWeItem[4].title;//已设置的为什么选择我们——第五列标题
                                    this.ruleFormWhyChoiceWe.FifthColumnIntroduction = this.configuredWhyChoiceWeItem[4].introduction;//已设置的为什么选择我们——第五列简略语
                                    break;
                                case 'module4/video':
                                    this.module4content = 'video';
                                    this.ruleFormSetVideoIframe.iframeCode = i.moduleValue;//已设置的宣传视频iframe通用代码
                                    break;

                                case 'module5/GoldConsultant':
                                    this.module5content = 'GoldConsultant';
                                    this.ruleFormSetGoldConsultant.setGoldConsultant = i.moduleValue;//已设置的金牌顾问的数量
                                    break;
                                case 'module5/companyRecommendHouse':
                                    this.module5content = 'companyRecommendHouse';
                                    this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse = i.moduleValue;//已设置的公司推荐房源的数量
                                    break;
                                case 'module5/consultantRecommendHouse':
                                    this.module5content = 'consultantRecommendHouse';
                                    this.ruleFormSetConsultantRecommendHouse.selectConsultant = i.moduleValue.split('/')[0];//已设置的顾问
                                    this.ruleFormSetConsultantRecommendHouse.selectShareGroup = i.moduleValue.split('/')[1];//已设置的房源分享组
                                    break;
                                case 'module5/whyChoiceWe':
                                    this.module5content = 'whyChoiceWe';
                                    this.configuredWhyChoiceWeItem = JSON.parse(i.moduleValue);//已设置的为什么选择我们的数据
                                    this.ruleFormWhyChoiceWe.FirstColumnPhoto = this.configuredWhyChoiceWeItem[0].photo;//已设置的为什么选择我们——第一列图片
                                    this.ruleFormWhyChoiceWe.FirstColumnTitle = this.configuredWhyChoiceWeItem[0].title;//已设置的为什么选择我们——第一列标题
                                    this.ruleFormWhyChoiceWe.FirstColumnIntroduction = this.configuredWhyChoiceWeItem[0].introduction;//已设置的为什么选择我们——第一列简略语

                                    this.ruleFormWhyChoiceWe.SecondColumnPhoto = this.configuredWhyChoiceWeItem[1].photo;//已设置的为什么选择我们——第二列图片
                                    this.ruleFormWhyChoiceWe.SecondColumnTitle = this.configuredWhyChoiceWeItem[1].title;//已设置的为什么选择我们——第二列标题
                                    this.ruleFormWhyChoiceWe.SecondColumnIntroduction = this.configuredWhyChoiceWeItem[1].introduction;//已设置的为什么选择我们——第二列简略语

                                    this.ruleFormWhyChoiceWe.ThirdColumnPhoto = this.configuredWhyChoiceWeItem[2].photo;//已设置的为什么选择我们——第三列图片
                                    this.ruleFormWhyChoiceWe.ThirdColumnTitle = this.configuredWhyChoiceWeItem[2].title;//已设置的为什么选择我们——第三列标题
                                    this.ruleFormWhyChoiceWe.ThirdColumnIntroduction = this.configuredWhyChoiceWeItem[2].introduction;//已设置的为什么选择我们——第三列简略语

                                    this.ruleFormWhyChoiceWe.FourthColumnPhoto = this.configuredWhyChoiceWeItem[3].photo;//已设置的为什么选择我们——第四列图片
                                    this.ruleFormWhyChoiceWe.FourthColumnTitle = this.configuredWhyChoiceWeItem[3].title;//已设置的为什么选择我们——第四列标题
                                    this.ruleFormWhyChoiceWe.FourthColumnIntroduction = this.configuredWhyChoiceWeItem[3].introduction;//已设置的为什么选择我们——第四列简略语

                                    this.ruleFormWhyChoiceWe.FifthColumnPhoto = this.configuredWhyChoiceWeItem[4].photo;//已设置的为什么选择我们——第五列图片
                                    this.ruleFormWhyChoiceWe.FifthColumnTitle = this.configuredWhyChoiceWeItem[4].title;//已设置的为什么选择我们——第五列标题
                                    this.ruleFormWhyChoiceWe.FifthColumnIntroduction = this.configuredWhyChoiceWeItem[4].introduction;//已设置的为什么选择我们——第五列简略语

                                    break;
                                case 'module5/video':
                                    this.module5content = 'video';
                                    this.ruleFormSetVideoIframe.iframeCode = i.moduleValue;//已设置的宣传视频iframe通用代码
                                    break;

                                case 'module6/GoldConsultant':
                                    this.module6content = 'GoldConsultant';
                                    this.ruleFormSetGoldConsultant.setGoldConsultant = i.moduleValue;//已设置的金牌顾问的数量
                                    break;
                                case 'module6/companyRecommendHouse':
                                    this.module6content = 'companyRecommendHouse';
                                    this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse = i.moduleValue;//已设置的公司推荐房源的数量
                                    break;
                                case 'module6/consultantRecommendHouse':
                                    this.module6content = 'consultantRecommendHouse';
                                    this.ruleFormSetConsultantRecommendHouse.selectConsultant = i.moduleValue.split('/')[0];//已设置的顾问
                                    this.ruleFormSetConsultantRecommendHouse.selectShareGroup = i.moduleValue.split('/')[1];//已设置的房源分享组
                                    break;
                                case 'module6/whyChoiceWe':
                                    this.module6content = 'whyChoiceWe';
                                    this.configuredWhyChoiceWeItem = JSON.parse(i.moduleValue);//已设置的为什么选择我们的数据
                                    this.ruleFormWhyChoiceWe.FirstColumnPhoto = this.configuredWhyChoiceWeItem[0].photo;//已设置的为什么选择我们——第一列图片
                                    this.ruleFormWhyChoiceWe.FirstColumnTitle = this.configuredWhyChoiceWeItem[0].title;//已设置的为什么选择我们——第一列标题
                                    this.ruleFormWhyChoiceWe.FirstColumnIntroduction = this.configuredWhyChoiceWeItem[0].introduction;//已设置的为什么选择我们——第一列简略语

                                    this.ruleFormWhyChoiceWe.SecondColumnPhoto = this.configuredWhyChoiceWeItem[1].photo;//已设置的为什么选择我们——第二列图片
                                    this.ruleFormWhyChoiceWe.SecondColumnTitle = this.configuredWhyChoiceWeItem[1].title;//已设置的为什么选择我们——第二列标题
                                    this.ruleFormWhyChoiceWe.SecondColumnIntroduction = this.configuredWhyChoiceWeItem[1].introduction;//已设置的为什么选择我们——第二列简略语

                                    this.ruleFormWhyChoiceWe.ThirdColumnPhoto = this.configuredWhyChoiceWeItem[2].photo;//已设置的为什么选择我们——第三列图片
                                    this.ruleFormWhyChoiceWe.ThirdColumnTitle = this.configuredWhyChoiceWeItem[2].title;//已设置的为什么选择我们——第三列标题
                                    this.ruleFormWhyChoiceWe.ThirdColumnIntroduction = this.configuredWhyChoiceWeItem[2].introduction;//已设置的为什么选择我们——第三列简略语

                                    this.ruleFormWhyChoiceWe.FourthColumnPhoto = this.configuredWhyChoiceWeItem[3].photo;//已设置的为什么选择我们——第四列图片
                                    this.ruleFormWhyChoiceWe.FourthColumnTitle = this.configuredWhyChoiceWeItem[3].title;//已设置的为什么选择我们——第四列标题
                                    this.ruleFormWhyChoiceWe.FourthColumnIntroduction = this.configuredWhyChoiceWeItem[3].introduction;//已设置的为什么选择我们——第四列简略语

                                    this.ruleFormWhyChoiceWe.FifthColumnPhoto = this.configuredWhyChoiceWeItem[4].photo;//已设置的为什么选择我们——第五列图片
                                    this.ruleFormWhyChoiceWe.FifthColumnTitle = this.configuredWhyChoiceWeItem[4].title;//已设置的为什么选择我们——第五列标题
                                    this.ruleFormWhyChoiceWe.FifthColumnIntroduction = this.configuredWhyChoiceWeItem[4].introduction;//已设置的为什么选择我们——第五列简略语
                                    break;
                                case 'module6/video':
                                    this.module6content = 'video';
                                    this.ruleFormSetVideoIframe.iframeCode = i.moduleValue;//已设置的宣传视频iframe通用代码
                                    break;

                                default:
                                    return;
                            }
                        });




                        // this.ruleFormSetVideoIframe.iframeCode = '';//配置的宣传视频iframe通用代码
                    }
                })
            },
            //设置金牌顾问模块的内容——获取已设置的本公司金牌顾问数量
            getSetGoldConsultant() {
                this.$get('/counselor/count').then(res => {
                    if (res.status == 0) {
                        if (res.data > 0) {
                            this.goldConsultantNumber = `您已设置过${res.data}位金牌顾问`;
                        } else {
                            this.goldConsultantNumber = `您尚未设置过金牌顾问`;
                        }
                    }
                })
            },
            //设置公司推荐房源模块的内容——获取已设置的本公司推荐房源数量
            getSetRecommendHouse() {
                this.$get('/recommend/house/count').then(res => {
                    if (res.status == 0) {
                        if (res.data > 0) {
                            this.recommendHouseNumber = `您已设置过${res.data}个推荐房源`;
                        } else {
                            this.recommendHouseNumber = `您尚未设置过推荐房源`;
                        }
                    }
                })
            },
            //预览模板大图
            previewHomePageTemplate(src) {
                this.previewHomePageTemplateBigPhoto = src;
                this.previewHomePageTemplateBigPhoto_dialog = true;
            },
            //选择的模块的change事件——实时判断显示禁用select里的option项
            selectModuleContentChange(value) {
                // console.log(this.module2content +','+ this.module3content +','+ this.module4content +','+ this.module5content +','+ this.module6content);
                if (value) {
                    this.modulecontentItem.forEach((i) => {
                        if (this.module2content == i.value || this.module3content == i.value || this.module4content == i.value || this.module5content == i.value || this.module6content == i.value) {
                            i.disabled = true;
                        } else {
                            i.disabled = false;
                        }
                    });
                }
            },
            //选择的模块的clear事件——实时判断显示禁用select里的option项
            selectModuleContentClear() {
                this.modulecontentItem.forEach((i) => {
                    if (this.module2content == i.value || this.module3content == i.value || this.module4content == i.value || this.module5content == i.value || this.module6content == i.value) {
                        i.disabled = true;
                    } else {
                        i.disabled = false;
                    }
                });
            },

            //模块一——提交验证设置页面头部表单
            submitSetHeaderTitle() {
                this.$refs.ruleFormSetHeader.validate((valid) => {
                    if (valid) {
                        this.setHeaderTitle_dialog = false;
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },

            //模块七——提交验证设置页面底部表单
            submitSetFooterAboutUS() {
                this.$refs.ruleFormSetFooterAboutUS.validate((valid) => {
                    if (valid) {
                        this.setFooterAboutUS_dialog = false;
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },

            //前往顾问列表
            goConsultantList() {
                this.$router.push({path: '/company_consultantList'});
            },
            //提交验证设置金牌顾问模块的内容表单
            submitSetGoldConsultant() {
                this.$refs.ruleFormSetGoldConsultant.validate((valid) => {
                    if (valid) {
                        this.setGoldConsultant_dialog = false;
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },

            // 前往房源列表
            goRecommendHouseList() {
                this.$router.push({path: '/company_houseList'});
            },
            //提交验证设置公司推荐房源模块的内容表单
            submitSetCompanyRecommendHouse() {
                this.$refs.ruleFormSetCompanyRecommendHouse.validate((valid) => {
                    if (valid) {
                        this.setCompanyRecommendHouse_dialog = false;
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },

            //获取顾问列表数据
            getConsultantList() {
                this.$get('/counselor/list?istop=false&pageSize=100').then(res => {
                    if (res.status == 0) {
                        this.consultantListItem = res.rows;
                    }
                })
            },
            // 选择顾问的change事件
            selectConsultantChange(value) {
                this.$get('/sharegroup/list?counselorId=' + value).then(res => {
                    if (res.status == 0) {
                        this.shareGroupListItem = res.rows;
                    }
                })
            },
            // 选择房源分享组的change事件
            selectShareGroupChange(value) {
                if (value) {
                    this.lookShareGroupBtnDisabled = false;
                }
            },
            // 选择房源分享组的clear事件
            selectShareGroupClear() {
                this.lookShareGroupBtnDisabled = true;
            },
            //提交验证设置顾问推荐房源模块的内容表单
            submitSetConsultantRecommendHouse() {
                this.$refs.ruleFormSetConsultantRecommendHouse.validate((valid) => {
                    if (valid) {
                        this.setConsultantRecommendHouse_dialog = false;
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },

            //为什么选择我们的5张图片数组的change事件——实时判断显示禁用select里的option项
            selectWhyChoiceWePhotoChange(value) {
                if (value) {
                    this.whyChoiceWePhotoItem.forEach((i) => {
                        if (this.ruleFormWhyChoiceWe.FirstColumnPhoto == i.photo || this.ruleFormWhyChoiceWe.SecondColumnPhoto == i.photo ||
                            this.ruleFormWhyChoiceWe.ThirdColumnPhoto == i.photo || this.ruleFormWhyChoiceWe.FourthColumnPhoto == i.photo ||
                            this.ruleFormWhyChoiceWe.FifthColumnPhoto == i.photo) {
                            i.disabled = true;
                        } else {
                            i.disabled = false;
                        }
                    });
                }
            },
            //为什么选择我们的5张图片数组的clear事件——实时判断显示禁用select里的option项
            selectWhyChoiceWePhotoClear() {
                this.whyChoiceWePhotoItem.forEach((i) => {
                    if (this.ruleFormWhyChoiceWe.FirstColumnPhoto == i.photo || this.ruleFormWhyChoiceWe.SecondColumnPhoto == i.photo ||
                        this.ruleFormWhyChoiceWe.ThirdColumnPhoto == i.photo || this.ruleFormWhyChoiceWe.FourthColumnPhoto == i.photo ||
                        this.ruleFormWhyChoiceWe.FifthColumnPhoto == i.photo) {
                        i.disabled = true;
                    } else {
                        i.disabled = false;
                    }
                });
            },
            //提交验证设置为什么选择我们模块的内容表单
            submitSetWhyChoiceWe() {
                this.$refs.ruleFormWhyChoiceWe.validate((valid) => {
                    if (valid) {
                        //查看已配置为什么选择我们的数据
                        this.configuredWhyChoiceWeItem = [
                            {
                                photo: this.ruleFormWhyChoiceWe.FirstColumnPhoto,
                                title: this.ruleFormWhyChoiceWe.FirstColumnTitle,
                                introduction: this.ruleFormWhyChoiceWe.FirstColumnIntroduction
                            },
                            {
                                photo: this.ruleFormWhyChoiceWe.SecondColumnPhoto,
                                title: this.ruleFormWhyChoiceWe.SecondColumnTitle,
                                introduction: this.ruleFormWhyChoiceWe.SecondColumnIntroduction
                            },
                            {
                                photo: this.ruleFormWhyChoiceWe.ThirdColumnPhoto,
                                title: this.ruleFormWhyChoiceWe.ThirdColumnTitle,
                                introduction: this.ruleFormWhyChoiceWe.ThirdColumnIntroduction
                            },
                            {
                                photo: this.ruleFormWhyChoiceWe.FourthColumnPhoto,
                                title: this.ruleFormWhyChoiceWe.FourthColumnTitle,
                                introduction: this.ruleFormWhyChoiceWe.FourthColumnIntroduction
                            },
                            {
                                photo: this.ruleFormWhyChoiceWe.FifthColumnPhoto,
                                title: this.ruleFormWhyChoiceWe.FifthColumnTitle,
                                introduction: this.ruleFormWhyChoiceWe.FifthColumnIntroduction
                            }
                        ];
                        this.setWhyChoiceWe_dialog = false;
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },

            //提交验证设置宣传视频的内容表单
            submitSetVideoIframe() {
                this.$refs.ruleFormSetVideoIframe.validate((valid) => {
                    if (valid) {
                        this.setVideoIframe_dialog = false;
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },

            //查看已配置金牌顾问
            lookConfiguredGoldConsultant() {
                this.$get('/homepage/counselor/istop/list?uuid='+ localStorage.companyUUID).then(res => {
                    if (res.status == 0) {
                        this.lookConfiguredGoldConsultant_dialog = true;
                        this.ConfiguredGoldConsultantItem = res.rows.slice(0, this.ruleFormSetGoldConsultant.setGoldConsultant);
                    } else {
                        this.$message.warning('暂无数据！');
                    }
                })
            },

            //查看已配置公司推荐房源
            lookConfiguredCompanyRecommendHouse() {
                this.$get('/homepage/recommendhouse/'+ localStorage.companyUUID).then(res => {
                    if (res.status == 0) {
                        this.lookConfiguredCompanyRecommendHouse_dialog = true;
                        this.configuredCompanyRecommendHouseItem = res.data.slice(0, this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse);
                    } else {
                        this.$message.warning('暂无数据！');
                    }
                })
            },

            //查看已配置顾问推荐房源
            lookConfiguredConsultantRecommendHouse(title) {
                this.$get('/sharegroup/house/list?shareId=' + this.ruleFormSetConsultantRecommendHouse.selectShareGroup).then(res => {
                    if (res.status == 0) {
                        this.lookConfiguredConsultantRecommendHouse_dialog = true;
                        this.lookConfiguredConsultantRecommendHouse_dialog_title = title;
                        this.configuredConsultantRecommendHouseItem = res.data;
                    } else {
                        this.$message.warning('暂无数据！');
                    }
                })
            },
            //跳转到房源详情页
            goHouseDetails(houseId) {
                // let routeData = this.$router.resolve({
                //     path: '/houseDetails',
                //     query: {
                //         houseId: houseId
                //     }
                // });
                // window.open(routeData.href, '_blank');
                this.$router.push({path: "/houseDetails", query: {houseId: houseId}});
            },

            //配置模块2的内容
            configModule2Content() {
                this.configModule2to6Content(this.module2content, '二');
            },
            //配置模块3的内容
            configModule3Content() {
                this.configModule2to6Content(this.module3content, '三');
            },
            //配置模块4的内容
            configModule4Content() {
                this.configModule2to6Content(this.module4content, '四');
            },
            //配置模块5的内容
            configModule5Content() {
                this.configModule2to6Content(this.module5content, '五');
            },
            //配置模块6的内容
            configModule6Content() {
                this.configModule2to6Content(this.module6content, '六');
            },
            //配置模块2~6的内容——公共方法
            configModule2to6Content(module, moduleNum){
                switch (module) {
                    case 'GoldConsultant':
                        this.setGoldConsultant_dialog = true;//设置金牌顾问模块的内容的Dialog对话框
                        break;
                    case 'companyRecommendHouse':
                        this.setCompanyRecommendHouse_dialog = true;//设置公司推荐房源模块的内容的Dialog对话框
                        break;
                    case 'consultantRecommendHouse':
                        this.setConsultantRecommendHouse_dialog = true;//设置顾问推荐房源模块的内容的Dialog对话框
                        break;
                    case 'whyChoiceWe':
                        this.setWhyChoiceWe_dialog = true;//设置为什么选择我们模块的内容的Dialog对话框
                        break;
                    case 'video':
                        this.setVideoIframe_dialog = true;//设置宣传视频模块的内容的Dialog对话框
                        break;
                    default:
                        this.$message.warning('请选择模块'+ moduleNum +'展示内容！')
                }
            },

            //查看配置过的模块2的内容
            lookConfiguredModule2Content() {
                this.lookConfiguredModule2to6Content(this.module2content, '二');
            },
            //查看配置过的模块3的内容
            lookConfiguredModule3Content() {
                this.lookConfiguredModule2to6Content(this.module3content, '三');
            },
            //查看配置过的模块4的内容
            lookConfiguredModule4Content() {
                this.lookConfiguredModule2to6Content(this.module4content, '四');
            },
            //查看配置过的模块5的内容
            lookConfiguredModule5Content() {
                this.lookConfiguredModule2to6Content(this.module5content, '五');
            },
            //查看配置过的模块6的内容
            lookConfiguredModule6Content() {
                this.lookConfiguredModule2to6Content(this.module6content, '六');
            },
            //查看配置过的模块2~6的内容——公共方法
            lookConfiguredModule2to6Content(module, moduleNum){
                switch (module) {
                    case 'GoldConsultant':
                        if(this.ruleFormSetGoldConsultant.setGoldConsultant){
                            this.lookConfiguredGoldConsultant();//查看已配置金牌顾问
                        }else{
                            this.$message.warning('请配置金牌顾问模块的内容！');
                        }
                        break;
                    case 'companyRecommendHouse':
                        if(this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse){
                            this.lookConfiguredCompanyRecommendHouse();//查看已配置公司推荐房源
                        }else{
                            this.$message.warning('请配置公司推荐房源模块的内容！');
                        }
                        break;
                    case 'consultantRecommendHouse':
                        if(this.ruleFormSetConsultantRecommendHouse.selectShareGroup){
                            this.lookConfiguredConsultantRecommendHouse('查看已配置顾问推荐房源');//查看已配置顾问推荐房源
                        }else{
                            this.$message.warning('请配置顾问推荐房源模块的内容！');
                        }
                        break;
                    case 'whyChoiceWe':
                        if(this.configuredWhyChoiceWeItem.length > 0){
                            this.lookConfiguredWhyChoiceWe_dialog = true;//查看已配置为什么选择我们
                        }else{
                            this.$message.warning('请配置为什么选择我们模块的内容！');
                        }
                        break;
                    case 'video':
                        if(this.ruleFormSetVideoIframe.iframeCode){
                            this.lookConfiguredVideoIframe_dialog = true;//查看已配置宣传视频
                        }else{
                            this.$message.warning('请配置宣传视频模块的内容！');
                        }
                        break;
                    default:
                        this.$message.warning('请配置模块'+ moduleNum +'的内容！')
                }
            },

            //判断是否全部配置了七个模块的内容
            configModuleContent_validation(rule, value, callback) {
                console.log(this.ruleForm.homePageTemplateId +','+ this.ruleForm.homePageTemplateName +','+ this.ruleFormSetHeader.setHeaderTitle +','+ this.ruleFormSetGoldConsultant.setGoldConsultant +','+
                    this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse +','+ this.ruleFormSetConsultantRecommendHouse.selectShareGroup +','+
                    this.configuredWhyChoiceWeItem.length +','+ this.ruleFormSetVideoIframe.iframeCode +','+ this.ruleFormSetFooterAboutUS.setFooterAboutUS);
                if (this.ruleFormSetHeader.setHeaderTitle && this.ruleFormSetGoldConsultant.setGoldConsultant &&
                    this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse && this.ruleFormSetConsultantRecommendHouse.selectShareGroup &&
                    this.configuredWhyChoiceWeItem.length > 0 && this.ruleFormSetVideoIframe.iframeCode && this.ruleFormSetFooterAboutUS.setFooterAboutUS) {
                    callback()
                } else {
                    callback(new Error('请检查七个模块的内容是否配置齐全！'))
                }
            },

            //全部重置模板的内容
            resetAll() {
                this.ruleForm.homePageTemplateId = '';
                this.ruleForm.homePageTemplateName = '';
                this.module2content = '';
                this.module3content = '';
                this.module4content = '';
                this.module5content = '';
                this.module6content = '';
                this.ruleFormSetHeader.setHeaderTitle = '';
                this.ruleFormSetGoldConsultant.setGoldConsultant = '';
                this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse = '';
                this.ruleFormSetConsultantRecommendHouse.selectShareGroup = '';
                this.configuredWhyChoiceWeItem.length = 0;
                this.ruleFormSetVideoIframe.iframeCode = '';
                this.ruleFormSetFooterAboutUS.setFooterAboutUS = '';
                this.$refs.ruleForm.resetFields();//对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                this.$refs.ruleForm.clearValidate();//移除整个表单的校验结果
            },

            //提交保存二级主页模板
            submitHomePage() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        //判断有无homePageId来改变backend_params的结构
                        if(this.homePageId){
                            this.backend_params = {
                                "id": this.homePageId,
                                "modules": [
                                    {
                                        "moduleName": "module1/header",
                                        "moduleValue": this.ruleFormSetHeader.setHeaderTitle
                                    },
                                    {
                                        "moduleName": "module7/footer",
                                        "moduleValue": this.ruleFormSetFooterAboutUS.setFooterAboutUS
                                    }
                                ],
                                "tempId": this.ruleForm.homePageTemplateId,
                                "templateCustomName": this.ruleForm.homePageTemplateName
                            }
                        }else{
                            this.backend_params = {
                                "modules": [
                                    {
                                        "moduleName": "module1/header",
                                        "moduleValue": this.ruleFormSetHeader.setHeaderTitle
                                    },
                                    {
                                        "moduleName": "module7/footer",
                                        "moduleValue": this.ruleFormSetFooterAboutUS.setFooterAboutUS
                                    }
                                ],
                                "tempId": this.ruleForm.homePageTemplateId,
                                "templateCustomName": this.ruleForm.homePageTemplateName
                            }
                        }

                        // 根据模块二选择展示什么内容——填充至发送后台的json数据里
                        this.backend_paramsSTR(this.module2content, 2, '请配置模块二的内容！');

                        // 根据模块三选择展示什么内容——填充至发送后台的json数据里
                        this.backend_paramsSTR(this.module3content, 3, '请配置模块三的内容！');

                        // 根据模块四选择展示什么内容——填充至发送后台的json数据里
                        this.backend_paramsSTR(this.module4content, 4, '请配置模块四的内容！');

                        // 根据模块五选择展示什么内容——填充至发送后台的json数据里
                        this.backend_paramsSTR(this.module5content, 5, '请配置模块五的内容！');

                        // 根据模块六选择展示什么内容——填充至发送后台的json数据里
                        this.backend_paramsSTR(this.module6content, 6, '请配置模块六的内容！');

                        // console.log(this.backend_params);

                        this.$post('/template/html/data/save', {
                            data: JSON.stringify(this.backend_params),
                        }).then(res => {
                            if (res.status == 0) {
                                this.$message.success('保存成功!');
                                this.$router.push({path: '/company_homePageList'});

                                //清除修改二级主页模板的id
                            } else {
                                this.$message.warning(data.msg);
                            }
                        });
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },

            //根据模块2~6选择展示什么内容——填充至发送后台的json数据里——公共方法
            backend_paramsSTR(module, moduleNum, msg){
                switch (module) {
                    case 'GoldConsultant':
                        this.backend_params["modules"].push({
                            "moduleName": "module"+ moduleNum +"/GoldConsultant",
                            "moduleValue": this.ruleFormSetGoldConsultant.setGoldConsultant
                        });
                        break;
                    case 'companyRecommendHouse':
                        this.backend_params["modules"].push({
                            "moduleName": "module"+ moduleNum +"/companyRecommendHouse",
                            "moduleValue": this.ruleFormSetCompanyRecommendHouse.setCompanyRecommendHouse
                        });
                        break;
                    case 'consultantRecommendHouse':
                        this.backend_params["modules"].push({
                            "moduleName": "module"+ moduleNum +"/consultantRecommendHouse",
                            "moduleValue": this.ruleFormSetConsultantRecommendHouse.selectConsultant +'/'+this.ruleFormSetConsultantRecommendHouse.selectShareGroup
                        });
                        break;
                    case 'whyChoiceWe':
                        this.backend_params["modules"].push({
                            "moduleName": "module"+ moduleNum +"/whyChoiceWe",
                            "moduleValue": JSON.stringify(this.configuredWhyChoiceWeItem)
                        });
                        break;
                    case 'video':
                        this.backend_params["modules"].push({
                            "moduleName": "module"+ moduleNum +"/video",
                            "moduleValue": this.ruleFormSetVideoIframe.iframeCode
                        });
                        break;
                    default:
                        this.$message.warning(msg)
                }
            },


        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            > form {
                > .el-form-item {
                    margin: 30px 0;
                    .check-bg-box {
                        > .el-radio-group {
                            text-align: center;
                            margin: 0 15px;
                            float: left;
                            padding: 5px;
                            border: 1px solid #e2e4e7;
                            > .img-box {
                                height: 450px;
                                overflow: hidden;
                                position: relative;
                                background: #000;
                                > img {
                                    width: 400px;
                                    height: auto;
                                    -webkit-transition: .5s;
                                    -moz-transition: .5s;
                                    -ms-transition: .5s;
                                    -o-transition: .5s;
                                    transition: .5s;
                                }
                                > .font {
                                    width: 100%;
                                    height: 100%;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    text-align: center;
                                    > i {
                                        width: 40px;
                                        height: 40px;
                                        line-height: 45px;
                                        font-size: 25px;
                                        color: #0087e5;
                                        position: absolute;
                                        top: 45%;
                                        left: 45%;
                                        z-index: 9;
                                        text-align: center;
                                        background: #fff;
                                        -webkit-border-radius: 50%;
                                        -moz-border-radius: 50%;
                                        border-radius: 50%;
                                        box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
                                        -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
                                        -moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
                                        display: inline-block;
                                        opacity: 0;
                                        -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
                                        -moz-transition: -moz-transform 0.3s, opacity 0.3s;
                                        -o-transition: -o-transform 0.3s, opacity 0.3s;
                                        transition: transform 0.3s, opacity 0.3s;
                                        cursor: pointer;
                                    }
                                }
                                > .font::before,
                                > .font::after {
                                    position: absolute;
                                    content: '';
                                    opacity: 0;
                                    transition: all 0.5s;
                                }
                                > .font::before {
                                    top: 25px;
                                    right: 15px;
                                    bottom: 25px;
                                    left: 15px;
                                    border-top: 1px solid #fff;
                                    border-bottom: 1px solid #fff;
                                    transform: scale(0, 1);
                                    -webkit-transform-origin: 0 0;
                                    transform-origin: 0 0
                                }
                                > .font::after {
                                    top: 15px;
                                    right: 25px;
                                    bottom: 15px;
                                    left: 25px;
                                    border-right: 1px solid #fff;
                                    border-left: 1px solid #fff;
                                    transform: scale(1, 0);
                                    transform-origin: 100% 0;
                                }
                            }
                            > .img-box:hover > img {
                                transform: scale(1.05, 1.05);
                                opacity: 0.5;
                                filter: alpha(opacity=50);
                            }
                            > .img-box:hover > .font > i {
                                opacity: 1;
                                -webkit-transform: scale(1);
                                -moz-transform: scale(1);
                                -ms-transform: scale(1);
                                -o-transform: scale(1);
                                transform: scale(1);
                            }
                            > .img-box:hover > .font::before,
                            > .img-box:hover > .font::after {
                                opacity: 1;
                                transform: scale(1);
                                transition: all 0.5s;
                            }
                            > label {
                                display: block;
                                margin: 15px auto;
                            }
                        }
                    }
                    .configModuleContent-table {

                    }
                }
            }

            /*预览模板大图*/
            .previewHomePageTemplateBigPhoto-box {
                > img {
                    width: 100%;
                    height: auto;
                }
            }
        }

        /*设置为什么选择我们*/
        .setWhyChoiceWe-box {
            > li {
                width: 20%;
                float: left;
                padding: 0 10px;
                text-align: center;
                > h4 {
                    font-size: 18px;
                }
                > .el-form-item {
                    margin-bottom: 0;
                    margin: 20px 0;
                }
                > img {
                    width: 100%;
                    max-width: 120px;
                }
            }
        }

        /*查看已选金牌顾问*/
        .lookConfiguredGoldConsultant-dialog{
            > .inside{
                text-align: center;
                > img{
                    width: 100%;
                    height: auto;
                }
                > p{
                    font-size: 18px;
                    color: #666;
                    margin: 15px 0 10px 0;
                }
                > aside{
                    font-size: 16px;
                    color: #3caae6;
                    margin: 0 0 15px 0;
                }
            }
        }

        /*查看已配置公司推荐房源、查看顾问推荐房源*/
        .lookConfiguredCompanyRecommendHouse-dialog,
        .lookConfiguredConsultantRecommendHouse-dialog {
            overflow: initial;
            .inside {
                overflow: hidden;
                border-radius: 7px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                -moz-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                -ms-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                -o-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                > .left,
                > .right {
                    width: 100%;
                    float: none;
                }
                > .left {
                    cursor: pointer;
                    text-align: center;
                    position: relative;
                    border-top-left-radius: 7px;
                    border-top-right-radius: 7px;
                    overflow: hidden;
                    > img {
                        width: 100%;
                        height: 270px;
                        z-index: 1;
                        -webkit-transition: 1.5s ease;
                        -moz-transition: 1.5s ease;
                        -ms-transition: 1.5s ease;
                        -o-transition: 1.5s ease;
                        transition: 1.5s ease;
                    }
                    > p {
                        position: absolute;
                        left: 10px;
                        bottom: 10px;
                        z-index: 5;
                        font-size: 26px;
                        color: #89d3d9;
                        text-align: left;
                        > span {
                            display: block;
                        }
                        > span:last-of-type {
                            font-size: 23px;
                        }
                    }
                }
                > .right {
                    padding: 10px 10px 20px 0;
                    background: #fff;
                    border-bottom-left-radius: 7px;
                    border-bottom-right-radius: 7px;
                    > h2 {
                        display: block;
                        width: 100%;
                        line-height: 26px;
                        font-size: 19px;
                        color: #333;
                        font-weight: bold;
                        text-indent: 18px;
                        cursor: pointer;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
                        -webkit-text-overflow: ellipsis;
                        -moz-text-overflow: ellipsis;
                        white-space: nowrap;
                        > i {
                            float: left;
                            width: 5px;
                            height: 26px;
                            margin: 2px 0 0 0;
                            background: #00aeef;
                        }
                    }
                    > .info {
                        padding: 10px 0 0 20px;
                        > .address {
                            height: 35px;
                            line-height: 35px;
                            font-size: 15px;
                            color: #000;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -o-text-overflow: ellipsis;
                            -webkit-text-overflow: ellipsis;
                            -moz-text-overflow: ellipsis;
                            white-space: nowrap;
                            > i {
                                font-size: 25px;
                                color: #2fa3f6;
                                float: left;
                            }
                        }
                        > p {
                            height: 14px;
                            line-height: 14px;
                            margin: 14px 0 0 0;
                            overflow: hidden;
                            font-size: 14px;
                            color: #000;
                            > span {
                                width: 50%;
                            }
                        }
                    }
                }
            }
        }

        /*查看已配置为什么选择我们*/
        .lookConfiguredWhyChoiceWe-dialog{
            >li{
                width: 20%;
                float: left;
                padding: 0 10px;
                text-align: center;
                >img{
                    max-width: 110px;
                }
                >h5{
                    font-size: 25px;
                    color: #000;
                    margin: 20px 0 0 0;
                }
                >p{
                    width: 113px;
                    margin: 0 auto;
                    font-size: 18px;
                    color: #868686;
                    padding-top: 20px;
                }
            }
        }


    }
</style>
