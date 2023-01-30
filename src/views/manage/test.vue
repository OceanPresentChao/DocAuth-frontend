<template>
    <div >
<!--        <div>-->
<!--            你好-->
<!--        </div>-->
        <tree-select :list="list" :multiple="true" :clearable="true" :checkStrictly="true" width="120px" v-model="array"></tree-select>
    </div>
</template>
<script>
    import TreeSelect from '@/components/layout/treeNode/tree-select.vue';
    export default {
        components: {
            TreeSelect
        },
        data() {
            return {
                array: [1,3,4],
                list:[
                    {
                        id:'1',// ID
                        name: '上海市',// 显示名称
                        children: [
                            {
                                id:'2',// ID
                                name: '嘉定区',// 显示名称
                                children: [
                                    {
                                        id:'3',// ID
                                        name: '江桥镇',// 显示名称
                                        content:'嘉定',//描述
                                        pid:'2',//父id
                                    },
                                    {
                                        id:'4',// ID
                                        name: '安亭镇',// 显示名称
                                        content:'安亭',//描述
                                        pid:'2',//父id
                                    }
                                ], //子级字段名
                                content:'嘉定',//描述
                                pid:'1',//父id
                            },
                        ], //子级字段名
                        content:'上海魔都',//描述
                        pid:'0',//父id
                    },
                    {
                        id:'11',// ID
                        name: '北京市',// 显示名称
                        children: [
                            {
                                id:'12',// ID
                                name: '朝阳区',// 显示名称
                                children: [
                                    {
                                        id:'13',// ID
                                        name: '三里屯',// 显示名称
                                        content:'三里屯',//描述
                                        pid:'12',//父id
                                    },
                                    {
                                        id:'14',// ID
                                        name: '左家庄',// 显示名称
                                        content:'左家庄',//描述
                                        pid:'12',//父id
                                    }
                                ], //子级字段名
                                content:'朝阳',//描述
                                pid:'11',//父id
                            },
                        ], //子级字段名
                        content:'北京',//描述
                        pid:'0',//父id
                    }
                ],
            };
        },
        methods: {
        },
    };
</script>
