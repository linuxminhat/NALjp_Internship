const student = [
  {
    path: "/student",
    name: "student",
    component: () => import("../layouts/studentLayout.vue"),
    children: [
      {
        path: "schedule",
        name: "student - schedule",
        component: () => import("../pages/student/schedule/index.vue"),
      },
      {
        path: "grade",
        name: "student - grade",
        component: () => import("../pages/student/grade/index.vue"),
      },
      {
        path: "notif",
        name: "student - notif",
        component: () => import("../pages/student/notif/index.vue"),
      },
    ],
  },
];
export default student;
