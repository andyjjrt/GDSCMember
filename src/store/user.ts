import { ajax, fetchApi } from "./../utils/api";
import { decodeCredential } from "vue3-google-login";

export const useUserStore = defineStore("user", {
  state: () => ({
    credential: localStorage.getItem("credential"),
    googleData: null as null | any,
    discordData: null as null | any,
    userData: null as null | any,
    createdProjects: null as any,
    joinedProjects: null as any,
    paid: 0,
    appReady: false,
  }),
  getters: {
    getAvatar(state) {
      return (state.googleData as any)?.picture;
    },
    getId(state) {
      return (state.googleData as any)?.sub;
    },
    getEmail(state) {
      return (state.googleData as any)?.email;
    },
    isGoogleReady(state) {
      return state.googleData !== null;
    },
    isAppReady(state) {
      return state.appReady;
    },
    isUserCompleted(state) {
      return state.userData.name !== "" && state.userData.phone !== "";
    },
    isDiscordConnected(state) {
      return state.discordData !== null;
    },
  },
  actions: {
    async googleLogin(crenditial?: string) {
      if (crenditial) {
        const googleData: any = decodeCredential(crenditial);
        if (googleData.exp * 1000 < new Date().getTime()) this.googleLogout();
        else {
          localStorage.setItem("credential", crenditial);
          this.googleData = googleData;
          this.credential = crenditial;
          const response = await fetchApi("post", {
            data: {
              type: "google",
              uid: googleData.sub,
              email: googleData.email,
            },
          });
          const { data, success } = response.data;
          if (!success) throw new Error(data);
          this.userData = data.user;
          this.discordData = data.discord;
          this.createdProjects = data.createdProjects;
          this.joinedProjects = data.joinedProjects;
          this.paid = data.paidCount;
        }
      } else {
        if (this.credential) {
          const googleData: any = decodeCredential(this.credential);
          if (googleData.exp * 1000 < new Date().getTime()) this.googleLogout();
          else {
            this.googleData = googleData;
            const response = await fetchApi("get", {
              params: {
                uid: googleData.sub,
              },
            });
            const { data, success } = response.data;
            if (!success) throw new Error(data);
            this.userData = data.user;
            this.discordData = data.discord;
            this.createdProjects = data.createdProjects;
            this.joinedProjects = data.joinedProjects;
            this.paid = data.paidCount;
          }
        } else {
          this.googleData = {};
        }
      }
      this.appReady = true;
    },
    async discordLogin(code: string) {
      const response = await fetchApi("post", {
        data: {
          type: "discord",
          uid: this.getId,
          code: code,
        },
      });
      const { data, success } = response.data;
      if (!success) throw new Error(data);
      this.discordData = data;
    },
    async discordReset(code: string) {
      const response = await fetchApi("post", {
        data: {
          uid: this.getId,
          type: "discord",
          code: code,
          reset: true,
        },
      });
      const { data, success } = response.data;
      if (!success) throw new Error(data);
      this.discordData = null;
    },
    async userUpdate(form: any) {
      const response = await fetchApi("post", {
        data: {
          uid: this.getId,
          type: "user",
          name: form.name,
          phone: form.phone,
          inSchool: form.inSchool,
          dept: form.inSchool ? form.dept : null,
          studentId: form.inSchool ? form.studentId : null,
        },
      });
      const { data, success } = response.data;
      if (!success) throw new Error(data);
      this.userData = data;
    },
    async joinProject(id: string, authCode: string) {
      const response = await fetchApi("post", {
        data: {
          uid: this.getId,
          type: "joinProject",
          id: id,
          authCode: authCode,
        },
      });
      const { data, success } = response.data;
      if (!success) throw new Error(data);
      this.joinedProjects = data;
    },
    async createProject(name: string, description: string, link: string) {
      const response = await fetchApi("post", {
        data: {
          uid: this.getId,
          type: "createProject",
          name: name,
          description: description,
          link: link,
        },
      });
      const { data, success } = response.data;
      if (!success) throw new Error(data);
      this.createdProjects = [...this.createdProjects, data];
    },
    async editProject(
      name: string,
      description: string,
      link: string,
      id: string
    ) {
      const response = await fetchApi("post", {
        data: {
          uid: this.getId,
          type: "editProject",
          name: name,
          description: description,
          id: id,
          link: link,
        },
      });
      const { data, success } = response.data;
      if (!success) throw new Error(data);
      this.createdProjects = this.createdProjects.map((project: any) => {
        if (project.id === data.id) return { ...project, data };
        return project;
      });
    },
    googleLogout() {
      localStorage.removeItem("credential");
      this.credential = null;
      this.googleData = {};
      this.discordData = null;
      this.userData = null;
    },
  },
});
