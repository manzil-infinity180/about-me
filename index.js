#!/usr/bin/env node

const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
};

const args = new Set(process.argv.slice(2));

const color = (tone, text) => `${tone}${text}${C.reset}`;
const pad = (label, width = 18) => label.padEnd(width, " ");
const row = (label, value) => `${color(C.yellow, pad(label))} ${value}`;
const bullet = (text) => `${color(C.cyan, "•")} ${text}`;
const section = (title) => `\n${color(C.bold + C.magenta, title)}`;

const links = {
  website: "https://rahulxf.com",
  github: "https://github.com/manzil-infinity180",
  x: "https://x.com/rahulxf_",
  linkedin: "https://www.linkedin.com/in/rahulxf/",
  youtube: "https://www.youtube.com/@rahulxfd",
  blog: "https://rahulxf.com/blog",
  oss: "https://rahulxf.com/oss",
  aflock: "https://github.com/aflock-ai/aflock",
  rookery: "https://github.com/aflock-ai/rookery",
  witness: "https://github.com/in-toto/witness",
  kubestellar: "https://github.com/kubestellar/kubestellar",
  submitty: "https://github.com/Submitty/Submitty",
  gsocReport: "https://submitty.org/developer/google_summer_of_code/2024_Rahul_Vishwakarma",
  gsocProposal:
    "https://drive.google.com/file/d/1ZGq7FUavp9ACvwkaxtZEQE35A-1KVj09/view?usp=drivesdk",
  gsocPlaylist: "https://www.youtube.com/playlist?list=PL7CEUHGZqtd99Iafp-H9DeBIMaLbEC70c",
  cncfMentoring: "https://github.com/cncf/mentoring",
  llm: "https://www.rahulxf.com/llm.txt",
};

const tips = [
  "Start early. Open source programs reward visible consistency more than last-minute excitement.",
  "A few strong PRs and clear communication usually matter more than many shallow contributions.",
  "Use AI for exploration and debugging, but do not send slop PRs without understanding the codebase.",
  "Read old issue threads and past PRs before touching unfamiliar code. That context saves time.",
];

const buildDefaultOutput = () => [
  color(C.bold + C.green, "Rahul Vishwakarma / rahulxf"),
  color(
    C.gray,
    "Software engineer, open source contributor, GSoC developer, LFX mentee, and software supply chain security explorer.",
  ),

  section("Links"),
  row("Website", links.website),
  row("GitHub", links.github),
  row("Blog", links.blog),
  row("OSS / GSoC", links.oss),
  row("YouTube", links.youtube),
  row("X", links.x),
  row("LinkedIn", links.linkedin),

  section("Now"),
  bullet("Working across in-toto, aflock, rookery, Kubernetes, and software supply chain security."),
  bullet("GitHub is love."),

  section("Run again"),
  color(C.blue, "npx @rahulxf/about-me"),
  color(C.blue, "npx @rahulxf/about-me --more"),
  color(C.blue, "npx @rahulxf/about-me --resume"),
];

const buildMoreOutput = () => [
  color(C.bold + C.green, "Rahul Vishwakarma / rahulxf"),
  color(
    C.gray,
    "Extended view with more work, projects, milestones, and OSS / GSoC / LFX details.",
  ),

  section("Current focus"),
  bullet("Software supply chain security through in-toto, attestations, and SBOM-adjacent workflows."),
  bullet("Contributing to Witness & Archivista, aflock, and Kubernetes-related projects."),
  bullet("Building more in Go, TypeScript, and cloud-native systems."),

  section("Recent milestones"),
  bullet("Speaker at KubeCon + CloudNativeCon India 2026 for an in-toto Witness maintainer talk."),
  bullet("Open Source Intern at TestifySec."),
  bullet("Contributor to aflock and rookery."),
  bullet("LFX Mentee at KubeStellar."),
  bullet("GSoC 2024 Developer at Submitty."),

  section("Open source work"),
  row("Witness", links.witness),
  row("Aflock", links.aflock),
  row("Rookery", links.rookery),
  row("KubeStellar", links.kubestellar),
  row("Submitty", links.submitty),

  section("Selected projects"),
  bullet("Kubernetes CVE Scanner with a custom controller, webhook, Trivy, and admission checks."),
  bullet("DumpStore: a full-stack bookmark platform with React, Node.js, Kubernetes, and ArgoCD."),
  bullet("A real-time WebRTC collaboration app with messaging, file sharing, Monaco, and Yjs."),

  section("OSS / GSoC / LFX"),
  bullet("Start early, contribute consistently, and write proposals grounded in real project understanding."),
  bullet(`Advice page: ${links.oss}`),
  bullet(`GSoC 2024 final report: ${links.gsocReport}`),
  bullet(`GSoC proposal: ${links.gsocProposal}`),
  bullet(`YouTube playlist: ${links.gsocPlaylist}`),
  bullet(`CNCF mentoring repo: ${links.cncfMentoring}`),
];

const buildHelpOutput = () => [
  color(C.bold + C.green, "@rahulxf/about-me"),
  "",
  color(C.magenta, "Usage"),
  "  npx @rahulxf/about-me",
  "  npx @rahulxf/about-me --more",
  "  npx @rahulxf/about-me --resume",
  "  npx @rahulxf/about-me --tip",
  "  npx @rahulxf/about-me --help",
  "",
  color(C.magenta, "Flags"),
  "  --more     Print more details about work, OSS, projects, and guidance",
  "  --resume   Fetch and print live llm.txt from rahulxf.com",
  "  --tip      Print one random OSS / GSoC / LFX tip",
  "  --help     Show this help message",
];

const buildTipOutput = () => {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  return [color(C.bold + C.green, "Rahul tip"), "", bullet(tip), "", color(C.blue, links.oss)];
};

const printLines = (lines) => {
  process.stdout.write(`${lines.join("\n")}\n`);
};

const printResume = async () => {
  try {
    const response = await fetch(links.llm);
    if (!response.ok) {
      throw new Error(`Failed with status ${response.status}`);
    }

    const text = await response.text();
    process.stdout.write(`${text.trim()}\n`);
  } catch (error) {
    process.stderr.write(
      `${color(C.bold + C.yellow, "Could not fetch live resume.")}\n${String(error.message || error)}\n${links.llm}\n`,
    );
    process.exitCode = 1;
  }
};

const main = async () => {
  if (args.has("--help") || args.has("-h")) {
    printLines(buildHelpOutput());
    return;
  }

  if (args.has("--tip")) {
    printLines(buildTipOutput());
    return;
  }

  if (args.has("--more")) {
    printLines(buildMoreOutput());
    return;
  }

  if (args.has("--resume")) {
    await printResume();
    return;
  }

  printLines(buildDefaultOutput());
};

main();
