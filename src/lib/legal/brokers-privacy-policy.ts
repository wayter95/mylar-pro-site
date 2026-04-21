import type { LegalContent } from "@/components/legal/LegalDocument";

export const brokersPrivacyPolicy: LegalContent = {
  title: {
    pt: "Política de Privacidade — App Mylar Pro Brokers",
    en: "Privacy Policy — Mylar Pro Brokers App",
  },
  subtitle: {
    pt: "Aplicativo móvel destinado a corretores, vistoriadores e profissionais autorizados por imobiliárias clientes da plataforma Mylar Pro.",
    en: "Mobile application for real estate agents, inspectors, and authorized professionals of real estate agencies using the Mylar Pro platform.",
  },
  lastUpdated: {
    pt: "21 de abril de 2026",
    en: "April 21, 2026",
  },
  intro: {
    pt: `Esta Política de Privacidade descreve como a My Lar ("Mylar Pro", "nós") coleta, utiliza, armazena e compartilha dados pessoais no aplicativo Mylar Pro Brokers (o "Aplicativo"). Ao instalar e utilizar o Aplicativo, você ("usuário", "corretor") concorda com as práticas aqui descritas.

Esta Política foi elaborada em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — "LGPD"), com o Regulamento Geral sobre a Proteção de Dados da União Europeia (GDPR), e com as diretrizes de privacidade da Google Play Store e da Apple App Store.`,
    en: `This Privacy Policy describes how My Lar ("Mylar Pro", "we") collects, uses, stores, and shares personal data in the Mylar Pro Brokers mobile application (the "App"). By installing and using the App, you ("user", "broker") agree to the practices described herein.

This Policy is drafted in compliance with the Brazilian General Data Protection Law (Law No. 13,709/2018 — "LGPD"), the EU General Data Protection Regulation (GDPR), and the privacy guidelines of the Google Play Store and Apple App Store.`,
  },
  sections: [
    {
      id: "controller",
      title: {
        pt: "Quem somos (Controlador dos Dados)",
        en: "Who we are (Data Controller)",
      },
      body: {
        pt: `My Lar, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 54.865.990/0001-50, é a Controladora dos dados pessoais tratados por meio do Aplicativo, nos termos do art. 5º, VI, da LGPD.

Encarregado pelo Tratamento de Dados (DPO) / Data Protection Officer:
E-mail: contato@mylarapp.com`,
        en: `My Lar, a private legal entity registered under CNPJ No. 54.865.990/0001-50, is the Data Controller of the personal data processed through the App, pursuant to Article 5, VI of the LGPD.

Data Protection Officer (DPO):
Email: contato@mylarapp.com`,
      },
    },
    {
      id: "data-collected",
      title: {
        pt: "Dados pessoais que coletamos",
        en: "Personal data we collect",
      },
      body: {
        pt: `Coletamos apenas dados necessários ao funcionamento do Aplicativo:

• Dados cadastrais: nome completo, e-mail, telefone, CPF, CRECI (quando aplicável), foto de perfil.
• Dados profissionais: imobiliária vinculada, cargo, permissões, histórico de atividades no Aplicativo.
• Documentos: arquivos enviados pelo usuário (RG, CPF, comprovantes de endereço, CRECI, contratos) para aprovação pela imobiliária.
• Dados de uso: logs de acesso, endereço IP, identificador do dispositivo (Device ID), modelo do aparelho, versão do sistema operacional, versão do Aplicativo, idioma.
• Dados de localização (opcional): coordenadas aproximadas ou precisas, coletadas apenas no momento do registro de assinatura presencial em vistoria, como comprovação opcional do local.
• Fotos e mídia: imagens capturadas pela câmera ou selecionadas da galeria para vistorias, laudos, digitalização de documentos e atualização de foto de perfil.
• Token de notificação push: identificador do dispositivo junto à Expo/Firebase/Apple Push Notification Service para envio de notificações.

Não coletamos dados sensíveis (saúde, biometria, origem racial, convicção religiosa, orientação sexual) e não realizamos rastreamento publicitário entre aplicativos (NSPrivacyTracking = false).`,
        en: `We collect only data necessary for the App to function:

• Account data: full name, email, phone, Brazilian tax ID (CPF), real estate license (CRECI, where applicable), profile photo.
• Professional data: affiliated real estate agency, role, permissions, activity history in the App.
• Documents: files uploaded by the user (ID, tax documents, proof of address, license, contracts) for approval by the agency.
• Usage data: access logs, IP address, device identifier (Device ID), device model, OS version, App version, language.
• Location data (optional): approximate or precise coordinates, collected only when recording an in-person signature during property inspection, as optional proof of location.
• Photos and media: images captured by the camera or selected from the gallery for inspections, reports, document scanning, and profile photo updates.
• Push notification token: device identifier with Expo/Firebase/Apple Push Notification Service for sending notifications.

We do not collect sensitive data (health, biometrics, race, religious beliefs, sexual orientation) and we do not perform cross-app advertising tracking (NSPrivacyTracking = false).`,
      },
    },
    {
      id: "permissions",
      title: {
        pt: "Permissões do dispositivo e finalidades",
        en: "Device permissions and purposes",
      },
      body: {
        pt: `O Aplicativo solicita as seguintes permissões, sempre com consentimento explícito do usuário no momento do uso. Você pode recusar ou revogar qualquer permissão a qualquer momento nas configurações do seu dispositivo — o funcionamento de recursos específicos será limitado.

• Câmera (android.permission.CAMERA / NSCameraUsageDescription):
Usada exclusivamente para capturar fotos durante vistorias de imóveis, digitalização de documentos de identificação e atualização da foto de perfil. As imagens não são compartilhadas com terceiros fora do fluxo operacional descrito nesta Política.

• Fotos / Galeria (android.permission.READ_MEDIA_IMAGES / NSPhotoLibraryUsageDescription):
Usada para permitir que o usuário anexe imagens já existentes em seu dispositivo em vistorias, envie documentos para aprovação e selecione foto de perfil.

• Localização aproximada e precisa (android.permission.ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION / NSLocationWhenInUseUsageDescription):
Coletada apenas durante o uso ativo do Aplicativo (when-in-use), exclusivamente ao registrar assinatura presencial em vistoria, como comprovação opcional do local da assinatura. A coleta nunca ocorre em segundo plano.

• Notificações (expo-notifications / APNs / FCM):
Usadas para enviar lembretes de vistorias, atualizações de status de negociações, comunicados internos da imobiliária e alertas operacionais.

• Armazenamento local seguro (expo-secure-store / expo-sqlite):
Usado para armazenar tokens de autenticação, preferências do usuário e cache de dados para funcionamento offline limitado. Dados permanecem criptografados no dispositivo.`,
        en: `The App requests the following permissions, always with the user's explicit consent at the time of use. You may refuse or revoke any permission at any time in your device settings — specific features will be limited accordingly.

• Camera (android.permission.CAMERA / NSCameraUsageDescription):
Used exclusively to capture photos during property inspections, scan identification documents, and update the profile photo. Images are not shared with third parties outside the operational flow described in this Policy.

• Photos / Gallery (android.permission.READ_MEDIA_IMAGES / NSPhotoLibraryUsageDescription):
Used to allow the user to attach existing device images to inspections, submit documents for approval, and select a profile photo.

• Approximate and precise location (android.permission.ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION / NSLocationWhenInUseUsageDescription):
Collected only while the App is in active use (when-in-use), exclusively when recording an in-person signature during property inspection, as optional proof of signature location. Background collection never occurs.

• Notifications (expo-notifications / APNs / FCM):
Used to send inspection reminders, negotiation status updates, internal agency communications, and operational alerts.

• Secure local storage (expo-secure-store / expo-sqlite):
Used to store authentication tokens, user preferences, and data cache for limited offline functionality. Data remains encrypted on the device.`,
      },
    },
    {
      id: "purposes",
      title: {
        pt: "Finalidades do tratamento",
        en: "Processing purposes",
      },
      body: {
        pt: `Utilizamos seus dados pessoais para as seguintes finalidades, com base legal nos arts. 7º, V (execução de contrato) e 7º, IX (interesse legítimo) da LGPD:

• Autenticar o usuário e manter sua sessão ativa.
• Permitir a execução das atividades profissionais vinculadas à imobiliária contratante (gestão de leads, vistorias, contratos, negociações, clientes).
• Aprovar ou rejeitar documentos profissionais enviados pelo corretor.
• Enviar notificações operacionais (lembretes, atualizações, comunicados).
• Prevenir fraudes, garantir a segurança do Aplicativo e cumprir obrigações legais.
• Melhorar a experiência do usuário e desenvolver novos recursos.`,
        en: `We use your personal data for the following purposes, based on Articles 7, V (contract performance) and 7, IX (legitimate interest) of the LGPD:

• Authenticate the user and maintain an active session.
• Enable professional activities linked to the contracting real estate agency (lead management, inspections, contracts, negotiations, clients).
• Approve or reject professional documents submitted by the broker.
• Send operational notifications (reminders, updates, announcements).
• Prevent fraud, ensure App security, and comply with legal obligations.
• Improve user experience and develop new features.`,
      },
    },
    {
      id: "sharing",
      title: {
        pt: "Compartilhamento com terceiros",
        en: "Sharing with third parties",
      },
      body: {
        pt: `Seus dados são compartilhados apenas com operadores essenciais ao funcionamento do Aplicativo, todos sob contrato de proteção de dados:

• Cloudflare R2 (armazenamento de arquivos e imagens) — armazenamento compatível com S3.
• Google Firebase / Firebase Cloud Messaging (envio de notificações push no Android).
• Apple Push Notification Service (envio de notificações push no iOS).
• Expo (serviços de push notification e atualização de aplicativo).
• Sentry (monitoramento de erros e crashes).
• SendGrid (envio de e-mails transacionais).
• Twilio (envio de SMS / OTP).
• Stripe / ASAAS (pagamentos, quando aplicável).
• Evolution API (integrações WhatsApp, quando aplicável).

Não vendemos, alugamos ou cedemos seus dados pessoais a terceiros para fins de marketing.

Parte dos dados pode ser armazenada em servidores fora do Brasil (Estados Unidos, União Europeia). Nesses casos, adotamos salvaguardas contratuais exigidas pela LGPD (art. 33) e cláusulas padrão de transferência internacional.`,
        en: `Your data is shared only with operators essential to the App's functioning, all under data protection agreements:

• Cloudflare R2 (file and image storage) — S3-compatible storage.
• Google Firebase / Firebase Cloud Messaging (Android push notifications).
• Apple Push Notification Service (iOS push notifications).
• Expo (push notification and app update services).
• Sentry (error and crash monitoring).
• SendGrid (transactional email).
• Twilio (SMS / OTP delivery).
• Stripe / ASAAS (payments, when applicable).
• Evolution API (WhatsApp integrations, when applicable).

We do not sell, rent, or transfer your personal data to third parties for marketing purposes.

Part of the data may be stored on servers outside Brazil (United States, European Union). In such cases, we adopt contractual safeguards required by LGPD (Article 33) and standard international transfer clauses.`,
      },
    },
    {
      id: "retention",
      title: {
        pt: "Retenção e exclusão de dados",
        en: "Data retention and deletion",
      },
      body: {
        pt: `Seus dados pessoais são mantidos enquanto sua conta estiver ativa ou conforme exigido por lei (por exemplo, obrigações fiscais, trabalhistas e regulatórias CRECI/COFECI).

Após o encerramento da conta:
• Dados operacionais são anonimizados ou excluídos em até 90 dias.
• Documentos e registros com exigência legal de retenção (contratos, comprovantes fiscais) são mantidos pelo prazo legal aplicável e posteriormente eliminados.
• Backups criptografados podem conter cópia residual por até 180 dias antes de serem sobrescritos.

Você pode solicitar a exclusão de sua conta a qualquer momento dentro do Aplicativo (menu Perfil → Excluir conta) ou pelo e-mail contato@mylarapp.com.`,
        en: `Your personal data is retained while your account is active or as required by law (e.g., tax, labor, and CRECI/COFECI regulatory obligations).

Upon account closure:
• Operational data is anonymized or deleted within 90 days.
• Documents and records with legal retention requirements (contracts, tax receipts) are kept for the applicable legal term and subsequently deleted.
• Encrypted backups may contain residual copies for up to 180 days before being overwritten.

You may request account deletion at any time inside the App (Profile → Delete account) or by emailing contato@mylarapp.com.`,
      },
    },
    {
      id: "security",
      title: {
        pt: "Segurança",
        en: "Security",
      },
      body: {
        pt: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados, incluindo:

• Criptografia de dados em trânsito (TLS 1.2+) e em repouso.
• Armazenamento de tokens de autenticação em secure-store nativo (Keychain iOS / Keystore Android).
• Controle de acesso baseado em função (RBAC) com princípio do menor privilégio.
• Logs de auditoria e monitoramento contínuo via Sentry e Datadog.
• Autenticação multifator via OTP em operações sensíveis (troca de e-mail, recuperação de conta).

Nenhum sistema é 100% seguro. Em caso de incidente de segurança com risco relevante, comunicaremos você e a Autoridade Nacional de Proteção de Dados (ANPD) conforme exigido pelo art. 48 da LGPD.`,
        en: `We adopt appropriate technical and organizational measures to protect your data, including:

• Encryption of data in transit (TLS 1.2+) and at rest.
• Authentication tokens stored in native secure storage (iOS Keychain / Android Keystore).
• Role-based access control (RBAC) under the principle of least privilege.
• Audit logs and continuous monitoring via Sentry and Datadog.
• Multi-factor authentication via OTP for sensitive operations (email change, account recovery).

No system is 100% secure. In the event of a security incident with relevant risk, we will notify you and the Brazilian Data Protection Authority (ANPD) as required by Article 48 of the LGPD.`,
      },
    },
    {
      id: "rights",
      title: {
        pt: "Seus direitos (LGPD / GDPR)",
        en: "Your rights (LGPD / GDPR)",
      },
      body: {
        pt: `Você pode exercer, gratuitamente, os seguintes direitos:

• Confirmação da existência de tratamento.
• Acesso aos dados pessoais que mantemos.
• Correção de dados incompletos, inexatos ou desatualizados.
• Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a LGPD.
• Portabilidade dos dados a outro fornecedor.
• Eliminação dos dados tratados com base em consentimento.
• Informação sobre entidades públicas e privadas com as quais compartilhamos dados.
• Revogação do consentimento a qualquer momento.
• Oposição a tratamentos realizados com base em interesse legítimo.

Para exercer qualquer direito, envie e-mail a contato@mylarapp.com. Responderemos em até 15 (quinze) dias.`,
        en: `You may exercise the following rights free of charge:

• Confirmation of the existence of processing.
• Access to the personal data we hold.
• Correction of incomplete, inaccurate, or outdated data.
• Anonymization, blocking, or deletion of unnecessary data or data processed in violation of the LGPD.
• Portability of data to another provider.
• Deletion of data processed under consent.
• Information on public and private entities with which we share data.
• Withdrawal of consent at any time.
• Objection to processing carried out under legitimate interest.

To exercise any right, email contato@mylarapp.com. We will respond within 15 (fifteen) days.`,
      },
    },
    {
      id: "children",
      title: {
        pt: "Crianças e adolescentes",
        en: "Children and minors",
      },
      body: {
        pt: `O Aplicativo é destinado exclusivamente a maiores de 18 anos ou emancipados, no exercício de atividade profissional. Não coletamos intencionalmente dados de menores. Caso identifique coleta indevida, entre em contato para exclusão imediata.`,
        en: `The App is intended exclusively for users 18 years of age or older (or legally emancipated), acting in a professional capacity. We do not intentionally collect data from minors. If you believe data has been collected improperly, please contact us for immediate deletion.`,
      },
    },
    {
      id: "changes",
      title: {
        pt: "Alterações nesta Política",
        en: "Changes to this Policy",
      },
      body: {
        pt: `Podemos atualizar esta Política periodicamente. A versão mais recente estará sempre disponível em https://mylarpro.com.br/brokers/privacy-policy. Alterações materiais serão comunicadas dentro do Aplicativo e por e-mail com antecedência mínima de 15 dias.`,
        en: `We may update this Policy periodically. The latest version will always be available at https://mylarpro.com.br/brokers/privacy-policy. Material changes will be communicated within the App and by email with a minimum of 15 days' notice.`,
      },
    },
    {
      id: "law",
      title: {
        pt: "Lei aplicável e foro",
        en: "Governing law and jurisdiction",
      },
      body: {
        pt: `Esta Política é regida pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca do domicílio do usuário para dirimir quaisquer controvérsias, nos termos do Código de Defesa do Consumidor quando aplicável.`,
        en: `This Policy is governed by the laws of the Federative Republic of Brazil. The courts of the user's domicile shall have jurisdiction over any disputes, pursuant to the Brazilian Consumer Protection Code when applicable.`,
      },
    },
  ],
};
