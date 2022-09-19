const socials = {
  kofi: "jcwillox",
  github: "jcwillox",
  linkedin: "joshua-cowie-willox"
};

export default defineAppConfig({
  fullname: "Joshua Cowie-Willox",
  socials,
  links: {
    github: `https://github.com/${socials.github}`,
    linkedin: `https://linkedin.com/in/${socials.linkedin}`,
    kofi: `https://ko-fi.com/${socials.kofi}`
  }
});
