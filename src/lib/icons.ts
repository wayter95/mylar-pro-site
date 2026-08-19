/**
 * Sistema centralizado de ícones do Mylar Pro.
 *
 * Famílias usadas:
 * - Lu (Lucide via react-icons) — ícones de UI gerais e ilustrações
 * - Si (Simple Icons) — logos de marca (Apple, Google Play, WhatsApp, etc.)
 *
 * Importe usando o nome semântico — não importe direto do react-icons.
 * Exemplo:
 *   import { Icons } from "@/lib/icons";
 *   <Icons.check className="size-4" />
 */

import type { IconType } from "react-icons";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuBriefcase,
  LuBuilding2,
  LuCalendar,
  LuChartColumn,
  LuCheck,
  LuChevronDown,
  LuChevronRight,
  LuCircleAlert,
  LuCircleCheck,
  LuCircleDollarSign,
  LuClock,
  LuDatabase,
  LuFile,
  LuFileCheck2,
  LuFilePen,
  LuFileText,
  LuFingerprint,
  LuGlobe,
  LuHandshake,
  LuHeart,
  LuHouse,
  LuKey,
  LuLayoutDashboard,
  LuLayoutGrid,
  LuLoader,
  LuLock,
  LuMail,
  LuMapPin,
  LuMenu,
  LuMessageSquare,
  LuPhone,
  LuPlay,
  LuPlus,
  LuQuote,
  LuRocket,
  LuSearch,
  LuSend,
  LuServer,
  LuSettings,
  LuShield,
  LuShieldCheck,
  LuSignature,
  LuSparkles,
  LuTrendingUp,
  LuUser,
  LuUserCheck,
  LuUsers,
  LuWallet,
  LuX,
  LuZap,
} from "react-icons/lu";
import {
  SiApple,
  SiFacebook,
  SiGoogleplay,
  SiInstagram,
  SiMeta,
  SiTiktok,
  SiWhatsapp,
  SiYoutube,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

/**
 * Mapping semântico — use estes nomes nos componentes, não as classes da lib.
 * Quando precisar trocar de família, mudamos só aqui.
 */
export const Icons = {
  // Setas e navegação
  arrowRight: LuArrowRight,
  arrowUpRight: LuArrowUpRight,
  chevronRight: LuChevronRight,
  chevronDown: LuChevronDown,

  // Validação e estados
  check: LuCheck,
  checkCircle: LuCircleCheck,
  alert: LuCircleAlert,
  close: LuX,
  loader: LuLoader,

  // Pessoas
  user: LuUser,
  users: LuUsers,
  userCheck: LuUserCheck,

  // Comunicação
  mail: LuMail,
  phone: LuPhone,
  message: LuMessageSquare,
  send: LuSend,

  // Negócio e financeiro
  dashboard: LuLayoutDashboard,
  grid: LuLayoutGrid,
  building: LuBuilding2,
  house: LuHouse,
  wallet: LuWallet,
  dollar: LuCircleDollarSign,
  chart: LuChartColumn,
  trending: LuTrendingUp,
  briefcase: LuBriefcase,
  handshake: LuHandshake,

  // Documentos e contratos
  file: LuFile,
  fileText: LuFileText,
  fileCheck: LuFileCheck2,
  fileSign: LuSignature,
  filePen: LuFilePen,

  // Tempo e localização
  calendar: LuCalendar,
  clock: LuClock,
  mapPin: LuMapPin,

  // Segurança
  shield: LuShield,
  shieldCheck: LuShieldCheck,
  lock: LuLock,
  fingerprint: LuFingerprint,
  key: LuKey,

  // Infraestrutura
  database: LuDatabase,
  server: LuServer,
  globe: LuGlobe,

  // Ações e UI
  search: LuSearch,
  plus: LuPlus,
  menu: LuMenu,
  settings: LuSettings,
  play: LuPlay,

  // Decorativos
  sparkles: LuSparkles,
  rocket: LuRocket,
  zap: LuZap,
  heart: LuHeart,
  quote: LuQuote,

  // Marca (logos)
  apple: SiApple,
  googlePlay: SiGoogleplay,
  whatsapp: SiWhatsapp,
  meta: SiMeta,
  instagram: SiInstagram,
  linkedin: FaLinkedin,
  facebook: SiFacebook,
  youtube: SiYoutube,
  tiktok: SiTiktok,
} as const;

export type IconName = keyof typeof Icons;
export type { IconType };

export const iconNames = Object.keys(Icons).sort() as readonly IconName[];

export function getIcon(name: string): IconType {
  return Icons[name as IconName] ?? Icons.arrowRight;
}
