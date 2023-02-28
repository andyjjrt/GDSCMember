import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/user";

import Index from "../pages/Index.vue";
import ExpClass from "../pages/ExpClass.vue";
import LinkDiscord from "../pages/LinkDiscord.vue";
import User from "../pages/User.vue";
import MyProjects from "../pages/MyProjects.vue";
import CreateProject from "../pages/CreateProject.vue";
import EnterProject from "../pages/EnterProject.vue";
import EditProject from "../pages/EditProject.vue";
import Login from "../pages/Login.vue";
import Admin from "../pages/admin/Index.vue";
import Payment from "../pages/admin/Payment.vue";
import Log from "../pages/admin/Log.vue";
import AdminProjects from "../pages/admin/Projects.vue"
import NotFound from "../pages/NotFound.vue";

import DiscordAuthCallback from "../pages/authCallback/Discord.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
    meta: {
      breadCrumb: [
        {
          text: "Home",
        },
      ],
    },
  },
  {
    path: "/exp-class",
    name: "Experience Class",
    component: ExpClass,
    meta: {
      breadCrumb: [
        {
          text: "Home",
          to: {
            name: "Home",
          },
        },
        {
          text: "體驗社課",
        },
      ],
    },
  },
  {
    path: "/link-discord",
    name: "Link Discord",
    component: LinkDiscord,
    meta: {
      breadCrumb: [
        {
          text: "Home",
          to: {
            name: "Home",
          },
        },
        {
          text: "Link Discord",
        },
      ],
    },
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: {
      breadCrumb: [
        {
          text: "Home",
          to: {
            name: "Home",
          },
        },
        {
          text: "User",
        },
      ],
    },
  },
  {
    path: "/projects",
    children: [
      {
        path: "",
        name: "My Projects",
        component: MyProjects,
        meta: {
          breadCrumb: [
            {
              text: "Home",
              to: {
                name: "Home",
              },
            },
            {
              text: "My Projects",
            },
          ],
        },
      },
      {
        path: "create",
        name: "Create Project",
        component: CreateProject,
        meta: {
          breadCrumb: [
            {
              text: "Home",
              to: {
                name: "Home",
              },
            },
            {
              text: "My Projects",
              to: {
                name: "My Projects",
              },
            },
            {
              text: "Create Project",
            },
          ],
        },
      },
      {
        path: "enter",
        name: "Enter Project",
        component: EnterProject,
        meta: {
          breadCrumb: [
            {
              text: "Home",
              to: {
                name: "Home",
              },
            },

            {
              text: "My Projects",
              to: {
                name: "My Projects",
              },
            },
            {
              text: "Enter Project",
            },
          ],
        },
      },
      {
        path: "edit",
        name: "Edit Project",
        component: EditProject,
        meta: {
          breadCrumb: [
            {
              text: "Home",
              to: {
                name: "Home",
              },
            },

            {
              text: "My Projects",
              to: {
                name: "My Projects",
              },
            },
            {
              text: "Edit Project",
            },
          ],
        },
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "",
        name: "Admin",
        component: Admin,
        meta: {
          breadCrumb: [
            {
              text: "Admin",
            },
          ],
        },
      },
      {
        path: "log",
        name: "Log",
        component: Log,
        meta: {
          breadCrumb: [
            {
              text: "Admin",
              to: {
                name: "Admin",
              },
            },
            {
              text: "Log",
            },
          ],
        },
      },
      {
        path: "projects",
        name: "AdminProjects",
        component: AdminProjects,
        meta: {
          breadCrumb: [
            {
              text: "Admin",
              to: {
                name: "Admin",
              },
            },
            {
              text: "Projects",
            },
          ],
        },
      },
    ],
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/payment", name: "Payment", component: Payment },

  {
    path: "/auth/callback",
    children: [
      {
        path: "discord",
        component: DiscordAuthCallback,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach((to) => {
  const user = useUserStore();
  if (!user.credential && to.name !== "Login") return { name: "Login" };
  if (user.credential && to.name === "Login") return { name: "Home" };
});

export default router;
