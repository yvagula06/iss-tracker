<template>
    <div :class="{ 'nav-display': !props.isActivated }" class="navigation">
        <div class="feature-header">
            <div class="navbar">
                <div class="nav-items">
                    <ul>
                        <li>apple</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  const props = defineProps({ isActivated: Boolean });
</script>
<style scoped lang="scss">
    feature-header{
        min-height: 50px;
    }
    .navbar {
        top: 0;
        position: fixed;
        display: flex;
        overflow: hidden;
        justify-content: flex-end;
        height: 100%;
        background: black;
        width: 70%;
        opacity: 85%;
        margin-right: -600px;
        z-index: 5;
        transition: margin 0.5s ease-in-out;
    }  
    .navigation {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        min-height: 125px;
        height: 125px;
    }
    .nav-items {
        position: relative;
        bottom: 100px;
        color: #93CDDD;
        li {
            padding: 15px 0px;
        }
    }
    .nav-display {
        .navbar {
        margin-right: 0px;
      }
    }
</style>