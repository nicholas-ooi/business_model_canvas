<style>

p
{
  color:#111;
  padding:0px;
  font-size: 14px;
  margin:0px;
  margin-top:5px;
}


.header {
  color: #111;
  font-size: 18px;
  font-weight: bold;
  float:left;
  margin:0px;
  width:80%;
}


.note textarea {
  border: 1px solid #222;
  background: #eee;
  color: #111;
  padding: 10px;
  margin: 0px;
  font-family: "verdana";
}

.column
{
  border: 1px solid #333;
  padding:10px;
}

.note
{
  display: block;
}

.blocker
{
  display: block;
}

.clearfix
{
  clear:both;
}

.box-card
{
  margin:7px;
  cursor: pointer;
}

.formattedText
{
  font-size:12px;
  margin:5px;
  padding:5px;
  border:1px solid #333;
}

</style>

<template>

  <el-col class="column" :span="spanValue">
    <h1 class="header">{{header}}</h1>
    <el-button v-if="!hideAll" size="small" @click="add" type="primary" style="float: right;">
      <i class="el-icon-plus">
      </i>
    </el-button>
    <div class="clearfix">
    </div>
    <p v-if="!hideAll">
      {{moreText}}
    </p>
    <draggable class="blocker" :style="heightObj" v-model="dataObj.values" :options="{group:'notes'}" @start="drag=true" @end="drag=false">
      <transition-group :style="heightObj" class="blocker">
        <div  v-for="content in dataObj.values" :key="content.id" class="note">
          <el-card v-if="!hideAll" class="box-card">
            <div v-if="content.layout==1" slot="header">
              <el-button @click="remove(content)" size="small" style="float: right;" type="danger">
                <i class="el-icon-circle-cross"></i>
              </el-button>
              <div class="clearfix">
              </div>
            </div>
            <div class="text item">
              <el-input @blur="hideBox(content)" @focus="showBox(content)" type="textarea" :autosize="autosize" v-model="content.value">
              </el-input>
            </div>
          </el-card>
          <p v-if="hideAll" class="formattedText">
            {{content.value}}
          </p>
        </div>
      </transition-group>
    </draggable>
  </el-col>

</template>

<script>

import draggable from 'vuedraggable'
export default {
  components:{draggable},
  props: ["title","span", "data", "moreText","minHeight","hide"],
  data() {
    return {
      header: this.title,
      spanValue: this.span,
      dataObj: this.data,
      text: this.moreText,
      heightObj: {minHeight: this.minHeight + 'px' },
      autosize: { minRows: 1},
      hideAll: this.hide
    }
  },
  watch:
  {
    hide(hide)
    {
      this.hideAll = hide
    },
    data(data)
    {
      this.dataObj = data
    }
  },
  methods:
  {
    add()
    {
      this.dataObj.values.length > 0
      ?
      this.dataObj.values.push({id:this.dataObj.values[this.dataObj.values.length-1].id+1,layout:1,value:""})
      :
      this.dataObj.values.push({id:0,layout:1,value:""})
    }
    ,
    remove(item)
    {
      this.dataObj.values.splice(this.dataObj.values.indexOf(item),1)
    },
    showBox(content)
    {
      content.layout = 1
    },
    hideBox(content)
    {
      // prevent from closing too fast that we can't delete the note.
      setTimeout(()=>{
        content.layout = 0
      },100)
    }
  }
}

</script>
