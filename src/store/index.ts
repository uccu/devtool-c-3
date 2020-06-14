import Vue from 'vue'
import Vuex from 'vuex'
import fs from 'fs'
import { createPersistedState } from 'vuex-electron'

Vue.use(Vuex)

type ProjectConfig = {
  name?: string;
  tag?: string;
  defaultTag?: string;
  title?: string;
};
let projects: Array<object> = [];
const currentProjectName: string | null = null;

export default new Vuex.Store({
  devtools: true,
  state: {
    version: '0.0.1',
    fileName: 'proejcts.json',
    projects,
    currentProjectName
  },
  getters: {

  },
  mutations: {
    getVersion(state) {
      return state.version;
    },

    initConfig(state) {
      if (projects.length) return;
      const exePath: string = process.cwd() + '/' + state.fileName;
      if (!fs.existsSync(exePath)) {
        fs.writeFileSync(exePath, JSON.stringify({
          version: state.version
        }));
        return;
      }

      const fileData: string = fs.readFileSync(exePath, 'utf8');
      const configObj: {
        version: string;
        projects: {
          [key: string]: ProjectConfig;
        };
      } = JSON.parse(fileData);

      const pro: Array<ProjectConfig> = [];
      for (const i in configObj.projects) {
        configObj.projects[i].name = i;
        pro.push(configObj.projects[i]);
      }
      state.projects = projects = pro;
    },

    changeCurrentProject(state, projectName) {
      if (state.currentProjectName === projectName) state.currentProjectName = null;
      else state.currentProjectName = projectName
    }
  },
  actions: {
    initConfig(context) {
      context.commit('initConfig')
    },
    changeCurrentProject(context, projectName) {
      context.commit('changeCurrentProject', projectName);
    }
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()]
});
