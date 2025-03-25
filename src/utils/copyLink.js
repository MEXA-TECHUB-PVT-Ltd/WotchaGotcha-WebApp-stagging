import { Toast } from "../components/theme/Toast";

export const copyLink = (link) => {
  console.log(link);
  setTimeout(() => {
    navigator?.clipboard?.writeText(link);
    Toast("success", "Link copied to clipboard");
  }, 100);
};
