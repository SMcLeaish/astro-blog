import type { Alpine } from "alpinejs";
import { greeting } from "./scripts/greeting.ts";

export default (Alpine: Alpine) => {
  Alpine.data("greeting", greeting);
};
