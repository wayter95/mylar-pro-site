import type { LegalContent } from "@/components/legal/LegalDocument";

export const homePrivacyPolicy: LegalContent = {
  title: {
    pt: "Política de Privacidade — App Mylar Pro Home",
    en: "Privacy Policy — Mylar Pro Home App",
  },
  subtitle: {
    pt: "Aplicativo móvel destinado a inquilinos e proprietários de imóveis administrados por imobiliárias clientes da plataforma Mylar Pro.",
    en: "Mobile application for tenants and property owners whose properties are managed by real estate agencies using the Mylar Pro platform.",
  },
  lastUpdated: {
    pt: "25 de junho de 2026",
    en: "June 25, 2026",
  },
  intro: {
    pt: `Esta Política de Privacidade descreve como a My Lar ("Mylar Pro", "nós") coleta, utiliza, armazena e compartilha dados pessoais no aplicativo Mylar Pro Home (o "Aplicativo"). Ao instalar e utilizar o Aplicativo, você ("usuário", "cliente") concorda com as práticas aqui descritas.

Esta Política foi elaborada em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — "LGPD"), com o Regulamento Geral sobre a Proteção de Dados da União Europeia (GDPR), e com as diretrizes de privacidade da Google Play Store e da Apple App Store.`,
    en: `This Privacy Policy describes how My Lar ("Mylar Pro", "we") collects, uses, stores, and shares personal data in the Mylar Pro Home mobile application (the "App"). By installing and using the App, you ("user", "client") agree to the practices described herein.

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

A imobiliária responsável pela administração do seu imóvel também atua como Operadora, tendo acesso aos dados necessários para executar o contrato de locação e prestar os serviços associados.

Encarregado pelo Tratamento de Dados (DPO) / Data Protection Officer:
E-mail: contato@mylarapp.com`,
        en: `My Lar, a private legal entity registered under CNPJ No. 54.865.990/0001-50, is the Data Controller of the personal data processed through the App, pursuant to Article 5, VI of the LGPD.

The real estate agency responsible for managing your property also acts as a Processor, with access to data necessary to perform the rental agreement and provide associated services.

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

• Dados cadastrais: CPF ou CNPJ (utilizado no login), nome completo, e-mail, telefone.
• Dados da relação locatícia: informações sobre contratos de locação, faturas, comprovantes de pagamento enviados pelo usuário, repasses (para proprietários) e notas fiscais.
• Dados biométricos (apenas no dispositivo): impressão digital ou reconhecimento facial (Face ID/Touch ID) para autenticação local. Esses dados nunca são transmitidos ao servidor — o processamento ocorre exclusivamente no hardware seguro do dispositivo.
• Token de notificação push: identificador do dispositivo junto à Expo/Firebase/Apple Push Notification Service para envio de notificações.
• Dados de uso: logs de acesso, endereço IP, identificador do dispositivo (Device ID), modelo do aparelho, versão do sistema operacional, versão do Aplicativo, idioma.
• Arquivos enviados pelo usuário: comprovantes de pagamento (imagens ou PDFs) enviados para análise pela imobiliária.

Não coletamos dados sensíveis de saúde, origem racial, convicção religiosa ou orientação sexual e não realizamos rastreamento publicitário entre aplicativos (NSPrivacyTracking = false).`,
        en: `We collect only data necessary for the App to function:

• Account data: Brazilian individual (CPF) or corporate (CNPJ) tax ID used for login, full name, email, phone number.
• Tenancy and ownership data: information about rental agreements, invoices, payment receipts uploaded by the user, owner transfers (for property owners), and fiscal invoices.
• Biometric data (device-only): fingerprint or facial recognition (Face ID/Touch ID) for local authentication. This data is never transmitted to the server — processing occurs exclusively in the device's secure hardware.
• Push notification token: device identifier with Expo/Firebase/Apple Push Notification Service for sending notifications.
• Usage data: access logs, IP address, device identifier (Device ID), device model, OS version, App version, language.
• User-submitted files: payment proof documents (images or PDFs) submitted for review by the agency.

We do not collect sensitive health data, racial origin, religious beliefs, or sexual orientation, and we do not perform cross-app advertising tracking (NSPrivacyTracking = false).`,
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

• Biometria (LocalAuthentication / NSFaceIDUsageDescription):
Usada para autenticar o usuário localmente via Face ID, Touch ID ou digital, como alternativa ao código OTP. Os dados biométricos são processados exclusivamente pelo hardware seguro do dispositivo (Secure Enclave no iOS, TEE no Android) e jamais são enviados ao nosso servidor.

• Câmera (android.permission.CAMERA / NSCameraUsageDescription):
Usada exclusivamente para capturar imagens de comprovantes de pagamento que o usuário deseja enviar à imobiliária para análise.

• Fotos / Galeria (android.permission.READ_MEDIA_IMAGES / NSPhotoLibraryUsageDescription):
Usada para permitir que o usuário selecione comprovantes de pagamento já existentes em seu dispositivo para envio à imobiliária.

• Notificações (expo-notifications / APNs / FCM):
Usadas para enviar alertas de novas faturas, confirmação de pagamentos, comunicados da imobiliária, atualizações de chamados de suporte e solicitações de manutenção.

• Armazenamento local seguro (expo-secure-store):
Usado para armazenar tokens de autenticação e preferências do usuário. Dados permanecem criptografados no dispositivo.`,
        en: `The App requests the following permissions, always with the user's explicit consent at the time of use. You may refuse or revoke any permission at any time in your device settings — specific features will be limited accordingly.

• Biometrics (LocalAuthentication / NSFaceIDUsageDescription):
Used to authenticate the user locally via Face ID, Touch ID, or fingerprint, as an alternative to the OTP code. Biometric data is processed exclusively by the device's secure hardware (Secure Enclave on iOS, TEE on Android) and is never sent to our servers.

• Camera (android.permission.CAMERA / NSCameraUsageDescription):
Used exclusively to capture images of payment receipts the user wishes to submit to the agency for review.

• Photos / Gallery (android.permission.READ_MEDIA_IMAGES / NSPhotoLibraryUsageDescription):
Used to allow the user to select existing payment proof documents from their device for submission to the agency.

• Notifications (expo-notifications / APNs / FCM):
Used to send alerts for new invoices, payment confirmations, agency announcements, support ticket updates, and maintenance request notifications.

• Secure local storage (expo-secure-store):
Used to store authentication tokens and user preferences. Data remains encrypted on the device.`,
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

• Autenticar o usuário via CPF/CNPJ + código OTP (e-mail ou WhatsApp) e manter sua sessão ativa.
• Exibir faturas, contratos, repasses, notas fiscais e demais informações da relação locatícia.
• Receber e encaminhar comprovantes de pagamento à imobiliária responsável para análise e aprovação.
• Registrar e acompanhar chamados de suporte e solicitações de manutenção do imóvel.
• Enviar notificações operacionais (lembretes de vencimento, confirmações, avisos).
• Prevenir fraudes, garantir a segurança do Aplicativo e cumprir obrigações legais.
• Melhorar a experiência do usuário e desenvolver novos recursos.`,
        en: `We use your personal data for the following purposes, based on Articles 7, V (contract performance) and 7, IX (legitimate interest) of the LGPD:

• Authenticate the user via CPF/CNPJ + OTP code (email or WhatsApp) and maintain an active session.
• Display invoices, contracts, owner transfers, fiscal invoices, and other tenancy or ownership information.
• Receive and forward payment receipts to the responsible agency for review and approval.
• Register and track support tickets and property maintenance requests.
• Send operational notifications (due date reminders, confirmations, announcements).
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

• Imobiliária responsável: a empresa que administra seu imóvel tem acesso aos dados necessários à execução do contrato de locação e à prestação dos serviços solicitados.
• Cloudflare R2 (armazenamento de comprovantes e arquivos) — armazenamento compatível com S3.
• ASAAS (processamento de cobranças PIX e boleto, quando aplicável).
• Google Firebase / Firebase Cloud Messaging (envio de notificações push no Android).
• Apple Push Notification Service (envio de notificações push no iOS).
• Expo (serviços de push notification e atualização de aplicativo).
• SendGrid (envio de e-mails transacionais, incluindo OTP).
• Twilio (envio de SMS/OTP e mensagens WhatsApp).
• Sentry (monitoramento de erros e crashes).

Não vendemos, alugamos ou cedemos seus dados pessoais a terceiros para fins de marketing.

Parte dos dados pode ser armazenada em servidores fora do Brasil (Estados Unidos, União Europeia). Nesses casos, adotamos salvaguardas contratuais exigidas pela LGPD (art. 33) e cláusulas padrão de transferência internacional.`,
        en: `Your data is shared only with operators essential to the App's functioning, all under data protection agreements:

• Responsible agency: the company managing your property has access to data necessary to perform the rental agreement and provide the requested services.
• Cloudflare R2 (payment receipt and file storage) — S3-compatible storage.
• ASAAS (PIX and bank slip payment processing, when applicable).
• Google Firebase / Firebase Cloud Messaging (Android push notifications).
• Apple Push Notification Service (iOS push notifications).
• Expo (push notification and app update services).
• SendGrid (transactional emails, including OTP delivery).
• Twilio (SMS/OTP and WhatsApp messages).
• Sentry (error and crash monitoring).

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
        pt: `Seus dados pessoais são mantidos enquanto existir um contrato de locação ativo vinculado à sua conta ou conforme exigido por lei (por exemplo, obrigações fiscais e contratuais).

Após o encerramento da relação contratual:
• Dados operacionais são anonimizados ou excluídos em até 90 dias.
• Documentos e registros com exigência legal de retenção (contratos, comprovantes fiscais, notas fiscais) são mantidos pelo prazo legal aplicável e posteriormente eliminados.
• Backups criptografados podem conter cópia residual por até 180 dias antes de serem sobrescritos.

Para exclusão dos seus dados, entre em contato pelo e-mail contato@mylarapp.com ou com a imobiliária responsável. Dados cadastrais são gerenciados pela imobiliária — alterações devem ser solicitadas diretamente a ela.`,
        en: `Your personal data is retained while an active rental agreement is linked to your account or as required by law (e.g., tax and contractual obligations).

Upon termination of the contractual relationship:
• Operational data is anonymized or deleted within 90 days.
• Documents and records with legal retention requirements (contracts, tax receipts, fiscal invoices) are kept for the applicable legal term and subsequently deleted.
• Encrypted backups may contain residual copies for up to 180 days before being overwritten.

To request deletion of your data, contact us at contato@mylarapp.com or reach out to the responsible agency. Account registration data is managed by the agency — changes must be requested directly from them.`,
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
• Dados biométricos processados exclusivamente no hardware seguro do dispositivo — nunca transmitidos à nossa infraestrutura.
• Controle de acesso baseado em função (RBAC) com princípio do menor privilégio.
• Logs de auditoria e monitoramento contínuo via Sentry e Datadog.
• Autenticação por OTP (código de uso único) via e-mail ou WhatsApp para cada novo acesso.

Nenhum sistema é 100% seguro. Em caso de incidente de segurança com risco relevante, comunicaremos você e a Autoridade Nacional de Proteção de Dados (ANPD) conforme exigido pelo art. 48 da LGPD.`,
        en: `We adopt appropriate technical and organizational measures to protect your data, including:

• Encryption of data in transit (TLS 1.2+) and at rest.
• Authentication tokens stored in native secure storage (iOS Keychain / Android Keystore).
• Biometric data processed exclusively in the device's secure hardware — never transmitted to our infrastructure.
• Role-based access control (RBAC) under the principle of least privilege.
• Audit logs and continuous monitoring via Sentry and Datadog.
• OTP (one-time password) authentication via email or WhatsApp for each new login.

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

Para exercer qualquer direito, envie e-mail a contato@mylarapp.com. Responderemos em até 15 (quinze) dias. Dados cadastrais gerenciados pela imobiliária devem ser solicitados diretamente a ela.`,
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

To exercise any right, email contato@mylarapp.com. We will respond within 15 (fifteen) days. For registration data managed by the agency, please contact them directly.`,
      },
    },
    {
      id: "children",
      title: {
        pt: "Crianças e adolescentes",
        en: "Children and minors",
      },
      body: {
        pt: `O Aplicativo é destinado a maiores de 18 anos ou emancipados, com vínculo contratual ativo como inquilino ou proprietário. Não coletamos intencionalmente dados de menores. Caso identifique coleta indevida, entre em contato para exclusão imediata.`,
        en: `The App is intended for users 18 years of age or older (or legally emancipated) with an active contractual relationship as tenant or property owner. We do not intentionally collect data from minors. If you believe data has been collected improperly, please contact us for immediate deletion.`,
      },
    },
    {
      id: "changes",
      title: {
        pt: "Alterações nesta Política",
        en: "Changes to this Policy",
      },
      body: {
        pt: `Podemos atualizar esta Política periodicamente. A versão mais recente estará sempre disponível em https://mylarpro.com.br/home/privacy-policy. Alterações materiais serão comunicadas dentro do Aplicativo e por e-mail com antecedência mínima de 15 dias.`,
        en: `We may update this Policy periodically. The latest version will always be available at https://mylarpro.com.br/home/privacy-policy. Material changes will be communicated within the App and by email with a minimum of 15 days' notice.`,
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
