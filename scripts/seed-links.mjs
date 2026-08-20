import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

function loadEnv() {
  const env = {};
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const match = /^([A-Z_][A-Z0-9_]*)=(.*)$/.exec(line.trim());
      if (match) {
        env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    return env;
  }
  return env;
}

const fileEnv = loadEnv();
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  fileEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? fileEnv.NEXT_PUBLIC_SANITY_DATASET;
const token =
  process.env.SANITY_API_WRITE_TOKEN ?? fileEnv.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error(
    "Faltam NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET.",
  );
  process.exit(1);
}

if (!token) {
  console.error(
    [
      "Falta SANITY_API_WRITE_TOKEN.",
      "",
      "Crie um token com permissao de Editor em:",
      `  https://www.sanity.io/manage/project/${projectId}/api#tokens`,
      "",
      "Depois rode:",
      "  SANITY_API_WRITE_TOKEN=<token> yarn seed:links",
      "",
      "Ou adicione a linha no .env.local:",
      "  SANITY_API_WRITE_TOKEN=<token>",
    ].join("\n"),
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-08-10",
  useCdn: false,
});

const tagline = "Gestão imobiliária completa, num só lugar.";

const linkItems = [
  {
    label: "Agendar demonstração",
    href: "https://cognizy.ai/book/comercial-mylar-pro-erp",
    icon: "calendar",
    variant: "primary",
    utmContent: "demo",
    trackingEvent: "ClickDemo",
    shortSlug: "demo",
  },
  {
    label: "Criar conta grátis",
    href: "https://app.mylarpro.com.br/register",
    icon: "rocket",
    variant: "secondary",
    utmContent: "teste",
    trackingEvent: "ClickTrial",
    shortSlug: "teste",
  },
  {
    label: "Acessar plataforma",
    href: "https://app.mylarpro.com.br",
    icon: "dashboard",
    variant: "secondary",
    utmContent: "app",
  },
  {
    label: "App do corretor (iPhone)",
    href: "https://apps.apple.com/us/app/mylar-pro-brokers/id6762925131",
    icon: "apple",
    variant: "secondary",
    utmContent: "brokers-ios",
  },
  {
    label: "App do corretor (Android)",
    href: "https://play.google.com/store/apps/details?id=com.mylarprobrokers.app",
    icon: "googlePlay",
    variant: "secondary",
    utmContent: "brokers-android",
  },
  {
    label: "App do cliente (iPhone)",
    href: "https://apps.apple.com/br/app/mylar-pro-home/id6784389538",
    icon: "apple",
    variant: "secondary",
    utmContent: "home-ios",
  },
  {
    label: "App do cliente (Android)",
    href: "https://play.google.com/store/apps/details?id=com.mylarprohome.app",
    icon: "googlePlay",
    variant: "secondary",
    utmContent: "home-android",
  },
  {
    label: "Funcionalidades",
    href: "/features",
    icon: "sparkles",
    variant: "secondary",
    utmContent: "features",
  },
  {
    label: "Para quem é",
    href: "/personas",
    icon: "users",
    variant: "secondary",
    utmContent: "personas",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5561981896419",
    icon: "whatsapp",
    variant: "secondary",
    utmContent: "whatsapp",
    shortSlug: "whatsapp",
  },
  {
    label: "E-mail",
    href: "mailto:contato@mylarapp.com",
    icon: "mail",
    variant: "secondary",
  },
  {
    label: "Telefone",
    href: "tel:+5561981896419",
    icon: "phone",
    variant: "secondary",
  },
];

const socialItems = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mylar.app/",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mylar-pro",
    icon: "linkedin",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mylarapp",
    icon: "facebook",
  },
];

const brandDescription =
  "A plataforma que reúne CRM, atendimento, contratos, cobrança e financeiro do mercado imobiliário em uma operação só.";

const footerGroups = [
  {
    title: "Produto",
    links: [
      { label: "Todos os recursos", href: "/features" },
      { label: "CRM e negociações", href: "/features/crm" },
      { label: "Canais de atendimento", href: "/features/channels" },
      { label: "Cobranças e repasses", href: "/features/billing" },
      { label: "Financeiro", href: "/features/financial" },
      { label: "Mila e ferramentas de IA", href: "/features/ai" },
    ],
  },
  {
    title: "Para quem",
    links: [
      { label: "Corretor autônomo", href: "/personas/broker" },
      { label: "Imobiliária", href: "/personas/real-estate" },
      { label: "Lançamentos", href: "/personas/development" },
      { label: "Comparar as versões", href: "/personas" },
    ],
  },
  {
    title: "Aplicativos",
    links: [
      { label: "MyLar Pro Brokers", href: "/features/broker-app" },
      { label: "MyLar Pro Home", href: "/features/client-portal" },
      { label: "Catálogo público", href: "/features/property-catalog" },
      { label: "Assinatura de contratos", href: "/features/digital-signature" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Preços", href: "/plans" },
      { label: "Contato", href: "/contact" },
      { label: "Política de privacidade", href: "/privacy-policy" },
      { label: "Termos de uso", href: "/terms-of-use" },
    ],
  },
];

function withKeys(items, prefix) {
  return items.map((item, index) => ({
    _key: `${prefix}-${index}`,
    ...item,
  }));
}

const documents = [
  {
    _id: "linksPage",
    _type: "linksPage",
    tagline,
    links: withKeys(
      linkItems.map((item) => ({ _type: "linkButton", ...item })),
      "link",
    ),
  },
  {
    _id: "socialLinks",
    _type: "socialLinks",
    items: withKeys(
      socialItems.map((item) => ({ _type: "socialItem", ...item })),
      "social",
    ),
  },
  {
    _id: "siteFooter",
    _type: "siteFooter",
    brandDescription,
    groups: withKeys(
      footerGroups.map((group) => ({
        _type: "footerGroup",
        title: group.title,
        links: withKeys(
          group.links.map((link) => ({ _type: "footerLink", ...link })),
          `${group.title.toLowerCase()}-link`,
        ),
      })),
      "group",
    ),
  },
];

async function main() {
  const force = process.argv.includes("--force");
  const existing = await client.fetch(
    `*[_id in $ids]{_id}`,
    { ids: documents.map((doc) => doc._id) },
  );

  if (existing.length > 0 && !force) {
    console.error(
      [
        `Ja existem ${existing.length} documento(s): ${existing.map((d) => d._id).join(", ")}.`,
        "",
        "Para sobrescrever, rode de novo com --force:",
        "  yarn seed:links --force",
        "",
        "Isso substitui o conteudo atual desses documentos no dataset",
        `"${dataset}". Nada e apagado fora desses ids.`,
      ].join("\n"),
    );
    process.exit(1);
  }

  const transaction = documents.reduce(
    (tx, doc) => tx.createOrReplace(doc),
    client.transaction(),
  );

  await transaction.commit();

  console.log(`Publicados em ${projectId}/${dataset}:`);
  console.log(`  linksPage    ${linkItems.length} botoes`);
  console.log(`  socialLinks  ${socialItems.length} redes`);
  console.log(`  siteFooter   ${footerGroups.length} grupos`);
  console.log("");
  console.log("Confira em /studio e recarregue /links no site.");
}

main().catch((error) => {
  console.error("Falha ao popular:", error.message ?? error);
  process.exit(1);
});
