import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorialRoutes } from "../modules/Tutorial/tutorial.route";
import { LessonRoutes } from "../modules/Lesson/lesson.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/tutorial",
    route: TutorialRoutes,
  },
  {
    path: "/lesson",
    route: LessonRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
