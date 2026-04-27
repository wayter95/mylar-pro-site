import { getMotivoLabel } from "@/lib/contact";

export type ContactData = {
  nome: string;
  email: string;
  motivo: string;
  empresa?: string;
  telefone?: string;
  mensagem?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getContactEmailHtml(data: ContactData): string {
  const nome = escapeHtml(data.nome);
  const email = escapeHtml(data.email);
  const motivo = escapeHtml(getMotivoLabel(data.motivo));
  const empresa = data.empresa ? escapeHtml(data.empresa) : "";
  const telefone = data.telefone ? escapeHtml(data.telefone) : "";
  const mensagem = data.mensagem
    ? escapeHtml(data.mensagem).replace(/\n/g, "<br>")
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; line-height: 1.5; color: #334155;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <h1 style="margin: 0 0 24px; font-size: 24px; color: #0f172a;">
      Novo contato — Mylar Pro
    </h1>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><strong>Nome</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">${nome}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><strong>E-mail</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #37B6D6;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><strong>Motivo</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">${motivo}</td>
      </tr>
      ${
        empresa
          ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><strong>Empresa</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">${empresa}</td>
      </tr>
      `
          : ""
      }
      ${
        telefone
          ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><strong>Telefone</strong></td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">${telefone}</td>
      </tr>
      `
          : ""
      }
    </table>
    ${
      mensagem
        ? `
    <div style="margin-top: 24px;">
      <strong style="display: block; margin-bottom: 8px;">Mensagem</strong>
      <p style="margin: 0; padding: 16px; background: #f8fafc; border-radius: 8px;">${mensagem}</p>
    </div>
    `
        : ""
    }
  </div>
</body>
</html>
  `.trim();
}

export function getContactEmailText(data: ContactData): string {
  const lines = [
    `Nome: ${data.nome}`,
    `E-mail: ${data.email}`,
    `Motivo: ${getMotivoLabel(data.motivo)}`,
    data.empresa ? `Empresa: ${data.empresa}` : null,
    data.telefone ? `Telefone: ${data.telefone}` : null,
    data.mensagem ? `\nMensagem:\n${data.mensagem}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}
