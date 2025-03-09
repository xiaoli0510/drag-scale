<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ImgBg from '@/assets/img/bg.jpg'
import Img1 from '@/assets/img/1.jpg'

const innerStyle = ref({
  left: 0,
  top: 0,
  width: 100,
  height: 0
})
const wrapStyle = ref({
  width: 500,
  height: 0,
})
let bgRatio//原始背景图片分辨率比例
let roleRatio: number//原始role图片分辨率比例
onMounted(() => {
  const imageBg = new Image()
  imageBg.src = ImgBg
  imageBg.onload = () => {
    bgRatio = imageBg.width / imageBg.height
    wrapStyle.value.height = wrapStyle.value.width / bgRatio
  }
  const imageRole = new Image()
  imageRole.src = Img1
  imageRole.onload = () => {
    roleRatio = imageRole.width / imageRole.height
    innerStyle.value.height = innerStyle.value.width / roleRatio
  }
})
const isDrag = ref(false)
const isScale = ref(false)
const refBgWrap = ref()
const refRoleWrap = ref()
const direction = ref(['left-top', 'right-top', 'left-bottom', 'right-bottom'])
const directionType = ref('')
onMounted(() => {
  window.addEventListener('mousemove', (e) => {
    const { width: bwidth, height: bheight } = refRoleWrap.value!.getBoundingClientRect()
    const { width: awidth, height: aheight } = refBgWrap.value!.getBoundingClientRect()
    if (!isDrag.value) return
    const { movementX, movementY } = e
    let maxLeft = awidth - bwidth
    let maxTop = aheight - bheight
    let x = Number(innerStyle.value.left) + movementX
    let y = Number(innerStyle.value.top) + movementY
    if (x <= 0) {
      x = 0
    } else if (x >= maxLeft) {
      x = maxLeft
    }
    if (y <= 0) {
      y = 0
    } else if (y >= maxTop) {
      y = maxTop
    }
    if (isDrag.value) {
      if (isScale.value) {
        if (x >= 0 && x < maxLeft && y >= 0 && y < maxTop) {
          switch (directionType.value) {
            case 'left-top':
              //改变x+y+width+height
              innerStyle.value.width = innerStyle.value.width - movementX
              innerStyle.value.height = innerStyle.value.height - movementX / roleRatio
              innerStyle.value.left = x
              innerStyle.value.top = y
              break
            case 'right-top':
              //改变y+width+height
              innerStyle.value.width = innerStyle.value.width + movementX
              innerStyle.value.height = innerStyle.value.height + movementX / roleRatio
              innerStyle.value.top = y
              break
            case 'left-bottom':
              //改变x+width+height
              innerStyle.value.width = innerStyle.value.width - movementX
              innerStyle.value.height = innerStyle.value.height - movementX / roleRatio
              innerStyle.value.left = x
              break
            case 'right-bottom':
              //width+height
              innerStyle.value.width = innerStyle.value.width + movementX
              innerStyle.value.height = innerStyle.value.height + movementX / roleRatio
              break
          }
        }
      } else {
        //只改变位置
        innerStyle.value.left = x
        innerStyle.value.top = y
      }
    }
  })
  window.addEventListener('mouseup', () => {
    isDrag.value = false
    isScale.value = false
  })
})


const mousedownFn = () => {
  isDrag.value = true
}
const scale = (val: string) => {
  directionType.value = val
  isScale.value = true
  isDrag.value = true
}
</script>

<template>
  <routerView />
  <div class="wrap">
    <div class="bg-wrap" ref="refBgWrap" :style="{ width: wrapStyle.width + 'px', height: wrapStyle.height + 'px' }">
      <img :src="ImgBg" class="img-bg" />
      <div class="img-role-wrap" ref="refRoleWrap"
        :style="{ 'left': innerStyle.left + 'px', 'top': innerStyle.top + 'px', width: innerStyle.width + 'px', height: innerStyle.height + 'px', }">
        <img :src="Img1" class="img-role" @mousedown.stop="mousedownFn" draggable="false" />
        <span class="span-dot" :class="item" @mousedown.stop="scale(item)" v-for="(item, index) in direction"
          :key="index">
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-wrap,
.img-bg {
  width: 500px;
  position: relative;
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-bg {
  border: 1px solid #000;
}

.wrap {
  width: 500px;
  height: 500px;
  position: relative;
}

.img-role-wrap {
  position: absolute;
  width: 100px;
  border: 1px solid #ccc;
}

.img-role {
  width: 100%;
}

.span-dot {
  width: 10px;
  height: 10px;
  position: absolute;
  border-color: rgb(34 211 238);

  border-style: solid;
}

.left-top {
  left: 0;
  top: 0;
  cursor: nw-resize;
  border-top-width: 3px;
  border-left-width: 3px;
  border-right: none;
  border-bottom: none;
}

.right-top {
  right: 0;
  top: 0;
  cursor: ne-resize;
  border-top-width: 3px;
  border-right-width: 3px;
  border-left: none;
  border-bottom: none;

}

.left-bottom {
  left: 0;
  bottom: 0;
  cursor: ne-resize;
  border-left-width: 3px;
  border-bottom-width: 3px;
  border-right: none;
  border-top: none;
}

.right-bottom {
  right: 0;
  bottom: 0;
  cursor: nw-resize;
  border-right-width: 3px;
  border-bottom-width: 3px;
  border-top: none;
  border-left: none;
}
</style>
