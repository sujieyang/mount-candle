<template>
  <div class="app-foot">
    {{footerMsgCopyright}}
    <span class="source" style="margin-left:20px;">{{footerMsgName}}</span>
  </div>
</template>

<script>
export default {
  name: 'footers',
  data() {
    return {
      // 版权说明的文字
      footerMsgCopyright: 'Copyright © 2020-2021 山烛 - Powered By ',
      // 单位
      footerMsgName: ' Growing_light'
    }
  }
}
</script>

<style scoped>
.app-foot {
  /* footer 固定在页面底部 */
  min-height: 35px;
  background-color: #eeeeee71;
  width: 100%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.source{
  font-weight: 600;
}
</style>
