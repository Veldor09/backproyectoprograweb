import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: Transporter | null;
  private readonly from: string;

  constructor() {
    this.from =
      process.env.EMAIL_FROM ?? 'Force Extreme <no-reply@forceextreme.com>';

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user, pass },
      });
      this.logger.log(`Email configurado: ${host} (${user})`);
    } else {
      this.transporter = null;
      this.logger.warn(
        'SMTP no configurado — los emails se mostrarán solo en consola.',
      );
    }
  }

  // ── Envío genérico ────────────────────────────────────────────────────────
  private async send(to: string, subject: string, html: string): Promise<void> {
    if (!this.transporter) {
      this.logger.log(`[DEV EMAIL] Para: ${to} | Asunto: ${subject}`);
      return;
    }
    try {
      await this.transporter.sendMail({ from: this.from, to, subject, html });
    } catch (err) {
      this.logger.error(`Error enviando email a ${to}:`, err);
      throw new Error('No se pudo enviar el email. Inténtalo de nuevo.');
    }
  }

  // ── Recuperación de contraseña ────────────────────────────────────────────
  async sendPasswordReset(
    to: string,
    name: string,
    resetUrl: string,
  ): Promise<void> {
    if (!this.transporter) {
      this.logger.log(`[DEV] Reset link para ${to}: ${resetUrl}`);
      return;
    }
    await this.send(
      to,
      'Recupera tu contraseña — Force Extreme',
      this.buildResetEmail(name, resetUrl),
    );
  }

  // ── Recordatorio de clase ─────────────────────────────────────────────────
  async sendClassReminder(
    to: string,
    name: string,
    className: string,
    day: string,
    time: string,
    instructor: string,
  ): Promise<void> {
    if (!this.transporter) {
      this.logger.log(
        `[DEV] Recordatorio para ${to}: ${className} mañana ${day} ${time}`,
      );
      return;
    }
    await this.send(
      to,
      `Recordatorio: ${className} mañana a las ${time} — Force Extreme`,
      this.buildReminderEmail(name, className, day, time, instructor),
    );
  }

  // ── Lista de espera disponible ────────────────────────────────────────────
  async sendWaitlistAvailable(
    to: string,
    name: string,
    className: string,
    bookingUrl: string,
  ): Promise<void> {
    if (!this.transporter) {
      this.logger.log(
        `[DEV] Waitlist disponible para ${to}: ${bookingUrl}`,
      );
      return;
    }
    await this.send(
      to,
      `¡Se liberó un cupo en ${className}! — Force Extreme`,
      this.buildWaitlistEmail(name, className, bookingUrl),
    );
  }

  // ── Templates HTML ────────────────────────────────────────────────────────
  private layout(content: string): string {
    return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#07090d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#07090d;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0"
        style="max-width:520px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:18px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#ff3b30,#b90000);padding:26px 32px;text-align:center;">
            <span style="color:#fff;font-size:22px;font-weight:900;letter-spacing:1px;">⚡ FORCE EXTREME</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;color:rgba(255,255,255,0.9);">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:18px 32px;border-top:1px solid rgba(255,255,255,0.08);
            text-align:center;font-size:12px;color:rgba(255,255,255,0.3);">
            © ${new Date().getFullYear()} Force Extreme · Costa Rica
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  private btn(url: string, label: string): string {
    return `<table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0 24px;">
        <a href="${url}"
          style="display:inline-block;background:#ff3b30;color:#fff;font-weight:700;font-size:15px;
                 text-decoration:none;padding:14px 36px;border-radius:10px;
                 box-shadow:0 8px 24px rgba(255,59,48,0.35);">
          ${label}
        </a>
      </td></tr>
    </table>`;
  }

  private buildResetEmail(name: string, resetUrl: string): string {
    return this.layout(`
      <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#fff;">
        Hola, ${name} 👋
      </h2>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.72);">
        Recibimos una solicitud para restablecer la contraseña de tu cuenta en Force Extreme.
        Si fuiste tú, haz clic en el botón de abajo.
      </p>
      ${this.btn(resetUrl, 'Restablecer contraseña')}
      <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.45);">
        Este enlace expira en <strong style="color:rgba(255,255,255,0.65);">1 hora</strong>.
        Si no solicitaste esto, ignora este mensaje.
      </p>
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);word-break:break-all;">
        ${resetUrl}
      </p>
    `);
  }

  private buildReminderEmail(
    name: string,
    className: string,
    day: string,
    time: string,
    instructor: string,
  ): string {
    return this.layout(`
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#fff;">
        ¡Hola, ${name}! 💪
      </h2>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.72);">
        Te recordamos que mañana tienes tu clase:
      </p>
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
        border-radius:14px;padding:20px 24px;margin-bottom:20px;">
        <div style="font-size:20px;font-weight:800;color:#fff;margin-bottom:6px;">${className}</div>
        <div style="color:rgba(255,255,255,0.6);font-size:14px;">
          📅 ${day} &nbsp;·&nbsp; ⏰ ${time} &nbsp;·&nbsp; 👤 ${instructor}
        </div>
      </div>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);">
        Si no puedes asistir, cancela tu reserva desde el portal para liberar el cupo a alguien más.
      </p>
    `);
  }

  private buildWaitlistEmail(
    name: string,
    className: string,
    bookingUrl: string,
  ): string {
    return this.layout(`
      <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#fff;">
        ¡Se liberó tu cupo, ${name}! 🎉
      </h2>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.72);">
        Un lugar en la clase de <strong style="color:#fff;">${className}</strong> acaba de quedar
        disponible. ¡Entra ahora y reserva antes de que se llene de nuevo!
      </p>
      ${this.btn(bookingUrl, 'Reservar mi lugar ahora')}
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);">
        Este aviso fue enviado porque te anotaste en la lista de espera. Los cupos son limitados.
      </p>
    `);
  }
}
