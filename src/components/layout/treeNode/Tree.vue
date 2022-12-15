<script>
import TreeChart from './treechar'
export default {
  name: 'App',
  components: {
    TreeChart,
  },
  data() {
    return {
      data: {
        name: 'root',
        image_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3689173839,956040439&fm=26&gp=0.jpg',
        class: ['rootNode'],
        children: [
          {
            name: 'children1',
            image_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3689173839,956040439&fm=26&gp=0.jpg',
          },
          {
            name: 'children2',
            image_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3689173839,956040439&fm=26&gp=0.jpg',
            children: [
              {
                name: 'grandchild',
                image_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3689173839,956040439&fm=26&gp=0.jpg',
              },
              {
                name: 'grandchild2',
                image_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3689173839,956040439&fm=26&gp=0.jpg',
              },
              {
                name: 'grandchild3',
                image_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3689173839,956040439&fm=26&gp=0.jpg',
              },
            ],
          },
        ],
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
  created() {
    document.oncontextmenu = () => { return false }
    document.addEventListener('click', (event) => {
      if (this.contextstyle.display === 'block')
        this.contextstyle.display = 'none'
    })
  },
  methods: {
    clickNode(node) {
      if (window.event.x + 188 > document.documentElement.clientWidth) {
        this.contextstyle.left = 'unset'
        this.contextstyle.right = `${document.documentElement.clientWidth - window.event.x}px`
      }
      else {
        this.contextstyle.left = `${window.event.x}px`
      }
      if (window.event.y + 166 > document.documentElement.clientHeight) {
        this.contextstyle.top = 'unset'
        this.contextstyle.bottom = `${document.documentElement.clientHeight - window.event.y}px`
      }
      else {
        this.contextstyle.top = `${window.event.y}px`
      }
      this.contextstyle.display = 'block'
    },
  },
}
</script>

<template>
  <div id="tree-app">
    <TreeChart :json="data" :class="{ landscape: 1 }" @click-node="clickNode" />

    <div class="gl_prs_ctn" :style="[contextstyle]">
      <ul class="gl_prs_li">
        <li>添加</li>
        <li>详情</li>
        <li>编辑</li>
        <li>删除</li>
      </ul>
    </div>
  </div>
</template>

<style>
    .gl_prs_ctn{
        width: 188px;
        background: rgb(255, 255, 255);
        box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset, rgba(102, 175, 233, 0.6) 0px 0px 8px;
        z-index: 99999;
        position: fixed;
        padding: 10px;
        box-sizing: content-box;
        height: 142px;
    }
    .gl_prs_li{padding: unset;margin: unset;}
    .gl_prs_li>li{
        cursor: pointer;
        list-style: none;
        border-bottom: 1px solid #efefef;
        padding: 7px 10px;
    }
    li:last-child { border: unset }
    li:hover{
        background: #ccc;
        color: #fff;
    }
</style>
