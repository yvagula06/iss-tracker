<template>
    <div class="main-content">
        <div class="top-level">
            <div class="cards">
                <div class="content-box" v-for="(value, key) in about.sections">
                    <h2>{{ key }}</h2>
                    <div class="content">
                        <p>{{value.text}}</p>
                        <h4 v-if="value.features.initial.length">Initial Features</h4>
                        <div class="features" v-for="feature in value.features.initial">
                            <h5>{{ feature.header }}</h5>
                            <p>{{feature.text}}</p>
                        </div>
                        <h4 v-if="value.features.planned.length">Planned Features</h4>
                        <div class="features" v-for="feature in value.features.planned">
                            <h5>{{ feature.header }}</h5>
                            <p>{{feature.text}}</p>
                        </div>
                    </div>
                    <div class="border-line"></div>
                </div>
            </div>
            <h2>Tools Used</h2>
            <div class="technology" v-for="(value, key) in about.Tools">
                <h4>{{ key }}</h4>
                <div class="features" v-for="feature in value">
                    <h5>{{ feature.name }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
    import about from '../../public/assets/content/about.json'
    function objectLength(){
        return Object.keys(about.sections).length - 1;
    }

    function featureLength(value: any){
        console.log(value.initial.length);
        return value.features.initial.length;
    }
</script>
<style scoped lang="scss">
    .main-content{
        display: flex;
        margin: 0px 10%;
    }

    .top-level{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 200px;
    }

    .content-box{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0px 30%;
    }

    .cards {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        row-gap: 75px;
        margin-top: 35px;
        //margin-bottom: 200px;
    }

    .features{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px, 0px;
        h5{
            margin-top: 15px;
            margin-bottom: 15px;    
        }
    }

    .technology{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px, 0px;
        h4{
            font-weight: bold;
        }
        h5{
            margin-top: 15px;
            margin-bottom: 15px;    
        }
    }

    .border-line {
        margin-top: 35px;
        border-bottom: 3px solid #93CDDD;
        width: 100px;
    }
</style>