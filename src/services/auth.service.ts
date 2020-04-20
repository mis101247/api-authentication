import { MailService } from './main.service';

const fromEmail = process.env.SENDGRID_EMAIL || '';

export const sendSignSuccess = async (toEmail: string): Promise<void> => {
    const msg = {
        to: toEmail,
        from: { name: 'Keyo', email: fromEmail },
        subject: 'J個4 註冊成功 Email.',
        html: `<h3>恭喜你成功註冊，給你看貓貓!!</h3>
            <img width="400" src="https://i.imgur.com/lm0sRKl.jpg" title="source: imgur.com" />
            `,
    };
    await MailService.send(msg).catch((error) => {
            console.error('sgMail.send=> ', error.response.body);
        });

    return;
}


export const sendCoupon = async (toEmail: string): Promise<void> => {
    const msg = {
        to: toEmail,
        from: { name: 'Keyo', email: fromEmail },
        subject: 'J個4 優惠券 Get! Email.',
        html: `<h3>恭喜你獲得優惠券，路上會遇到可愛柴犬免費券!!</h3>
            <img width="400" src="https://i.imgur.com/58xyX4k.jpg" title="source: imgur.com" />
            `,
    };
    await MailService.send(msg).catch((error) => {
            console.error('sgMail.send=> ', error.response.body);
        });

    return;
}

