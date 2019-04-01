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
  border: none;
  padding:30px;
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
  padding:10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border:1px solid #333;
  cursor: pointer;
  overflow-wrap: break-word;
}

</style>

<template>

  <el-col class="column" :span="spanValue">
    <h1 class="header">{{header}}</h1>
    <el-button v-show="!hide" size="small" @click="add" type="primary" style="float: right;">
      <i class="el-icon-plus">
      </i>
    </el-button>
    <div class="clearfix">
    </div>
    <p v-show="!hide">
      {{moreText}}
    </p>
    <draggable v-show="data" class="blocker" :style="heightObj" v-model="data.values" v-bind="{group:'notes'}" @start="drag=true" @end="drag=false">
      <transition-group :style="heightObj" class="blocker">
        <div  v-for="content, key in data.values" :key="key" class="note">
          <el-card v-show="!hide" class="box-card">
            <div v-show="content.layout==1" slot="header">
              <el-button @click="remove(content)" size="small" style="float: right;" type="danger">
                <i class="el-icon-close"></i>
              </el-button>
              <div class="clearfix">
              </div>
            </div>
            <div class="text item">
              <el-input @blur="hideBox(content)" @focus="showBox(content)" type="textarea" :autosize="autosize" v-model="content.value" @change.native="updateContent">
              </el-input>
            </div>
          </el-card>
          <p v-show="hide" class="formattedText">
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
      text: this.moreText,
      heightObj: {minHeight: this.minHeight + 'px' },
      autosize: { minRows: 1},
    }
  },
  methods:
  {
    add()
    {
      this.data.values.length > 0
      ?
      this.data.values.push({id:this.data.values[this.data.values.length-1].id+1,layout:1,value:""})
      :
      this.data.values.push({id:0,layout:1,value:""})
      this.$emit("save-data")
    },
    updateContent()
    {
      this.$emit("save-data")
    },
    remove(item)
    {
      this.data.values.splice(this.data.values.indexOf(item),1)
      this.$emit("save-data")
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
