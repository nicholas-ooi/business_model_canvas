<style>

body {
  background: #667db6;
  background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
  background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
  font-family: "verdana";
}

.container
{
  text-align: left;
}

.wrapper {
  background: #fff;
  padding: 30px;
  -webkit-box-shadow: -5px 18px 85px 3px rgba(255,255,255,0.3);
  -moz-box-shadow: -5px 18px 85px 3px rgba(255,255,255,0.3);
  box-shadow: -5px 18px 85px 3px rgba(255,255,255,0.3);


}

.title {
  font-size: 24px;
  font-weight: bold;
}

.titleOption {
  float: right;
}

.image
{
  border-radius: 50%;
  width:auto;
  height:110px;
  float:left;
}

.left
{
  float:left;
  margin-left:10px;
}

.flex
{
  display: flex;
}

</style>

<template>

  <div class="wrapper">
    <el-button v-show="!hide" size="medium" @click="clear" type="success" style="float: right;">
      Clear
    </el-button>
    <p v-show="!hide" style="float: right;margin-right:10px;">
      Your information are auto-saved when you make any changes on your BMC
    </p>
    <br />
    <br />
    <div style="clear:both;">
    </div>
    <el-row class="flex" style="border:1px solid #000; border-bottom:none;">
      <note @save-data="saveData" style="border-right:1px solid #000;" :min-height="400" :title="'Key Partners'" :more-text="'Who are your business partners?'" :span="4" :data="contents[0]" :hide="hideAll">
      </note>
      <el-col :span="6" style="border-right:1px solid #000;">
        <el-row>
          <note @save-data="saveData" style="border-bottom:1px solid #000;" :min-height="200" :title="'Key Activities'" :more-text="'What does your business do?'" :span="24" :data="contents[1]" :hide="hideAll">
          </note>
        </el-row>
        <el-row>
          <note @save-data="saveData"  :min-height="200" :title="'Key Resources'" :more-text="'What do you have in your business?'" :span="24" :data="contents[2]" :hide="hideAll">
          </el-row>
        </el-col>
        <note @save-data="saveData" style="border-right:1px solid #000;" :min-height="400" :title="'Value Proposition'" :more-text="'What does your business offer?'" :span="5" :data="contents[3]" :hide="hideAll">
        </note>
        <el-col :span="6" style="border-right:1px solid #000;">
          <el-row>
            <note @save-data="saveData" style="border-bottom:1px solid #000;" :min-height="200" :title="'Customer Relationships'" :more-text="'How do you keep your customers?'" :span="24" :data="contents[4]" :hide="hideAll">
            </note>
          </el-row>
          <el-row>
            <note  @save-data="saveData" :min-height="200" :title="'Channels'" :more-text="'Where do you sell to your customers?'" :span="24" :data="contents[5]" :hide="hideAll">
            </note>
          </el-row>
        </el-col>
        <note  @save-data="saveData" :min-height="400" :title="'Customer Segments'" :more-text="'What kind of customers do you have?'" :span="4" :data="contents[6]" :hide="hideAll">
        </note>
      </el-row>
      <el-row class="flex" style="border:1px solid #000;">
        <note  @save-data="saveData" style="border-right:1px solid #000;" :min-height="250" :title="'Cost Structure'" :more-text="'What and how much is your business expenses?'" :span="12" :data="contents[7]" :hide="hideAll">
        </note>
        <note  @save-data="saveData" :min-height="250" :title="'Revenue Streams'" :more-text="'How does your business make money?'" :span="12" :data="contents[8]" :hide="hideAll">
        </note>
      </el-row>
    </div>

  </template>

  <script>

  import draggable from 'vuedraggable'
  import note from './note.vue'

  export default {
    components: {
      draggable,
      note,
    },

    data() {

      let contents = this.$cookies.get('nick-bmc')
      if(contents == null)
      {
        contents = this.getDefaultContents()
      }

      return {
        contents:contents,
        hideAll: false,
      }
    },



    mounted() {
      window.addEventListener('keydown', (event) => {
        if (event.keyCode == 18 && event.ctrlKey) {
          this.hideAll = !this.hideAll
        }
      })
    },

    methods: {

      getDefaultContents()
      {
        return [
          {id:0, values:[]},
          {id:1, values:[]},
          {id:2, values:[]},
          {id:3, values:[]},
          {id:4, values:[]},
          {id:5, values:[]},
          {id:6, values:[]},
          {id:7, values:[]},
          {id:8, values:[]}
        ]
      },

      clear()
      {
        if(confirm("Are you sure to clear the business model canvas?"))
        {
          this.contents = this.getDefaultContents()
          this.saveData()
        }
      },

      saveData()
      {
        this.$cookies.set('nick-bmc', this.contents, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      },

    }
  }

  </script>
