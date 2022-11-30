<template>
    <div id="nowNewProject">

        <TreeChart :json="data" :class="{landscape: 1}" @click-node="clickNode" />
        <div class="gl_prs_ctn" :style='[contextstyle]'>
            <ul class='gl_prs_li'>
                <li ><el-button type="primary" @click="addNode">添加子分支 </el-button></li>
                <li ><el-button type="success">人员安排</el-button></li>
                <li ><el-button type="danger"  @click="deleteNode">删除分支</el-button></li>
                <li ><el-button type="info" @click="shutDown">关闭此栏</el-button></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import TreeChart from "@/components/layout/treeNode/treeChart.vue";

    export default {
        name: 'nowNewProject',
        components: {
            TreeChart
        },
        data() {
            return {
                idnum:5,
                tag:0,
                now:'',
                landscape: [],
                data: {
                    name: 'root',
                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                    //class: ["rootNode"],
                    children: [
                        {
                            name: '1',
                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                            children:[],
                        },
                        {
                            name: '2',
                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                            children: [
                                {
                                    name: '3',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    children:[],
                                },
                                {
                                    name: '4',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    children:[],
                                },
                                {
                                    name: '5',
                                    image_url: "https://static.refined-x.com/static/avatar.jpg",
                                    children:[],
                                }
                            ]
                        }
                    ]
                },
                contextstyle: {
                    display: 'none',
                    right: '0px',
                    top: '0px',
                    left: '0px',
                    bottom: '0px',
                },
            }
        },
        methods: {
            clickNode: function(node){
                this.now = node.name
                //console.log(node.name)
                if(window.event.x + 188 > document.documentElement.clientWidth){
                    this.contextstyle.left = 'unset';
                    this.contextstyle.right = document.documentElement.clientWidth - window.event.x + 'px';
                }else{
                    this.contextstyle.left = window.event.x + 'px';
                }
                if(window.event.y + 166 > document.documentElement.clientHeight){
                    this.contextstyle.top = 'unset';
                    this.contextstyle.bottom = document.documentElement.clientHeight - window.event.y + 'px';
                }else{
                    this.contextstyle.top = window.event.y + 'px';
                }
                this.contextstyle.display = 'block';
            },
            shutDown(){
                this.contextstyle.display='none';
            },
            deleteNode(){
                if(this.now==='root') return
                this.tag =0;
                this.findChild([this.data])
                this.shutDown();
            },
            //delete find
            findChild(array){
                if(this.tag === 1) return;
                for(let i in array)
                {
                    //console.log(array[i].name);
                    if(array[i].name === this.now){
                        console.log('findit');
                        this.tag = 1;
                        array.splice(i,1);
                    }
                    if(this.tag === 1) return;
                    if(array[i].children){
                        if(this.tag === 1) return;
                        this.findChild(array[i].children);
                        if(this.tag === 1) return;
                    }
                }
            },
            addNode(){
                this.tag =0;
                this.addreal([this.data])
                this.shutDown();
            },
            addreal(array){
                for(let i in array)
                {
                    //console.log(array[i].name);
                    if(array[i].name === this.now){
                        console.log('findit');
                        this.tag = 1;
                        this.idnum=this.idnum+1;
                        array[i].children.push({
                            name: this.idnum,
                            image_url: "https://static.refined-x.com/static/avatar.jpg",
                            children:[],
                        });

                    }
                    if(this.tag === 1) return;
                    if(array[i].children){
                        if(this.tag === 1) return;
                        this.addreal(array[i].children);
                        if(this.tag === 1) return;
                    }
                }
            }

            }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .gl_prs_ctn{
        width: 188px;
        background: rgb(255, 255, 255);
        box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset, rgba(102, 175, 233, 0.6) 0px 0px 8px;
        z-index: 99999;
        position: fixed;
        padding: 10px;
        box-sizing: content-box;
        height: 180px;
    }
    .gl_prs_li{padding: unset;margin: unset;}
    .gl_prs_li>li{
        cursor: pointer;
        list-style: none;
        border-bottom: 1px solid #efefef;
        padding: 7px 10px;
    }
    li:last-child { border: unset }
    #tagli:hover{
        background: #ccc;
        color: #fff;
    }
</style>
