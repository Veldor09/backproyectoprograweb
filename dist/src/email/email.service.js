"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = EmailService_1 = class EmailService {
    logger = new common_1.Logger(EmailService_1.name);
    transporter;
    from;
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
        }
        else {
            this.transporter = null;
            this.logger.warn('SMTP no configurado — los emails se mostrarán solo en consola.');
        }
    }
    async send(to, subject, html) {
        if (!this.transporter) {
            this.logger.log(`[DEV EMAIL] Para: ${to} | Asunto: ${subject}`);
            return;
        }
        try {
            await this.transporter.sendMail({ from: this.from, to, subject, html });
        }
        catch (err) {
            this.logger.error(`Error enviando email a ${to}:`, err);
            throw new Error('No se pudo enviar el email. Inténtalo de nuevo.');
        }
    }
    async sendPasswordReset(to, name, resetUrl) {
        if (!this.transporter) {
            this.logger.log(`[DEV] Reset link para ${to}: ${resetUrl}`);
            return;
        }
        await this.send(to, 'Recupera tu contraseña — Force Extreme', this.buildResetEmail(name, resetUrl));
    }
    async sendClassReminder(to, name, className, day, time, instructor) {
        if (!this.transporter) {
            this.logger.log(`[DEV] Recordatorio para ${to}: ${className} mañana ${day} ${time}`);
            return;
        }
        await this.send(to, `Recordatorio: ${className} mañana a las ${time} — Force Extreme`, this.buildReminderEmail(name, className, day, time, instructor));
    }
    async sendWaitlistAvailable(to, name, className, bookingUrl) {
        if (!this.transporter) {
            this.logger.log(`[DEV] Waitlist disponible para ${to}: ${bookingUrl}`);
            return;
        }
        await this.send(to, `¡Se liberó un cupo en ${className}! — Force Extreme`, this.buildWaitlistEmail(name, className, bookingUrl));
    }
    layout(content) {
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
    btn(url, label) {
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
    buildResetEmail(name, resetUrl) {
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
    buildReminderEmail(name, className, day, time, instructor) {
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
    buildWaitlistEmail(name, className, bookingUrl) {
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
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map