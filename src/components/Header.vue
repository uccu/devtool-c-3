<template>
  <div class="header">
    <div>
      <span class="iconfont icon-menu" v-on:click="sideShow"></span>
    </div>
    <el-main style="overflow:visible">
      <div style="padding-left:60px">
        <template v-for="(p, i) in projects">
          <span
            class="project"
            @mousedown.right="showMenu(p)"
            @mouseup.right="delMenu(p)"
            @mouseleave="delMenu(p)"
            :key="i"
          >
            <el-tag
              class="t"
              effect="dark"
              :type="currentProjectName === p.name ? (p.tag || 'success') : (p.defaultTag || 'info')"
              @click="selectProject(p.name)"
            >{{p.title || p.name}}</el-tag>
            <transition name="edit">
              <span class="edit t" v-if="p.md">E</span>
            </transition>
            <transition name="del">
              <span class="del t" v-if="p.md">D</span>
            </transition>
          </span>
        </template>
      </div>
    </el-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  private projects: Array<object> = [];
  private currentProjectName: string | null = null;

  projectChanged() {
    const [...projects] = this.$store.state.projects;
    this.currentProjectName = this.$store.state.currentProjectName;
    this.projects = projects;
  }

  selectProject(projectName: string) {
    this.$store.dispatch("changeCurrentProject", projectName);
    this.projectChanged();
  }

  showMenu(p: { md?: boolean }) {
    p.md = true;
    [...this.projects] = this.projects;
  }

  delMenu(p: { md?: boolean }) {
    p.md = false;
    [...this.projects] = this.projects;
  }

  sideShow() {
    this.$bus.emit("sideShow");
  }

  mounted() {
    this.$bus.on("projectChanged", () => this.projectChanged());
  }
}
</script>

<style scoped lang="less">
.project {
  position: relative;
  display: inline-block;
  padding-right: 10px;
}
.project .edit {
  z-index: 2;
  right: 0px;
  top: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e6a23c;
  cursor: pointer;
}
.project .edit:hover {
  transform: scale(1.5, 1.5);
}

.edit-enter-active {
  animation: show-edit 0.3s ease-in-out;
}
.edit-leave-active {
  animation: show-edit 0.3s ease-in-out reverse;
}
@keyframes show-edit {
  0% {
    opacity: 0;
    transform: translate(-30px, 30px) scale(0, 0);
  }
  80% {
    opacity: 1;
    transform: translate(15px, -15px) scale(1.5, 1.5);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1, 1);
  }
}
.project .del {
  z-index: 2;
  right: 0px;
  bottom: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f56c6c;
  cursor: pointer;
}
.project .del:hover {
  transform: scale(1.5, 1.5);
}
.del-enter-active {
  animation: show-del 0.3s ease-in-out;
}
.del-leave-active {
  animation: show-del 0.3s ease-in-out reverse;
}
@keyframes show-del {
  0% {
    opacity: 0;
    transform: translate(-30px, -30px) scale(0, 0);
  }
  80% {
    opacity: 1;
    transform: translate(15px, 15px) scale(1.5, 1.5);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1, 1);
  }
}
.icon-menu {
  position: relative;
  top: 0;
  left: 10px;
  font-size: 2em;
  color: brown;
  cursor: pointer;
}
.el-tag {
  margin: 10px;
  cursor: pointer;
}
</style>
