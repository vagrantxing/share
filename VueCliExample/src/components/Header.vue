<!--
 * @Author: xingtao
 * @Date: 2021-12-05 13:15:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-05 15:36:39
 * @Descripttion: 头
 * @FilePath: \share\share\VueCliExample\src\components\Header.vue
-->
<template>
  <div>
    {{ $route.meta.title }}
  </div>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {}
        },
        created() {}
    }
</script>

<style scoped>

</style>