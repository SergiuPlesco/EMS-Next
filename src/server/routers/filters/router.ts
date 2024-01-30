import { router } from "../../trpc";
import { all } from "./procedures";

export const filtersRouter = router({ all });
