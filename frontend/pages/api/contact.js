import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

export default async function handler(req, res) {
    try {
        dotenv.config();
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        if (req.method !== "POST") {
            res.status(405).send({ message: "Only POST requests allowed!" });
            return;
        }

        const msg = {
            to: ["support@techsavvyyouth.org", "raymonzhang20@gmail.com"],
            from: "support@techsavvyyouth.org",
            subject: `New message from ${req.body.name} about Tech Savvy Youth`,
            text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
            html: `<p>${req.body.name} (${req.body.email}) says: </p><p><b>${req.body.message}</p></b>`,
        };

        await sgMail.send(msg);
        res.status(200).send({ message: "Message sent!" });
    } catch (err) {
        res.status(500).send({ message: "Error sending message!" });
    }
}
