import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TutorialRoutes } from "../modules/Tutorial/tutorial.route";
import { LessonRoutes } from "../modules/Lesson/lesson.route";
import { VocabularyRoutes } from "../modules/Vocabulary/vocabulary.route";
import { DashboardRoutes } from "../modules/Dashboard/dashboard.route";

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
  {
    path: "/vocabulary",
    route: VocabularyRoutes,
  },
  {
    path: "/vocabulary",
    route: VocabularyRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
