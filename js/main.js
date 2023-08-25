import { appendNewPage } from "./components/appendNewPage.js";
import { getLoginForm } from "./components/getLoginForm.js";
import { getTextEditor } from "./components/getTextEditor.js";
// import "./pages/dashboard.js";
import { addDashboardElement } from "./pages/dashboard.js";

const mainApp = document.querySelector("main");
const mainSideBar = document.querySelector(".task-manager-side-bar");
const menuOptions = document.querySelectorAll(".menu-option");
const profImg = document.querySelector(".prof img");
const userNameElem = document.querySelector(".user-name");
const taskManagerContent = document.querySelector(".task-manager-content");
const openTextEditorBtn = document.querySelector(".open-text-editor");

// global variable
let allTaskList = [];
let noOfCompletedTask = 0;
let allFolders = [];
let allTags = [];

// user
let users = [
  {
    id: "user_1",
    user_name: "vikash kumar",
    user_id: "mrvikashkumar",
    user_password: "@(mrvikash396)_Login",
    current_user: false,
    user_task: [
      {
        folder: true,
        name: "Call Mattew",
        status: "uncompleted",
        tags: ["web", "design"],
        time: {
          date: "19 may",
          init: "17:30",
          end: "18:00",
        },
        completedTask: 1,
        tasks: [
          {
            name: "Approve header",
            time: {
              date: "19 may",
              init: "17:30",
              end: "18:00",
            },
            status: "completed",
            tags: ["web", "design"],
          },
          {
            name: "Book a meeting with team",
            time: {
              date: "19 may",
              init: "17:30",
              end: "18:00",
            },
            status: "uncompleted",
            tags: ["web", "design"],
          },
        ],
      },
      {
        folder: false,
        name: "Write to council",
        status: "completed",
        tags: [],
        time: {
          date: "19 may",
          init: "",
          end: "",
        },
      },
    ],
  },
  {
    id: "user_2",
    user_name: "vicky k.",
    user_id: "devmrvicky",
    user_password: "@(devmrvicky)_Login",
    current_user: false,
    user_task: [
      {
        folder: true,
        name: "Hello word",
        status: "uncompleted",
        tags: ["web", "design"],
        time: {
          date: "19 may",
          init: "17:30",
          end: "18:00",
        },
        completedTask: 1,
        tasks: [
          {
            name: "Personal work",
            time: {
              date: "19 may",
              init: "17:30",
              end: "18:00",
            },
            status: "completed",
            tags: ["web", "design"],
          },
          {
            name: "private meeting",
            time: {
              date: "19 may",
              init: "17:30",
              end: "18:00",
            },
            status: "uncompleted",
            tags: ["web", "design"],
          },
        ],
      },
      {
        folder: false,
        name: "meeting with girlfriend",
        status: "completed",
        tags: [],
        time: {
          date: "19 may",
          init: "",
          end: "",
        },
      },
    ],
  },
];
// task object
let allTasks = {
  recentTask: [
    // {
    //   folder: true,
    //   name: "Call Mattew",
    //   status: "uncompleted",
    //   tags: ["web", "design"],
    //   time: {
    //     date: "19 may",
    //     init: "17:30",
    //     end: "18:00",
    //   },
    //   completedTask: 1,
    //   tasks: [
    //     {
    //       name: "Approve header",
    //       time: {
    //         date: "19 may",
    //         init: "17:30",
    //         end: "18:00",
    //       },
    //       status: "completed",
    //       tags: ["web", "design"],
    //     },
    //     {
    //       name: "Book a meeting with team",
    //       time: {
    //         date: "19 may",
    //         init: "17:30",
    //         end: "18:00",
    //       },
    //       status: "uncompleted",
    //       tags: ["web", "design"],
    //     },
    //   ],
    // },
    // {
    //   folder: false,
    //   name: "Write to council",
    //   status: "completed",
    //   tags: [],
    //   time: {
    //     date: "19 may",
    //     init: "",
    //     end: "",
    //   },
    // },
    // {
    //   folder: true,
    //   name: "Buy watercolor",
    //   status: "uncompleted",
    //   tags: ["party", "office"],
    //   time: {
    //     date: "19 may",
    //     init: "",
    //     end: "",
    //   },
    //   completedTask: 0,
    //   tasks: [
    //     {
    //       name: "Approve header",
    //       time: {
    //         date: "19 may",
    //         init: "17:30",
    //         end: "18:00",
    //       },
    //       status: "completed",
    //       tags: ["web", "design"],
    //     },
    //     {
    //       name: "Book a meeting with team",
    //       time: {
    //         date: "19 may",
    //         init: "17:30",
    //         end: "18:00",
    //       },
    //       status: "uncompleted",
    //       tags: ["web", "design"],
    //     },
    //   ],
    // },
  ],
  completedTask: [],
};

window.onload = () => {
  console.log("window loaded");
  const user = users.find((user) => user.current_user);
  if (user) {
    // login
  } else {
    let loginForm = getLoginForm();
    const form = loginForm.querySelector("form");
    form.addEventListener("submit", handleSubmit);
    taskManagerContent.append(loginForm);
  }
};

function getNoOfAllTask() {
  allTaskList = [];
  noOfCompletedTask = 0;
  allFolders = [];
  allTags = [];
  for (let task of allTasks.recentTask) {
    allTags = allTags.concat(task.tags);
    if (task.folder) {
      allTaskList = allTaskList.concat(task.tasks);
      noOfCompletedTask += task.completedTask;
      allFolders = allFolders.concat(task);
    } else {
      allTaskList = allTaskList.concat(task);
      if (task.status === "completed") noOfCompletedTask += 1;
    }
  }
}

menuOptions.forEach((menuOption) => {
  menuOption.addEventListener("click", (e) => {
    for (const menu of menuOptions) {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
      }
    }
    e.currentTarget.classList.toggle("active");
    appendNewPage(e.currentTarget.dataset.page);
  });
});

profImg.addEventListener("click", (e) => {
  mainSideBar.classList.toggle("show-side-bar");
  e.stopPropagation();
});

const openTextEditor = () => {
  const textEditorContainer = document.createElement("div");
  textEditorContainer.className =
    "text-editor-container w-full h-full fixed top-0 shadow bg-white/50 backdrop-blur-sm flex items-center justify-center p-24";
  const pageName = taskManagerContent.children[0].dataset.page;
  textEditorContainer.setAttribute("data-page-name", pageName);
  if (document.querySelector(".text-editor-container")) return;
  const textEditor = getTextEditor();
  textEditorContainer.append(textEditor);
  mainApp.append(textEditorContainer);

  const closeButton = textEditor.querySelector(".close-editor");
  closeButton.addEventListener("click", () => {
    textEditorContainer.remove();
  });
};
// add event listener for open text editor btn
openTextEditorBtn.addEventListener("click", openTextEditor);

// export something
export default allTasks;
export {
  allTaskList,
  taskManagerContent,
  allFolders,
  getNoOfAllTask,
  noOfCompletedTask,
  allTags,
  allTasks,
};
