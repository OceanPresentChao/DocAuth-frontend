<script setup lang="ts">
const memberShip = [
  {
    name: '潮海波',
    role: '相信你那绯色樱云般的心思情愫，也一定被心间的人感知着。',
    avatar: 'http://q1.qlogo.cn/g?b=qq&nk=1255342403&s=640',
  },
  {
    name: '张庆霄',
    role: '人生中会遇见很多像贝霖一样喜欢韩叙的人，却再也没有像简单喜欢韩叙那样的人了',
    avatar: 'http://q1.qlogo.cn/g?b=qq&nk=2908874296&s=640',
  },
  {
    name: '许嘉豪',
    role: 'JaCppPyRugothon，JsCssHtSpVuBoot。All_In_One!',
    avatar: 'http://q1.qlogo.cn/g?b=qq&nk=513979437&s=640',
  },
  {
    name: '鞠昌毅',
    role: 'dendendendenden一阵前奏飘着，所有事都被想了起来，千万不要去细想，一想就开始怀念起所有人来。',
    avatar: 'http://q1.qlogo.cn/g?b=qq&nk=1252951279&s=640',
  },
  {
    name: '王硕',
    role: '小年还要上课，写项目，什么牛马生活。。。。。。。。。。',
    avatar: 'http://q1.qlogo.cn/g?b=qq&nk=2035877383&s=640',
  },
  {
    name: '付轩轩',
    role: '',
    avatar: 'http://q1.qlogo.cn/g?b=qq&nk=2720799009&s=640',
  },
]
</script>

<template>
  <div>
    <div class=" bg-blue-500 text-center py-14 text-white">
      <h1 class="text-4xl">
        ABOUT US
      </h1>
      <div class="text-xl">
        <router-link to="/">
          Home
        </router-link>
        <span>·</span>
        <router-link to="/about">
          About us
        </router-link>
      </div>
    </div>

    <div flex mt-10>
      <img
        flex-none rounded-l-none rounded-r-3xl style="max-width: 45%;height:auto;"
        src="https://source.unsplash.com/random"
      >
      <div ml-5 my-auto text-lg>
        <h1 text-3xl mb-5 border-b-2>
          LEARN ABOUT US
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur
          facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum,
          viverra quis sem. Curabitur non nisl nec nisi scelerisque maximus. Aenean consectetur convallis
          porttitor. Aliquam interdum at lacus non blandit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur
          facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum,
          viverra quis sem. Curabitur non nisl nec nisi scelerisque maximus. Aenean consectetur convallis
          porttitor. Aliquam interdum at lacus non blandit.
        </p>
        <div my-5>
          <button bg-blue-400 rounded-lg p-1 text-white>
            <a href="https://github.com/OceanPresentChao/CarillionBookstore-admin" target="_blank">
              <Icon inline-block w-5 h-5 icon="carbon:email" />
              <span>Click Me</span>
            </a>
          </button>
        </div>
      </div>
    </div>
    <div mt-10>
      <div text-center>
        <h1 text-3xl border-b-red-300 border-b-2>
          Our Story
        </h1>
        <p text-xl mt-2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium ornare velit non
        </p>
      </div>
      <div mt-3 mx-36>
        <el-timeline text-xl>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>Update Github template</h4>
              <p>Tom committed 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div my-10>
      <div text-center>
        <h1 text-3xl border-b-yellow-300 border-b-2>
          Our Team
        </h1>
        <p text-xl mt-2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium ornare velit non Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique esse magni rem, saepe reiciendis fugiat vitae doloribus unde molestias et vero velit, odit voluptates cumque cum? Sequi reiciendis quidem perspiciatis!
        </p>
      </div>
      <div flex justify-around mt-5>
        <template v-for="m in memberShip" :key="m.name">
          <div class="round-t member-item">
            <img :src="m.avatar" inline-block rounded-full class="member-avatar">
            <div text-center>
              <h1 text-2xl mt-2>
                {{ m.name }}
              </h1>
              <p text-lg style="word-break: break-all;line-break: anywhere;">
                {{ m.role }}
              </p>
            </div>
            <div class="member-hover round-t">
              <Icon icon="carbon:logo-github" class="member-icon" />
              <Icon icon="cib:tencent-qq" class="member-icon" />
              <Icon icon="carbon:logo-wechat" class="member-icon" />
              <Icon icon="carbon:logo-twitter" class="member-icon" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.round-t {
    border-top-left-radius: 40%;
    border-top-right-radius: 40%;
}

.member-item {
    position: relative;
    margin-bottom: 30px;
    padding: 30px;
    background: rgba(0, 0, 0, .05);
    margin: 0 1rem;
    width: 20%;
}

.member-hover {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 2rem 1rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    background: rgba(79, 132, 196, .92);
    opacity: 0;
    transition: .5s;
}

.member-item:hover .member-hover {
    opacity: 1;
}

.member-icon {
    width: 1.5rem;
    height: 1.5rem;
}

.member-avatar {
    width: 100%;
    height: auto;
}
</style>
