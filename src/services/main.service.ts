import mailService from '@sendgrid/mail';

mailService.setApiKey(process.env.SENDGRID_API_KEY || '');

export const MailService = mailService;