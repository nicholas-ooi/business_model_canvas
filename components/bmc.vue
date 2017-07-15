<style>

body {
  background: #667db6;
  background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
  background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
  font-family: "verdana";
}

.wrapper {
  border: 3px solid #000;
  background: #fff;
  padding: 10px;
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
    <img v-if="!hideTrump" :style="borderRadius" class="image" src="images/trump2.gif" />
    <div class="left">
      <h1 class="title">
        <b v-if="!hideTrump">Trump's</b> Business Model Canvas
      </h1>
      <p v-if="!hideAll">
        Press 'CTRL + h' to hide all buttons and trump of course! 'CTRL + g' to hide trump!
      </p>
    </div>
    <div v-if="!hideAll" class="titleOption">
      <el-button @click="importFile" type="primary" >
        Import
      </el-button>
      <el-button @click="save" type="primary">
        Save
      </el-button>
    </div>
    <div style="clear:both;">
    </div>
    <el-row class="flex">
      <note :min-height="400" :title="'Key Partners'" :more-text="'Who are your business partners?'" :span="4" :data="contents[0]" :hide="hideAll">
      </note>
      <el-col :span="5">
        <el-row>
          <note  :min-height="230" :title="'Key Activities'" :more-text="'What does your business do?'" :span="24" :data="contents[1]" :hide="hideAll">
          </note>
        </el-row>
        <el-row>
          <note  :min-height="230" :title="'Key Resources'" :more-text="'What do you have for your business?'" :span="24" :data="contents[2]" :hide="hideAll">
          </el-row>
        </el-col>
        <note  :min-height="400" :title="'Value Proposition'" :more-text="'What does your business offer?'" :span="5" :data="contents[3]" :hide="hideAll">
        </note>
        <el-col :span="6">
          <el-row>
            <note  :min-height="230" :title="'Customer Relationships'" :more-text="'How do you keep your customers?'" :span="24" :data="contents[4]" :hide="hideAll">
            </note>
          </el-row>
          <el-row>
            <note  :min-height="230" :title="'Channels'" :more-text="'Where do you sell to your customers?'" :span="24" :data="contents[5]" :hide="hideAll">
            </note>
          </el-row>
        </el-col>
        <note  :min-height="400" :title="'Customer Segments'" :more-text="'What kind of customers do you have?'" :span="4" :data="contents[6]" :hide="hideAll">
        </note>
      </el-row>
      <el-row class="flex">
        <note  :min-height="250" :title="'Cost Structure'" :more-text="'What and how much is your business expenses?'" :span="12" :data="contents[7]" :hide="hideAll">
        </note>
        <note  :min-height="250" :title="'Revenue Streams'" :more-text="'How does your business make money?'" :span="12" :data="contents[8]" :hide="hideAll">
        </note>
      </el-row>
    </div>

  </template>

  <script>

  import draggable from 'vuedraggable'
  import note from './note.vue'
  const fs = require("fs")
  const app = require('electron').remote
  const {dialog} = require('electron').remote

  export default {
    components: {
      draggable,
      note,
    },
    data() {

      return {
        contents:[
          {id:0, values:[]},
          {id:1, values:[]},
          {id:2, values:[]},
          {id:3, values:[]},
          {id:4, values:[]},
          {id:5, values:[]},
          {id:6, values:[]},
          {id:7, values:[]},
          {id:8, values:[]}
        ],
        hideTrump: false,
        hideAll: false,
        borderRadius:{borderRadius:50+"%"}
      }
    },
    mounted() {
      window.addEventListener('keydown', (event) => {
        if (event.keyCode == 71 && event.ctrlKey) {
          this.hideTrump = !this.hideTrump
        }
        else if (event.keyCode == 72 && event.ctrlKey) {
          this.hideAll = !this.hideAll
          this.hideTrump = this.hideAll
        }
      })

      let z = 10
      setInterval(()=>{
        this.borderRadius = {borderRadius:(z+=2)+"%"}
        z = z >=100 ? 10 : z
      },100)
    },
    methods: {

      save()
      {
        try {
          let dialog = app.dialog;
          dialog.showSaveDialog((fileName) => {
            if (fileName === undefined){
              this.$message('file not found')
              return;
            }
            fs.writeFile(fileName, JSON.stringify(this.contents), (err) => {
              if(err){
                this.$message('Failed to save!')
              }

              this.$message('Data saved!')
            });
          });
        } catch (e) {
          this.$message(e)
        }
      },
      importFile ()
      {
        try {
          dialog.showOpenDialog((fileNames) => {
            if(fileNames === undefined){
              this.$message('file not found')
              return;
            }

            fs.readFile(fileNames[0], 'utf-8', (err, data) => {
              if(err){
                this.$message('Failed to import!')
                return;
              }
              this.contents = JSON.parse(data)
              this.$message('Data imported!')

            });
          });
        } catch (e) {
          this.$message(e)
        }
      }
    }
  }

  </script>
